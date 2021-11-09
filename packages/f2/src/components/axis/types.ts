import Coord from '../../coord';

interface Line {
  lineWidth?: number;
  strokeOpacity?: number;
  stroke: string;
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
  fillStyle?: string;  // 普通文本(fillText)的颜色
  stroke?: string;
  strokeStyle?: string; // 描边文本(strokeText)的颜色
  lineHeight?: number;
  lineWidth?: number;  // 用于描边文本
  [key: string]: any;
}

// 仅在 bottom 下新增了 align 支持 `between`
type StyleText<T = any> = T extends 'bottom' ? Text : Omit<Text, 'align'>;

export interface Style<Type = void> {
  grid: Line;
  tickLine: TickLine;
  line: Line;
  labelOffset: number;
  label: StyleText<Type>;
}

interface Point {
  x: number;
  y: number;
}

interface Tick {
  points: Point[];
  text: string;
  tickValue: string | number;
}

type PolarCord = Pick<Coord, 'center'>;
type RectCord = Pick<Coord, 'left' | 'right' | 'bottom' | 'top'>;

export interface RectProps<Type = void> {
  ticks?: Tick[];
  coord?: RectCord;
  animation?: any;
  style?: Style<Type>;
}

export interface PolarProps {
  ticks?: Tick[];
  coord?: PolarCord;
  style?: Style;
  animation?: any;
}

export interface PolarAxisProps {
  coord: Coord;
  dimType: 'x' | 'y';
}

export interface RectAxisProps {
  coord: Coord;
  position: 'right' | 'left' | 'top' | 'bottom';
}