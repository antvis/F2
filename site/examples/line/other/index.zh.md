---
title: 其他折线图
order: 3
---

其他折线图包含了一些特殊场景下的折线图实现，如处理空值数据、断点连接等特殊情况。这些图表能够处理不完整的数据集，提供更灵活的数据可视化方案。

## 代码演示

### 基础示例

- [空值处理折线图](./demo/null.jsx)：展示如何处理数据中的空值。

```jsx
import { jsx, Canvas, Chart, Line, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="date" />
      <Axis field="value" />
      <Line x="date" y="value" connectNulls={false} />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [连接空值折线图](./demo/connect-null.jsx)：空值点之间进行连接的折线图。

## 使用场景

其他折线图适用于以下场景：

1. 数据不完整或存在缺失值的情况
2. 需要突出数据断点的场景
3. 传感器数据异常处理
4. 时间序列数据的特殊处理需求
