---
title: 图表 - Chart
order: 0
---

图表组件

## Usage

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';
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

## Props

### data: Array

可视化数据

### scale

图表的度量设置

```jsx
<Chart
  data={data}
  scale={{
    // 声明 sold 字段配置
    sold: {
      min: 0,
      max: 100,
    },
    genre: {

    }
  }}
>
  ...
</Chart>
```
图表的度量，度量详细介绍可见：[度量](../../tutorial/scale.zh.md)


### coord

图表的坐标系，坐标系详细介绍可见：[坐标系](../../tutorial/coordinate.zh.md)

```jsx
<Chart
  data={data}
  coord={{
    type: 'rect' | 'polar',
    transposed: boolean,
    // 下面几个是 polar 独有
    startAngle: number,
    endAngle: number,
    radius: number, // 半径
    innnerRadius: number, // 内半径
  }}
>
  ...
</Chart>
```
