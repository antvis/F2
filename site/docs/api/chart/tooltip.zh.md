---
title: 提示 - tooltip
order: 8
---

## Usage

```jsx
import { Canvas, Chart, Line, Tooltip } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Tooltip>
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```
