---
title: 火焰图
order: 2
---

火焰图是一种专门用于性能分析的可视化图表，通过堆叠的矩形条来展示程序调用栈的执行时间分布。每个矩形的宽度表示函数的执行时间，高度表示调用栈的深度，常用于性能优化和问题诊断。

## 代码演示

### 基础示例

- [基础火焰图](./demo/flamegraph.jsx)：展示程序性能分析的基础火焰图。

```jsx
import { jsx, Canvas, Chart } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>{/* 火焰图组件配置 */}</Chart>
  </Canvas>
);
```

## 使用场景

火焰图适用于以下场景：

1. 程序性能分析和优化
2. CPU 使用率分析
3. 函数调用栈可视化
4. 系统瓶颈识别和诊断
