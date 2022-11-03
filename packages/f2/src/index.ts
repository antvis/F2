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
  Layout,
  LayoutProps,
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
  Canvas,
  Children,
  Component,
  Timeline,
  Chart,
  Layout,
  LayoutProps,
  computeLayout,
  CanvasRenderer,
};

export * from './components';
