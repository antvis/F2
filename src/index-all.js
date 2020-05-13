/**
 * all
 */
import F2 from './core';


import './geom/';
import './geom/adjust/';

import './coord/polar'; // polar coordinate
import './component/axis/circle'; // the axis for polar coordinate

import './scale/time-cat'; // timeCat scale

import './component/guide'; // guide components

import * as Tooltip from './plugin/tooltip';
import * as Guide from './plugin/guide';
import * as Legend from './plugin/legend';
import * as Animation from './animation/detail';
import * as ScrollBar from './plugin/scroll-bar';
import * as PieLabel from './plugin/pie-label';
import * as intervalLabel from './plugin/interval-label';
import * as Animate from './animation/animate';

F2.Animate = Animate;
// register plugins
F2.Chart.plugins.register([ Tooltip, Legend, Guide, Animation, ScrollBar, PieLabel, intervalLabel ]);

// add interaction
import './interaction';
import Interaction from './interaction/base';

F2.Interaction = Interaction;

export default F2;
