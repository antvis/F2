/**
 * all
 */
import { Global, Chart, Shape, G, Util, Helper, track } from './core';

import './geom/';
import './geom/adjust/';

import './coord/polar'; // polar coordinate
import './component/axis/circle'; // the axis for polar coordinate

import './component/guide'; // guide components

import * as Tooltip from './plugin/tooltip';
import * as Guide from './plugin/guide';
import * as Legend from './plugin/legend';
import * as Animation from './animation/detail';
import * as ScrollBar from './plugin/scroll-bar';
import * as PieLabel from './plugin/pie-label';
import * as intervalLabel from './plugin/interval-label';
import Animate from './animation/animate';
import './interaction';
import Interaction from './interaction/base';

// register plugins
Chart.plugins.register([ Tooltip, Legend, Guide, Animation, ScrollBar, PieLabel, intervalLabel ]);

export {
  Global,
  Chart,
  Shape,
  G,
  Util,
  Helper,
  track,
  Interaction,
  Animate
};

export default {
  Global,
  Chart,
  Shape,
  G,
  Util,
  Helper,
  track,
  Interaction,
  Animate
};
