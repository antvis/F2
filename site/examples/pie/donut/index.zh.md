---
title: 环形图
order: 1
---

环形图是饼图的一种变形，通过中空的圆环形状来展示数据的占比关系。相比传统饼图，环形图的中心空白区域可以用来显示总计信息或其他重要数据，同时保持了饼图直观展示比例的特点。

## 代码演示

### 基础示例

- [基础环形图](./demo/donut.jsx)：展示带有中心文本的环形图，可在中心显示总计信息。

```jsx
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      coord={{
        type: 'polar',
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85,
      }}
    >
      <Interval x="a" y="percent" adjust="stack" color="name" />
      <Legend position="right" />
    </Chart>
  </Canvas>
);
```

## 使用场景

环形图适用于以下场景：

1. 展示数据占比的同时显示总计信息
2. 节省空间的比例展示
3. 突出显示重要的汇总数据
4. 多层级数据的嵌套展示

- [圆角环形图](./demo/donut-radius.jsx)
- [双环形图](./demo/double-donut.jsx)
- [嵌套环图](./demo/cascade.jsx)
- [环形进度条](./demo/progress-bar.jsx)
