import { Except } from 'type-fest';
import { DataRecord, DataField, DataValue } from './Data';

/**
 * 度量类型。
 */
export type ScaleType = 'identity' | 'linear' | 'cat' | 'timeCat';

/**
 * 通用度量属性。
 *
 * @see https://f2.antv.vision/zh/docs/api/chart/scale#%E9%80%9A%E7%94%A8%E5%B1%9E%E6%80%A7
 */
export interface ScaleCommonProps<
  TScaleType extends ScaleType,
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> {
  /**
   * 度量类型。
   */
  type: TScaleType;

  /**
   * 回调函数，用于格式化坐标轴刻度点的文本显示，
   * 会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示。
   */
  formatter?: (value: DataValue<TRecord, TField>) => string | number;

  /**
   * 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。
   */
  range?: [number, number];

  /**
   * 该数据字段的显示别名，一般用于将字段的英文名称转换成中文名。
   */
  alias?: string;

  /**
   * 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值。
   */
  tickCount?: number;

  /**
   * 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。
   */
  ticks?: string[];

  /**
   * 当图表的数据源已经过排序，可以通过在列定义中设置 `sortable: false` 来提升性能。
   */
  sortable?: boolean;
}

/**
 * identity 度量属性。
 */
export interface ScaleIdentityProps<
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> extends ScaleCommonProps<'identity', TRecord, TField> {}

/**
 * linear 度量属性。
 *
 * @see https://f2.antv.vision/zh/docs/api/chart/scale#linear
 */
export interface ScaleLinearProps<
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> extends ScaleCommonProps<'linear', TRecord, TField> {
  /**
   * 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。
   * 例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]。
   */
  nice?: boolean;

  /**
   * 定义数值范围的最小值。
   */
  min?: number;

  /**
   * 定义数值范围的最大值。
   */
  max?: number;

  /**
   * 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，
   * tickCount 和 tickInterval 不可以同时声明。
   */
  tickInterval?: number;
}

/**
 * cat 度量属性。
 *
 * @see https://f2.antv.vision/zh/docs/api/chart/scale#cat
 */
export interface ScaleCatProps<
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> extends ScaleCommonProps<'cat', TRecord, TField> {
  /**
   * 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系。
   */
  values?: string[];

  /**
   * 默认值为 false, 在计算 ticks 的时候是否允许取整以满足刻度之间的均匀分布，
   * 取整后可能会和用户设置的 tickCount 不符合。
   */
  isRounding?: boolean;
}

/**
 * timeCat 度量属性。
 *
 * @see https://f2.antv.vision/zh/docs/api/chart/scale#timecat
 */
export interface ScaleTimeCatProps<
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> extends ScaleCommonProps<'timeCat', TRecord, TField> {
  /**
   * 数据的格式化格式，默认：`YYYY-MM-DD`。
   */
  mask?: string;

  /**
   * 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系。
   */
  values?: string[];
}

/**
 * 度量属性。
 *
 * @see https://f2.antv.vision/zh/docs/api/chart/scale
 */
export type ScaleProps<
  TRecord extends DataRecord,
  TField extends DataField<TRecord>
> =
  | ScaleIdentityProps<TRecord, TField>
  | ScaleLinearProps<TRecord, TField>
  // type 可不填，默认为 linear
  | Except<ScaleLinearProps<TRecord, TField>, 'type'>
  | ScaleCatProps<TRecord, TField>
  | ScaleTimeCatProps<TRecord, TField>;
