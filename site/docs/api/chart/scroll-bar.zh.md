---
title: 滚动条 - ScrollBar
order: 10
---

ScrollBar 组件提供了数据滚动和缩放功能，支持平移、缩放、横扫等手势操作。当数据量较大或需要查看局部细节时非常有用。

## 何时使用

- 需要展示大量数据，用户需要滚动查看
- 需要支持手势缩放和平移操作
- 需要查看数据的局部细节
- 需要横扫动画快速滚动

## TypeScript 类型定义

```typescript
type ZoomRange = [number, number];

interface ScrollBarProps {
  /** 显示滚动条 */
  visible?: boolean;
  /** 滚动条显示位置 */
  position?: 'bottom' | 'top' | 'left' | 'right';
  /** 滚动条父容器样式 */
  style?: ShapeProps;
  /** 背景条样式 */
  background?: ShapeProps;
  /** 滚动条样式 */
  barStyle?: ShapeProps;
  /** 滚动模式，支持 x 轴、y 轴或双向滚动。必填 */
  mode?: 'x' | 'y' | ['x', 'y'];
  /** 初始显示范围，值为 0~1 之间的数字（如 [0.2, 0.8]）。必填，不传会导致手势操作报错 */
  range?: ZoomRange;
  /** 是否支持平移 */
  pan?: boolean;
  /** 是否支持缩放 */
  pinch?: boolean;
  /** 是否支持横扫 */
  swipe?: boolean;
  /** 横扫动画时长 */
  swipeDuration?: number;
  /** 平移灵敏度 */
  panSensitive?: number;
  /** 缩放灵敏度 */
  pinchSensitive?: number;
  /** 自动同步 x/y 的坐标值 */
  autoFit?: boolean;
  /** 最少展示数据量，默认 10 */
  minCount?: number;
  /** 平移开始回调 */
  onPanStart?: (event: PanEvent) => void;
  /** 缩放开始回调 */
  onPinchStart?: (event: PinchEvent) => void;
  /** 平移中回调 */
  onPan?: (event: PanEvent) => void;
  /** 缩放中回调 */
  onPinch?: (event: PinchEvent) => void;
  /** 平移结束回调 */
  onPanEnd?: (event: PanEvent) => void;
  /** 缩放结束回调 */
  onPinchEnd?: (event: PinchEvent) => void;
  /** 初始化回调 */
  onInit?: (context: { scale: Scale }) => void;
  /** 范围变化回调 */
  onChange?: (context: { range: ZoomRange }) => void;
}
```

## Usage

```jsx
import { Canvas, Chart, Line, ScrollBar } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Axis field="genre" />
    <Line x="genre" y="sold" />
    <ScrollBar mode="x" range={[0.5, 1]} />
  </Chart>
</Canvas>
```

## Props

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `mode` | `'x' \| 'y' \| ['x', 'y']` | - | 滚动模式，支持 x 轴、y 轴或双向滚动。**必填** |
| `range` | `ZoomRange` | - | 初始显示范围，值为 0~1 之间的数字（如 `[0.5, 1]`）。**必填**，不传会导致手势操作报错 |
| `visible` | `boolean` | `true` | 是否显示滚动条 |

### 手势配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pan` | `boolean` | `true` | 是否支持平移手势 |
| `pinch` | `boolean` | `true` | 是否支持缩放手势 |
| `swipe` | `boolean` | `false` | 是否支持横扫快速滚动 |
| `swipeDuration` | `number` | `1000` | 横扫动画时长（毫秒） |
| `panSensitive` | `number` | `1` | 平移灵敏度，值越大平移越快 |
| `pinchSensitive` | `number` | `1` | 缩放灵敏度，值越大缩放越快 |

### 样式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | 滚动条显示位置 |
| `style` | `ShapeProps` | - | 滚动条父容器样式，支持 [绘图属性](/tutorial/shape-attrs) |
| `background` | `ShapeProps` | - | 背景条样式 |
| `barStyle` | `ShapeProps` | - | 滑块样式 |

### 高级配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoFit` | `boolean` | `false` | 是否自动同步 x/y 的坐标值 |
| `minCount` | `number` | `10` | 最少展示数据量，用于控制最小缩放比例 |

### 事件回调

