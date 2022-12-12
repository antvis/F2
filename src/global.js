import Theme from './theme';
import lang from './aria-lang.CN';
import { deepMix } from './util/common';

const Global = {
  version: '3.8.13',
  scales: {},
  widthRatio: {
    column: 1 / 2,
    rose: 0.999999,
    multiplePie: 3 / 4
  },
  lineDash: [ 4, 4 ],
  lang
};

Global.setTheme = function(theme) {
  deepMix(Global, theme);
};

Global.setTheme(Theme);

export { lang };
export default Global;
