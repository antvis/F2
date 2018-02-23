/**
 * 仅包含简单的折、柱、饼
 */
const F2 = require('./core');

require('./geom/line'); // 折线图
require('./geom/interval'); // 柱状图

require('./geom/adjust/'); // 数据调整

require('./coord/polar'); // 极坐标系


module.exports = F2;
