export type EasingFunction = (t: number) => number;
export type InterpolateFunction = (t: number) => any;

export interface Animation {
  // 缓动函数
  easing: string | EasingFunction;
  duration: number;
  delay?: number;
  property: string[];
  // 裁剪区动画
  clip?: any;
  // start 的 attrs
  start?: any;
  // end 的 attrs
  end?: any;
  // 每一帧的处理函数
  onFrame?: any;
  onEnd?: any;
}