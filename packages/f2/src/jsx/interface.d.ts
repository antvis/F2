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
      rect: any;
      circle: any;
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
