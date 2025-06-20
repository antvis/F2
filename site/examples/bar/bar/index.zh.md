---
title: 基础柱状图
order: 0
---

柱状图是一种常用的统计图表，通过水平或垂直的柱子长度来表示数据的大小。它可以直观地展示分类数据之间的比较关系，适合展示不同类别之间的数值比较。

## 代码演示

### 基础示例

- [基础柱状图](./demo/bar.jsx)：展示简单的柱状图，通过垂直柱子展示数据大小。

```jsx
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      coord={{
        transposed: true,
      }}
      scale={{
        sales: {
          tickCount: 5,
        },
      }}
    >
      <Axis field="year" />
      <Axis field="sales" />
      <Interval x="year" y="sales" />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [区间柱状图](./demo/range.jsx)：展示具有上下区间范围的数据。

## 使用场景

柱状图适用于以下场景：

1. 展示分类数据之间的数值比较
2. 显示时间序列数据的变化趋势
3. 对比不同类别的数据大小
4. 展示数据的排名和分布
