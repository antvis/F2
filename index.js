
require('./src/geom/');
require('./src/geom/adjust/');
// require('./src/guide/');
const Guide = require('./src/plugin/guide-plugin.js');
const F2 = require('./core');
F2.Chart.plugins.register(Guide);

module.exports = F2;
