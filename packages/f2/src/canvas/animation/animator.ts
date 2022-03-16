// 动画的元素
import { Animation, EasingFunction, InterpolateFunction } from './interface';
import interpolate from './interpolate';
import * as Easing from './easing';
import { ElementStatus } from '../../jsx';
import { isString } from '@antv/util';

class Animator {
  // 对应G的shape
  element: any;
  // 动画定义
  animation: Animation;

  // 是否是裁剪动画
  isClip: boolean = false;

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

    const { property = [], easing, duration, delay = 0, start, end, onFrame, isClip } = animation;
    const interpolates = property.map((name) => {
      if (isString(name)) {
        return interpolate(start[name], end[name]);
      }
      // @ts-ignore
      if (name.interpolate) {
        // @ts-ignore
        return name.interpolate(start, end);
      }
    });

    this.easing = typeof easing === 'function' ? easing : Easing[easing] || Easing.linear;
    this.property = property;
    this.interpolates = interpolates;
    this.duration = duration;
    this.delay = delay;
    this.onFrame = onFrame;

    this.totalDuration = duration + delay;
    this.isClip = isClip;

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
    const { element, interpolates, property, onFrame } = this;
    let attrs = {};
    for (let i = property.length - 1; i >= 0; i--) {
      const name = property[i];
      if (isString(name)) {
        attrs[name] = interpolates[i](t);
      } else {
        // @ts-ignore
        attrs[name.name] = interpolates[i](t);
      }
    }
    if (onFrame) {
      attrs = {
        ...attrs,
        ...this.onFrame(t, time),
      };
    }
    element.attr(attrs);
  }

  onEnd() {
    const { animation, isClip, element } = this;
    const { onEnd } = animation;

    onEnd && onEnd.call(this);

    if (isClip) {
      // 如果是裁剪区动画，要移除裁剪区
      element.remove(true);
    }

    // 如果当前元素状态被标记为删除，等动画结束后直接删除
    if (element._attrs.status === ElementStatus.ELEMENT_DELETE) {
      element.remove(true);
    }

    // 清空 不需要重复执行
    element.set('animation', null);

    this.end = true;
  }
}

export default Animator;
