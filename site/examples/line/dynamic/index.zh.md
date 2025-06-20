---
title: 动态折线图
order: 2
---

动态折线图是一种具有动画效果的折线图，能够展示数据随时间的实时变化。通过动态更新数据和平滑的动画过渡，可以生动地展现数据的变化过程，增强数据的表现力。

## 代码演示

### 基础示例

- [动态折线图](./demo/dynamic.jsx)：展示数据实时更新的动态折线图。

```jsx
import { jsx, Canvas, Chart, Line, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data} animate={true}>
      <Axis field="time" />
      <Axis field="value" />
      <Line
        x="time"
        y="value"
        animate={{
          appear: {
            animation: 'fadeIn',
            duration: 1000,
          },
          update: {
            animation: 'fadeIn',
            duration: 500,
          },
        }}
      />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [黄金价格动态图](./demo/gold.jsx)：展示黄金价格变化的动态折线图。

## 使用场景

动态折线图适用于以下场景：

1. 实时数据监控和展示
2. 股票价格、汇率等金融数据
3. 传感器数据的实时可视化
4. 需要突出数据变化过程的场景
