import { LiteralUnion } from 'type-fest';

/**
 * 动画类型。
 */
export type AnimateKind = 'appear' | 'enter' | 'update' | 'leave';

/**
 * 动画元素。
 */
export type AnimateElement =
  | 'axis-label'
  | 'axis-grid'
  | 'axis-tick'
  | 'axis-line'
  | 'line'
  | 'area'
  | 'interval'
  | 'path'
  | 'point'
  | 'polygon'
  | 'schema';

/**
 * 动画名称。
 */
export type AnimateAnimationName = LiteralUnion<
  | 'groupWaveIn'
  | 'groupScaleInX'
  | 'groupScaleInY'
  | 'groupScaleInXY'
  | 'shapesScaleInX'
  | 'shapesScaleInY'
  | 'shapesScaleInXY'
  | 'fadeIn',
  string
>;

/**
 * 动画函数。
 *
 * @todo 去除 shape 和 coord 的 any
 */
export type AnimateAnimationFunc = (
  shape: any,
  config: AnimateConfig,
  coord: any,
) => any;

/**
 * 缓动函数名称。
 */
export type AnimateEasingName =
  | 'linear'
  | 'quadraticIn'
  | 'quadraticOut'
  | 'quadraticInOut'
  | 'cubicIn'
  | 'cubicOut'
  | 'cubicInOut'
  | 'elasticIn'
  | 'elasticOut'
  | 'elasticInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'bounceIn'
  | 'bounceOut'
  | 'bounceInOut';

/**
 * 缓动函数。
 */
export type AnimateEasingFunc = (t: number) => number;

/**
 * 返回动画延迟执行时间的函数。
 */
export type AnimateDelayFunc = (index: number, id: string) => number;

/**
 * 动画配置。
 */
export interface AnimateConfig {
  /**
   * 执行的具体动画。
   * 可以是动画名称或者动画执行函数。
   */
  animation?: AnimateAnimationName | AnimateAnimationFunc;

  /**
   * 动画的缓动函数。
   * 可以是缓动函数名称或者缓动函数。
   */
  easing?: AnimateEasingName | AnimateEasingFunc;

  /**
   * 动画的延迟执行时间。
   */
  delay?: number | AnimateDelayFunc;

  /**
   * 动画的执行时间。
   */
  duration?: number;
}

/**
 * 元素的动画参数。
 */
export type AnimateElementParams = Partial<
  Record<AnimateKind, boolean | AnimateConfig>
>;

/**
 * 图表的动画参数。
 */
export type AnimateChartParams = Partial<
  Record<AnimateElement, boolean | AnimateElementParams>
>;

/**
 * 动画管理。
 */
export const Animate: {
  /**
   * 注册动画。
   *
   * @param name 动画名称
   * @param descriptor 动画描述
   *
   * @todo 完善参数 descriptor 的类型
   */
  registerAnimation(
    name: string,
    descriptor: (shape: any, animateCfg: any) => any,
  ): void;
};
