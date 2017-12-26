
require('./src/geom/');
require('./src/geom/adjust/');
require('./src/plugin/');
const F2 = require('./core');

// 测试
const Guide = require('./src/plugin/guide.js');
F2.Chart.plugins.register(Guide);

module.exports = F2;
