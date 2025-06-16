---
title: 坐标轴 - Axis
order: 6
---

坐标轴配置。F2 的坐标轴的组成如下：![](https://gw.alipayobjects.com/zos/rmsportal/YhhBplZmzxzwvUBeEvPE.png#width=500)

| **术语**     | **英文** |
| ------------ | -------- |
| 坐标轴文本   | label    |
| 坐标轴线     | line     |
| 坐标轴刻度线 | tickLine |
| 坐标轴网格线 | grid     |

## Usage

```jsx
import { Canvas, Chart, Line, Axis } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

部分属性可参考 scale 图表度量，度量详细介绍可见：[度量](/tutorial/scale.zh.md)

### visible: boolean

是否显示，默认为 `true`

### field: string

坐标轴的数据字段

### type: string

指定不同的度量类型，支持的 type 为 `identity`、`linear`、`cat`、`timeCat`。

### position: string

坐标轴显示的位置：`'top' | 'right' | 'bottom' | 'left'`

### tickCount: Number

坐标轴上刻度点的个数，不同的度量类型对应不同的默认值

### range: string

输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1

### formatter: Function

回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示。

### min: string

定义数值范围的最小值。

### max: string

定义数值范围的最大值。

### nice: boolean

默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]。

### grid: string

网格线类型：可选值为：`'arc' | 'line'`

### style

坐标轴的样式配置

#### style.label: TextAttr | Function

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性) 文本样式文本样式

#### style.tickLine

```js
{
  tickLine: {
    // 刻度线长度
    length: 10,
  }
}
```

#### style.line

> 类型为绘图属性：[线条属性](/tutorial/shape-attrs#线条属性) 线条样式

轴线样式

#### style.grid

> 类型为绘图属性：[线条属性](/tutorial/shape-attrs#线条属性) 线条样式

网格线样式
