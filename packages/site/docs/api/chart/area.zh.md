---
title: 面积 - Area
order: 5
---

用于绘制区域图（面积图）、层叠区域图、区间区域图等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Area } from '@antv/f2';
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

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

### connectNulls

是否连接空值， 默认为 `false`，不连接

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)
