import { DataRecord, DataField } from './Data';
import { AnimateElementParams } from './Animate';
import { CanvasProps } from './CanvasProps';

/**
 * 几何标记对象的类型。
 */
export type GeometryKind =
  | 'point'
  | 'path'
  | 'line'
  | 'area'
  | 'interval'
  | 'polygon'
  | 'schema';

/**
 * 几何标记对象的参数。
 */
export interface GeometryParams {
  /**
   * 是否生成多个点来绘制图形，true 时会生成多个点。
   *
   * line、path 默认为 false，其他 geom 类型均为 true。
   */
  generatePoints?: boolean;

  /**
   * 是否对数据按照 x 轴对应字段进行排序，true 时会进行排序。
   *
   * 默认 area 和 line 类型会进行排序（即值为 true），其他类型均为 false。
   *
   * 因此在绘制 area 或者 line 时，如果您的数据已经经过排序，可以将该属性设置为 false，以提高性能。
   */
  sortable?: boolean;

  /**
   * 用于设置图形的 Y 轴基线是否从 0 开始，默认为 true，以 0 为基线。
   */
  startOnZero?: boolean;

  /**
   * 用于设置是否将空数据连接起来（用于 line，area 以及 path 类型），默认为 false。
   */
  connectNulls?: boolean;
}

/**
 * 几何标记对象绘制的形状类型。
 */
export type GeometryShapeKind<
  TGeometryKind extends GeometryKind
> = TGeometryKind extends 'point'
  ? 'circle' | 'hollowCircle' | 'rect'
  : TGeometryKind extends 'line'
  ? 'line' | 'smooth' | 'dash'
  : TGeometryKind extends 'area'
  ? 'area' | 'smooth'
  : TGeometryKind extends 'interval'
  ? 'rect' | 'pyramid' | 'funnel'
  : TGeometryKind extends 'polygon'
  ? 'polygon'
  : TGeometryKind extends 'schema'
  ? 'candle'
  : never;

/**
 * 几何标记对象的数据调整类型。
 */
export type GeometryAdjustKind =
  // 堆叠
  | 'stack'
  // 分组
  | 'dodge'
  // 对称
  | 'symmetric';

/**
 * 几何标记对象的数据调整参数。
 */
export interface GeometryAdjustParams {
  /**
   * 调整类型。
   */
  type: GeometryAdjustKind;

  /**
   * 数值范围为 0 至 1，用于调整分组中各个柱子的间距。
   */
  marginRatio?: number;
}

/**
 * 几何标记对象。
 */
export interface Geometry<
  TGeometryKind extends GeometryKind,
  TRecord extends DataRecord
> {
  /**
   * 将数据值映射到图形的位置上的方法。
   *
   * 建议使用数组形式获取良好的类型定义。
   */
  position(dependsOn: string | DataField<TRecord>[]): this;

  /**
   * 将数据值映射到图形的颜色上的方法。
   *
   * @todo 完善注释
   * @todo 使用 LiteralUnion 完善参数 color 的类型支持自动提示内置颜色
   */
  color(color: string): this;

  /**
   * 将数据值映射到图形的颜色上的方法。
   *
   * @todo 完善注释
   * @todo 使用 LiteralUnion 完善参数 color 的类型支持自动提示内置颜色
   */
  color<TField extends DataField<TRecord>>(
    field: TField,
    color?: string | string[] | ((value: TRecord[TField]) => string | void),
  ): this;

  /**
   * 将数据值映射到图形的颜色上的方法。
   *
   * @todo 完善注释
   * @todo 使用 LiteralUnion 完善参数 color 的类型支持自动提示内置颜色
   */
  color<TFields extends [DataField<TRecord>, DataField<TRecord>]>(
    field: TFields,
    color?: string | string[] | ((...values: TFields) => string | void),
  ): this;

  /**
   * 将数据值映射到图形的颜色上的方法。
   *
   * @todo 完善注释
   * @todo 使用 LiteralUnion 完善参数 color 的类型支持自动提示内置颜色
   */
  color<TField extends DataField<TRecord>>(
    field: TField[],
    color?: string | string[] | ((...values: any[]) => string | void),
  ): this;

  /**
   * 将数据值映射到图形的颜色上的方法。
   *
   * @todo 完善注释
   * @todo 使用 LiteralUnion 完善参数 color 的类型支持自动提示内置颜色
   */
  color(
    field: string,
    colors?: string | string[] | ((...values: any[]) => string | void),
  ): this;

  /**
   * 将数据值映射到内置的图形的形状上的方法。
   */
  shape(kind: GeometryShapeKind<TGeometryKind>): this;

  /**
   * 将数据值映射到自定义的图形的形状上的方法。
   */
  shape(kind: string): this;

  /**
   * 将数据值映射到内置的图形的形状上的方法。
   */
  shape<TField extends DataField<TRecord>>(
    field: TField,
    kind?:
      | GeometryShapeKind<TGeometryKind>
      | GeometryShapeKind<TGeometryKind>[]
      | ((value: TRecord[TField]) => GeometryShapeKind<TGeometryKind> | void),
  ): this;

  /**
   * 将数据值映射到自定义的图形的形状上的方法。
   */
  shape<TField extends DataField<TRecord>>(
    field: TField,
    kind?: string | string[] | ((value: TRecord[TField]) => string | void),
  ): this;

  /**
   * 将数据值映射到图形的大小上的方法。
   */
  size(value: number): this;

  /**
   * 将数据值映射到图形的大小上的方法。
   */
  size<TField extends DataField<TRecord>>(
    field: TField,
    limit?: [number, number] | ((value: TRecord[TField]) => number),
  ): this;

  /**
   * 声明几何标记对象的数据调整方式，可用于绘制层叠图、分组图等。
   */
  adjust(kind: GeometryAdjustKind): this;

  /**
   * 声明几何标记对象的数据调整方式，可用于绘制层叠图、分组图等。
   */
  adjust(params: GeometryAdjustParams | GeometryAdjustParams[]): this;

  /**
   * 用于配置几何标记显示的图形属性。
   */
  style(style: CanvasProps): this;

  /**
   * 用于配置几何标记显示的图形属性。
   */
  style<TField extends DataField<TRecord>>(
    field: TField,
    style: {
      [K in keyof CanvasProps]?:
        | CanvasProps[K]
        | ((value: TRecord[TField]) => CanvasProps[K]);
    },
  ): this;

  /**
   * 用于配置具体的动画。
   */
  animate(enable: boolean): this;

  /**
   * 用于配置具体的动画。
   */
  animate(params: AnimateElementParams): this;
}
