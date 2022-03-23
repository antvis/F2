import {
  Ref,
  ElementType,
  Props,
  GroupProps,
  RectProps,
  CircleProps,
  LineProps,
  PolygonProps,
  PolylineProps,
  ArcProps,
  SectorProps,
  TextProps,
  CustomProps,
  MarkerProps,
  ImageProps,
} from '../types';

export namespace JSX {
  export interface Element {
    key: string;
    ref?: Ref;
    type: ElementType;
    props: Props;
    [key: string]: any;
  }

  export interface ElementClass {
    refs: {};
    props: Props;
    render(): Element | null;
  }

  export interface IntrinsicElements {
    group: GroupProps;
    rect: RectProps;
    circle: CircleProps;
    line: LineProps;
    polygon: PolygonProps;
    polyline: PolylineProps;
    arc: ArcProps;
    sector: SectorProps;
    text: TextProps;
    custom: CustomProps;
    marker: MarkerProps;
    image: ImageProps;
  }
}
