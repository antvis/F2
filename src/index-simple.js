/**
 * Only support simple bar chart, line chart and pie chart
 */
const F2 = require('./core');

require('./geom/line');
require('./geom/interval');

require('./geom/adjust/');

require('./coord/polar');

module.exports = F2;
