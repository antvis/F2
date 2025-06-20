---
title: 雷达图
order: 0
---

雷达图（蜘蛛图）是一种用于展示多维数据的图表类型，通过在多个轴上绘制数据点并连接形成多边形来展示数据的整体特征。它特别适合用于比较多个对象在多个维度上的表现。

## 代码演示

### 基础示例

- [基础雷达图](./demo/radar.jsx)：展示多个维度数据的基础雷达图。

```jsx
import { jsx, Canvas, Chart, Point, Line, Axis, Legend } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      coord="polar"
      scale={{
        score: {
          min: 0,
          max: 120,
          nice: false,
          tickCount: 4,
        },
      }}
    >
      <Axis field="item" />
      <Axis field="score" />
      <Line x="item" y="score" color="user" />
      <Point x="item" y="score" color="user" />
      <Legend />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [面积雷达图](./demo/area.jsx)：使用面积填充的雷达图。
- [填充雷达图](./demo/radar-fill.jsx)：带有背景填充的雷达图。
- [网格雷达图](./demo/radar-grid.jsx)：自定义网格样式的雷达图。

## 使用场景

雷达图适用于以下场景：

1. 多维数据的综合评估和比较
2. 个人或产品的能力模型展示
3. 绩效评估和竞品分析
4. 多指标体系的可视化展示
