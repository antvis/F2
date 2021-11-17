import Coord from '../../coord';
import Chart from '../../chart';

interface Line {
  lineWidth?: number;
  strokeOpacity?: number;
  stroke?: string;
  strokeStyle?: string;
  lineCap?: 'butt' | 'round' | 'square';
  lineJoin?: 'round' | 'bevel' | 'miter';
  lineDash?: number[];
  [key: string]: any;
}

interface TickLine extends Line {
  length?: number; // tick line 的长度
}

interface Text {
  text?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontSize?: number;
  fontFamily?: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;
  fontVariant?: 'normal' | 'small-caps';
  textAlign?: 'left' | 'right' | 'start' | 'center' | 'end';
  align?: 'left' | 'right' | 'start' | 'center' | 'end' | 'between';
  textBaseline?: 'top' | 'middle' | 'bottom';
  fill?: string;
  fillStyle?: string; // 普通文本(fillText)的颜色
  stroke?: string;
  strokeStyle?: string; // 描边文本(strokeText)的颜色
  lineHeight?: number;
  lineWidth?: number; // 用于描边文本
  rotate?: number; // 用于旋转文本
  [key: string]: any;
}

// 仅在 bottom 下新增了 align 支持 `between`
type StyleText<T = any> = T extends 'bottom' ? Text : Omit<Text, 'align'>;

type LabelCallback<Type = void> = (
  text: Tick['text'],
  index: number,
  total: number
) => StyleText<Type>;
type GridCallBack = (text: Tick['text'], index: number, total: number) => Line;

export interface Style<Type = void> {
  grid?: Line;
  tickLine?: TickLine;
  line?: Line;
  labelOffset?: number;
  label?: StyleText<Type>;
}

export interface StyleProps<Type = void> extends Style {
  label?: StyleText<Type> | LabelCallback;
  grid?: Line | GridCallBack;
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
  gridStyle?: Line;
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
}

class RectOrPolarCoord<T extends boolean> extends Coord {
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

export interface AxisProps {
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
  /**
   * note: 作为 `<Chart />` 子元素时将自动注入
   */
  chart?: Chart;
  /**
   * note: 作为 `<Chart />` 子元素时将自动注入
   */
  coord?: Coord;
  /**
   * note: 作为 `<Chart />` 子元素时将自动注入
   */
  zoomRange?: [number, number];
  [key: string]: any; // TODO
}
