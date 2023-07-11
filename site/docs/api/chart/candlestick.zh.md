---
title: K 线图 - Candlestick
order: 5
---

用于 K 线图, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Axis, Candlestick, Canvas, Chart, jsx } from '@antv/f2';

const data = [
  {
    time: '2017-10-24',
    // 格式为：[open, close, lowest, highest]
    value: [20, 34, 10, 38],
  },
  {
    time: '2017-10-25',
    value: [40, 35, 30, 50],
  },
  {
    time: '2017-10-26',
    value: [31, 38, 33, 44],
  },
  {
    time: '2017-10-27',
    value: [38, 15, 5, 42],
  },
];

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="time" />
      <Axis field="value" />
      <Candlestick x="time" y="value" />
    </Chart>
  </Canvas>
);
```

## 数据结构说明

y 轴字段格式为：`[open, close, lowest, highest]` 分别代表：`[开盘价, 收盘价, 最低价, 最高价]`

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

### color

设置「涨」、「跌」、「平盘」颜色，格式为：`[上涨颜色, 下跌颜色, 平盘颜色]`, 默认值为： `['#E62C3B', '#0E9976', '#999999']`

```jsx
<Candlestick x="time" y="value" color={{ range: ['#E62C3B', '#0E9976', '#999999'] }} />
```

### sizeRatio

矩形的大小比例，范围 `[0, 1]`, 默认为 `0.5`, 表示矩形的宽度和空白处各占 `50%`

```jsx
<Candlestick x="time" y="value" sizeRatio={0.8} />
```

## 方法
