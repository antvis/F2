export * from './types';
// import * as attr from './attr';
// import * as util from './util';
import Children from './children';
import Component from './base/component';
import Timeline from './timeline';
import Canvas from './canvas';
import Chart from './chart';

export { jsx, render } from './jsx';

export * from './components';
export { Children, Component, Timeline, Canvas, Chart };

// F2 namespace
const F2 = {
  Canvas,
};
export default F2;
