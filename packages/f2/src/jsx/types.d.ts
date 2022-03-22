import {
  Ref,
  ElementType,
  Props,
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

declare global {
  namespace JSX {
    interface Element {
      key: string;
      ref?: Ref;
      type: ElementType;
      props: Props;
      // children: Element;
      _cache?: any;
      [key: string]: any;
    }
    interface ElementClass {
      refs: {};
      props: Props;
      render(): Element | null;
    }
    interface IntrinsicElements {
      group: RectProps;
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
}

export default JSX;
