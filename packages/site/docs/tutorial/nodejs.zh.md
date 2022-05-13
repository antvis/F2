---
title: 如何在 Node.js 中使用
order: 14
---

## 配置 jsx transform

详见：[配置 jsx transform](./jsx-transform)

## Usage

```jsx
import { Chart, Interval, Axis } from '@antv/f2';

const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const { props } = (
  <Canvas context={context} pixelRatio={1} animate={false}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```
