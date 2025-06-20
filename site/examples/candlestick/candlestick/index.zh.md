---
title: 蜡烛图
order: 0
---

蜡烛图（K 线图）是一种专门用于展示金融数据的图表类型，通过蜡烛形状的图形来同时显示开盘价、收盘价、最高价和最低价四个关键数据。它广泛应用于股票、期货等金融数据的技术分析。

## 代码演示

### 基础示例

- [基础蜡烛图](./demo/base.jsx)：展示标准的蜡烛图，包含开盘、收盘、最高、最低价格信息。

```jsx
import { jsx, Axis, Candlestick, Canvas, Chart, Tooltip } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="time" type="timeCat" />
      <Axis field="value" formatter={(v) => Number(v).toFixed(0)} />
      <Candlestick x="time" y="value" />
      <Tooltip showCrosshairs={true} yPositionType="coord" crosshairsType="xy" showXTip showYTip />
    </Chart>
  </Canvas>
);
```

## 使用场景

蜡烛图适用于以下场景：

1. 股票价格走势分析
2. 期货和外汇市场数据展示
3. 金融技术分析和趋势预测
4. 任何需要同时展示四个相关数值的场景
