const Theme = require('./theme');
const Util = require('./util/common');

/**
 * @class 全局配置项
 */
const Global = {
  // 预先定义的度量
  scales: {
    nice: true
  },
  // 宽度
  widthRatio: { // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.999999,
    multiplePie: 3 / 4,
    dodgeMargin: 1 / 2
  },
  // 动画降频倍数
  animateReduceMultiple: 1,
  // 虚线配置
  lineDash: [ 5, 15 ]
};

Global.setTheme = function(theme) {
  Util.mix(this, theme);
};

Global.setTheme(Theme);
module.exports = Global;
