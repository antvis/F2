import { CanvasProps } from './CanvasProps';
import { DataRecord } from './Data';

// ref: https://github.com/antvis/F2/blob/master/src/plugin/tooltip.js#L401
/**
 * 提示项目。
 */
export interface TooltipItem<TRecord extends DataRecord> {
  x: number;
  y: number;
  color: string;
  origin: TRecord;
  name: string | null;
  value: string;
  title: string;
}

// ref: https://github.com/antvis/F2/blob/master/src/plugin/tooltip.js#L318
/**
 * 提示。
 */
export interface Tooltip<TRecord extends DataRecord> {
  x: number;
  y: number;
  tooltip: any;
  items: TooltipItem<TRecord>[];
  tooltipMarkerCfg: any;
}

/**
 * 提示参数。
 */
export interface TooltipParams<TRecord extends DataRecord> {
  /**
   * 当移出触发区域，是否仍显示提示框内容。
   * 默认为 false，移出触发区域 tooltip 消失，设置为 true 可以保证一直显示提示框内容。
   */
  alwaysShow?: boolean;

  /**
   * x 方向的偏移。
   */
  offsetX?: number;

  /**
   * y 方向的偏移。
   */
  offsetY?: number;

  /**
   * tooltip 出现的触发行为。
   */
  triggerOn?: string | string[];

  /**
   * tooltip 消失的触发行为。
   */
  triggerOff?: string | string[];

  /**
   * 是否展示标题，默认为 false，即不展示。
   */
  showTitle?: boolean;

  /**
   * 是否显示辅助线，点图、路径图、线图、面积图默认为 true。
   */
  showCrosshairs?: boolean;

  /**
   * 配置辅助线的样式。
   */
  crosshairsStyle?: CanvasProps;

  /**
   * 是否显示 tooltipMarker。
   */
  showTooltipMarker?: boolean;

  /**
   * 设置 tooltipMarker 的样式。
   */
  tooltipMarkerStyle?: CanvasProps;

  /**
   * tooltip 内容框的背景样式。
   */
  background?: CanvasProps;

  /**
   * tooltip 标题的文本样式配置，showTitle 为 false 时不生效。
   */
  titleStyle?: CanvasProps;

  /**
   * tooltip name 项的文本样式配置。
   */
  nameStyle?: CanvasProps;

  /**
   * tooltip value 项的文本样式配置。
   */
  valueStyle?: CanvasProps;

  /**
   * 是否展示每条记录项前面的 marker。
   */
  showItemMarker?: boolean;

  /**
   * 每条记录项前面的 marker 的样式配置。
   */
  itemMarkerStyle?: CanvasProps;

  /**
   * 是否自定义 tooltip 提示框。
   */
  custom?: boolean;

  /**
   * 辅助线的种类。
   */
  crosshairsType?: 'x' | 'y' | 'xy';

  /**
   * 是否展示 X 轴的辅助信息，默认为 false。
   */
  showXTip?: boolean;

  /**
   * 是否展示 Y 轴的辅助信息，默认为 false。
   */
  showYTip?: boolean;

  /**
   * X 轴辅助信息的文本样式。
   */
  xTip?: CanvasProps | ((value: string) => CanvasProps & { val?: string });

  /**
   * Y 轴辅助信息的文本样式。
   */
  yTip?: CanvasProps | ((value: string) => CanvasProps & { val?: string });

  /**
   * X 轴辅助信息的背景框样式。
   */
  xTipBackground?: CanvasProps;

  /**
   * Y 轴辅助信息的背景框样式。
   */
  yTipBackground?: CanvasProps;

  /**
   * 是否将辅助线准确定位至数据点，默认为 false。
   */
  snap?: boolean;

  /**
   * tooltip 显示时的回调函数。
   */
  onShow?: (tooltip: Tooltip<TRecord>) => any;

  /**
   * tooltip 隐藏时的回调函数。
   */
  onHide?: (tooltip: Tooltip<TRecord>) => any;

  /**
   * tooltip 内容发生改变时的回调函数。
   */
  onChange?: (tooltip: Tooltip<TRecord>) => any;
}
