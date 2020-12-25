export default {
  // pkgs: [
  //   'jsx',
  //   'component'
  // ],
  cjs: {
    type: 'babel'
  },
  esm: {
    type: 'babel'
  },
  extraBabelPlugins: [
    ['@babel/plugin-transform-react-jsx', {
      runtime: 'automatic',
      importSource: 'f2-jsx'
    }]
  ]
}