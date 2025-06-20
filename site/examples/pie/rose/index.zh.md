---
title: 玫瑰图
order: 2
---

玫瑰图（南丁格尔玫瑰图）是一种特殊的饼图，它通过半径的长短来表示数据的大小，而不是通过扇形的角度。这种图表能够更好地展示数据之间的差异，特别适合展示数值差异较大的分类数据。

## 代码演示

### 基础示例

- [基础玫瑰图](./demo/rose.jsx)：展示通过半径长短表示数据大小的玫瑰图。

```jsx
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      coord={{
        type: 'polar',
      }}
      scale={{
        population: {
          min: 0,
        },
      }}
    >
      <Interval x="year" y="population" color="year" />
      <Legend position="right" />
    </Chart>
  </Canvas>
);
```

## 使用场景

玫瑰图适用于以下场景：

1. 展示数值差异较大的分类数据
2. 突出显示数据间的差异程度
3. 周期性数据的可视化展示
4. 需要同时展示分类和数值的场景
