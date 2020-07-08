import { CanvasProps } from './CanvasProps';

/**
 * 辅助元素位置的字面值。
 */
export type GuideElementPositionLiteral = [string | number, string | number];

/**
 * 辅助元素位置的函数值。
 *
 * @todo 参数的类型
 */
export type GuideElementPositionFunc = (
  xScale: any,
  yScales: any,
) => GuideElementPositionLiteral;

/**
 * 辅助元素的位置。
 */
export type GuideElementPosition =
  | GuideElementPositionLiteral
  | GuideElementPositionFunc;

/**
 * 绘制辅助线的参数。
 */
export interface GuideLineParams {
  /**
   * 是否绘制在 canvas 最上层，默认为 true，即绘制在最上层。
   */
  top?: boolean;

  /**
   * 辅助线的起始位置。
   */
  start?: GuideElementPosition;

  /**
   * 辅助线的结束位置。
   */
  end?: GuideElementPosition;

  /**
   * 辅助线的显示样式。
   */
  style?: CanvasProps;

  /**
   * 是否将 guide 元素限制在绘图区域图，默认为 false。
   */
  limitInPlot?: boolean;
}

/**
 * 绘制辅助文本的参数。
 */
export interface GuideTextParams {
  /**
   * 是否绘制在 canvas 最上层，默认为 true，即绘制在最上层。
   */
  top?: boolean;

  /**
   * 辅助文本的显示位置。
   */
  position?: GuideElementPosition;

  /**
   * 辅助文本的显示内容。
   */
  content?: string | number;

  /**
   * 辅助文本的显示样式。
   */
  style?: CanvasProps;

  /**
   * 辅助文本 x 方向的偏移量。
   */
  offsetX?: number;

  /**
   * 辅助文本 y 方向的偏移量。
   */
  offsetY?: number;

  /**
   * 是否将 guide 元素限制在绘图区域图，默认为 false。
   */
  limitInPlot?: boolean;
}

/**
 * 绘制辅助点的参数。
 */
export interface GuidePointParams {
  /**
   * 是否绘制在 canvas 最上层，默认为 true，即绘制在最上层。
   */
  top?: boolean;

  /**
   * 辅助点的显示位置。
   */
  position?: GuideElementPosition;

  /**
   * 辅助点的显示样式。
   */
  style?: CanvasProps;

  /**
   * 辅助点 x 方向的偏移量。
   */
  offsetX?: number;

  /**
   * 辅助点 y 方向的偏移量。
   */
  offsetY?: number;

  /**
   * 是否将 guide 元素限制在绘图区域图，默认为 false。
   */
  limitInPlot?: boolean;
}

/**
 * 绘制辅助标签的参数。
 */
export interface GuideTagParams {
  /**
   * 是否绘制在 canvas 最上层，默认为 true，即绘制在最上层。
   */
  top?: boolean;

  /**
   * 辅助标签的显示位置。
   */
  position?: GuideElementPosition;

  /**
   * 辅助标签的显示内容。
   */
  content?: string | number;

  /**
   * 辅助标签的箭头方向，默认自动计算，用户也可以手动设置，该方向相对于 point，
   * 可设置值为：'tl'、'tc'、'tr'、'cl'、'cr'、'bl'、'bc'、'br'，如下如所示：
   * ![](https://gw.alipayobjects.com/zos/rmsportal/hyRzDvMdRVwukHVfmGWL.png#align=left&display=inline&height=400&originHeight=400&originWidth=700&status=done&width=400)
   */
  direct?: 'tl' | 'tc' | 'tr' | 'cl' | 'cr' | 'bl' | 'bc' | 'br';

  /**
   * 辅助标签箭头的边长，默认为 4。
   */
  side?: number;

  /**
   * 辅助标签 x 方向的偏移量。
   */
  offsetX?: number;

  /**
   * 辅助标签 y 方向的偏移量。
   */
  offsetY?: number;

  /**
   * 辅助标签的背景样式。
   */
  background?: CanvasProps;

  /**
   * 辅助标签的字体样式。
   */
  textStyle?: CanvasProps;

  /**
   * 是否带点，默认为 true，如果要关闭将其值设置为 false 即可。
   */
  withPoint?: boolean;

  /**
   * 点的显示样式。
   */
  pointStyle?: CanvasProps;

