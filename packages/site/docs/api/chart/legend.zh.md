---
title: 图例 - Legend
order: 7
---

F2 图例的生成是由图形语法中的图形属性决定的，我们会根据图形属性映射以及数据的类型自动生成不同类型的图例：color, size 这两个图形属性如果判断接收的参数是数据源的字段时，会自动生成不同的图例：

1. color，会赋予不同的图例项不同的颜色来区分图形，如果该字段是分类类型，则会生成离散图例

## Usage

```jsx
import { Canvas, Chart, Line, Legend } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Legend position="top">
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

### position: string

可选值为：`'top' | 'right' | 'bottom' | 'left'`, 默认为 `'top'`

### width: number

图例显示的宽度

### height: number

图例显示的高度

### itemFormatter: function

格式化图例每项的文本显示

### marker: string

图例标记, 可选值为： `'circle' | 'square'`, 默认为 `'circle'`

### style

图例样式
