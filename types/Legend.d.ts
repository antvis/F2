import { CanvasProps } from './CanvasProps';

/**
 * 图例标记的形状。
 */
export type LegendMarkerSymbol = 'circle' | 'square';

/**
 * 图例标记的参数。
 */
export interface LegendMarkerParams extends CanvasProps {
  /**
   * 形状。
   */
  symbol?: LegendMarkerSymbol;
}

/**
 * 设置图例标记的函数。
 */
export type LegendMarkerFunc = (
  x: number,
  y: number,
  r: number,
  ctx: CanvasRenderingContext2D,
) => void;

/**
 * 图例标记。
 */
export type LegendMarker =
  | LegendMarkerSymbol
  | LegendMarkerParams
  | LegendMarkerFunc;

/**
 * 图例项目。
 */
export interface LegendItem extends CanvasProps {
  /**
   * 名称。
   */
  name: string;

  /**
   * 值。
   */
  dataValue?: string | number;

  /**
   * 标记。
   */
  marker?: LegendMarker;

  /**
   * 是否选中。
   */
  checked?: boolean;
}

export interface LegendParams {
  /**
   * 图例的显示位置。默认为 top。
   */
  position?: 'top' | 'right' | 'bottom' | 'left';

  /**
   * 水平方向上图例的对齐方式。默认为 left，左对齐。
   */
  align?: 'left' | 'center' | 'right';

  /**
   * 垂直方向上图例的对齐方式。默认为 middle，居中对齐。
   */
  verticalAlign?: 'top' | 'middle' | 'bottom';

  /**
   * 图例项的宽度。默认为 auto，即使用 F2 默认的图例布局计算 itemWidth。
   * 如果为 null，则会根据每个图例项自身的宽度计算。
   */
  itemWidth?: 'auto' | number | null;

  /**
   * 是否显示图例标题，默认值为 false，即不展示。
   */
  showTitle?: boolean;

  /**
   * 图例标题的显示样式。
   */
  titleStyle?: CanvasProps;

  /**
   * 图例 X 方向的整体偏移值，数值类型，数值单位为 px，默认值为 0。
   */
  offsetX?: number;

  /**
   * 图例 Y 方向的整体偏移值，数值类型，数值单位为 px，默认值为 0。
   */
  offsetY?: number;

  /**
   * 标题距离图例项的间距，默认为 12px，如果不展示标题，不生效。
   */
  titleGap?: number;

  /**
   * 每个图例项水平方向上的间距，默认值为 12px。
   */
  itemGap?: number;

  /**
   * 每个图例项下方留白间距，默认值为 12px。
   */
  itemMarginBottom?: number;

  /**
   * marker 和文本之间的间距，默认值为 6px。
   */
  wordSpace?: number;

  /**
   * 用于设置取消选中的图例 marker 以及文本的样式。默认值为：
   * ```
   * unCheckStyle: {
   *  fill: '#bfbfbf',
   * }
   * ```
   */
  unCheckStyle?: CanvasProps;

  /**
   * 回调函数，用于格式化图例每项的文本显示。
   */
  itemFormatter?: (value: string) => string;

  /**
   * 用于设置图例的 marker 样式，默认为 circle 即圆形。
   */
  marker?: LegendMarker;

  /**
   * 用于设置图例项的文本样式。
   */
  nameStyle?: CanvasProps;

  /**
   * 用于设置图例项的文本样式。
   */
  valueStyle?: CanvasProps;

  /**
   * 设置图例项中 name 和 value 的连接字符，默认为 `:`。
   */
  joinString?: string;

  /**
   * 图例筛选行为的触发事件，默认为 click。
   */
  triggerOn?: string;

  /**
   * 设置图例项的选中模式，默认为 multiple，即多选。
   */
  selectedMode?: 'multiple' | 'single';

  /**
   * 设置图例项是否允许点击，默认为 true，即允许点击。
   */
  clickable?: boolean;

  /**
   * 默认为 false，当 custom 为 true，表示不使用默认生成的图例，允许用户自定义图例，
   * 包括具体的图例项(`items`)以及点击交互行为(`onClick`)。
   */
  custom?: boolean;

  /**
   * 图例项列表。
   */
  items?: LegendItem[];

  /**
   * 用于自定义鼠标点击图例项的交互，当 clickable 为 false 时不生效。
   *
   * @todo 明确参数的类型
   */
  onClick?: (...args: any[]) => any;
}
