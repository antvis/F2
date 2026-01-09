---
title: 图形标签 - Shape
order: 6
---

F2 底层使用了 [G](https://g.antv.antgroup.com/api/basic/concept) 绘图引擎。本篇列出了常见的图形标签。

## 如何使用

详见：[图形使用](/tutorial/graphic.zh.md)

## 图形标签列表

- [group](#group) 分组
  - [rect](#rect) 矩形
  - [circle](#circle) 圆
  - [sector](#sector) 扇形
  - [polygon](#polygon) 多边形
  - [line](#line) 线
  - [arc](#arc) 圆弧
  - [polyline](#polyline) 多点线段
  - [text](#text) 文本
  - [image](#image) 图片

## 通用属性

所有图形标签支持的通用属性：

| 属性 | 类型 | 描述 |
|------|------|------|
| `className` | `string` | 对象标记，由用户指定 |
| `visible` | `boolean` | 显示或隐藏图形 |
| `zIndex` | `number` | z-index 值，用于调整绘制顺序 |
| `style` | `Style` | 图形样式 |
| `animation` | `Animation` | 图形动画 |
| `onPan` 等 | `Event` | 图形事件 |

### Style 绘图属性

更多详情：[绘图属性](/tutorial/shape-attrs.zh.md)

### Animation 动画属性

更多详情：[图形动画属性](/tutorial/animation.zh.md)

### Event 事件属性

更多详情：[图形事件属性](/tutorial/event.zh.md)

### 演示示例

- [图形标签](/examples/component/shape#shape)

## group

包含一组图形，用于图形分组管理。

### 基础示例

```jsx
<group className="my-group">
  <rect style={{ x: 10, y: 10, width: 50, height: 50, fill: 'red' }} />
  <rect style={{ x: 70, y: 10, width: 50, height: 50, fill: 'blue' }} />
</group>
```

### 使用场景

- 将多个图形组合在一起
- 统一管理一组图形的变换和动画
- 创建可复用的图形组件

## rect

矩形，用于绘制矩形区域。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `x` | `number` | 左上角 x 坐标 | `0` |
| `y` | `number` | 左上角 y 坐标 | `0` |
| `width` | `number` | 宽度 | `0` |
| `height` | `number` | 高度 | `0` |
| `radius` | `number \| number[]` | 圆角半径 | `0` |

### 基础示例

```jsx
// 基础矩形
<rect
  style={{
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

### 圆角矩形

```jsx
// 统一圆角
<rect
  style={{
    x: 100,
    y: 100,
    width: 100,
    height: 50,
    radius: 10,
    fill: 'blue',
  }}
/>

// 分别设置每个角
<rect
  style={{
    x: 100,
    y: 100,
    width: 100,
    height: 50,
    radius: [10, 20, 30, 40], // [top-left, top-right, bottom-right, bottom-left]
    fill: 'green',
  }}
/>
```

## circle

圆形，用于绘制圆形区域。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `cx` | `number` | 圆心 x 坐标 | `0` |
| `cy` | `number` | 圆心 y 坐标 | `0` |
| `r` | `number` | 圆的半径 | `0` |

### 基础示例

```jsx
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

## sector

扇形，用于绘制饼图、环形图等。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `cx` | `number` | 圆心 x 坐标 | `0` |
| `cy` | `number` | 圆心 y 坐标 | `0` |
| `r` | `number` | 外半径 | `0` |
| `r0` | `number` | 内半径 | `0` |
| `startAngle` | `number \| string` | 起始角度/弧度 | `0` |
| `endAngle` | `number \| string` | 结束角度/弧度 | `0` |
| `anticlockwise` | `boolean` | 是否逆时针方向 | `false` |

### 基础示例

```jsx
// 使用弧度
<sector
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: 0,
    endAngle: Math.PI / 2,
    fill: 'red',
  }}
/>

// 使用角度
<sector
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: '0 deg',
    endAngle: '90 deg',
    fill: 'blue',
  }}
/>
```

### 环形扇形

```jsx
<sector
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    r0: 30,
    startAngle: 0,
    endAngle: Math.PI,
    fill: 'green',
  }}
/>
```

## polygon

多边形，用于绘制任意多边形。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `points` | `[number, number][]` | 多边形的顶点坐标数组 | `[]` |

### 基础示例

```jsx
// 三角形
<polygon
  style={{
    points: [
      [50, 10],
      [90, 90],
      [10, 90],
    ],
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

### 复杂多边形

```jsx
// 五边形
<polygon
  style={{
    points: [
      [50, 10],
      [90, 40],
      [75, 90],
      [25, 90],
      [10, 40],
    ],
    lineWidth: '2px',
    stroke: '#000',
    fill: 'blue',
  }}
/>
```

## line

直线，用于绘制两点之间的线段。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `x1` | `number` | 起始点 x 坐标 | `0` |
| `y1` | `number` | 起始点 y 坐标 | `0` |
| `x2` | `number` | 结束点 x 坐标 | `0` |
| `y2` | `number` | 结束点 y 坐标 | `0` |

### 基础示例

```jsx
<line
  style={{
    x1: 10,
    y1: 10,
    x2: 100,
    y2: 100,
    lineWidth: '2px',
    stroke: '#000',
  }}
/>
```

### 虚线

```jsx
<line
  style={{
    x1: 10,
    y1: 10,
    x2: 100,
    y2: 100,
    lineWidth: '2px',
    stroke: '#000',
    lineDash: [5, 5],
  }}
/>
```

## arc

圆弧，用于绘制圆弧形曲线。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `cx` | `number` | 圆心 x 坐标 | `0` |
| `cy` | `number` | 圆心 y 坐标 | `0` |
| `r` | `number` | 半径 | `0` |
| `startAngle` | `number \| string` | 起始角度/弧度 | `0` |
| `endAngle` | `number \| string` | 结束角度/弧度 | `0` |
| `anticlockwise` | `boolean` | 是否逆时针方向 | `false` |

### 基础示例

```jsx
<arc
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: 0,
    endAngle: Math.PI,
    lineWidth: '2px',
    stroke: '#000',
  }}
/>
```

## polyline

多点线段，用于绘制连续的折线。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `points` | `[number, number][]` | 线段的点坐标数组 | `[]` |
| `smooth` | `boolean` | 是否平滑曲线 | `false` |

### 基础示例

```jsx
// 折线
<polyline
  style={{
    points: [
      [10, 10],
      [50, 50],
      [80, 70],
    ],
    lineWidth: '2px',
    stroke: '#000',
  }}
/>
```

### 平滑曲线

```jsx
<polyline
  style={{
    points: [
      [10, 10],
      [50, 50],
      [80, 70],
      [100, 30],
    ],
    lineWidth: '2px',
    stroke: '#000',
    smooth: true,
  }}
/>
```

## text

文本，用于显示文字。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `x` | `number` | 文本 x 坐标 | `0` |
| `y` | `number` | 文本 y 坐标 | `0` |
| `text` | `string` | 文本内容 | `''` |
| `textAlign` | `string` | 文本水平对齐方式 | `'start'` |
| `textBaseline` | `string` | 文本垂直基线 | `'alphabetic'` |
| `fontStyle` | `string` | 字体样式 | `'normal'` |
| `fontSize` | `number` | 字号（像素） | `12` |
| `fontFamily` | `string` | 字体系列 | `'sans-serif'` |
| `fontWeight` | `string` | 字体粗细 | `'normal'` |
| `fontVariant` | `string` | 字体变体 | `'normal'` |
| `lineHeight` | `number` | 行高（像素） | - |

### textAlign 可选值

- `'start'` - 默认，文本从指定位置开始
- `'center'` - 文本居中对齐
- `'end'` - 文本从指定位置结束
- `'left'` - 文本左对齐
- `'right'` - 文本右对齐

### textBaseline 可选值

- `'top'` - 文本顶部对齐
- `'hanging'` - 悬挂基线
- `'middle'` - 文本垂直居中
- `'alphabetic'` - 默认，字母基线
- `'ideographic'` - 表意基线
- `'bottom'` - 文本底部对齐

### 基础示例

```jsx
// 简单文本
<text
  style={{
    x: 100,
    y: 100,
    text: 'Hello F2',
    fontSize: 20,
    fill: '#000',
  }}
/>
```

### 对齐方式

```jsx
// 居中文本
<text
  style={{
    x: 150,
    y: 100,
    text: '居中文本',
    fontSize: 16,
    textAlign: 'center',
    textBaseline: 'middle',
    fill: '#000',
  }}
/>
```

### 字体样式

```jsx
// 粗体斜体
<text
  style={{
    x: 100,
    y: 100,
    text: '粗体斜体',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fill: '#000',
  }}
/>
```

## image

图片，用于显示图像。

### Style 属性

| 属性 | 类型 | 描述 | 默认值 |
|------|------|------|--------|
| `x` | `number` | 左上角 x 坐标 | `0` |
| `y` | `number` | 左上角 y 坐标 | `0` |
| `width` | `number` | 宽度 | `0` |
| `height` | `number` | 高度 | `0` |
| `src` | `string` | 图片 URL | `''` |
| `cacheImage` | `boolean` | 是否缓存图片（解决闪动问题） | `false` |

### 基础示例

```jsx
<image
  style={{
    src: 'https://f2.antv.vision/favicon-32x32.png',
    x: 10,
    y: 10,
    width: 32,
    height: 32,
  }}
/>
```

### 缓存图片

```jsx
// 如果图片有闪动，可以开启缓存
<image
  style={{
    src: 'https://example.com/image.png',
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    cacheImage: true,
  }}
/>
```

## TypeScript 类型定义

```typescript
interface ShapeProps {
  className?: string
  visible?: boolean
  zIndex?: number
  style?: ShapeStyle
  animation?: Animation
  // 事件处理器
  onPan?: (event: Event) => void
  onTap?: (event: Event) => void
  onPress?: (event: Event) => void
  // ... 其他事件
}

interface RectStyle {
  x?: number
  y?: number
  width?: number
  height?: number
  radius?: number | number[]
  fill?: string
  stroke?: string
  lineWidth?: number | string
  lineDash?: number[]
  // ... 通用样式属性
}

interface CircleStyle {
  cx?: number
  cy?: number
  r?: number
  fill?: string
  stroke?: string
  lineWidth?: number | string
  // ... 通用样式属性
}

interface SectorStyle {
  cx?: number
  cy?: number
  r?: number
  r0?: number
  startAngle?: number | string
  endAngle?: number | string
  anticlockwise?: boolean
  fill?: string
  stroke?: string
  // ... 通用样式属性
}

interface PolygonStyle {
  points?: [number, number][]
  fill?: string
  stroke?: string
  lineWidth?: number | string
  // ... 通用样式属性
}

interface LineStyle {
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  stroke?: string
  lineWidth?: number | string
  lineDash?: number[]
  // ... 通用样式属性
}

interface ArcStyle {
  cx?: number
  cy?: number
  r?: number
  startAngle?: number | string
  endAngle?: number | string
  anticlockwise?: boolean
  stroke?: string
  lineWidth?: number | string
  // ... 通用样式属性
}

interface PolylineStyle {
  points?: [number, number][]
  stroke?: string
  lineWidth?: number | string
  smooth?: boolean
  lineDash?: number[]
  // ... 通用样式属性
}

interface TextStyle {
  x?: number
  y?: number
  text?: string
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right'
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontSize?: number
  fontFamily?: string
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  fontVariant?: 'normal' | 'small-caps'
  lineHeight?: number
  fill?: string
  // ... 通用样式属性
}

interface ImageStyle {
  x?: number
  y?: number
  width?: number
  height?: number
  src?: string
  cacheImage?: boolean
}
```

## 常见问题

### 如何绘制带边框的图形？

使用 `stroke` 和 `lineWidth` 属性：

```jsx
<rect
  style={{
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    fill: 'blue',
    stroke: 'red',
    lineWidth: 2,
  }}
/>
```

### 如何绘制虚线？

使用 `lineDash` 属性：

```jsx
<line
  style={{
    x1: 10,
    y1: 10,
    x2: 100,
    y2: 10,
    stroke: '#000',
    lineWidth: 2,
    lineDash: [5, 5], // 5px 实线，5px 空白
  }}
/>
```

### 如何绘制半透明图形？

使用 `fillOpacity` 或 `strokeOpacity` 属性：

```jsx
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'red',
    fillOpacity: 0.5,
  }}
/>
```

### sector 的角度如何设置？

支持两种方式：

```jsx
// 方式 1: 弧度值（推荐）
<sector
  style={{
    startAngle: 0,
    endAngle: Math.PI / 2, // 90 度
  }}
/>

// 方式 2: 角度字符串
<sector
  style={{
    startAngle: '0 deg',
    endAngle: '90 deg',
  }}
/>
```

## 相关文档

- [绘图属性](/tutorial/shape-attrs.zh.md)
- [图形动画](/tutorial/animation.zh.md)
- [图形事件](/tutorial/event.zh.md)
- [图形使用](/tutorial/graphic.zh.md)
