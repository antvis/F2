export default {
  cjs: {
    type: 'babel'
  },
  esm: {
    type: 'babel'
  },
  extraBabelPlugins: [
    ['@babel/plugin-transform-react-jsx', {
      "runtime": "automatic"
    }]
  ]
}