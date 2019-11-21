---
title: PieLabel
order: 10
---

| **文本全部展示，重叠则调整** | **文本重叠则不展示** | **点击操作** |
| --- | --- | --- |
| ![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/f2afb2c0-2b84-41e7-9ecd-25f3a167f954.png) | ![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/d72df18f-c170-4ee1-a479-84b8d98c27ca.png) | ![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/3d4156b9-d646-4242-be32-438ec62ba8ac.png) |

PieLabel 是一个用于绘制饼图文本的插件。

## 如何引用
PieLabel 插件默认没有打包至 `@antv/f2` 模块包中，你可以通过两种方式引入：

1. 引用完整版 F2

```javascript
const F2 = require('@antv/f2/lib/index-all');
```

2. 手动引入 PieLabel 模块，并将其注册至 Chart 或者 chart 实例

```javascript
const F2 = require('@antv/f2/lib/index'); // 建议统一从 lib 下引入
const PieLabel = require('@antv/f2/lib/plugin/pie-label'); // 引入 PieLabel 模块

// 方式一：全局注册
F2.Chart.plugins.register(PieLabel);

// 方式二：注册至具体的 chart 实例
const chart = new F2.Chart({
  id: 'canvas',
  plugins: PieLabel
});
```

将 PieLabel 插件注册完毕之后，就可以调用 `chart.pieLabel(config)` 进行文本的配置了。

## API 

调用以下方法对饼图文本进行相应的配置：

```javascript
chart.pieLabel({
  anchorOffset: {Number}, // 锚点的偏移量
  inflectionOffset: {Number}, // 拐点的偏移量
  sidePadding: {Number}, // 文本距离画布左右两边的距离
  lineHeight: {Number}, // 文本的最大行高
  adjustOffset: {Number}, // 发生调整时的偏移量
  skipOverlapLabels: {Boolean}, // 是否不展示重叠的文本
  lineStyle: {Object}, // 连接线的样式
  anchorStyle: {Object}, // 锚点的样式
  label1: {Function}, // label1 文本内容及其样式，Function 类型，回调函数
  label2: {Function}, // label2 文本内容及其样式，Function 类型，回调函数
  onClick: {Function}, // 点击行为，回调函数
  triggerOn: {String}, // 点击行为触发的事件类型
  activeShape: {Boolean}, // 当有图形被选中的时候，是否激活图形
  activeStyle: {Object}, // 设置激活图形的样式
  label1OffsetY: {Number}, // label1 与连接线在垂直方向的偏移量
  label2OffsetY: {Number}, // label2 与连接线在垂直方向的偏移量  
})
```

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/ccc56b10-5517-4d25-a879-a043db182b7e.png)<br />配置项图解

### 配置项
| **属性名** | **类型** | **默认值** | **说明** |
| --- | --- | --- | --- |
| `anchorOffset`  | Number | 5 | 锚点的偏移量。 |
| `inflectionOffset`  | Number | 15 | 拐点的偏移量。 |
| `sidePadding`  | Number | 20 | 文本距离画布左右两边的距离。 |
| `lineHeight`  | Number | 32 | 文本的最大行高。 |
| `adjustOffset`  | Number | 15 | 发生调整时的偏移量。 |
| `skipOverlapLabels`  | Boolean | false | 是否将重叠的文本忽略，默认为 false，即展示全部文本。 |
| `lineStyle`  | Object |  | 连接线的样式，颜色默认同对应饼图颜色相同。 |
| `anchorStyle`  | Object |  | 锚点的样式，颜色默认同对应饼图的样色相同。 |
| `label1`  | Function | null | 配置 label1 文本内容及其样式，是个回调函数，详细使用见[链接](https://www.yuque.com/antv/f2/pie-label#ownmbn)，该函数的返回值必须是一个对象。 |
| `label2`  | Function | null | 配置 label2 文本内容及其样式，是个回调函数，详细使用见[链接](https://www.yuque.com/antv/f2/pie-label#ownmbn)，该函数的返回值必须是一个对象。 |
| `onClick`  | Function | null | 点击行为定义函数，详细使用见[链接](https://www.yuque.com/antv/f2/pie-label#xqh0if)。 |
| `triggerOn`  | String | 'touchstart' | 配置点击行为触发的事件类型。 |
| `activeShape`  | Boolean | false | 当有图形被选中的时候，是否激活图形，默认不激活。 |
| `activeStyle`  | Object | ```javascript
{
   offset: 1,
   appendRadius: 8,
   fillOpacity: 0.5
  }
```
 | 设置被激活图形的显示样式。其中 `offset` 以及 `appendRadius` 参数的含义同 [pie-select api ](https://www.yuque.com/antv/f2/api-interaction#n3o1th)中的含义相同，分别代表光环的偏移距离以及光环的大小，其他属性为绘图属性即可。 |

### `label1`  && `label2` 回调
无论是 `label1` 还是 `label2` 的回调函数，都会为用户传递两个参数，如下：

```javascript
chart.pieLabel({
  label1(data, color ) {
    return {};
  }
});
```

如果用户不配置，那么就不会展示文本。

| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `data`  | Object | 对应饼图扇形的原始数据。 |
| `color`  | String | 对应饼图扇形的颜色值。 |

比如：

```javascript
// 假设数据结构为: { name: 'a', value: 100 }
chart.pieLabel({
  label1(data, color) {
    return {
      text: data.name, // 文本内容
      fill: color // 文本颜色
    };
  }
});
```

### onClick 回调
我们为 `onClick`  回调函数传入了一个参数 `ev` ，如下：

```javascript
chart.pieLabel({
  onClick(ev) {}
});
```

通过 `ev` 参数我们可以获取被点击图形的原始数据：`ev.data` ，点击的画布坐标：`ev.x`, `ev.y` 等。

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/07e63369-e5ad-415d-890f-c068dc9d9e0e.png)

## Demo
| ![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/32cf033e-1225-42ff-b8d5-9b2cb7dd4f4b.png) | ![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/37f37f67-0c3c-4721-b538-a2a27af8a14c.png) | ![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/15ba3984-f64f-4833-bb82-578c48f4711e.gif) |
| --- | --- | --- |
| [链接](/zh/examples/pie/basic#labelline-pie) | [链接](/zh/examples/pie/basic#pie-with-label) | [链接](/zh/examples/pie/basic#pie-click) |


