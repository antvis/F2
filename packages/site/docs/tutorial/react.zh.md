---
title: 如何在 React 中使用
order: 11
---

因为 F2 也是使用声明式构建图表 UI，也内置了一套统一的组件，可以很容易地与 React 生态结合， 使用时可以完全按 React 组件库的方式来使用

## 说明

```bash
npm install @antv/f2 --save
npm install @antv/f2-react --save
```

2. **完整示例**

```jsx
import React from 'react';
import ReactDOM from 'react';
import Canvas from '@antv/f2-react';
import { Chart, Interval } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

ReactDOM.render(
  <div>
    <Canvas>
      <Chart data={data}>
        <Interval x="genre" y="sold" />
      </Chart>
    </Canvas>
  </div>,
  document.getElementById('root')
);
```
