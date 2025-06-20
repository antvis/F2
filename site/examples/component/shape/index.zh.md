---
title: 图形标签
order: 2
---

图形标签组件用于在图表的几何图形上直接显示数据标签，让用户能够精确地读取每个数据点的具体数值。标签可以显示在图形的内部、外部或边缘，提供了灵活的数据展示方式。

## 代码演示

### 基础示例

- [基础图形标签](./demo/label.jsx)：在图形上显示数据标签。

```jsx
import { jsx, Canvas, Chart, Interval } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Interval
        x="category"
        y="value"
        showLabel
        labelCfg={{
          style: {
            fill: '#fff',
            fontSize: '12px',
          },
        }}
      />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [自定义标签](./demo/custom-label.jsx)：自定义标签样式和位置。
- [动态标签](./demo/dynamic-label.jsx)：根据数据动态调整的标签。

## 使用场景

图形标签组件适用于以下场景：

1. 精确显示数据数值
2. 提高图表的数据可读性
3. 减少用户对坐标轴的依赖
4. 在有限空间内展示关键信息
