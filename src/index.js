/**
 * Default, without interactins
 */
import F2 from './core';

import './geom/';
import './geom/adjust/';

import './coord/polar'; // polar coordinate
import './component/axis/circle'; // the axis for polar coordinate

import './scale/time-cat'; // timeCat scale

import './component/guide/arc';
import './component/guide/html';
import './component/guide/line';
import './component/guide/rect';
import './component/guide/text';
import './component/guide/tag';
import './component/guide/point';

import Marker from './component/marker';
import * as Tooltip from './plugin/tooltip';
import * as Guide from './plugin/guide';
import * as Legend from './plugin/legend';
import * as Animation from './animation/detail';
import * as Animate from './animation/animate';

F2.Component = {
  Marker
};


F2.Animate = Animate;
// register plugins
F2.Chart.plugins.register([ Tooltip, Legend, Guide, Animation ]);

// 默认添加交互
import './interaction/new/index';

export default F2;
