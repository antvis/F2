import { AnimateConfig } from './Animate';
import { CanvasProps } from './CanvasProps';
import { DataRecord } from './Data';

/**
 * 交互行为类型。
 */
export type InteractionKind =
  | 'pie-select'
  | 'interval-select'
  | 'pan'
  | 'pinch'
  | 'swipe';

/**
 * 饼图选中参数。
 */
export interface InteractionPieSelectParams<TRecord extends DataRecord> {
  /**
   * 选中交互的触发事件名称，默认为 tap。
   * 该交互原则上是手指点击后触发的，除去 tap，还可以使用 touchstart。
   */
  startEvent?: string;

  /**
   * 动画配置，默认为 false，可将该属性设置为 true 来打开动画。
   * 当为 Object 类型时，用于进行动画配置。
   */
  animate?: boolean | AnimateConfig;

  /**
   * 选中后出现的光环与饼图的距离。默认为 1。
   */
  offset?: number;

  /**
   * 选中后出现的光环的轴长。默认为 8。
   */
  appendRadius?: number;

  /**
   * 设置光环的样式。默认为 `{ fillOpacity: 0.5 }`。
   */
  style?: CanvasProps;

  /**
   * 当 shape 被选中后，再次点击是否允许取消选中，默认为 true，表示会取消选中。
   */
  cancelable?: boolean;

  /**
   * 事件触发后的回调。
   *
   * @todo 参数 e 的类型
   */
  onStart?: (e: any) => any;

  /**
   * 事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。
   *
   * @todo 参数 e 的类型
   */
  onEnd?: (e: any) => any;

  /**
   * 用于设置初始化默认选中的数据，只要传入对应的数据即可。
   */
  defaultSelected?: TRecord;
}

/**
 * 柱状图选中参数。
 */
export interface InteractionIntervalSelectParams<TRecord extends DataRecord> {
  /**
   * 选中交互的触发事件名称，默认为 tap。
   * 该交互原则上是手指点击后触发的，除去 tap，还可以使用 touchstart。
   */
  startEvent?: string;

  /**
   * 用于设置被选中柱子的显示样式。默认是 `{ fillOpacity: 1 }`。
   */
  selectStyle?: CanvasProps;

  /**
   * 用于设置未被选中柱子的显示样式。默认是 `{ fillOpacity: 0.4 }`。
   * 如果不需要设置，可以直接设置为 null。
   */
  unSelectStyle?: CanvasProps | null;

  /**
   * 是否高亮坐标轴文本，默认为 true，会高亮。如不需要，可以选择关闭。
   */
  selectAxis?: boolean;

  /**
   * 设置坐标轴文本高亮的样式。默认是 `{ fontWeight: 'bold' }`，即仅文字加粗。
   */
  selectAxisStyle?: CanvasProps;

  /**
   * 当 shape 被选中后，再次点击是否允许取消选中，默认为 true，表示会取消选中。
   */
  cancelable?: boolean;

  /**
   * 事件触发后的回调。
   *
   * @todo 参数 e 的类型
   */
  onStart?: (e: any) => any;

  /**
   * 事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。
   *
   * @todo 参数 e 的类型
   */
  onEnd?: (e: any) => any;

  /**
   * 选中策略，默认为 `shape`，即击中柱子才会触发交互。
   * 另一个可选值为 `range`，即只要集中点落在该柱子的一定 x 方向范围内都会触发选中交互。
   */
  mode?: 'shape' | 'range';

  /**
   * 用于设置初始化默认选中的数据，只要传入对应的数据即可。
   */
  defaultSelected?: TRecord;
}

/**
 * 平移参数。
 */
export interface InteractionPanParams {
  /**
   * 图表的平移方向，可设置 x 轴、y 轴以及 x、y 两个方向的平移操作。默认值为 `x`，即 x 轴平移。
   *
   * **对于分类类型或者 TimeCat 类型的数据，只支持 x 轴方向的平移。**
   */
  mode?: 'x' | 'y' | 'xy';

  /**
   * 用于控制平移速度，默认为 5，数值越大，速度越快。
   *
   * **仅适用于分类类型 cat 或者时间类型 timeCat 数据。**
   */
  speed?: number;

  /**
   * 用于控制每次平移的数据量，默认为 1。
   *
   * **仅适用于分类类型 cat 或者时间类型 timeCat 数据。**
   */
  step?: number;

  /**
   * hammer.js 设置，用于设置识别 pan 事件的最小移动距离，默认为 10。
   *
   * @see http://hammerjs.github.io/recognizer-pan/
   */
  panThreshold?: number;

  /**
   * hammer.js 设置，用于设置识别 press 事件的最小移动距离，默认为 9。
   * 长按会触发 tooltip。
   *
   * @see http://hammerjs.github.io/recognizer-press/
   */
  pressThreshold?: number;

