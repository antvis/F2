![](https://user-images.githubusercontent.com/6628666/44565744-476f1880-a79c-11e8-802b-2477493162c7.png)

[![](https://img.shields.io/travis/antvis/f2.svg)](https://travis-ci.org/antvis/f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)
[![npm package](https://img.shields.io/npm/v/@antv/f2.svg)](https://www.npmjs.com/package/@antv/f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.org/package/@antv/f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/f2.svg)](http://isitmaintained.com/project/antvis/f2 "Percentage of issues still open")

F2，一个专注于移动，开箱即用的可视化解决方案，完美支持 H5 环境同时兼容多种环境（node, 小程序，weex）。完备的图形语法理论，满足你的各种可视化需求。专业的移动设计指引为你带来最佳的移动端图表体验。

<p align="left"><img src="https://user-images.githubusercontent.com/6628666/44565820-c2d0ca00-a79c-11e8-93d8-6608d3e112ef.png" width="600" /></p>

> 在此衷心感谢[《The Grammar of Graphics》](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html)的作者 [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson)，为 F2 的图形语法提供了理论基础！

## 安装

```bash
$ npm install @antv/f2
```

## 特性

### 专注移动，体验优雅

- **轻量化呈现，自然反馈**：在设计上我们以人为本，追求自然简单易懂，有吸引力的表达效果，让用户在碎片化的时间里更快更高效得获取图表信息。同时在可视化的操作我们追求内容和操作有机融合，符合人的自然行为反应，让交互操作更自然。
<p align="left"><img src="https://user-images.githubusercontent.com/6628666/44565525-21954400-a79b-11e8-8d69-cd95fa6b9a99.gif" width="600"></p>
<p align="left"><img src="https://user-images.githubusercontent.com/6628666/44566001-b436e280-a79d-11e8-869d-cbbffb0a3a30.gif" width="600" ></p>

- **轻巧流畅**：F2 一直致力于追求极致的性能，针对移动设备做了大量的优化，在支持丰富（50+）图表的基础上同时保持代码量的小巧（不带交互版本 gzip 压缩后 44k，带所有交互版本 56k），同时提供模块化的设计以支持动态加载，提供更优的大小。

- **多端异构**：在完美支持 H5 环境的同时，同时兼容 [Node.js](https://antv.alipay.com/zh-cn/f2/3.x/tutorial/node-env.html)，[支付宝小程序](https://github.com/antvis/my-f2)、[微信小程序](https://github.com/antvis/wx-f2)、[React Native](https://github.com/chenshuai2144/f2-demo)以及 [Weex 端](https://github.com/weex-plugins/weex-chart)的渲染，一份代码，多设备多环境渲染。
<p align="center"><img src="https://gw.alipayobjects.com/zos/rmsportal/cPUduuYgROeJwRJSRuFK.png"></p>


### 图表丰富，组件完备
与传统的图表库不同，抛弃了特图特做的封装思路，基于强大的图形语法理论，以数据驱动，通过图形语法的组合灵活构建各类图表，目前可绘制 50+ 图表类型（当然，还可以更多），覆盖各类场景
在提供基础的图表可视化能力外，我们还提供了丰富图表功能组件，满足各种功能需求。

<p align="center"><img src="https://user-images.githubusercontent.com/6628666/44565498-f4e12c80-a79a-11e8-98fc-73ee58547dc9.png" /></p>


### 扩展灵活，创意无限
我们在提供最佳实践的同时，还为开发者提供了灵活的扩展机制，包括 Shape、动画以及交互的自定义能力，当然还有图表样式的个性化定制，满足各种个性化的图表要求。

<img src="https://user-images.githubusercontent.com/6628666/44565579-6c16c080-a79b-11e8-9494-86f3ad477341.gif" width="200"><img src="https://user-images.githubusercontent.com/6628666/44565581-6c16c080-a79b-11e8-8210-f4e797480e87.gif" width="200"><img src="https://user-images.githubusercontent.com/6628666/44565580-6c16c080-a79b-11e8-956d-4d15455468a3.gif" width="200"><img src="https://user-images.githubusercontent.com/6628666/44565583-6caf5700-a79b-11e8-8e9e-a1fa12ddcbf1.gif" width="200">

## 文档

- [使用教程](https://antv.alipay.com/zh-cn/f2/3.x/tutorial/index.html)
- [API](https://antv.alipay.com/zh-cn/f2/3.x/api/index.html)
- [图表示例](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html)

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

## 体验改进计划说明

F2 从 3.1.12（2018-06-20发布）版本开始添加了`F2.track（true）`方法。 目前我们的体验改进计划已经完成，所以从 3.3.4 版本开始该方法将从 F2 中删除。 如果它给你带来麻烦，我们深表歉意。

## License

[MIT license](./LICENSE).
