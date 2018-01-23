const webpack = require('webpack');
const {
  resolve
} = require('path');

module.exports = {
  entry: {
    f2: './src/index.js'
    // core: './src/core.js'
  },
  output: {
    filename: '[name].js',
    library: 'F2',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'build/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
