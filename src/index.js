
require('./geom/');
require('./geom/adjust/');
require('./plugin/');
const F2 = require('./core');

const { Legend, Guide, Tooltip } = require('./plugin/');
F2.Chart.plugins.register([ Legend, Guide, Tooltip ]);

module.exports = F2;
