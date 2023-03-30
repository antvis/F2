---
title: 图表 - Chart
description: 本文档介绍如何使用和配置图表组件
keywords: ['图表', 'Chart', '前端', '可视化']
order: 0
---

图表组件

本文档将介绍如何使用图表组件进行数据可视化，并且展示如何配置和优化图表组件。

## 使用方法 (Usage)

首先引入必要的组件库：

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';
```

然后创建一个简单的柱状图：

```jsx
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>;
```

## 属性 (Props)

下面是一些常用的图表属性：

### data: Array

数据数组，用于提供图表所需的数据。

### scale: Object

图表的度量配置，用于设置数值范围和数据维度。

#### 示例

```jsx
<Chart
  data={data}
  scale={{
    // 配置 sold 字段
    sold: {
      min: 0,
      max: 100,
    },
    genre: {},
  }}
>
  ...
</Chart>
```

了解更多关于度量的内容，请查看：[度量](../../tutorial/scale.zh.md)

### coord: Object

图表的坐标系配置，用于设置图表的显示方式。

```jsx
<Chart
  data={data}
  coord={{
    type: 'rect' | 'polar', // 直角坐标或极坐标
    transposed: boolean, // 是否进行坐标轴转置
    // 以下属性仅在 polar 坐标系下生效
    startAngle: number, // 起始角度
    endAngle: number, // 结束角度
    radius: number, // 半径
    innerRadius: number, // 内半径
  }}
>
  ...
</Chart>
```

了解更多关于坐标系的内容，请查看：[坐标系](../../tutorial/coordinate.zh.md)
