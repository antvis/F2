import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

const DIST_PATH = 'umd';
const plugins = [
  resolve(),
  babel({
    babelrc: false,
    presets: [[ '@babel/preset-env', { modules: false, loose: true }]],
    plugins: [
      [ '@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  }),
  commonjs()
];

export default [{
  input: 'src/index.js',
  output: {
    name: 'F2',
    file: `${DIST_PATH}/f2.js`,
    paths: DIST_PATH,
    format: 'umd',
    sourcemap: true
  },
  plugins
}, {
  input: 'src/index-all.js',
  output: {
    name: 'F2',
    file: `${DIST_PATH}/f2-all.js`,
    format: 'umd',
    sourcemap: true
  },
  plugins
}, {
  input: 'src/index-simple.js',
  output: {
    name: 'F2',
    file: `${DIST_PATH}/f2-simple.js`,
    format: 'umd',
    sourcemap: true
  },
  plugins
},
// 压缩文件
{
  input: 'src/index.js',
  output: {
    name: 'F2',
    file: `${DIST_PATH}/f2.min.js`,
    paths: DIST_PATH,
    format: 'umd',
    sourcemap: false
  },
  plugins: [
    ...plugins,
    uglify()
  ]
}, {
  input: 'src/index-all.js',
  output: {
    name: 'F2',
    file: `${DIST_PATH}/f2-all.min.js`,
    format: 'umd',
    sourcemap: false
  },
  plugins: [
    ...plugins,
    uglify()
  ]
}, {
  input: 'src/index-simple.js',
  output: {
    name: 'F2',
    file: `${DIST_PATH}/f2-simple.min.js`,
    format: 'umd',
    sourcemap: false
  },
  plugins: [
    ...plugins,
    uglify()
  ]
}];
