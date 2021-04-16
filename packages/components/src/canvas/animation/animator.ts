// 动画的元素
import {
  Animation,
  EasingFunction,
  InterpolateFunction,
} from './interface';
import interpolate from './interpolate';
import * as Easing from './easing';

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


  constructor(element: any, animation: Animation) {
    this.element = element;
    this.animation = animation;

    const { property, easing, duration, delay = 0, start, end } = animation;
    const interpolates = property.map(key => {
      return interpolate(start[key], end[key]);
    });

    this.easing = typeof easing === 'function' ? easing : (Easing[easing] || Easing.linear);
    this.property = property;
    this.interpolates = interpolates;
    this.duration = duration;
    this.delay = delay;

    this.totalDuration = duration + delay;

    // 更新到初始状态
    this.update(0);
  }

  to(time: number) {
    const { duration, delay, totalDuration, easing } = this;
    // 未开始
    if (time <= delay || !duration) {
      return;
    }
    // 最大为1
    const t = time >= totalDuration ? 1 : (time - delay) / duration;

    this.update(easing(t));
  }

  update(t: number) {
    const { element, clip, interpolates, property } = this;
    const attrs = {};
    for (let i = property.length - 1; i >= 0; i--) {
      const key = property[i];
      attrs[key] = interpolates[i](t);
    }
    if (clip) {
      clip.attr(attrs);
    } else {
      element.attr(attrs);
    }
  }
}

export default Animator;