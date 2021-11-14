import { mix } from '@antv/util';
// const Theme = {
//   colors: [
//     '#1890FF',
//     '#2FC25B',
//     '#FACC14',
//     '#223273',
//     '#8543E0',
//     '#13C2C2',
//     '#3436C7',
//     '#F04864'
//   ],
// };

class ThemeAvailable {
  theme = {};

  setTheme(theme) {
    this.theme = this.theme || {};
    mix(this.theme, theme);
  }
}

export default ThemeAvailable;
