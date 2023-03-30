---
title: 面积 - Area
description: 本文档介绍如何使用和配置面积图组件
keywords: ['面积图', 'Area', '前端', '可视化']
order: 5
---

面积图组件

面积图组件用于绘制区域图（面积图）、层叠区域图、区间区域图等。它继承自 [几何标记 Geometry](geometry)。

## 使用方法 (Usage)

首先引入必要的组件库：

```jsx
import { Canvas, Chart, Area } from '@antv/f2';
```

然后创建一个简单的面积图：

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
    <Area x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## 属性 (Props)

几何标记的通用属性，请参阅：[几何标记](geometry#props)

### connectNulls: boolean

是否连接空值，默认为 `false`，表示不连接。

## 方法 (Methods)

几何标记的通用方法，请参阅：[几何标记](geometry#方法)
