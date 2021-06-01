import Timeline from './timelime';
import Animator from './animator';
import { ElementStatus } from '@ali/f2-jsx';

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
  canvas: any;

  constructor(canvas) {
    this.timeline = new Timeline();
    this.canvas = canvas;
  }

  createAnimator(element, animation) {
    const { duration } = animation;
    // 校验关键参数
    if (!duration) {
      return;
    }
    return new Animator(element, animation);
  }

  play(container) {
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
        const animator = this.createAnimator(element, clip);
        if (animator) {
          animator.clip = clip.element;
          maxDuration = Math.max(maxDuration, animator.totalDuration);
          element.attr('clip', clip.element);
          animators.push(animator);
        }
      }
    });

    for (let i = 0, len = deleteElements.length; i < len; i++) {
      const element = deleteElements[i];
      element.remove(true);
    }

    // 开始播放动画
    this.timeline.play(maxDuration, time => {
      for (let i = 0, len = animators.length; i < len; i++) {
        const animator = animators[i];
        animator.to(time);
      }
      // 最后一帧放在end里统一draw， 避免重复draw
      if (time < maxDuration) {
        canvas.draw();
      }
    }, () => {
      canvas.draw();
    })
  }

  abort() {
    this.timeline.abort();
  }
}

export default Animation;
