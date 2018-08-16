/**
 * Default, without interactins
 */
const F2 = require('./core');

require('./geom/');
require('./geom/adjust/');

require('./coord/polar'); // polar coordinate
require('./component/axis/circle'); // the axis for polar coordinate

require('./scale/time-cat'); // timeCat scale

require('./component/guide/arc');
require('./component/guide/html');
require('./component/guide/line');
require('./component/guide/rect');
require('./component/guide/text');
require('./component/guide/tag');

const Tooltip = require('./plugin/tooltip');
const Guide = require('./plugin/guide');
const Legend = require('./plugin/legend');
const Animation = require('./animation/detail');

F2.Animate = require('./animation/animate');
// register plugins
F2.Chart.plugins.register([ Tooltip, Legend, Guide, Animation ]);

module.exports = F2;
