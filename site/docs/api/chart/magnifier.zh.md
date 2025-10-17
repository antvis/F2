---
title: 放大镜 - Magnifier
type: 组件
order: 11
---

放大镜组件用于在图表上提供局部放大功能，帮助用户更清晰地查看数据细节。

## 何时使用

- 数据点过于密集，需要查看局部细节
- 需要放大特定区域进行详细分析

## Usage

```jsx
import { jsx, Canvas, Chart, Line, Magnifier } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');
const data = [
  { date: '2024-01-01', value: 10 },
  { date: '2024-01-02', value: 15 },
  { date: '2024-01-03', value: 8 },
  { date: '2024-01-04', value: 25 },
  { date: '2024-01-05', value: 30 },
  { date: '2024-01-06', value: 28 },
  { date: '2024-01-07', value: 35 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Line x="date" y="value" />
      <Magnifier show={true} x={200} y={150} width={100} height={80} scale={2} />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## Props

部分属性可参考 scale 图表度量，度量详细介绍可见：[度量](/tutorial/scale.zh.md)

### show: boolean

是否显示放大镜，默认为 `false`

### x: number

放大镜中心点的 x 坐标，默认为 `0`

### y: number

放大镜中心点的 y 坐标，默认为 `0`

### width: number

放大镜的宽度，默认为 `100`

### height: number

放大镜的高度，默认为 `80`

### scale: number

放大倍数，默认为 `2`

### radius: number

放大镜圆角半径，默认为 `10`

### borderWidth: number

边框宽度，默认为 `1`

### borderColor: string

边框颜色，默认为 `#e8e8e8`

### backgroundColor: string

背景颜色，默认为 `rgba(255, 255, 255, 0.9)`

### shadowBlur: number

阴影模糊程度，默认为 `10`

### shadowColor: string

阴影颜色，默认为 `rgba(0, 0, 0, 0.3)`

### visible: boolean

是否显示，默认为 `true`

### field: string

数据字段名

## 方法

可通过获取 ref 调用

### show(x: number, y: number)

在指定坐标显示放大镜

### hide()

隐藏放大镜

### updatePosition(x: number, y: number)

更新放大镜位置

### updateScale(scale: number)

更新放大倍数

## 使用场景示例

### 基础使用

```jsx
<Magnifier show={true} x={200} y={150} />
```

### 自定义样式

```jsx
<Magnifier
  show={true}
  x={200}
  y={150}
  width={120}
  height={100}
  scale={3}
  borderColor="#1890ff"
  backgroundColor="rgba(255, 255, 255, 0.95)"
  radius={20}
/>
```

### 动态控制

```jsx
const [showMagnifier, setShowMagnifier] = useState(false);
const [position, setPosition] = useState({ x: 0, y: 0 });

// 在图表点击时显示放大镜
const handleChartClick = (ev) => {
  setPosition({ x: ev.x, y: ev.y });
  setShowMagnifier(true);
};

<Magnifier show={showMagnifier} x={position.x} y={position.y} scale={2.5} />;
```

## 常见问题

### 1. 放大镜不显示

- 检查 `show` 属性是否为 `true`
- 确认 `x` 和 `y` 坐标是否在图表范围内
- 检查 `visible` 属性是否为 `true`
