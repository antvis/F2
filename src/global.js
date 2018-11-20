const Theme = require('./theme');
const Util = require('./util/common');

const Global = {
  version: '3.3.0',
  trackable: true,
  scales: {},
  widthRatio: {
    column: 1 / 2,
    rose: 0.999999,
    multiplePie: 3 / 4
  },
  lineDash: [ 4, 4 ]
};

Global.setTheme = function(theme) {
  Util.deepMix(this, theme);
};

Global.setTheme(Theme);
module.exports = Global;
