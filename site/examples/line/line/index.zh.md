---
title: 基础折线图
order: 0
---

折线图是一种常用的统计图表，通过连接各个数据点形成折线来展示数据的变化趋势。它特别适合展示连续数据随时间或其他有序变量的变化情况，能够清晰地反映数据的趋势和波动。

## 代码演示

### 基础示例

- [基础折线图](./demo/line.jsx)：展示简单的折线图，通过连线展示数据变化趋势。

```jsx
import { jsx, Canvas, Chart, Line, Axis, Tooltip } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="date" />
      <Axis field="value" />
      <Line x="date" y="value" />
      <Tooltip />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [带点折线图](./demo/with-point.jsx)：在折线上显示数据点，突出每个数据值。
- [平滑折线图](./demo/smooth.jsx)：使用平滑曲线连接数据点，展示更流畅的趋势。
- [阶梯折线图](./demo/step.jsx)：使用阶梯状折线，适合展示阶段性变化数据。
- [可平移折线图](./demo/pan.jsx)：支持手势平移交互的折线图。

## 使用场景

折线图适用于以下场景：

1. 展示时间序列数据的变化趋势
2. 对比多个数据系列的走势
3. 分析数据的周期性和波动性
4. 预测和趋势分析
