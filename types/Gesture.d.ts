import Hammer from 'hammerjs';

/**
 * hammerjs 的选项。
 */
type HammerOptions = typeof Hammer extends new (
  el: any,
  options: infer X,
) => any
  ? Exclude<X, undefined>
  : never;

/**
 * 手势参数。
 */
export interface GestureParams {
  /**
   * 需要绑定的手势事件，配置的属性为以事件名为 key 的回调方法。
   *
   * @todo 完善回调函数参数定义
   */
  gesture?: Record<string, (data: any, event: any) => any>;

  /**
   * 传递给 hammer 的参数配置。一般不需要配置。
   *
   * @see http://hammerjs.github.io/api/#hammer.defaults
   */
  hammerOptions?: HammerOptions;

  /**
   * 手势插件的配置。
   */
  options?: {
    /**
     * 计算手势数据点，如果不需要可以关闭提高性能。
     */
    useCalculate?: boolean;
    /**
     * 计算数据是否需要计算图表相对页面偏移的坐标。当图表宽度超出, scroll模式，计算位置需要加。
     */
    useOffset?: boolean;
  };
}
