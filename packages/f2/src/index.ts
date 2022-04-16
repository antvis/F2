import type * as Types from './types';
export { JSX } from './jsx/jsx-namespace';
export { Types };

// import * as attr from './attr';
// import * as util from './util';
import Children from './children';
import Component from './base/component';
import Timeline from './timeline';
import Canvas from './canvas';
import Chart from './chart';

import { jsx as createElement } from './jsx';
import { renderShape } from './base/diff';

import { processUserOpt, processAnimationTypeCfg } from './util/animationCfg';
export { processUserOpt, processAnimationTypeCfg };

export * from './components';
export { jsx, render, Fragment } from './jsx';
export { default as createRef } from './createRef';
export { Children, createElement, Component, Timeline, Canvas, Chart, renderShape };