  /**
   * 是否将 guide 元素限制在绘图区域图，默认为 false。
   */
  limitInPlot?: boolean;
}

/**
 * 绘制辅助背景框的参数。
 */
export interface GuideRectParams {
  /**
   * 是否绘制在 canvas 最上层，默认为 true，即绘制在最上层。
   */
  top?: boolean;

  /**
   * 辅助背景框的起始位置。
   */
  start?: GuideElementPosition;

  /**
   * 辅助背景框的结束位置。
   */
  end?: GuideElementPosition;

  /**
   * 辅助背景框的显示样式。
   */
  style?: CanvasProps;

  /**
   * 是否将 guide 元素限制在绘图区域图，默认为 false。
   */
  limitInPlot?: boolean;
}

/**
 * 绘制辅助 HTML 的参数。
 */
export interface GuideHtmlParams {
  /**
   * 辅助 HTML 的显示位置。
   */
  position?: GuideElementPosition;

  /**
   * 辅助 HTML 的水平对齐方式，默认为 center。
   */
  alignX?: 'left' | 'center' | 'right';

  /**
   * 辅助 HTML 的垂直对齐方式，默认为 middle。
   */
  alignY?: 'top' | 'middle' | 'bottom';

  /**
   * 辅助 HTML 在 x 方向的偏移量。
   */
  offsetX?: number;

  /**
   * 辅助 HTML 在 y 方向的偏移量。
   */
  offsetY?: number;

  /**
   * 辅助 HTML 的显示内容。
   */
  html?: string;

  /**
   * 是否将 guide 元素限制在绘图区域图，默认为 false。
   */
  limitInPlot?: boolean;
}

/**
 * 绘制辅助圆弧的参数。
 */
export interface GuideArcParams {
  /**
   * 是否绘制在 canvas 最上层，默认为 true，即绘制在最上层。
   */
  top?: boolean;

  /**
   * 辅助圆弧的起始位置。
   */
  start?: GuideElementPosition;

  /**
   * 辅助圆弧的结束位置。
   */
  end?: GuideElementPosition;

  /**
   * 辅助圆弧的显示样式。
   */
  style?: CanvasProps;

  /**
   * 是否将 guide 元素限制在绘图区域图，默认为 false。
   */
  limitInPlot?: boolean;
}

/**
 * 绘制辅助过滤区域的参数。
 */
export interface GuideRegionFilterParams {
  /**
   * 是否绘制在 canvas 最上层，默认为 true，即绘制在最上层。
   */
  top?: boolean;

  /**
   * 起始位置。
   */
  start?: GuideElementPosition;

  /**
   * 结束位置。
   */
  end?: GuideElementPosition;

  /**
   * 过滤区域的颜色。
   */
  color?: string;

  /**
   * 过滤区域 shape 附加的样式设置。
   */
  style?: CanvasProps;
}

/**
 * 辅助元素绘制结果。
 */
export type GuideResult<TParams extends Record<any, any>> = Partial<TParams> & {
  /**
   * 重绘。
   */
  repaint(): void;
};

/**
 * 绘制辅助元素。
 */
export interface Guide {
  /**
   * 绘制辅助线。
   */
  line(params: GuideLineParams): GuideResult<GuideLineParams>;

  /**
   * 绘制辅助文本。
   */
  text(params: GuideTextParams): GuideResult<GuideTextParams>;

  /**
   * 绘制辅助点。
   */
  point(params: GuidePointParams): GuideResult<GuidePointParams>;

  /**
   * 绘制辅助标签。
   */
  tag(params: GuideTagParams): GuideResult<GuideTagParams>;

  /**
   * 绘制辅助背景框。
   */
  rect(params: GuideRectParams): GuideResult<GuideRectParams>;

  /**
   * 绘制辅助 HTML。
   */
  html(params: GuideHtmlParams): GuideResult<GuideHtmlParams>;

  /**
   * 绘制辅助圆弧，只适用于极坐标。
   */
  arc(params: GuideArcParams): GuideResult<GuideArcParams>;

  /**
   * 绘制辅助过滤区域。
   */
  regionFilter(
    params: GuideRegionFilterParams,
  ): GuideResult<GuideRegionFilterParams>;

  /**
   * 清空辅助元素。
   */
  clear(): void;
}
