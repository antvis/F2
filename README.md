![](https://user-images.githubusercontent.com/6628666/44565549-4ab5d480-a79b-11e8-8d75-11420845efc0.png)

[![](https://img.shields.io/travis/antvis/f2.svg)](https://travis-ci.org/antvis/f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/f2.svg)](https://www.npmjs.com/package/@antv/f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.org/package/@antv/f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/f2.svg)](http://isitmaintained.com/project/antvis/f2 "Percentage of issues still open")
<p align="left">
  <a href="https://twitter.com/intent/tweet?text=Introducing%20F2,%20an%20elegant,%20interactive%20and%20flexible%20charting%20library%20for%20mobile.&url=https://medium.com/@SimaZwx/https-medium-com-simazwx-introducing-f2-c44fb4e74c2d&hashtags=javascript,mobile,charts,dataviz,visualization,F2"><img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"> </a>
</p>

[中文 README](./README.zh-CN.md)

F2 is **born for mobile**, developed for developers as well as designers. It is Html5 Canvas-based, and is also compatible with Node.js, Weex and React Native. Based on [the grammar of graphics](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html), F2 provides all the chart types you'll need. Our mobile design guidelines enable better user experience in mobile visualzation projects.

<p align="center"><a href="https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html"><img src="https://user-images.githubusercontent.com/6628666/44565498-f4e12c80-a79a-11e8-98fc-73ee58547dc9.png" /></a></p>

> Special thanks to [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson), the author of [*The Grammar Of Graphics*](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html), whose book served as the foundation for F2 and G2.

## Installation

```bash
$ npm install @antv/f2
```

## Features

### Born for mobile
- **Design for mobile**: make data more alive and chart interactions more natural.
<p align="left"><img src="https://user-images.githubusercontent.com/6628666/44565525-21954400-a79b-11e8-8d69-cd95fa6b9a99.gif" width="600"></p>
<p align="left"><img src="https://user-images.githubusercontent.com/6628666/44565524-21954400-a79b-11e8-9aea-9e38d458e37b.gif" width="600" ></p>

- **Performance**: small package size(version without interaction is 44k after gzip) with great rendering performance.

- **Compatibility**: multi-end, Multi-runtime support. Besides H5 env, F2 can also run in [Node.js](https://antv.gitbook.io/f2/platform), [Weex rendering](https://github.com/weex-plugins/weex-chart) and [React Native](https://github.com/chenshuai2144/f2-demo), also [支付宝小程序](https://github.com/antvis/my-f2) and [微信小程序](https://github.com/antvis/wx-f2).

<p align="center"><img src="https://gw.alipayobjects.com/zos/rmsportal/cPUduuYgROeJwRJSRuFK.png"></p>

### All the chart types you want
With the power of grammar of graphics, F2 supports data-driven [50+ chart types](https://antv.alipay.com/zh-cn/f2/3.x/api/index.html)(the amount can be even more, which is depended on you) including classical charts such as line, column/bar chart, pie chart, scatter plot, gauges, etc. Additionally, F2 also provides feature-riched chart components, such as Tooltip, Legend and Guide.

### Flexible and Interactive
We also provide developers with flexible extension mechanisms, including shape, animation, and interactive customization capabilities, as well as flexible styling to meet a variety of personalized charting requirements.

<img src="https://user-images.githubusercontent.com/6628666/44565579-6c16c080-a79b-11e8-9494-86f3ad477341.gif" width="200"><img src="https://user-images.githubusercontent.com/6628666/44565581-6c16c080-a79b-11e8-8210-f4e797480e87.gif" width="200"><img src="https://user-images.githubusercontent.com/6628666/44565580-6c16c080-a79b-11e8-956d-4d15455468a3.gif" width="200"><img src="https://user-images.githubusercontent.com/6628666/44565583-6caf5700-a79b-11e8-8e9e-a1fa12ddcbf1.gif" width="200">

## Links

* [Website](https://antv.alipay.com/zh-cn/f2/3.x/index.html)
* English documents: https://antv.gitbook.io/f2/
* Chart demos: https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html
* 中文文档: https://antv.alipay.com/zh-cn/f2/3.x/api/index.html

## Other libraries base on F2
* [ant-design-mobile-chart](https://github.com/ant-design/ant-design-mobile-chart): Ant Design Mobile Chart based on F2. (React).
* [BizGoblin](https://github.com/alibaba/BizGoblin)：Data visualization library based F2 and React.
* [VChart](https://doc.vux.li/zh-CN/components/v-chart.html): Mobile Chart Components based on vux and F2. (Vue).
* [weex-chart](https://github.com/weex-plugins/weex-chart): Chart components based on Weex and F2.

## Demos

[Chart Demos](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)

**Or just scan the below qrcode to see demos in mobile:**

<img src="https://gw.alipayobjects.com/zos/rmsportal/nzlxIzUBlBRVGMyaZigG.png" style="width:150px;">


## Getting Started

<img src="https://gw.alipayobjects.com/zos/rmsportal/NhtfmoKOInnHYrdWTfqh.png" width="375">

```html
<canvas id="mountNode"></canvas>
```

```js
import F2 from '@antv/f2';

const data = [
  { year: '1951', sales: 38 },
  { year: '1952', sales: 52 },
  { year: '1956', sales: 61 },
  { year: '1957', sales: 145 },
  { year: '1958', sales: 48 },
  { year: '1959', sales: 38 },
  { year: '1960', sales: 38 },
  { year: '1962', sales: 38 },
];
const chart = new F2.Chart({
  id: 'mountNode',
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

## Experience Improvement Program Description

Since version 3.1.12 (released on 2018-06-20), we add `F2.track(true)` method for our user experience improvement program. But now the program has finish, so we remove the method from F2 since version 3.3.4. We are very sorry if it has caused trouble for you.


## License

[MIT license](./LICENSE).
