
require('./src/geom/');
require('./src/geom/adjust/');
require('./src/plugin/');
const F2 = require('./core');

const { Legend, Guide, Tooltip } = require('./src/plugin/');
F2.Chart.plugins.register([ Legend, Guide, Tooltip ]);

module.exports = F2;
