import {
  DataRecord,
  Data,
  DataRecordScale,
  DataField,
  DataFieldScale,
} from './Data';
import { Plugin } from './Plugin';
import { CoordinateParams, CoordinateKind } from './Coordinate';
import { AxisParams } from './Axis';
import { LegendParams, LegendItem } from './Legend';
import { TooltipParams } from './Tooltip';
import { Guide } from './Guide';
import { AnimateChartParams } from './Animate';
import { Geometry, GeometryParams } from './Geometry';
import { Point } from './Point';
import { InteractionKind, InteractionParams } from './Interaction';
import { PieLabelParams } from './PieLabel';
import { ScrollBarParams } from './ScrollBar';
import { GestureParams } from './Gesture';
import { IntervalLabelParams } from './IntervalLabel';
import { LegendController } from './LegendController';

/**
 * 图表参数。
 *
 * `id`、`el`、`context` 这三个属性必须设置一个。
 */
export interface ChartParams {
  /**
   * 指定对应 canvas 的 id。
   */
  id?: string;

  /**
   * 如果未指定 id 时可以直接传入 canvas 对象。
   */
  el?: HTMLElement;

  /**
   * 若 id、el 都未指定可以直接传入 canvas 的上下文。
   */
  context?: CanvasRenderingContext2D;

  /**
   * 渲染引擎，默认: canvas
   */
  renderer?: string,

  /**
   * 图表的宽度，如果 `<canvas>` 元素上设置了宽度，可以不传入。
   */
  width?: number;

  /**
   * 图表的高度，如果 <canvas> 元素上设置了高度，可以不传入。
   */
  height?: number;

  /**
   * 图表绘图区域和画布边框的间距，用于显示坐标轴文本、图例，默认为 auto，即自动计算。
   */
  padding?: number | 'auto' | Array<number | 'auto'>;

  /**
   * 图表画布区域四边的预留边距，即我们会在 padding 的基础上，为四边再加上 appendPadding 的数值，默认为 15。
   */
  appendPadding?: number | number[];

  /**
   * 屏幕画布的像素比，默认为 1。
   */
  pixelRatio?: number;

  /**
   * 为 chart 实例注册插件。
   */
  plugins?: Plugin | Plugin[];

  /**
   * 是否关闭 chart 的动画。
   */
  animate?: boolean;

  /**
   * 用于多 Y 轴的情况下，统一 Y 轴的数值范围，默认为 false。
   */
  syncY?: boolean;
}

export interface ChartInnerProps<TRecord extends DataRecord> {
  /**
   * 对应 canvas 的 id。
   */
  id: string;

  /**
   * 当前的图表绘图区域和画布边框的间距。
   */
  padding: Exclude<ChartParams['padding'], undefined>;

  /**
   * 原始数据。
   */
  data: Data<TRecord>;

  /**
   * 图表宽度。
   */
  width: Exclude<ChartParams['width'], undefined>;

  /**
   * 图表高度。
   */
  height: Exclude<ChartParams['height'], undefined>;

  /**
   * 图表的屏幕像素比。
   */
  pixelRatio: Exclude<ChartParams['pixelRatio'], undefined>;

  /**
   * 对应 canvas 的 dom 对象。
   */
  el: Exclude<ChartParams['el'], undefined>;

  /**
   * 对应的 canvas 对象（G.Canvas）。
   *
   * @todo 细化类型
   */
  canvas: any;

  /**
   * chart render 之后可获取，返回所有的 geoms 对象。
   *
   * @todo 细化类型
   */
  geoms: any;

  /**
   * 坐标系对象。
   */
  coord:
    | {
        /**
         * 是否是直角坐标系，直角坐标系下为 true。
         */
        isRect: true;
        /**
         * 判断是否是极坐标，极坐标下为 true。
         */
        isPolar: false;
        /**
         * 坐标系的起始点，F2 图表的坐标系原点位于左下角。
         */
        start: Point;
        /**
         * 坐标系右上角的画布坐标。
         */
        end: Point;
        /**
         * 是否发生转置，true 表示发生了转置。
         */
        transposed: boolean;
      }
    | {
        /**
         * 是否是直角坐标系，直角坐标系下为 true。
         */
        isRect: false;
        /**
         * 判断是否是极坐标，极坐标下为 true。
         */
        isPolar: true;
        /**
         * 极坐标的起始角度，弧度制。
         */
        startAngle: number;
        /**
         * 极坐标的结束角度，弧度制。
         */
        endAngle: number;
        /**
         * 绘制环图时，设置内部空心半径，相对值，0 至 1 范围。
         */
        innerRadius: number;
        /**
         * 设置圆的半径，相对值，0 至 1 范围。
         */
        radius: number;
        /**
         * 是否发生转置，true 表示发生了转置。
         */
        transposed: boolean;
        /**
         * 极坐标的圆心所在的画布坐标。
         */
        center: Point;
        /**
         * 极坐标的半径值。
         */
        circleRadius: number;
      };

