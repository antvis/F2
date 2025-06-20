---
title: 仪表盘
order: 0
---

仪表盘是一种专门用于展示单一数值指标的图表类型，通过类似汽车仪表盘的圆弧形式来直观地显示数据的当前状态。它能够清晰地展示数值在整个范围内的位置，常用于监控和展示关键性能指标。

## 代码演示

### 基础示例

- [基础仪表盘](./demo/gauge.jsx)：展示单一数值指标的基础仪表盘。

```jsx
import { jsx, Canvas, Gauge } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Gauge
      center={{ x: 150, y: 150 }}
      startAngle={Math.PI}
      endAngle={Math.PI * 2}
      percent={0.5}
      r="200px"
      tickCount={6}
      tickOffset="-40px"
      tickLength="20px"
    />
  </Canvas>
);
```

### 进阶用法

- [自定义仪表盘](./demo/custom-gauge.jsx)：带有自定义样式和配置的仪表盘。

## 使用场景

仪表盘适用于以下场景：

1. 关键性能指标（KPI）监控
2. 进度和完成度展示
3. 实时数据状态监控
4. 单一数值的直观展示
