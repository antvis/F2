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

定义 Legend 的布局方式

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `flexDirection` | String | 支持的属性：'column', 'row' |
| `justifyContent` | String | 支持的属性：'flex-start', 'center', 'flex-end', 'space-between', 'space-around' |
| `alignItems` | String | 支持的属性： 'flex-start', 'center', 'flex-end', 'stretch' |
| `alignSelf` | String | 支持的属性： 'flex-start', 'center', 'flex-end', 'stretch' |
| `flexWrap` | String | 支持的属性：'wrap', 'nowrap' |

```jsx
<Legend
  style={{
    justifyContent: 'flex-start',
    flexDirection: 'column',
  }}
/>
```

### nameStyle

> 类型为绘图属性：[文本属性](/zh/docs/tutorial/shape-attrs#文本属性)

图例名称样式

```jsx
<Legend
  nameStyle={{
    fontSize: '20px',
    fill: '#000',
  }}
/>
```

### valueStyle

> 类型为绘图属性：[文本属性](/zh/docs/tutorial/shape-attrs#文本属性)

图例值样式

```jsx
<Legend
  valueStyle={{
    fontSize: '20px',
    fill: '#000',
  }}
/>
```
