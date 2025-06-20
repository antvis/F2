---
title: 堆叠柱状图
order: 2
---

堆叠柱状图是柱状图的一种变形，通过将多个数据系列堆叠在一起形成单个柱子，可以展示各个部分对整体的贡献以及整体的总量。这种图表特别适合展示构成关系和累积效果。

## 代码演示

### 基础示例

- [堆叠柱状图](./demo/stack.jsx)：展示多个数据系列的堆叠累积效果。

```jsx
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="State" />
      <Axis field="人口数量" />
      <Interval x="State" y="人口数量" color="年龄段" adjust="stack" />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [百分比堆叠柱状图](./demo/percent.jsx)：以百分比形式展示各部分在整体中的占比。

## 使用场景

堆叠柱状图适用于以下场景：

1. 展示各个部分对整体的贡献度
2. 分析数据的构成关系
3. 比较不同类别的总量和构成
4. 展示累积效果和变化趋势
