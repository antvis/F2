import type { CircleAttrs, RectAttrs, Point } from '@antv/f2-graphic';
import type * as CSS from 'csstype';

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

interface CircleProps extends IntrinsicElementsProps {
  attrs?: Partial<SupportPx<CircleAttrs>>;
}

interface RectProps extends IntrinsicElementsProps {
  attrs?: Partial<SupportPx<RectAttrs>>;
}

interface Ref {
  current?: any;
}

interface Props {
  children?: any;
  [propName: string]: any;
}

export type ElementType =
  | string
  | ((props: Props, context?: any) => any)
  | (new (props: Props, context?: any) => any);

declare global {
  namespace JSX {
    interface Element {
      key: string;
      ref?: Ref;
      type: ElementType;
      props: Props;
      // children: Element;
      _cache: any;
      [key: string]: any;
    }
    interface ElementClass {
      render(): any;
    }
    interface IntrinsicElements {
      group: any;
      rect: RectProps;
      circle: CircleProps;
      line: any;
      polygon: any;
      polyline: any;
      arc: any;
      sector: any;
      text: any;
      custom: any;
      marker: any;
      image: any;
    }
  }
}

export default JSX;
