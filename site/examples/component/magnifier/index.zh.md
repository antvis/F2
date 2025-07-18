---
title: 放大镜
order: 10
---

放大镜（Magnifier）组件可用于在动态图表中聚焦和放大最新的数据详情，适合实时数据监控、流式数据可视化等场景。

## 代码演示

- [动态折线图放大镜](./demo/magnifier-dynamic.jsx)：结合放大镜功能的动态折线图，便于聚焦最新数据变化。

```jsx
import { jsx, Canvas, Chart, Line, Axis, Magnifier } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Line x="time" y="value" color="#1890FF" />
      <Magnifier
        focusRange={[data.length - 9, data.length - 1]}
        frameStyle={{
          background: '#fff',
          boxShadow: '0 2px 8px rgba(24,144,255,0.15)',
        }}
      />
      <Axis field="value" />
      <Axis field="time" />
    </Chart>
  </Canvas>
);
```

## 参数说明

| 参数       | 说明                | 类型                                 | 默认值 |
| ---------- | ------------------- | ------------------------------------ | ------ |
| focusRange | 聚焦的数据范围索引  | [number, number]                     | -      |
| radius     | 放大镜半径，支持 px | number \| string                     | '50px' |
| position   | 放大镜中心位置      | [number, number] \| [string, string] | -      |
| offsetX    | 放大镜 X 方向偏移量 | number \| string                     | -      |
| offsetY    | 放大镜 Y 方向偏移量 | number \| string                     | -      |
| frameStyle | 放大镜外框样式      | object                               | -      |
| lineStyle  | 放大镜内折线样式    | object                               | -      |
| lines      | 放大镜内辅助线配置  | array                                | -      |

## 使用场景

放大镜组件适用于以下场景：

1. 实时数据监控与展示
2. 需要聚焦最新数据的场景
3. 股票、传感器等流式数据可视化
