export default {
  pkgs: ['graphic', 'f2', 'react', 'vue', 'my', 'wx', 'f2-wordcloud'],
  cjs: {
    type: 'babel',
  },
  esm: {
    type: 'babel',
  },
  runtimeHelpers: true,
  lessInBabelMode: true,
  cssModules: true,
};
