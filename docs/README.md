# F2: 基于 HTML5 Canvas，开箱即用的移动端可视化解决方案

[![](https://img.shields.io/travis/antvis/f2.svg)](https://travis-ci.org/antvis/f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![npm package](https://img.shields.io/npm/v/@antv/f2.svg)](https://www.npmjs.com/package/@antv/f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.org/package/@antv/f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/f2.svg)](http://isitmaintained.com/project/antvis/f2 "Percentage of issues still open")

F2 是面向移动端的一套基于可视化图形语法的解决方案，具有精简、高性能、易扩展的特性。适用于对性能、大小、扩展性要求很高的场景。

<img src="https://gw.alipayobjects.com/zos/rmsportal/JrymDHcnHRIgSDglEYNY.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/aqUteypLffbwVhjKwtZe.gif" width="200"><img src="https://gw.alipayobjects.com/zos/rmsportal/FkXzykmbYhPDqDpouJsg.gif" width="180"><img src="https://gw.alipayobjects.com/zos/rmsportal/ntPqElbzargYvMnJcxVX.gif" width="200">

**在此衷心感谢[《The Grammar of Graphics》](https://www.cs.uic.edu/~wilkinson/TheGrammarOfGraphics/GOG.html)的作者 [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson)，为 F2 的图形语法提供了理论基础！**


## 安装

```bash
$ npm install @antv/f2
```

## 特性
- ✔︎ 极小：精简版压缩后不到 100k 的代码。
- ✔︎ 高性能：性能极致追求，针对移动设备做了大量的优化。
- ✔︎ 强大扩展能力：任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。

## 文档

* [快速开始](getting-started/README.md)
  * [Installation](getting-started/installation.md)
  * [Integration](getting-started/integration.md)
  * [Usage](getting-started/usage.md)
  * [Require On Demand](getting-started/require-on-demand.md)
* [教程](chart-concept/README.md)
  * [Understanding F2 Charts](chart-concept/understanding-f2-charts.md)
  * [Data](chart-concept/data.md)
  * [Scale](chart-concept/scale.md)
  * [Geometry](chart-concept/geometry.md)
  * [Attribute](chart-concept/attribute.md)
  * [Coordinate](chart-concept/coordinate.md)
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
  * [Canvas](api/canvas.md)
* [开发者](developer/README.md)
  * [Plugin](developer/plugin.md)
  * [Shape](developer/shape.md)
  * [Graphic](developer/graphic.md)
  * [Contributing](developer/contributing.md)
* [图表示例](./demos)

3.0 版本的文档，可访问 AntV 官网：[F2](https://antv.alipay.com/zh-cn/f2/3.x/index.html)。

![demos](https://gw.alipayobjects.com/zos/rmsportal/RDCaavVwfzwoVTynJuNR.png)

## License

[MIT license](../LICENSE).
