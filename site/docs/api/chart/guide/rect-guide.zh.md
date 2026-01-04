---
title: 矩形标注 - RectGuide
---

## Usage 用法

```jsx
import { Canvas, Chart, Line, RectGuide } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    <RectGuide
      records={[data[0], data[1]]}
      style={{ fill: 'yellow', fillOpacity: 0.5 }}
      offsetX={0}
      offsetY={0}
    />
  </Chart>
</Canvas>
```

## TypeScript 类型定义

```typescript
interface RectGuideProps {
  /** 矩形两个顶点对应的位置（第一个点为左上角或右下角，第二个点为对角顶点） */
  records: RecordItem[];
  /** x 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetX?: number | string;
  /** y 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetY?: number | string;
  /** 矩形样式，支持对象或函数形式 */
  style?: Partial<RectStyleProps> | ((points: Point[], chart: Chart) => Partial<RectStyleProps>);
  /** 动画配置，详见 [动画文档](/tutorial/animation) */
  animation?: AnimationProps | ((points: Point[], chart: Chart) => AnimationProps);
  /** 点击事件回调 */
  onClick?: (ev) => void;
  /** 是否显示，默认 true */
  visible?: boolean;
  /** 是否精确定位（用于 dodge 调整时的位置计算） */
  precise?: boolean;
}

interface Point {
  x: number;
  y: number;
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 矩形两个顶点对应的位置，**需要 2 个点来定义矩形**，支持特殊值（见下方说明） |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `style` | `RectStyleProps \| Function` | - | 矩形样式，支持对象或函数形式 |
| `animation` | `AnimationProps \| Function` | - | 动画配置，详见 [动画文档](/tutorial/animation) |
| `onClick` | `(ev) => void` | - | 点击事件回调 |
| `visible` | `boolean` | `true` | 是否显示 |
| `precise` | `boolean` | - | 是否精确定位（用于 dodge 调整时的位置计算） |

## records 特殊值

`records` 的值可以使用特殊字符串来表示位置，无需计算具体数值：

| 值 | 含义 | 对应位置 |
|----|------|----------|
| `'min'` | 最小值 | 0 |
| `'max'` | 最大值 | 1 |
| `'median'` | 中位值 | 0.5 |
| `'50%'` | 50% 位置 | 0.5 |
| `'100%'` | 100% 位置 | 1.0 |

**示例**：标记从最小值到最大值的矩形区域

```jsx
<RectGuide
  records={[
    { genre: 'Sports', sold: 'min' },
    { genre: 'Sports', sold: 'max' },
  ]}
/>
```

## style 属性

`style` 支持两种形式：

**对象形式**：静态样式
```jsx
style={{ fill: 'yellow', fillOpacity: 0.5, stroke: 'red', lineWidth: 2 }}
```

**函数形式**：动态样式，根据位置或数据计算样式

函数签名：`(points: Point[], chart: Chart) => RectStyleProps`

- `points`: 矩形两个顶点的**画布像素坐标**数组，每个点包含 `x` 和 `y` 属性
- `chart`: 图表实例，可访问图表配置、布局等信息

```jsx
style={(points, chart) => {
  const height = Math.abs(points[1].y - points[0].y);
  return {
    fill: height > 100 ? 'red' : 'green',
    fillOpacity: 0.3,
    stroke: height > 100 ? 'darkred' : 'darkgreen',
  };
}}
```

支持的样式属性见 [Shape 属性文档](/tutorial/shape-attrs)。

## 用法示例

### 标记两个数据点之间的区域

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    <RectGuide
      records={[data[0], data[1]]}
      style={{ fill: 'yellow', fillOpacity: 0.5 }}
      offsetX="-24px"
      offsetY="24px"
    />
  </Chart>
</Canvas>
```

### 标记最小值到最大值的区域

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    <RectGuide
      records={[
        { genre: 'Sports', sold: 'min' },
        { genre: 'Sports', sold: 'max' },
      ]}
      style={{ fill: 'rgba(255, 0, 0, 0.2)' }}
    />
  </Chart>
</Canvas>
```

### style 函数形式

```jsx
<RectGuide
  records={[data[0], data[1]]}
  style={(points, chart) => {
    // points 是画布像素坐标
    const height = Math.abs(points[1].y - points[0].y);
    return {
      fill: height > 100 ? 'red' : 'green',
      fillOpacity: 0.3,
      stroke: height > 100 ? 'darkred' : 'darkgreen',
    };
  }}
/>
```

### 半透明填充区域

```jsx
<RectGuide
  records={[
    { genre: 'Sports', sold: 'min' },
    { genre: 'Sports', sold: 'max' },
  ]}
  style={{
    fill: 'blue',
    fillOpacity: 0.1,
    stroke: 'blue',
    lineWidth: 1,
    lineDash: [4, 4],
  }}
/>
```

### 多个矩形区域组合

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {/* 高值区域标记 */}
    <RectGuide
      records={[
        { genre: 'Sports', sold: '50%' },
        { genre: 'Sports', sold: 'max' },
      ]}
      style={{ fill: 'red', fillOpacity: 0.1 }}
    />
    {/* 低值区域标记 */}
    <RectGuide
      records={[
        { genre: 'Sports', sold: 'min' },
        { genre: 'Sports', sold: '50%' },
      ]}
      style={{ fill: 'green', fillOpacity: 0.1 }}
    />
  </Chart>
</Canvas>
```

### 使用动画

```jsx
<RectGuide
  records={[
    { genre: 'Sports', sold: 'min' },
    { genre: 'Sports', sold: 'max' },
  ]}
  style={{ fill: 'yellow', fillOpacity: 0.5 }}
  animation={{
    appear: {
      duration: 450,
      easing: 'linear',
    }
  }}
/>
```

更多动画配置详见 [动画文档](/tutorial/animation)。

### 点击事件

```jsx
<RectGuide
  records={[
    { genre: 'Sports', sold: 'min' },
    { genre: 'Sports', sold: 'max' },
  ]}
  style={{ fill: 'yellow', fillOpacity: 0.5 }}
  onClick={(ev) => {
    console.log('RectGuide clicked:', ev);
  }}
/>
```

### 条件显示

通过 `visible` 属性控制显示/隐藏：

```jsx
<RectGuide
  records={[
    { genre: 'Sports', sold: 'min' },
    { genre: 'Sports', sold: 'max' },
  ]}
  style={{ fill: 'yellow', fillOpacity: 0.5 }}
  visible={showRegion}
/>
```

### 使用 chart 实例计算样式

通过 `chart` 参数访问图表布局信息，动态计算样式：

```jsx
<RectGuide
  records={[
    { genre: 'Sports', sold: 'min' },
    { genre: 'Action', sold: 'max' },
  ]}
  style={(points, chart) => {
    // points 已是画布像素坐标
    const rectWidth = Math.abs(points[1].x - points[0].x);
    return {
      fill: rectWidth > 200 ? 'blue' : 'orange',
      fillOpacity: 0.3,
    };
  }}
/>
```
