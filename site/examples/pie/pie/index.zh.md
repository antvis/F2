---
title: 基础饼图
order: 0
---

饼图是一种常用的统计图表，通过扇形的角度大小来表示数据在整体中的占比。它能够直观地展示各个类别数据的相对比例关系，适合展示构成比例和占比分析。

## 代码演示

### 基础示例

- [基础饼图](./demo/pie.jsx)：展示简单的饼图，通过扇形角度表示数据占比。

```jsx
import { jsx, Canvas, Chart, Interval, Coord } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Coord type="polar" transposed radius={0.85} />
      <Interval x="a" y="percent" adjust="stack" color="name" />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [带文本饼图](./demo/pie-with-label.jsx)：在饼图上显示标签文本和数值。
- [标签连接线饼图](./demo/labelline-pie.jsx)：通过连接线将标签与对应扇形连接。
- [可选中饼图](./demo/selection.jsx)：支持点击选中扇形的交互功能。

## 使用场景

饼图适用于以下场景：

1. 展示各个类别在总体中的占比
2. 分析数据的构成比例
3. 对比不同类别的相对大小
4. 展示百分比分布情况
