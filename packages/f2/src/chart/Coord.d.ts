import { Except } from 'type-fest';
export type CoordType = 'rect' | 'polar';

export interface CoordCommonProps<TCoordType extends CoordType> {
  /**
   * 度量类型。
   */
  type: TCoordType;
}

export interface CoordRectProps extends CoordCommonProps<'rect'> {
  /**
   * 坐标系翻转。
   */
  transposed?: boolean;
}

export interface CoordPolarProps extends CoordCommonProps<'polar'> {
  /**
   * 坐标系翻转。
   */
  transposed?: boolean;
  /**
   * 起始弧度。
   */
  startAngle?: number;

  /**
   * 结束弧度。
   */
  endAngle?: number;

  /**
   * 内环半径，数值为 0 - 1 范围。
   */
  innerRadius?: number;

  /**
   * @deprecated 请使用 innerRadius 代替
   */
  inner?: number;

  /**
   * 半径，数值为 0 - 1 范围。
   */
  radius?: number;
}

/**
 * 坐标系参数。
 */
export type CoordProps =
  | CoordRectProps
  | CoordPolarProps
  // type 可不填，默认为 Rect
  | Except<CoordRectProps, 'type'>;
