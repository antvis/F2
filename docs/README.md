# F2: 基于 HTML5 Canvas，开箱即用的移动端可视化解决方案

[![](https://img.shields.io/travis/antvis/f2.svg)](https://travis-ci.org/antvis/f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![npm package](https://img.shields.io/npm/v/@antv/f2.svg)](https://www.npmjs.com/package/@antv/f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.org/package/@antv/f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/f2.svg)](http://isitmaintained.com/project/antvis/f2 "Percentage of issues still open")

F2（Fast && Flexible），是一套面向移动端的基于可视化图形语法的解决方案，具有精简、高性能、易扩展的特性，适用于对性能、大小、扩展性要求很高的场景。

<img src="https://gw.alipayobjects.com/zos/rmsportal/TzJcRDHJNFlPhUVByrvG.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/eOHezxTwQScZvAlLSLfh.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/CpdljwuwbEPSiaVIbVwE.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/GYRfGZxtdcIWoPURiNNQ.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/nCVpGkXoNjWqNMXIAuaL.gif" width="200">

**在此衷心感谢[《The Grammar of Graphics》](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html)的作者 [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson)，为 F2 的图形语法提供了理论基础！**

## 特性

- ✔︎ 灵活且易扩展：灵活的按需引入机制，并提供自定义 Shape 以及动画机制，任何图表，都可以基于图形语法灵活绘制，满足你无限的创意
- ✔︎ 高性能：性能极致追求，针对移动设备做了大量的优化
- ✔︎ 精简：精简版（简单折柱饼）压缩后不到 100k，完整版本压缩后 152k
- ✔︎ 丰富的图表类型：支持 20+ 图表类型

## 文档

* [快速开始 Getting started](getting-started/README.md)
  * [安装 Installation](getting-started/installation.md)
  * [一分钟上手 F2 Your First Chart](getting-started/your-first-chart.md)
  * [按需引用 Require On Demand](getting-started/require-on-demand.md)
* [基础教程 Chart Concept](chart-concept/README.md)
  * [F2 图表组成 Understanding F2 Charts](chart-concept/understanding-f2-charts.md)
  * [数据 Data](chart-concept/data.md)
  * [度量 Scale](chart-concept/scale.md)
  * [几何标记 Geometry](chart-concept/geometry.md)
  * [图形属性 Attribute](chart-concept/attribute.md)
  * [坐标系 Coordinate](chart-concept/coordinate.md)
* [API](api/README.md)
  * [Chart](api/chart.md)
  * [Geometry](api/geometry.md)
  * [Scale](api/scale.md)
  * [Coordinate](api/coordinate.md)
  * [Axis](api/axis.md)
  * [Legend](api/legend.md)
  * [Tooltip](api/tooltip.md)
  * [Guide](api/guide.md)
  * [Interaction](api/interaction.md)
  * [Animation](api/animation.md)
  * [Global](api/global.md)
  * [绘图属性](api/canvas.md)
* [开发者](developer/README.md)
  * [插件 Plugin](developer/plugin.md)
  * [自定义 Shape](developer/shape.md)
  * [绘制引擎 G](developer/graphic.md)
  * [开源贡献 Contributing](developer/contributing.md)
* [图表示例](./demos)

3.0 版本的文档，可访问 AntV 官网：[F2](https://antv.alipay.com/zh-cn/f2/3.x/index.html)。

![demos](https://gw.alipayobjects.com/zos/rmsportal/RDCaavVwfzwoVTynJuNR.png)

## License

[MIT license](../LICENSE).
