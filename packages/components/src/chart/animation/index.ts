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

  play(container) {
    const { canvas } = this;
    const animators = [];
    let maxDuration = 0;
    // 遍历整个树，找到全部需要动画的元素
    eachElement(container, (element) => {
      // TODO: status 需要提取状态
      const { animation, status } = element._attrs;
      if (!animation) {
        if (status === ElementStatus.ELEMENT_DELETE) {
          element.remove(true);
        }
        return;
      }
      const { duration, property } = animation;
      // 校验关键参数
      if (!duration || !property || !property.length) {
        return;
      }
      const animator = new Animator(element, animation);
      maxDuration = Math.max(maxDuration, animator.totalDuration);
      animators.push(animator);
    });

    // 开始播放动画
    this.timeline.play(maxDuration, time => {
      for (let i = 0, len = animators.length; i < len; i++) {
        const animator = animators[i];
        animator.to(time);
        canvas.draw();
      }
    }, () => {
      // 动画结束后移除被删除的元素
      for (let i = 0, len = animators.length; i < len; i++) {
        const animator = animators[i];
        const { element } = animator;
        if(element._attrs.status === ElementStatus.ELEMENT_DELETE) {
          element.remove(true);
        }
      }
    })
  }
}

export default Animation;
