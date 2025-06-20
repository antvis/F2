---
title: 对比折线图
order: 1
---

对比折线图是在同一个坐标系中绘制多条折线来对比不同数据系列的变化趋势。通过多条折线的对比，可以清晰地看出不同类别数据的差异和相关性，适合用于多维数据的趋势分析。

## 代码演示

### 基础示例

- [多系列折线图](./demo/series.jsx)：展示多个数据系列对比的折线图。

```jsx
import { jsx, Canvas, Chart, Line, Axis, Legend } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="date" tickCount={3} />
      <Axis field="value" tickCount={5} />
      <Line x="date" y="value" lineWidth="4px" color="type" />
      <Legend position="top" />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [自定义提示框](./demo/customize-tootlip.jsx)：带有自定义提示框样式的对比折线图。
- [多形状折线图](./demo/shapes.jsx)：使用不同形状标记的多系列折线图。

## 使用场景

对比折线图适用于以下场景：

1. 多个产品或服务的性能对比
2. 不同时期数据的趋势比较
3. 多维度指标的综合分析
4. 竞品分析和市场趋势对比
