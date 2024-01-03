import { LineStyleProps, TextStyleProps, MarkerStyleProps } from '@antv/f-engine';
import Coord from '../../coord';
import { DataRecord, DataField, DataValue } from '../../chart/Data';

interface TickLine extends LineStyleProps {
  length?: number; // tick line 的长度
}

interface Text extends TextStyleProps {
  align?: 'left' | 'right' | 'start' | 'center' | 'end' | 'between' | 'auto';
  text?: string;
}

// 仅在 bottom 下新增了 align 支持 `between`
type StyleText<T = any> = T extends 'bottom' | void ? Text : Omit<Text, 'align'>;

type LabelCallback<Type = void> = (
  text: Tick['text'],
  index: number,
  total: number
) => StyleText<Type>;
type GridCallBack = (text: Tick['text'], index: number, total: number) => LineStyleProps;

interface symbolStyleProps extends MarkerStyleProps {
  type?: MarkerStyleProps.symbol;
}
export interface Style<Type = void> {
  grid?: LineStyleProps;
  tickLine?: TickLine;
  line?: LineStyleProps;
  symbol?: symbolStyleProps | symbolStyleProps[];
  labelOffset?: number;
  label?: StyleText<Type>;
}

export interface StyleProps<Type = void> extends Omit<Style, 'label' | 'grid' | 'labelOffset'> {
  width?: number | string;
  height?: number | string;
  label?: StyleText<Type> | LabelCallback<Type>;
  grid?: LineStyleProps | GridCallBack;
  labelOffset?: number | string;
}

interface Point {
  x: number;
  y: number;
}

export interface Tick {
  value: number;
  points: Point[];
  text: string;
  tickValue: string | number;
  labelStyle?: Text;
  gridStyle?: LineStyleProps;
  gridPoints?: Point[];
}

type PolarCord = Pick<Coord, 'center'>;
type RectCord = Pick<Coord, 'left' | 'right' | 'bottom' | 'top'>;

export interface RectProps<Type = void> {
  ticks?: Tick[];
  coord?: RectCord;
  style?: Style<Type>;
  animation?: any;
}

export interface PolarProps {
  ticks?: Tick[];
  coord?: PolarCord;
  style?: Style;
  animation?: any;
  grid?: 'line' | 'arc';
  gridPoints?: Point[][];
}

export class RectOrPolarCoord<T extends boolean> extends Coord {
  isPolar: T;
}

export interface RectAxisProps {
  coord: RectOrPolarCoord<true>;
  position: 'right' | 'left' | 'top' | 'bottom';
  ticks?: Tick[];
  style?: Style;
  animation?: any;
}

export interface PolarAxisProps {
  coord: RectOrPolarCoord<false>;
  dimType: 'x' | 'y';
  ticks?: Tick[];
  style?: Style;
  animation?: any;
}

export interface AxisProps<
  TRecord extends DataRecord = DataRecord,
  TField extends DataField<TRecord> = DataField<TRecord>
> {
  /**
   * 是否显示该坐标轴
   */
  visible?: boolean;
  /**
   * 映射的字段名称
   */
  field: TField;
  /**
   * 坐标轴显示位置
   */
  position?: 'right' | 'left' | 'top' | 'bottom';
  /**
   * 回调函数，用于格式化坐标轴刻度点的文本显示，
   * 会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示。
   */
  formatter?: (value: DataValue<TRecord, TField>) => string | number;
  type?: string;
  tickCount?: number;
  range?: any;
  mask?: string;
  min?: number;
  max?: number;
  nice?: boolean;
  ticks?: Array;
  /**
   * 坐标轴样式定制
   */
  style?: StyleProps;
  // 网格线类型
  grid?: 'arc' | 'line';
}
