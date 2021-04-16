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
    const { duration, property } = animation;
    // 校验关键参数
    if (!duration || !property || !property.length) {
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
      canvas.draw();
    }, () => {
      // 动画结束后移除被删除的元素
      for (let i = 0, len = animators.length; i < len; i++) {
        const animator = animators[i];
        const { element, clip } = animator;
        if (clip) {
          // 如果是裁剪区动画，要移除裁剪区
          clip.remove(true);
          element.attr('clip', null);
        }
        if(element._attrs.status === ElementStatus.ELEMENT_DELETE) {
          element.remove(true);
        }
      }
      // @TODO 要和update 合在一起绘制，否则会调用2次
      canvas.draw();
    })
  }
}

export default Animation;
