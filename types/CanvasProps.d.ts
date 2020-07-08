/**
 * 通用绘图属性。
 *
 * @see https://f2.antv.vision/zh/docs/api/canvas#%E9%80%9A%E7%94%A8%E5%B1%9E%E6%80%A7
 */
export interface CanvasCommonProps {
  fill?: string;
  fillStyle?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeStyle?: string;
  strokeOpacity?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  globalOpacity?: number;
  opacity?: number;
  globalCompositeOperation?:
    | 'source-over'
    | 'source-in'
    | 'source-out'
    | 'source-atop'
    | 'destination-over'
    | 'destination-in'
    | 'destination-out'
    | 'destination-atop'
    | 'lighter'
    | 'copy'
    | 'xor'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
  [key: string]: any;
}

/**
 * 线条绘图属性。
 *
 * @see https://f2.antv.vision/zh/docs/api/canvas#%E7%BA%BF%E6%9D%A1%E6%A0%B7%E5%BC%8F
 */
export interface CanvasLineProps extends CanvasCommonProps {
  lineCap?: 'butt' | 'round' | 'square';
  lineJoin?: 'round' | 'bevel' | 'miter';
  lineWidth?: number;
  miterLimit?: number;
  lineDash?: number[] | null;
}

/**
 * 文本绘图属性。
 *
 * @see https://f2.antv.vision/zh/docs/api/canvas#%E6%96%87%E6%9C%AC%E5%B1%9E%E6%80%A7
 */
export interface CanvasTextProps extends CanvasCommonProps {
  textAlign?: 'left' | 'right' | 'start' | 'center' | 'end';
  textBaseline?: 'top' | 'middle' | 'bottom';
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
  lineHeight?: number;
  rotate?: number;
}

/**
 * 点绘图属性。
 */
export interface CanvasPointProps extends CanvasCommonProps {
  r?: number;
}

/**
 * 背景绘图属性。
 */
export interface CanvasBackgroundProps extends CanvasCommonProps {
  padding?: number | number[];
  radius?: number | number[];
}

/**
 * 绘图属性。
 */
export type CanvasProps<
  TExtra extends Record<any, any> = Record<any, any>
> = CanvasLineProps &
  CanvasTextProps &
  CanvasPointProps &
  CanvasBackgroundProps &
  TExtra;
