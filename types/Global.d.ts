import { Except, PartialDeep } from 'type-fest';
import { CanvasProps } from './CanvasProps';
import { AxisParams } from './Axis';

/**
 * 全局配置项。
 */
export const Global: {
  /**
   * 图表绘图区域和画布边框的间距，用于显示坐标轴文本、图例。
   */
  padding: number | number[];

  /**
   *  图表画布区域四边的预留边距，即我们会在 padding 的基础上，为四边再加上 appendPadding 的数值，默认为 15。
   */
  appendPadding: number | number[];

  /**
   * 各个坐标轴的默认样式配置。
   */
  axis: CanvasProps;

  /**
   * 默认图表色系。
   */
  colors: string[];

  /**
   * 默认主色值。
   */
  defaultColor: string;

  /**
   * 默认字体。
   */
  fontFamily: string;

  /**
   * 各个 Guide 组件的默认样式配置。
   */
  guide: CanvasProps;

  /**
   * 各种类型的图例的默认样式配置。
   */
  legend: CanvasProps;

  /**
   * 默认虚线配置。
   */
  lineDash: number[];

  /**
   * 默认的像素比。
   */
  pixelRatio: number;

  /**
   * 默认各种类型 shape 的样式配置。
   */
  shape: CanvasProps;

  /**
   * 默认的大小范围。
   */
  sizes: [number, number];

  /**
   * 默认 Tooltip 的样式配置。
   */
  tooltip: CanvasProps;

  /**
   * 当前 F2 的版本号。
   */
  version: string;

  /**
   * 不同 shape 的宽度比配置。
   */
  widthRatio: Record<string, number>;

  /**
   * 坐标轴默认配置。
   *
   * @todo 细化类型
   */
  _defaultAxis: AxisParams<any, any>;

  /**
   * 自定义主题。
   */
  setTheme(
    theme: PartialDeep<Except<typeof Global, 'setTheme' | 'version'>>,
  ): void;
};
