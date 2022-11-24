---
title: 滚动条 - ScrollBar
order: 10
---

数据滚动和缩放

## Usage

```jsx
import { Canvas, Chart, Line, ScrollBar } from '@antv/f2';
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
    <ScrollBar />
  </Chart>
</Canvas>;
```

## Props

### mode: string

滚动模式，默认为： `'x'`, 可选值： `'x' | 'y'`

### range: [0, 1]

初始化区间， 默认为： `[0, 1]`，数值为 `0 ~ 1` 之间

### pan: boolean

是否支持平移，默认为： `true`

### pinch: boolean

是否支持缩放，默认为： `true`

### autoFit: boolean

自动同步 x/y 的坐标值，默认为：`false`

### visible: boolean

是否显示滚动条

### position: string

默认为 `'bottom'`, 可选值为：`'top' | 'right' | 'bottom' | 'left'`

### margin: number

滚动条和图表内容间距，默认 `16px`

## demo 示例

- [折线图平移](/zh/examples/line/line#pan)
- [柱状图平移](/zh/examples/column/column#pan)
