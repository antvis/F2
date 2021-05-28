// 动画的元素
import {
  Animation,
  EasingFunction,
  InterpolateFunction,
} from './interface';
import interpolate from './interpolate';
import * as Easing from './easing';
import { ElementStatus } from '@ali/f2-jsx';

class Animator {
  // 对应G的shape
  element: any;
  // 动画定义
  animation: Animation;

  // 裁剪区动画的shape
  clip: any;

  // 缓动函数
  easing: EasingFunction;
  duration: number;
  delay: number;
  property: string[];

  // property 的差值函数
  interpolates: InterpolateFunction[];

  // 整体持续时间 delay + duration
  totalDuration: number;

  onFrame?: any;
  end = false;


  constructor(element: any, animation: Animation) {
    this.element = element;
    this.animation = animation;

    const { property = [], easing, duration, delay = 0, start, end, onFrame } = animation;
    const interpolates = property.map(key => {
      return interpolate(start[key], end[key]);
    });

    this.easing = typeof easing === 'function' ? easing : (Easing[easing] || Easing.linear);
    this.property = property;
    this.interpolates = interpolates;
    this.duration = duration;
    this.delay = delay;
    this.onFrame = onFrame;

    this.totalDuration = duration + delay;

    // 更新到初始状态
    this.update(0, 0);
  }

  to(time: number) {
    const { duration, delay, totalDuration, easing, end } = this;
    // 已结束
    if (end) {
      return;
    }
    // 未开始
    if (time <= delay || !duration) {
      return;
    }
    // 最大为1
    const t = time >= totalDuration ? 1 : (time - delay) / duration;

    this.update(easing(t), time);

    // 最后一帧
    if (t === 1) {
      this.onEnd();
    }
  }

  update(t: number, time) {
    const { element, clip, interpolates, property, onFrame } = this;
    let attrs = {};
    for (let i = property.length - 1; i >= 0; i--) {
      const key = property[i];
      attrs[key] = interpolates[i](t);
    }
    if (onFrame) {
      attrs = {
        ...attrs,
        ...this.onFrame(t, time)
      }
    }
    if (clip) {
      clip.attr(attrs);
    } else {
      element.attr(attrs);
    }
  }

  onEnd() {
    const { animation, clip, element } = this;
    const { onEnd } = animation;

    onEnd && onEnd.call(this);

    if (clip) {
      // 如果是裁剪区动画，要移除裁剪区
      clip.remove(true);
      element.attr('clip', null);
    }

    // 如果当前元素状态被标记为删除，等动画结束后直接删除
    if(element._attrs.status === ElementStatus.ELEMENT_DELETE) {
      element.remove(true);
    }

    // 清空 不需要重复执行
    element.set('animation', null);

    this.end = true;
  }
}

export default Animator;