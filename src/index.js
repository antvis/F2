/**
 * 完整版，包含所有的图表类型以及组件
 */
require('./geom/');
require('./geom/adjust/');

require('./coord/polar'); // 极坐标系
require('./component/axis/circle'); // 极坐标系下的弧长坐标轴

require('./scale/time-cat'); // timeCat 类型的度量

require('./component/guide'); // 加载 guide 组件

const F2 = require('./core');
F2.Plugin = require('./plugin');
// 注册插件
// const { Tooltip, Legend, Guide } = require('./plugin');
// F2.Chart.plugins.register([ Tooltip, Legend, Guide ]);

module.exports = F2;
