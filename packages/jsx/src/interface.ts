interface Ref {
  current?: any;
}

interface Props {
  children?: any;
  [propName: string]: any;
}

declare global {
  namespace JSX {
    interface Element {
      key?: string,
      ref?: Ref,
      type: string | Function,
      props: Props,
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
    }
  }
}

export default JSX;