  /**
   * hammer.js 设置，用于设置识别 press 事件的最小时间差，默认为 251。
   * 长按会触发 tooltip。
   *
   * @see http://hammerjs.github.io/recognizer-press/
   */
  pressTime?: number;

  /**
   * 用于设置图表平移的最大最小范围，需要同 x 或者 y 轴对应的数据字段对应。
   */
  limitRange?: {
    /**
     * 最小值。
     */
    min?: number;
    /**
     * 最大值。
     */
    max?: number;
  };

  /**
   * 事件触发后的回调。
   *
   * @todo 参数 e 的类型
   */
  onStart?: (e: any) => any;

  /**
   * 事件进行中的回调。
   *
   * @todo 参数 e 的类型
   */
  onProcess?: (e: any) => any;

  /**
   * 事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。
   *
   * @todo 参数 e 的类型
   */
  onEnd?: (e: any) => any;
}

/**
 * 缩放参数。
 */
export interface InteractionPinchParams {
  /**
   * 图表的缩放方向，可设置 x 轴、y 轴以及 x、y 两个方向。默认值为 `x`，即 x 轴方向的缩放。
   *
   * **对于分类类型或者 TimeCat 类型的数据，只支持 x 轴方向的缩放。**
   */
  mode?: 'x' | 'y' | 'xy';

  /**
   * 用于控制缩放灵敏度，默认为 1，值越小越灵敏。
   *
   * **仅适用于分类类型 cat 或者时间类型 timeCat 数据。**
   */
  sensitivity?: number;

  /**
   * 设置图表缩小时的最小倍数。
   * linear 类型数据默认为 null，分类类型以及 TimeCat 类型数据默认为 1。
   */
  minScale?: number | null;

  /**
   * 设置图表放大时的最大倍数。
   * linear 类型数据默认为 null，分类类型以及 TimeCat 类型数据默认为 4。
   */
  maxScale?: number | null;

  /**
   * 事件触发后的回调。
   *
   * @todo 参数 e 的类型
   */
  onStart?: (e: any) => any;

  /**
   * 事件进行中的回调。
   *
   * @todo 参数 e 的类型
   */
  onProcess?: (e: any) => any;

  /**
   * 事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。
   *
   * @todo 参数 e 的类型
   */
  onEnd?: (e: any) => any;

  /**
   * hammer.js 设置，用于设置识别 press 事件的最小移动距离，默认为 9。
   * 长按会触发 tooltip。
   *
   * @see http://hammerjs.github.io/recognizer-press/
   */
  pressThreshold?: number;

  /**
   * hammer.js 设置，用于设置识别 press 事件的最小时间差，默认为 251。
   * 长按会触发 tooltip。
   *
   * @see http://hammerjs.github.io/recognizer-press/
   */
  pressTime?: number;
}

/**
 * 快扫参数。
 */
export interface InteractionSwipeParams {
  /**
   * 用于控制平移速度，默认为 5，数值越大，速度越快。
   *
   * **仅适用于分类类型 cat 或者时间类型 timeCat 数据。**
   */
  speed?: number;

  /**
   * hammer.js 设置，用于设置识别 swipe 事件的最小移动距离，默认为 10。
   *
   * @see http://hammerjs.github.io/recognizer-swipe/
   */
  threshold?: number;

  /**
   * hammer.js 设置，用于设置 swipe 移动的最小速度，默认为 0.3。
   *
   * @see http://hammerjs.github.io/recognizer-swipe/
   */
  velocity?: number;

  /**
   * 用于设置图表平移的最大最小范围，需要同 x 轴对应的数据字段对应。
   */
  limitRange?: {
    /**
     * 最小值。
     */
    min?: number;
    /**
     * 最大值。
     */
    max?: number;
  };

  /**
   * 事件触发后的回调。
   *
   * @todo 参数 e 的类型
   */
  onStart?: (e: any) => any;

  /**
   * 事件进行中的回调。
   *
   * @todo 参数 e 的类型
   */
  onProcess?: (e: any) => any;

  /**
   * 事件结束后的回调函数，用于可以基于该回调函数进行相应的操作。
   *
   * @todo 参数 e 的类型
   */
  onEnd?: (e: any) => any;
}

/**
 * 交互行为的参数。
 */
export type InteractionParams<
  TKind extends InteractionKind,
  TRecord extends DataRecord
> = TKind extends 'pie-select'
  ? InteractionPieSelectParams<TRecord>
  : TKind extends 'interval-select'
  ? InteractionIntervalSelectParams<TRecord>
  : TKind extends 'pan'
  ? InteractionPanParams
  : TKind extends 'pinch'
  ? InteractionPinchParams
  : TKind extends 'swipe'
  ? InteractionSwipeParams
  : never;
