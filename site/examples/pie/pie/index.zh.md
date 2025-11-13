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
    <Chart
      data={data}
      coord={{
        transposed: true,
        type: 'polar',
      }}
    >
      <Interval x="a" y="percent" adjust="stack" color="name" />
    </Chart>
  </Canvas>
);
```

- [可选中饼图](./demo/selection.jsx)：支持点击选中扇形的交互功能。下面示例展示如何在饼图中实现点击选中效果，并配合 PieLabel 调整选中项样式（示例采用 React 风格的状态管理）：

```jsx
import { jsx, Canvas, Chart, Interval, PieLabel } from '@antv/f2';
const data = [
  {
    name: '长津湖',
    percent: 0.4,
    a: '1',
  },
  {
    name: '我和我的父辈',
    percent: 0.2,
    a: '1',
  },
  {
    name: '失控玩家',
    percent: 0.18,
    a: '1',
  },
  {
    name: '宝可梦',
    percent: 0.15,
    a: '1',
  },
  {
    name: '峰爆',
    percent: 0.05,
    a: '1',
  },
  {
    name: '其他',
    percent: 0.02,
    a: '1',
  },
];
const { props } = (
  <Canvas context={context}>
    <Chart data={data} coord={{ transposed: true, type: 'polar' }}>
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color="name"
        selection={{
          selectedStyle: (record) => {
            const { yMax, yMin } = record;
            return {
              // 半径放大 1.1 倍
              r: (yMax - yMin) * 1.1,
            };
          },
        }}
      />
      <PieLabel
        type="spider"
        label1={(data, record) => {
          return {
            text: data.name,
            fill: record.color,
          };
        }}
        label2=""
      />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [带文本饼图](./demo/pie-with-label.jsx)：在饼图上显示标签文本和数值。
- [标签连接线饼图](./demo/labelline-pie.jsx)：通过连接线将标签与对应扇形连接。

## 使用场景

饼图适用于以下场景：

1. 展示各个类别在总体中的占比
2. 分析数据的构成比例
3. 对比不同类别的相对大小
4. 展示百分比分布情况
