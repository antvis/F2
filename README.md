<p align="center" style="margin: 0"><img src="https://gw.alipayobjects.com/zos/rmsportal/gpWSuJZhFtQHNwrNgYIB.png"></p>

[![](https://img.shields.io/travis/antvis/f2.svg)](https://travis-ci.org/antvis/f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/f2.svg)](https://www.npmjs.com/package/@antv/f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.org/package/@antv/f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/f2.svg)](http://isitmaintained.com/project/antvis/f2 "Percentage of issues still open")

<p align="left">
  <a href="https://twitter.com/intent/tweet?text=F2,%20an%20elegant,%20interactive%20and%20flexible%20charting%20library%20for%20mobile.&url=https://antv.alipay.com/zh-cn/f2/3.x/index.html&hashtags=javascript,mobile,charts,dataviz,visualizations,F2"><img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"> </a>
</p>

[中文 README](./README.zh-CN.md)

F2 is **born for mobile**, developed for developers as well as designers. It is Html5 Canvas-based, and is also compatible with Node.js, Weex and React Native. Based on [the grammar of graphics](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html), F2 provides all the chart types you'll need. Our mobile design guidelines enable better user experience in mobile visualzation projects.

<p align="center"><img src="https://gw.alipayobjects.com/zos/rmsportal/gWNgjKFInawkemLKzUjO.png"></p>

**Special thanks to [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson), the author of [*The Grammar Of Graphics*](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html), whose book served as the foundation for F2 and G2.**

## Installation

```bash
$ npm install @antv/f2
```

## Features

- ✔︎ **Elegant user experience**: Designed for mobile experience
- ✔︎ **Flexible**: Customizable shapes and animations, flexible charting components, infinite creativity
- ✔︎ **High performance**: F2 pursues the ultimate performance for drawing, lots of optimization have been done for mobile devices
- ✔︎ **Light-weighed**: F2 maintains a compact code size while supporting more than 45 kinds of charts

## Other runtime support

- F2 on **Node.js** ：https://antv.alipay.com/zh-cn/f2/3.x/tutorial/node-env.html
- F2 on [WebChart miniprogram](https://mp.weixin.qq.com/cgi-bin/wx): https://github.com/antvis/wx-f2
- F2 on [Ant miniprogram](https://mini.open.alipay.com/channel/miniIndex.htm): https://github.com/antvis/my-f2

## Website && Documentations

* [Website](https://antv.alipay.com/zh-cn/f2/3.x/index.html)

* English documents: https://antv.gitbook.io/f2/

* 中文文档: https://antv.alipay.com/zh-cn/f2/3.x/api/index.html

## Demos

- [Chart Demos](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)
- [Gallery](https://codepen.io/collection/AOpMaW/)

**Or see demos in mobile:**

<img src="https://gw.alipayobjects.com/zos/rmsportal/nzlxIzUBlBRVGMyaZigG.png" style="width:150px;">


## Getting Started

<img src="https://gw.alipayobjects.com/zos/rmsportal/vNBNIGvCiIwqLwaYjWUy.png" width="375">

```html
<canvas id="c1"></canvas>
```

```js
import F2 from '@antv/f2';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const chart = new F2.Chart({
  id: 'c1',
  width: 375,
  height: 265,
  pixelRatio: window.devicePixelRatio
});

chart.source(data);
chart.interval().position('year*sales');
chart.render();
```


## Development

```bash
$ npm install

# run test case
$ npm run test-live

# build watching file changes and run demos
$ npm run dev

# run demos
$ npm run demos

# run pack
$ npm run bundler
```

## How to Contribute

Please let us know how can we help. Do check out [issues](https://github.com/antvis/f2/issues) for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](https://github.com/antvis/f2/blob/master/CONTRIBUTING.md).

## License

[MIT license](./LICENSE).
