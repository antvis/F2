# F2: a canvas library which providing 2d draw for mobile

[![](https://img.shields.io/travis/antvis/f2.svg)](https://travis-ci.org/antvis/f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![npm package](https://img.shields.io/npm/v/@antv/f2.svg)](https://www.npmjs.com/package/@antv/f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.org/package/@antv/f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/f2.svg)](http://isitmaintained.com/project/antvis/f2 "Percentage of issues still open")

F2 是面向移动端的一套基于可视化图形语法的图表库，具有精简、高性能、易扩展的特性。适用于对性能、大小、扩展性要求很高的场景。

**在此衷心感谢[《The Grammar of Graphics》](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html)的作者 [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson)，为 F2 的图形语法提供了理论基础！**


[了解更多 F2 详情](https://antv.alipay.com/zh-cn/f2/3.x/index.html)。

<img src="https://gw.alipayobjects.com/zos/rmsportal/IJJiZkUEeaiKyKpBBTtc.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/uINOOArAUsUEcsgyEriT.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/CkjCQDnrzapdmbSUINgD.png" width="180"><img src="https://gw.alipayobjects.com/zos/rmsportal/HrckvhDiDRSkzBAQTZCj.png" width="200">


## 安装

```bash
$ npm install @antv/f2
```

## 特性

- ✔︎ 极小：压缩后不到 100k 的代码，提供了几十种图表。
- ✔︎ 高性能：性能极致追求，针对移动设备做了大量的优化。
- ✔︎ 强大扩展能力：任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。

## 文档

- [使用教程](https://antv.alipay.com/zh-cn/f2/3.x/tutorial/index.html)
- [API 文档](https://antv.alipay.com/zh-cn/f2/3.x/api/index.html)
- [图表示例](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)

### 快速开始

<img src="https://gw.alipayobjects.com/zos/rmsportal/SdOcnMWWxXxsQsiwcytd.png" width="492">

```html
<canvas id="c1"></canvas>
```

```js
import F2 from '@antv/f2';

const data = [ 
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const chart = new F2.Chart({
  id: 'c1',
  width: 500,
  height: 300  
});

chart.source(data);
chart.interval().position('genre*sold').color('genre');
chart.render();
```

[更多示例](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)。

## 本地开发

```bash
$ npm install

# 跑测试用例
$ npm run test-live

# 监听文件变化构建，并打开 demo 页面
$ npm run dev

# 打开 demo
$ npm run demos
```

## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/f2/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/f2/blob/master/CONTRIBUTING.md)。
