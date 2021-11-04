---
title: Global
order: 3
---

Global 是 F2 中的全局配置项，全局配置项包含了以下内容：

- 图表本身的一些默认属性，如边框、屏幕像素比、默认字体等

- 数据图形映射相关的属性，例如默认的颜色、默认的形状、默认的大小，柱状图的默认宽度

- 坐标轴、辅助文本的默认样式


可以通过 `console.log(F2.Global)` 来查看所有属性的默认值。

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| `padding` | Array/Number | 图表绘图区域和画布边框的间距，用于显示坐标轴文本、图例，详见 [padding](https://www.yuque.com/antv/f2/api-chart#92uqpt) |
| `appendPadding` | Array/Number | 图表画布区域四边的预留边距，即我们会在 padding 的基础上，为四边再加上 appendPadding 的数值，默认为 15，详见 [appendPadding](https://www.yuque.com/antv/f2/api-chart#u5skik) |
| `axis` | Object | 各个坐标轴的默认样式配置 |
| `colors` | Array | 默认图表色系 |
| `defaultColor` | String | 默认主色值 |
| `fontFamily` | String | 默认字体 |
| `guide` | Object | 各个 Guide 组件的默认样式配置 |
| `legend` | Object | 各种类型的图例的默认样式配置 |
| `lineDash` | Array | 默认虚线配置 |
| `pixelRatio` | Number | 默认的像素比 |
| `shape` | Object | 默认各种类型 shape 的样式配置 |
| `sizes` | Array | 默认的大小范围 |
| `tooltip` | Object | 默认 Tooltip 的样式配置 |
| `version` | String | 当前 F2 的版本号 |
| `widthRatio` | Object | 不同 shape 的宽度比配置 |


以下是 `G2.Global.widthRatio` 属性包含的属性配置说明：

```javascript
G2.Global.widthRatio.column: 1 / 2, // 一般的柱状图宽度占比
G2.Global.widthRatio.rose: 0.999999, // 玫瑰图的宽度占比
G2.Global.widthRatio.multiplePie: 3 / 4, // 多层饼图的宽度占比
G2.Global.widthRatio.dodgeMargin: 0 // 分组柱状图的间距
```

## 方法

### setTheme(config)

用户自定义的主题配置。

**参数：**

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `config` | Object | 图表样式配置 |


示例：

```javascript
F2.Global.setTheme({
  colors: [ '#F04864', '#D66BCA', '#8543E0', '#8E77ED', '#3436C7', '#737EE6', '#223273', '#7EA2E6' ],
  pixelRatio: 2,
  guide: {
    line: {
      stroke: '#F04864',
      lineWidth: 2
    }
  }
});
```
