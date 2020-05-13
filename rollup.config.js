// import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';

import commonjs from '@rollup/plugin-commonjs';
const path = require('path');

export default {
  input: './src/index-all.js',
  output: {
    name: 'F2',
    file: 'rtest/bundle.js',
    format: 'umd'
  },
  plugins: [ resolve(), commonjs(), alias({
    entries: {
      '@util': path.resolve(__dirname, 'src/util/common.js')
    }
  })
  ]
};
