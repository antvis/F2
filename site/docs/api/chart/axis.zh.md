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

### visible: boolean

是否显示，默认为 `true`

### field: string

坐标轴的数据字段

### position: string

坐标轴显示的位置：`'top' | 'right' | 'bottom' | 'left'`

### grid: string

网格线类型：可选值为：`'arc' | 'line'`

### style

坐标轴的样式配置

#### style.label: TextAttr | Function

> 类型为绘图属性：[文本属性](/zh/docs/tutorial/shape-attrs#文本属性) 文本样式文本样式

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

> 类型为绘图属性：[线条属性](/zh/docs/tutorial/shape-attrs#线条属性) 线条样式

轴线样式

#### style.grid

> 类型为绘图属性：[线条属性](/zh/docs/tutorial/shape-attrs#线条属性) 线条样式

网格线样式
