/**
 * 坐标系类型。
 */
export type CoordinateKind = 'rect' | 'polar';

/**
 * 笛卡尔坐标系参数。
 */
export interface CoordinateRectParams {
  /**
   * 坐标系翻转。
   */
  transposed?: boolean;
}

/**
 * 极坐标系参数。
 */
export interface CoordinatePolarParams {
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
   * 半径，数值为 0 - 1 范围。
   */
  radius?: number;
}

/**
 * 坐标系参数。
 */
export type CoordinateParams<
  TKind extends CoordinateKind
> = TKind extends 'rect'
  ? CoordinateRectParams
  : TKind extends 'polar'
  ? CoordinatePolarParams
  : never;
