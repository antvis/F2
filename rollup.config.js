import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
// import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index-all.js',
  output: {
    name: 'F2',
    file: 'rtest/bundle.js',
    format: 'umd',
    plugins: [ terser() ]
  },
  plugins: [ resolve(), commonjs() ]
};
