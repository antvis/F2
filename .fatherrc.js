export default {
  cjs: {
    type: 'babel',
  },
  esm: {
    type: 'babel',
  },
  runtimeHelpers: true,
  lessInBabelMode: true,
  cssModules: true,
  pkgs: ['f2', 'f2-react', 'f2-wordcloud', 'f2-algorithm'],
};
