import { CanvasLineProps, CanvasTextProps } from './CanvasProps';
import { DataRecord, DataField, DataValue } from './Data';

/**
 * 坐标轴线的配置信息。
 */
export interface AxisLineParams extends CanvasLineProps {
  /**
   * 如需调整显示层级，可设置 `top: true` 展示在最上层图形或者 `top: false` 展示在最下层图形。
   */
  top?: boolean;
}

/**
 * 坐标轴网格线的配置信息。
 */
export interface AxisGridParams extends CanvasLineProps {
  /**
   * 如需调整显示层级，可设置 `top: true` 展示在最上层图形或者 `top: false` 展示在最下层图形。
   */
  top?: boolean;

  /**
   * 在极坐标下，可以通过配置 `type: 'arc'` 将其绘制为圆弧。
   */
  type?: 'arc';
}

/**
 * 坐标轴刻度线的配置信息。
 */
export interface AxisTickLineParams extends CanvasLineProps {
  /**
   * 如需调整显示层级，可设置 `top: true` 展示在最上层图形或者 `top: false` 展示在最下层图形。
   */
  top?: boolean;
}

/**
 * 坐标轴文本的配置信息。
 */
export interface AxisLabelParams extends CanvasTextProps {
  /**
   * 如需调整显示层级，可设置 `top: true` 展示在最上层图形或者 `top: false` 展示在最下层图形。
   */
  top?: boolean;

  /**
   * 文本。
   */
  text?: string;
}

/**
 * 坐标轴显示位置的类型。
 */
export type AxisPositionKind = 'bottom' | 'left' | 'right';

/**
 * 坐标轴参数。
 */
export interface AxisParams<
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> {
  /**
   * 坐标轴线的配置信息。如果值为 null，则不显示。
   */
  line?: AxisLineParams | null;

  /**
   * 坐标轴文本距离轴线的距离。
   */
  labelOffset?: number;

  /**
   * 坐标轴网格线的配置信息。如果值为 null，则不显示。
   */
  grid?:
    | AxisGridParams
    | ((
        value: DataValue<TRecord, TField>,
        index: number,
        total: number,
      ) => AxisGridParams)
    | null;

  /**
   * 坐标轴刻度线的配置信息。如果值为 null，则不显示。
   */
  tickLine?: AxisTickLineParams | null;

  /**
   * 坐标轴文本的配置信息。如果值为 null，则不显示。
   */
  label?:
    | AxisLabelParams
    | ((
        value: DataValue<TRecord, TField>,
        index: number,
        total: number,
      ) => AxisLabelParams)
    | null;

  /**
   * 坐标轴显示位置。
   */
  position?: AxisPositionKind;
}
