import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const babelPlugin = babel({ babelHelpers: 'bundled' });
const terserPlugin = terser();
const commonjsPlugin = commonjs();
const resolvePlugin = resolve();

export default [
  {
    input: './src/index-all.js',
    output: [
      {
        name: 'F2-all',
        file: 'build/f2-all.js',
        format: 'umd'
      },
      {
        name: 'F2-all',
        file: 'dist/f2-all.min.js',
        format: 'umd',
        plugins: [ terserPlugin ]
      }
    ],
    plugins: [ resolvePlugin, commonjsPlugin, babelPlugin ]
  },
  {
    input: './src/index.js',
    output: [
      {
        name: 'F2-all',
        file: 'build/f2.js',
        format: 'umd'
      },
      {
        name: 'F2-all',
        file: 'dist/f2.min.js',
        format: 'umd',
        plugins: [ terserPlugin ]
      }
    ],
    plugins: [ resolvePlugin, commonjsPlugin, babelPlugin ]
  },
  {
    input: './src/index-simple.js',
    output: [
      {
        name: 'F2-simple',
        file: 'build/f2-simple.js',
        format: 'umd'
      },
      {
        name: 'F2-all',
        file: 'dist/f2-simple.min.js',
        format: 'umd',
        plugins: [ terserPlugin ]
      }
    ],
    plugins: [ resolvePlugin, commonjsPlugin, babelPlugin ]
  }
];