| 事件 | 回调参数 | 说明 |
|------|----------|------|
| `onPanStart` | `(event: PanEvent) => void` | 平移开始时触发 |
| `onPan` | `(event: PanEvent) => void` | 平移过程中触发 |
| `onPanEnd` | `(event: PanEvent) => void` | 平移结束时触发 |
| `onPinchStart` | `(event: PinchEvent) => void` | 缩放开始时触发 |
| `onPinch` | `(event: PinchEvent) => void` | 缩放过程中触发 |
| `onPinchEnd` | `(event: PinchEvent) => void` | 缩放结束时触发 |
| `onInit` | `({ scale }) => void` | 组件初始化时触发 |
| `onChange` | `({ range }) => void` | 范围变化时触发 |

## 用法示例

### 基础滚动

最简单的滚动配置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <ScrollBar mode="x" range={[0.5, 1]} />
  </Chart>
</Canvas>
```

### 垂直滚动

支持 Y 轴方向的滚动：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="value" y="category" />
    <ScrollBar mode="y" position="right" range={[0.5, 1]} />
  </Chart>
</Canvas>
```

### 双向滚动

同时支持 X 轴和 Y 轴滚动：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Point x="x" y="y" />
    <ScrollBar mode={['x', 'y']} range={[0.5, 1]} />
  </Chart>
</Canvas>
```

### 自定义初始范围

设置初始显示的数据范围：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <ScrollBar range={[0.2, 0.8]} />
  </Chart>
</Canvas>
```

### 禁用手势

只显示滚动条但禁用手势操作：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <ScrollBar mode="x" range={[0.5, 1]} pan={false} pinch={false} />
  </Chart>
</Canvas>
```

### 自定义样式

设置滚动条的样式：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <ScrollBar
      mode="x"
      range={[0.5, 1]}
      position="top"
      style={{ margin: '20px' }}
      background={{ fill: '#f0f0f0', stroke: '#ccc' }}
      barStyle={{ fill: '#1890ff' }}
    />
  </Chart>
</Canvas>
```

### 启用横扫

支持横扫快速滚动：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <ScrollBar
      mode="x"
      range={[0.5, 1]}
      swipe={true}
      swipeDuration={1500}
    />
  </Chart>
</Canvas>
```

### 监听范围变化

通过事件回调监听滚动范围变化：

```jsx
function ChartComponent() {
  const handleChange = ({ range }) => {
    console.log('当前范围:', range);
    const [start, end] = range;
    const percentage = Math.round((end - start) * 100);
    console.log(`显示 ${percentage}% 的数据`);
  }

  return (
    <Canvas context={context}>
      <Chart data={data}>
        <Line x="date" y="value" />
        <ScrollBar mode="x" range={[0.5, 1]} onChange={handleChange} />
      </Chart>
    </Canvas>
  )
}
```

### 控制最小缩放比例

设置最少展示的数据量：

```jsx
<Canvas context={context}>
  <Chart data={largeData}>
    <Line x="date" y="value" />
    <ScrollBar mode="x" range={[0.5, 1]} minCount={20} />
  </Chart>
</Canvas>
```

## 常见问题

### 滚动后数据显示不完整

检查是否设置了合理的 `minCount` 值。`minCount` 控制最小缩放比例，确保不会缩放到数据量太少。

```jsx
// 设置最少显示 20 条数据
<ScrollBar mode="x" range={[0.5, 1]} minCount={20} />
```

### 横扫不生效

确保 `swipe` 属性设置为 `true`，并且数据范围有足够的空间进行横扫。

```jsx
<ScrollBar mode="x" range={[0.5, 1]} swipe={true} swipeDuration={1000} />
```

### 滚动条位置不合适

通过 `position` 属性调整滚动条位置，通过 `style` 属性设置间距。

```jsx
<ScrollBar
  mode="x"
  range={[0.5, 1]}
  position="top"
  style={{ marginTop: '10px' }}
/>
```

### 多坐标轴同步问题

如果图表有多个坐标轴，设置 `autoFit` 为 `true` 可以自动同步其他坐标轴的显示范围。

```jsx
<ScrollBar mode="x" range={[0.5, 1]} autoFit={true} />
```

## demo 示例

- [折线图平移](/examples/line/line#pan)
- [柱状图平移](/examples/column/column#pan)
- [散点图缩放平移](/examples/point/scatter/#roam)
