const Theme = require('./theme');
const Util = require('./util/common');

/**
 * @class 全局配置项
 */
const Global = {
  version: '3.2.0-beta.8',
  trackable: true,
  // 预先定义的度量
  scales: {},
  // 宽度
  widthRatio: { // 宽度所占的分类的比例
    column: 1 / 2, // 一般的柱状图占比 1/2
    rose: 0.999999,
    multiplePie: 3 / 4
  },
  // 虚线配置
  lineDash: [ 4, 4 ]
};

Global.setTheme = function(theme) {
  Util.mix(this, theme);
};

Global.setTheme(Theme);
module.exports = Global;
