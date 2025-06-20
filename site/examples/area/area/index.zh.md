---
title: 基础面积图
order: 0
---

面积图是一种统计图表，通过填充线条与坐标轴之间的区域来表示数据的数量。它结合了折线图和柱状图的特点，既能展示数据的变化趋势，又能强调数据的累积量和总体规模。

## 代码演示

### 基础示例

- [基础面积图](./demo/area.jsx)：展示简单的面积图，通过填充区域表示数据量。

```jsx
import { jsx, Canvas, Chart, Area, Line, Axis, Tooltip } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      scale={{
        tem: {
          min: 0,
          tickCount: 5,
        },
        time: {
          range: [0, 1],
        },
      }}
    >
      <Axis field="time" />
      <Axis field="tem" />
      <Area x="time" y="tem" />
      <Line x="time" y="tem" />
      <Tooltip />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [带负值面积图](./demo/with-negative.jsx)：处理包含负值数据的面积图。
- [带负值面积图（x 基线不为 0）](./demo/with-negative-not-start-on-zero.jsx)：自定义基线位置的负值面积图。
- [渐变填充面积图](./demo/gradient.jsx)：使用渐变色填充的面积图效果。

## 使用场景

面积图适用于以下场景：

1. 展示数据随时间的变化趋势和累积量
2. 强调数据的总体规模和量级
3. 对比不同时期的数据差异
4. 展示连续数据的分布情况
