import { LineAttrs, TextAttrs } from '../../types';
import Coord from '../../coord';
import { ChartChildProps } from '../../chart';

interface TickLine extends LineAttrs {
  length?: number; // tick line 的长度
}

interface Text extends TextAttrs {
  align?: 'left' | 'right' | 'start' | 'center' | 'end' | 'between';
}

// 仅在 bottom 下新增了 align 支持 `between`
type StyleText<T = any> = T extends 'bottom' | void ? Text : Omit<Text, 'align'>;

type LabelCallback<Type = void> = (
  text: Tick['text'],
  index: number,
  total: number
) => StyleText<Type>;
type GridCallBack = (text: Tick['text'], index: number, total: number) => LineAttrs;

export interface Style<Type = void> {
  grid?: LineAttrs;
  tickLine?: TickLine;
  line?: LineAttrs;
  labelOffset?: number;
  label?: StyleText<Type>;
}

export interface StyleProps<Type = void> extends Omit<Style, 'label' | 'grid' | 'labelOffset'> {
  label?: StyleText<Type> | LabelCallback<Type>;
  grid?: LineAttrs | GridCallBack;
  labelOffset?: number | string;
}

interface Point {
  x: number;
  y: number;
}

export interface Tick {
  points: Point[];
  text: string;
  tickValue: string | number;
  labelStyle?: Text;
  gridStyle?: LineAttrs;
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

export interface AxisProps extends ChartChildProps {
  /**
   * 映射的字段名称
   */
  field: string;
  position?: 'right' | 'left' | 'top' | 'bottom';
  /**
   * 是否显示该坐标轴
   */
  visible?: boolean;
  /**
   * 坐标轴样式定制
   */
  style?: StyleProps;
  // 网格线类型
  grid?: 'arc' | 'line';
  [key: string]: any; // TODO
}

export namespace AxisTypes {
  export type Props = AxisProps;
}
