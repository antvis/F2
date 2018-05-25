# F2: 基于 HTML5 Canvas，开箱即用的移动端可视化解决方案

[![](https://img.shields.io/travis/antvis/f2.svg)](https://travis-ci.org/antvis/f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![npm package](https://img.shields.io/npm/v/@antv/f2.svg)](https://www.npmjs.com/package/@antv/f2)
[![Package Quality](http://npm.packagequality.com/badge/@antv/f2.png)](http://packagequality.com/#?package=@antv/f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.org/package/@antv/f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/f2.svg)](http://isitmaintained.com/project/antvis/f2 "Percentage of issues still open")

F2（Fast & Flexible），是专为移动端定制的一套开箱即用的可视化解决方案，基于图形语法理论，具有精简、高性能、易扩展的特性，适用于对性能、大小、扩展性要求严苛的场景。

<img src="https://gw.alipayobjects.com/zos/rmsportal/wVwdXNiAQuoutCZYWnQh.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/CCJgoEHPhkRhYeNhSbHM.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/KumfgQonwUIWydfdgjhc.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/lXRXNwExVazcmpIJgbvR.gif" width="200">

**在此衷心感谢[《The Grammar of Graphics》](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html)的作者 [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson)，为 F2 的图形语法提供了理论基础！**

## 安装

```bash
$ npm install @antv/f2
```

## 特性

- ✔︎ 体验优雅：基于 AntV 完整的移动端可视化设计体系
- ✔︎ 扩展灵活：可自定义 Shape、动画，图表组件灵活可配，满足无限创意
- ✔︎ 绘制迅速：性能极致追求，针对移动设备做了大量的优化
- ✔︎ 体积小巧：在支持丰富（45+）图表的基础上保持代码量的小巧

## 多端支持

- Node：https://antv.alipay.com/zh-cn/f2/3.x/tutorial/node-env.html
- 微信小程序：https://github.com/antvis/wx-f2
- 支付宝小程序：https://github.com/antvis/my-f2

## 文档

- [使用教程](https://antv.alipay.com/zh-cn/f2/3.x/tutorial/index.html)
- [API](https://antv.alipay.com/zh-cn/f2/3.x/api/index.html)
- [Gallery](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)

## 快速开始

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

更多示例：[demos](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)。

**手机扫码观看 demos**

<img src="https://gw.alipayobjects.com/zos/rmsportal/nzlxIzUBlBRVGMyaZigG.png" style="width:150px;">  


## 本地开发

```bash
$ npm install

# 跑测试用例
$ npm run test-live

# 监听文件变化构建，并打开 demo 页面
$ npm run dev

# 打开 demo
$ npm run demos

# 按需打包
$ npm run bundler
```

## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/f2/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/f2/blob/master/CONTRIBUTING.md)。

## License

[MIT license](./LICENSE).
