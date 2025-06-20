---
title: 基础演示
order: 0
icon: column
redirect_from:
  - /zh/examples
---

基础演示展示了如何使用 F2 创建一个简单的图表。通过这个示例，您可以了解 F2 的基本用法和组件结构。

## 代码演示

### 基础示例

- [基础演示](./demo/base.jsx)：展示如何创建一个基本的图表。

```jsx
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" />
    </Chart>
  </Canvas>
);
```

## 使用场景

基础演示适用于以下场景：

1. 快速上手 F2 图表库
2. 了解 F2 的基本组件和配置
3. 作为开发更复杂图表的起点