  /**
   * 图示控制器。
   */
  legendController: LegendController;

  /**
   * @todo 补全所有的内部属性后去除该项
   */
  [key: string]: any;
}

/**
 * 图表插件。
 */
export interface ChartPlugins {
  /**
   * 注册插件。
   */
  register(plugin: Plugin | Plugin[]): void;

  /**
   * 注销插件。
   */
  unregister(plugin: Plugin | Plugin[]): void;

  /**
   * 清除插件。
   */
  clear(): void;

  /**
   * 获取注册的所有插件。
   */
  getAll(): Plugin[];
}

/**
 * 创建图表实例。
 */
export class Chart<TRecord extends DataRecord = DataRecord> {
  /**
   * 插件管理。
   */
  static plugins: ChartPlugins;

  constructor(params: ChartParams);

  /**
   * 获取 chart 内部的属性。
   *
   * @param prop 属性名
   */
  get<TProp extends keyof ChartInnerProps<TRecord>>(
    prop: TProp,
  ): ChartInnerProps<TRecord>[TProp];

  /**
   * 装载数据。
   *
   * @param data 数据
   * @param recordScale 各个字段的度量配置
   */
  source(data: Data<TRecord>, recordScale?: DataRecordScale<TRecord>): void;

  /**
   * 设置或更新多个字段的度量配置。
   *
   * @param recordScale 各个字段的度量配置
   */
  scale(recordScale?: DataRecordScale<TRecord>): void;

  /**
   * 设置或更新单个字段的度量配置。
   *
   * @param field 要操作的字段名
   * @param fieldScale 要应用的度量配置
   */
  scale<TField extends DataField<TRecord>>(
    field: TField,
    fieldScale?: DataFieldScale<TRecord, TField>,
  ): void;

  /**
   * 选择并配置笛卡尔坐标系。
   *
   * @param params 笛卡尔坐标系的配置参数
   */
  coord(params: CoordinateParams<'rect'>): this;

  /**
   * 选择并配置坐标系。
   *
   * @param kind 选定的坐标系
   * @param params 选定坐标系的配置参数
   */
  coord<TKind extends CoordinateKind>(
    kind: TKind,
    params?: CoordinateParams<TKind>,
  ): this;

  /**
   * 关闭或启用坐标轴。
   *
   * @param enable 是否启用
   */
  axis(enable: boolean): this;

  /**
   * 关闭或启用特定字段的坐标轴。
   *
   * @param field 要操作的字段名
   * @param enable 是否启用
   */
  axis(field: DataField<TRecord>, enable: boolean): this;

  /**
   * 配置特定字段的坐标轴。
   *
   * @param field 要操作的字段名
   * @param params 配置参数
   */
  axis<TField extends DataField<TRecord>>(
    field: TField,
    params: AxisParams<TRecord, TField>,
  ): this;

  /**
   * 关闭或启用图例。
   *
   * @param enable 是否启用
   */
  legend(enable: boolean): this;

  /**
   * 关闭或启用特定字段的图例。
   *
   * @param field 要操作的字段名
   * @param enable 是否启用
   */
  legend(field: DataField<TRecord>, enable: boolean): this;

  /**
   * 配置图例。
   *
   * @param params 配置参数
   */
  legend(params: LegendParams): this;

  /**
   * 配置特定字段的图例。
   *
   * @param field 要操作的字段名
   * @param params 配置参数
   */
  legend(field: DataField<TRecord>, params: LegendParams): this;

  /**
   * 过滤数据，如果存在对应的图例，则过滤掉的字段置灰。
   *
   * @param field 要过滤的数据字段
   * @param callback 回调函数，用于过滤满足条件的数据
   */
  filter<TField extends DataField<TRecord>>(
    field: TField,
    callback: (value: TRecord[TField]) => boolean,
  ): void;

  /**
   * 关闭或启用 Tooltip。
   *
   * @param enable 是否启用
   */
  tooltip(enable: boolean): this;

  /**
   * 配置 Tooltip。
   *
   * @param params 配置参数
   */
  tooltip(params: TooltipParams<TRecord>): this;

  /**
   * 配置辅助元素。
   */
  guide(): Guide;

  /**
   * 关闭或启用图表动画。
   *
   * @param enable 是否启用
   */
  animate(enable: boolean): this;

  /**
   * 配置图表动画。
   *
   * @param params 配置参数
   */
  animate(params: AnimateChartParams): this;

  /**
   * 创建 point（点）的几何标记对象并返回该对象。
   *
   * @param params 配置参数
   */
  point(params?: GeometryParams): Geometry<'point', TRecord>;

  /**
   * 创建 line（线）的几何标记对象并返回该对象。
   *
   * @param params 配置参数
   */
  line(params?: GeometryParams): Geometry<'line', TRecord>;

