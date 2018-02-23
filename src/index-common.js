/**
 * 包含常用的图表类型、图表组件（tooltip、legend 以及 guide）
 */
const F2 = require('./core'); // 核心包

require('./geom/area'); // 面积图
require('./geom/line'); // 折线图
require('./geom/interval'); // 柱状图
require('./geom/point'); // 点图

require('./geom/adjust/'); // 数据调整

require('./coord/polar'); // 极坐标系
require('./component/axis/circle'); // 极坐标系下的弧长坐标轴

require('./scale/time-cat'); // timeCat 类型的度量

require('./component/guide'); // 加载 guide 组件

F2.Plugin = {
  Tooltip: require('./plugin/tooltip'),
  Guide: require('./plugin/guide'),
  Legend: require('./plugin/legend')
};
// 注册插件
const { Tooltip, Legend, Guide } = F2.Plugin;
F2.Chart.plugins.register([ Tooltip, Legend, Guide ]);

module.exports = F2;
