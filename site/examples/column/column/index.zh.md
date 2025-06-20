---
title: 基础柱状图
order: 0
---

柱状图是最常用的统计图表之一，通过垂直柱子的高度来表示数据的大小。它能够直观地展示不同类别之间的数值比较，是数据可视化中的基础图表类型。

## 代码演示

### 基础示例

- [基础柱状图](./demo/column.jsx)：展示简单的垂直柱状图。

```jsx
import { jsx, Canvas, Chart, Interval, Tooltip, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      scale={{
        sales: {
          tickCount: 5,
        },
      }}
    >
      <Axis field="year" />
      <Axis field="sales" />
      <Interval x="year" y="sales" />
      <Tooltip />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [渐变柱状图](./demo/gradient.jsx)：使用渐变色填充的柱状图。
- [图案填充柱状图](./demo/pattern.jsx)：使用图案纹理填充的柱状图。
- [区间柱状图](./demo/ranged.jsx)：展示数据范围的柱状图。
- [可选中柱状图](./demo/selection.jsx)：支持点击选中交互的柱状图。
- [象形柱状图](./demo/pictorial.jsx)：使用象形图标的特殊柱状图。
- [可平移柱状图](./demo/pan.jsx)：支持手势平移的柱状图。

## 使用场景

柱状图适用于以下场景：

1. 展示分类数据的数值比较
2. 排名和排序数据的可视化
3. 时间序列数据的离散展示
4. 统计分析和报表展示
