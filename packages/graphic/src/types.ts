export interface Point {
  x: number;
  y: number;
}

interface Box {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface BBox extends Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Element 的 attrs 属性类型（_attrs.attrs)
export interface ElementAttrs {
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillStyle
   */
  fillStyle?: string;
  font?: string;
  globalAlpha?: number;
  lineCap?: 'butt' | 'round' | 'square';
  lineWidth?: number;
  lineJoin?: 'round' | 'bevel' | 'miter';
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit
   */
  miterLimit?: number;
  shadowBlur?: number;
  shadowColor?: string;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeStyle
   */
  strokeStyle?: string;
  textAlign?: 'left' | 'right' | 'start' | 'center' | 'end';
  textBaseline?: 'top' | 'middle' | 'bottom';
  lineDash?: number[];
  /**
   * 仅用于支付宝小程序
   */
  shadow?: string;

  // TODO
  matrix?: number[];
  // eslint-disable-next-line
  clip?: any;

  /* 以下为 alias */
  /**
   * alias strokeStyle
   */
  stroke?: string;
  /**
   * alias fillStyle
   */
  fill?: string;
  /**
   * alias globalAlpha
   */
  opacity?: number;
}

export interface ShapeAttrs extends ElementAttrs {
  fillOpacity?: number;
  strokeOpacity?: number;
}

export interface ArcAttrs extends ShapeAttrs {
  x?: number;
  y?: number;
  r: number;
  startAngle: number;
  endAngle: number;
  anticlockwise?: boolean;
}

export interface CircleAttrs extends ShapeAttrs {
  x?: number;
  y?: number;
  r: number;
}

export interface LineAttrs extends ShapeAttrs {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface MarkerAttrs extends ShapeAttrs {
  x: number;
  y: number;
  radius: number;
  symbol:
    | 'circle'
    | 'square'
    | ((x: number, y: number, r: number, ctx: CanvasRenderingContext2D) => void);
}

export interface RectAttrs extends ShapeAttrs {
  x?: number;
  y?: number;
  width: number;
  height: number;
  radius?: number;
}
export interface PolygonAttrs extends ShapeAttrs {
  points: Point[];
}

export interface PolylineAttrs extends ShapeAttrs {
  points: Point[];
  smooth?: boolean;
}

export interface SectorAttrs extends ShapeAttrs {
  x?: number;
  y?: number;
  startAngle: number;
  endAngle: number;
  r: number;
  r0: number;
  anticlockwise?: boolean;
}

export interface ImageAttrs extends RectAttrs {
  src: string;
  sx?: number;
  sy?: number;
  swidth?: number;
  sheight?: number;
}

export interface TextAttrs extends ShapeAttrs {
  text?: string;
  textArr?: string[];
  lineCount?: number;
  lineHeight?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
   */
  rotate?: number;

  /* 以下属性组合后形成 font 属性 */
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
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
}

export interface CustomAttrs extends ShapeAttrs {
  createPath: (context: CanvasRenderingContext2D) => void;
  calculateBox: () => Box;
}
