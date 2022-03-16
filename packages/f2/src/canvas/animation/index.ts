import Timeline from './timelime';
import Animator from './animator';
import { ElementStatus } from '../../jsx';
import { Canvas } from '@antv/f2-graphic';

// 遍历全部节点
function eachElement(element, fn) {
  fn(element);
  const children = element.get('children');
  if (children && children.length) {
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      eachElement(child, fn);
    }
  }
}

class Animation {
  timeline: Timeline;
  canvas: Canvas;

  constructor(canvas) {
    this.timeline = new Timeline();
    this.canvas = canvas;
  }

  createAnimator(element, animation) {
    const { duration, property, onFrame } = animation;
    // 校验关键参数
    if (!duration || ((!property || !property.length) && !onFrame)) {
      return;
    }
    return new Animator(element, animation);
  }

  play(container, onAnimationEnd?) {
    const { canvas } = this;
    const animators: Animator[] = [];
    let maxDuration = 0;
    const deleteElements = [];
    // 遍历整个树，找到全部需要动画的元素
    eachElement(container, (element) => {
      // TODO: status 需要提取状态
      const { animation, status } = element._attrs;
      if (!animation) {
        if (status === ElementStatus.ELEMENT_DELETE) {
          // element.remove(true);
          deleteElements.push(element);
        }
        return;
      }

      const animator = this.createAnimator(element, animation);
      if (animator) {
        maxDuration = Math.max(maxDuration, animator.totalDuration);
        animators.push(animator);
      }

      const { clip } = animation;
      // 如果有裁剪区动画，处理裁剪区动画
      if (clip) {
        clip.isClip = true;
        const { element: clipElement } = clip;
        const animator = this.createAnimator(clipElement, clip);
        if (animator) {
          maxDuration = Math.max(maxDuration, animator.totalDuration);
          element.attr('clip', clipElement);
          animators.push(animator);
        }
      }
    });

    for (let i = 0, len = deleteElements.length; i < len; i++) {
      const element = deleteElements[i];
      const { children } = element._attrs;
      // 因为group的子元素也有可能有动画，所以这里先把叶子节点删除掉，等动画结束后，再把所有删除的元素删除掉
      if (!children || !children.length) {
        element.remove(true);
      }
    }

    // 开始播放动画
    this.timeline.play(
      maxDuration,
      (time) => {
        for (let i = 0, len = animators.length; i < len; i++) {
          const animator = animators[i];
          animator.to(time);
        }
        // 最后一帧放在end里统一draw， 避免重复draw
        if (time < maxDuration) {
          canvas.draw();
        }
      },
      () => {
        for (let i = 0, len = deleteElements.length; i < len; i++) {
          const element = deleteElements[i];
          element.remove(true);
        }
        canvas.draw();
        onAnimationEnd && onAnimationEnd();
      }
    );
  }

  // 直接跳到动画最终态
  end() {
    this.timeline.end();
  }

  abort() {
    this.timeline.abort();
  }
}

export default Animation;
