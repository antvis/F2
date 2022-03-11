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

### field: string

坐标轴的数据字段
