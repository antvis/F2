import Theme from './theme';
import { deepMix } from './util/common';

const Global = {
  version: '3.7.7',
  scales: {},
  widthRatio: {
    column: 1 / 2,
    rose: 0.999999,
    multiplePie: 3 / 4
  },
  lineDash: [ 4, 4 ]
};

Global.setTheme = function(theme) {
  deepMix(this, theme);
};

Global.setTheme(Theme);

export default Global;
