import type {
  Point,
  CircleAttrs as CircleGraphicAttrs,
  RectAttrs as RectGraphicAttrs,
  LineAttrs as LineGraphicAttrs,
  PolygonAttrs as PolygonGraphicAttrs,
  PolylineAttrs as PolylineGraphicAttrs,
  ArcAttrs as ArcGraphicAttrs,
  SectorAttrs as SectorGraphicAttrs,
  TextAttrs as TextGraphicAttrs,
  CustomAttrs as CustomGraphicAttrs,
  MarkerAttrs as MarkerGraphicAttrs,
  ImageAttrs as ImageGraphicAttrs,
} from '@antv/f2-graphic';

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

interface PxPoint {
  x: number | pxstr;
  y: number | pxstr;
}

type SupportPx<T> = {
  [k in keyof T]:
    k extends PX_FIELD_NAME ?
      T[k] extends number ? number | pxstr : 
      T[k] extends number[] ? number[] | pxstr[] :
      T[k] extends Point[] ? PxPoint[] : T[k]
    :T[k];
}

interface IntrinsicElementsProps {
  style?: any;
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


export type CircleAttrs = Partial<SupportPx<CircleGraphicAttrs>>;
export interface CircleProps extends IntrinsicElementsProps {
  attrs?: CircleAttrs;
}

export type RectAttrs = Partial<SupportPx<RectGraphicAttrs>>;
export interface RectProps extends IntrinsicElementsProps {
  attrs?: RectAttrs;
}

export type LineAttrs = Partial<SupportPx<LineGraphicAttrs>>;
export interface LineProps extends IntrinsicElementsProps {
  attrs?: LineAttrs;
}

export type PolygonAttrs = Partial<SupportPx<PolygonGraphicAttrs>>;
export interface PolygonProps extends IntrinsicElementsProps {
  attrs?: PolygonAttrs;
}

export type PolylineAttrs = Partial<SupportPx<PolylineGraphicAttrs>>;
export interface PolylineProps extends IntrinsicElementsProps {
  attrs?: PolylineAttrs;
}

export type ArcAttrs = Partial<SupportPx<ArcGraphicAttrs>>
export interface ArcProps extends IntrinsicElementsProps {
  attrs?: ArcAttrs;
}

export type SectorAttrs = Partial<SupportPx<SectorGraphicAttrs>>;
export interface SectorProps extends IntrinsicElementsProps {
  attrs?: SectorAttrs;
}

export type TextAttrs = Partial<SupportPx<TextGraphicAttrs>>;
export interface TextProps extends IntrinsicElementsProps {
  attrs?: TextAttrs;
}

export type CustomAttrs = Partial<SupportPx<CustomGraphicAttrs>>;
export interface CustomProps extends IntrinsicElementsProps {
  attrs?: CustomAttrs
}

export type MarkerAttrs = Partial<SupportPx<MarkerGraphicAttrs>>;
export interface MarkerProps extends IntrinsicElementsProps {
  attrs?: MarkerAttrs;
}

export type ImageAttrs = Partial<SupportPx<ImageGraphicAttrs>>;
export interface ImageProps extends IntrinsicElementsProps {
  attrs?: ImageAttrs;
}
