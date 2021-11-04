---
title: React 中使用 F2
order: 8
---

为了方便在 React 中使用 F2， 我们针对React 封装了一套使用，让你可以快速地在 React 中使用


## 使用说明



```bash
npm install @antv/f2-react
```


2. **完整示例**

```jsx
import React from 'react';
import ReactDOM from 'react';
import Canvas from '@antv/f2-react';
import { Chart, Interval } from '@antv/f2';

ReactDOM.render(
  <Canvas>
    <Chart>
    </Chart>
  </Canvas>
)
```
