const webpack = require('webpack');
const resolve = require('path').resolve;
const pkg = require('./package.json');

module.exports = {
  entry: {
    f2: './src/index.js',
    'f2-simple': './src/index-simple.js',
    'f2-common': './src/index-common.js'
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
      },
      {
        test: /core\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: '____F2_VERSION____',
            replace: pkg.version
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
