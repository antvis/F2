import { AxisTypes } from './components/axis/types';
import type { Types } from '@antv/f2-graphic';

type PX_FIELD_NAME =
  'lineWidth'
| 'lineDash'
| 'x'
| 'y'
| 'r'
| 'r0'
| 'x1'
| 'y1'
| 'x2'
| 'y2'
| 'radius'
| 'width'
| 'height'
| 'fontSize'
| 'sx'
| 'sy'
| 'swidth'
| 'sheight'
| 'points';

type pxstr = `${number}px`;
export type px = number | pxstr | string;

export type Point = Types.Point;
export interface PxPoint {
  x: px;
  y: px;
}

export interface DataRecord {
  origin: any;
  [k: string]: any;
}

export * from '@antv/scale'
export type { AxisTypes }

type SupportPx<T> = {
  [k in keyof T]:
    k extends PX_FIELD_NAME ?
      T[k] extends number ? number | pxstr :
      T[k] extends number[] ? number[] | pxstr[] :
      T[k] extends Types.Point[] ? PxPoint[] : T[k]
    :T[k];
}

export interface Style {
  width?: px;
  height?: px;
  minWidth?: px;
  minHeight?: px;
  maxWidth?: px;
  maxHeight?: px;
  left?: px;
  right?: px;
  top?: px;
  bottom?: px;
  margin?: px | px[];
  marginTop?: px;
  marginRight?: px;
  marginBottom?: px;
  marginLeft?: px;
  padding?: px | px[];
  paddingTop?: px;
  paddingRight?: px;
  paddingBottom?: px;
  paddingLeft?: px;
  flexDirection?: 'column' | 'row';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  alignSelf?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  display?: 'flex';
  flex?: number;
  flexWrap?: 'wrap' | 'nowrap';
  position?: 'relative' | 'absolute';
  backgroundColor?: string;
}

interface IntrinsicElementsProps {
  style?: Style;
  [k: string]: any;
}

export interface Ref {
  current?: any;
}

export interface Props {
  children?: any;
  [propName: string]: any;
}

export type ElementType =
  | string
  | ((props: Props, context?: any) => any)
  | (new (props: Props, context?: any) => any);

export interface ShapeAttrs extends Partial<SupportPx<Types.ShapeAttrs>>{
  [k: string]: any;
}

export interface GroupProps extends IntrinsicElementsProps {
  attrs?: RectAttrs;
}

export type CircleAttrs = Partial<SupportPx<Types.CircleAttrs>>;
export interface CircleProps extends IntrinsicElementsProps {
  attrs?: CircleAttrs;
}

export type RectAttrs = Partial<SupportPx<Types.RectAttrs>>;
export interface RectProps extends IntrinsicElementsProps {
  attrs?: RectAttrs;
}

export type LineAttrs = Partial<SupportPx<Types.LineAttrs>>;
export interface LineProps extends IntrinsicElementsProps {
  attrs?: LineAttrs;
}

export type PolygonAttrs = Partial<SupportPx<Types.PolygonAttrs>>;
export interface PolygonProps extends IntrinsicElementsProps {
  attrs?: PolygonAttrs;
}

export type PolylineAttrs = Partial<SupportPx<Types.PolylineAttrs>>;
export interface PolylineProps extends IntrinsicElementsProps {
  attrs?: PolylineAttrs;
}

export type ArcAttrs = Partial<SupportPx<Types.ArcAttrs>>
export interface ArcProps extends IntrinsicElementsProps {
  attrs?: ArcAttrs;
}

export type SectorAttrs = Partial<SupportPx<Types.SectorAttrs>>;
export interface SectorProps extends IntrinsicElementsProps {
  attrs?: SectorAttrs;
}

export type TextAttrs = Partial<SupportPx<Types.TextAttrs>>;
export interface TextProps extends IntrinsicElementsProps {
  attrs?: TextAttrs;
}

export type CustomAttrs = Partial<SupportPx<Types.CustomAttrs>>;
export interface CustomProps extends IntrinsicElementsProps {
  attrs?: CustomAttrs
}

export type MarkerAttrs = Partial<SupportPx<Types.MarkerAttrs>>;
export interface MarkerProps extends IntrinsicElementsProps {
  attrs?: MarkerAttrs;
}

export type ImageAttrs = Partial<SupportPx<Types.ImageAttrs>>;
export interface ImageProps extends IntrinsicElementsProps {
  attrs?: ImageAttrs;
}