  /**
   * 创建 area（区域）的几何标记对象并返回该对象。
   *
   * @param params 配置参数
   */
  area(params?: GeometryParams): Geometry<'area', TRecord>;

  /**
   * 创建 path（路径）的几何标记对象并返回该对象。
   *
   * @param params 配置参数
   */
  path(params?: GeometryParams): Geometry<'path', TRecord>;

  /**
   * 创建 interval（柱）的几何标记对象并返回该对象。
   *
   * @param params 配置参数
   */
  interval(params?: GeometryParams): Geometry<'interval', TRecord>;

  /**
   * 创建 polygon（多边形）的几何标记对象并返回该对象并返回该对象。
   *
   * @param params 配置参数
   */
  polygon(params?: GeometryParams): Geometry<'polygon', TRecord>;

  /**
   * 创建 schema 的几何标记对象并返回该对象。
   *
   * @param params 配置参数
   */
  schema(params?: GeometryParams): Geometry<'schema', TRecord>;

  /**
   * 渲染图表，在最后调用。
   */
  render(): this;

  /**
   * 清除图表内容。
   */
  clear(): this;

  /**
   * 重新绘制图表。当修改了 guide、geometry 的配置项时可以重新绘制图表。
   */
  repaint(): this;

  /**
   * 改变数据，同时刷新图表。
   *
   * @param data 新数据
   */
  changeData(data: Data<TRecord>): this;

  /**
   * 改变图表宽高。示例：
   *
   * ```javascript
   * chart.changeSize(300) // 只改变宽度
   * chart.changeSize(300, 500) // 宽度高度同时改变
   * chart.changeSize(, 300) // 只改变高度
   * ```
   *
   * @param width 宽度
   * @param height 高度
   */
  changeSize(width?: number, height?: number): this;

  /**
   * 销毁图表，`<canvas>` dom 元素不会销毁。
   */
  destroy(): void;

  /**
   * 获取原始数据记录对应在画布上的坐标。
   *
   * @param record 原始数据记录
   */
  getPosition(record: TRecord): Point;

  /**
   * 根据画布上的坐标获取对应的原始数据。
   *
   * @param point 坐标位置
   */
  getRecord(point: Point): TRecord;

  /**
   * 根据画布上的坐标获取附近的数据集。
   *
   * @param point 坐标位置
   */
  getSnapRecords(
    point: Point,
  ): Array<{
    /**
     * 该 shape 对应的原始数据。
     */
    _origin: TRecord;
    /**
     * 组成该 shape 的关键顶点，归一化数据。
     */
    points: Point[];
    /**
     * Y 轴对应的原始数据。
     */
    _originY: number;
    /**
     * 该 shape 的 x 轴画布坐标。
     */
    x: number;
    /**
     * 该 shape 的 y 轴画布坐标。
     */
    y: number;
    /**
     * shape 的索引。
     */
    index: number;
  }>;

  /**
   * 获取图例的 items，用于图例相关的操作。
   */
  getLegendItems(): Partial<Record<DataField<TRecord>, LegendItem[]>>;

  /**
   * 获取图表 X 轴对应的度量。
   *
   * @todo 细化返回类型
   */
  getXScale(): any;

  /**
   * 获取图表 Y 轴对应的度量，有可能会有多个 Y 轴。
   *
   * @todo 细化返回类型
   */
  getYScales(): any[];

  /**
   * 在指定坐标显示 Tooltip。
   *
   * @param point 坐标位置
   */
  showTooltip(point: Point): this;

  /**
   * 隐藏当前 Tooltip。
   */
  hideTooltip(): this;

  /**
   * 配置内置的交互行为。
   *
   * @param kind 交互行为类型
   * @param params 配置参数
   */
  interaction<TKind extends InteractionKind>(
    kind: TKind,
    params?: InteractionParams<TKind, TRecord>,
  ): void;

  /**
   * 配置自定义的交互行为。
   *
   * @param kind 交互行为类型
   * @param params 配置参数
   */
  interaction<TParams>(kind: string, params?: TParams): void;

  /**
   * 配置饼图文本。
   *
   * @param params 配置参数
   */
  pieLabel(params: PieLabelParams<TRecord>): void;

  /**
   * 配置进度条。
   *
   * @param params 配置参数
   */
  scrollBar(params: ScrollBarParams): void;

  /**
   * 配置手势。
   *
   * @param params 配置参数
   */
  pluginGesture(params: GestureParams): void;

  /**
   * @todo 文档未说明参数，漏斗图示例中有出现
   */
  intervalLabel(params: IntervalLabelParams<TRecord>): void;

  /**
   * 是否为横屏展示
   *
   * @param {Boolean} landscape 是否为横屏
   */
  landscape(landscape: boolean): void;
}
