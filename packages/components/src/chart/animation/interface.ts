export type EasingFunction = (t: number) => number;
export type InterpolateFunction = (t: number) => any;

export interface Animation {
  // 缓动函数
  easing: string | EasingFunction;
  duration: number;
  delay?: number;
  property: string[];
  // start 的 attrs
  start?: any;
  // end 的 attrs
  end?: any;
}