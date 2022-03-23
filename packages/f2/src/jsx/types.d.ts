import { JSX as JSXNamespace } from './jsx-namespace';

// 全局
declare global {
  namespace JSX {
    export type Element = JSXNamespace.Element;
    export type ElementClass = JSXNamespace.ElementClass;
    export type IntrinsicElements = JSXNamespace.IntrinsicElements;
  }
}

export default JSX;
