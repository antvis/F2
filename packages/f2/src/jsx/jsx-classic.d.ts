/**
 * ref: https://github.com/microsoft/TypeScript/pull/22207
 */

import GlobalJSX from './types';

export namespace jsx {
  export namespace JSX {
    export type Element = GlobalJSX.Element;
    export type ElementClass = GlobalJSX.ElementClass;
    export type IntrinsicElements = GlobalJSX.IntrinsicElements;
  }
}

export function jsx(): jsx.JSX.Element;
