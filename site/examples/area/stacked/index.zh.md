---
title: 层叠面积图
order: 1
---

层叠面积图是一种特殊的面积图，它可以展示多个数据系列随时间或其他连续变量变化的累积效果。通过堆叠的方式，可以直观地表现出各个类别的数据在整体中的占比及其变化趋势。

## 代码演示

### 基础示例

- [层叠面积图](./demo/stacked.jsx)：展示多个数据系列的累积变化趋势。

```jsx
import { jsx, Canvas, Chart, Area, Line, Axis, Legend } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      scale={{
        date: {
          range: [0, 1],
        },
        value: {
          min: 0,
          nice: true,
        },
      }}
    >
      <Axis field="date" />
      <Axis field="value" />
      <Area x="date" y="value" color="city" adjust="stack" />
      <Line x="date" y="value" color="city" adjust="stack" />
      <Legend style={{ justifyContent: 'space-around' }} />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [百分比层叠面积图](./demo/percent.jsx)：以百分比的形式展示各个类别在总体中的占比变化。

```jsx
import { jsx, Canvas, Chart, Area, Line, Axis, Legend } from '@antv/f2';

function formatterPercent(value) {
  value = value || 0;
  return parseInt(value * 100) + '%';
}

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      scale={{
        year: {
          range: [0, 1],
        },
        percent: {
          formatter: formatterPercent,
          alias: 'percent(%)',
        },
      }}
    >
      <Axis field="percent" />
      <Axis field="year" />
      <Area x="year" y="percent" color="country" adjust="stack" />
      <Line x="year" y="percent" color="country" adjust="stack" />
      <Legend style={{ justifyContent: 'space-around' }} />
    </Chart>
  </Canvas>
);
```

- [区域图（存在空值）](./demo/area-none.jsx)：演示如何处理数据中存在空值的情况。

## 使用场景

层叠面积图适用于以下场景：

1. 展示多个相关数据系列随时间的变化趋势
2. 分析各个类别对总体的贡献度
3. 比较不同类别数据的占比变化
