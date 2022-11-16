import {
  JSX,
  jsx,
  createElement,
  Canvas,
  CanvasRenderer,
  Timeline,
  Fragment,
  createRef,
  Component,
  Children,
  computeLayout,
  Theme,
} from '@antv/f-engine';

import Chart from './chart';
import theme from './theme';
Theme.setTheme(theme);

export {
  JSX,
  jsx,
  createElement,
  createRef,
  Fragment,
  Theme,
  Canvas,
  Children,
  Component,
  Timeline,
  Chart,
  computeLayout,
  CanvasRenderer,
};

export * from './components';
