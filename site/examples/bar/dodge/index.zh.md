---
title: 分组柱状图
order: 1
---

分组柱状图是柱状图的一种变形，用于展示多个数据系列在不同类别下的对比关系。通过将相关的柱子分组排列，可以直观地比较同一类别下不同数据系列的数值差异。

## 代码演示

### 基础示例

- [分组柱状图](./demo/dodge.jsx)：展示多个数据系列的分组对比。

```jsx
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      coord={{
        transposed: true,
      }}
    >
      <Axis field="月份" />
      <Axis field="月均降雨量" />
      <Interval
        x="月份"
        y="月均降雨量"
        color="name"
        adjust={{
          type: 'dodge',
          marginRatio: 0.05,
        }}
      />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [带负值分组柱状图](./demo/negetive.jsx)：处理包含负值数据的分组柱状图。

## 使用场景

分组柱状图适用于以下场景：

1. 对比多个数据系列在不同类别下的表现
2. 展示同一维度下不同组别的数据差异
3. 分析多个变量之间的关系
4. 时间序列数据的多维度对比
