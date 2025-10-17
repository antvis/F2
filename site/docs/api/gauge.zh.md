---
title: 仪表盘 - Gauge
type: 组件
order: 5
---

仪表盘组件用于显示进度或完成度的可视化组件，常用于展示关键绩效指标（KPI）。

## 何时使用

- 需要显示单个指标的完成进度
- 展示目标值与实际值的对比
- 显示百分比或比例数据
- 仪表盘样式的数据展示

## Usage

```jsx
import { jsx, Canvas, Gauge } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Gauge
      center={{ x: 150, y: 150 }}
      startAngle={Math.PI}
      endAngle={Math.PI * 2}
      percent={0.75}
      r="100px"
    />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## Props

部分属性可参考 scale 图表度量，度量详细介绍可见：[度量](/tutorial/scale.zh.md)

### percent: number

进度值，范围 0-1，默认为 `0`

### startAngle: number

起始角度（弧度），默认为 `Math.PI`

### endAngle: number

结束角度（弧度），默认为 `Math.PI * 2`

### center: { x: number, y: number }

仪表盘中心点坐标，默认为 `{ x: 150, y: 150 }`

### r: number | string

仪表盘半径，默认为 `100`

### r0: number | string

内圆半径，默认为 `0`

### tickCount: number

刻度数量，默认为 `5`

### tickOffset: number | string

刻度偏移量，默认为 `-20px`

### tickLength: number | string

刻度长度，默认为 `10px`

### visible: boolean

是否显示，默认为 `true`

### field: string

数据字段名

## 常见问题
