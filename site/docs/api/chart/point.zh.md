---
title: 点 - Point
description: 本文档介绍如何使用和配置点组件，用于绘制点图、折线图中的点等。
keywords: ['点', 'Point', '前端', '可视化', '图表']
order: 4
---

用于绘制点图、折线图中的点等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Point } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Point x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)
