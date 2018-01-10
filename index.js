
require('./src/geom/');
require('./src/geom/adjust/');
require('./src/plugin/');
const F2 = require('./core');

// 测试
const { Legend, Guide } = require('./src/plugin/');
F2.Chart.plugins.register([ Legend, Guide ]);

module.exports = F2;
