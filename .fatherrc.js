export default {
  pkgs: ['graphic', 'f2', 'react', 'vue', 'my', 'wx'],
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
