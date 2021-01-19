declare global {
  namespace JSX {
    interface Element {
      [propName: string]: any;
    }
    interface ElementClass {
      render(): any;
    }
    interface IntrinsicElements {
      view: any;
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
