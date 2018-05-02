/**
 * 完整版，包含所有的图表类型以及组件
 */
const F2 = require('./core');

require('./geom/');
require('./geom/adjust/');

require('./coord/polar'); // 极坐标系
require('./component/axis/circle'); // 极坐标系下的弧长坐标轴

require('./scale/time-cat'); // timeCat 类型的度量

require('./component/guide'); // 加载 guide 组件

const Tooltip = require('./plugin/tooltip');
const Guide = require('./plugin/guide');
const Legend = require('./plugin/legend');
const Animation = require('./animation/detail'); // 使用精细动画

F2.Animate = require('./animation/animate');
// 注册插件
F2.Chart.plugins.register([ Tooltip, Legend, Guide, Animation ]);

module.exports = F2;
