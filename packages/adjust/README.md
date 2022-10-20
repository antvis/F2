# @antv/adjust

> Data `adjust` for @antv/G2.

[![](https://img.shields.io/travis/antvis/adjust.svg)](https://travis-ci.org/antvis/adjust)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/adjust.svg)](https://www.npmjs.com/package/@antv/adjust)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/adjust.svg)](https://npmjs.org/package/@antv/adjust)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/adjust.svg)](http://isitmaintained.com/project/antvis/adjust "Percentage of issues still open")



## Installing

```bash
npm install @antv/adjust
```


## Usage


```js
import { getAdjust } from '@antv/adjust';

// contains Dodge, Jitter, Stack, Symmetric
const Dodge = getAdjust('dodge');

const d = new Dodge();

// adjust the data
const r = d.process();
```


## License

MIT
