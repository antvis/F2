---
title: 画布 - Canvas
order: 2
redirect_from:
  - /zh/docs/api
---

Canvas 是 F2 的顶层组件，负责创建画布上下文和管理图表渲染。它是所有 F2 图表的根容器。

## 何时使用

- 需要创建任何 F2 图表
- 需要控制画布的尺寸、像素比和动画
- 需要在画布上渲染多个图表或组件

## TypeScript 类型定义

```typescript
interface CanvasProps {
  /** 画布上下文 */
  context: CanvasRenderingContext2D;
  /** 像素比，默认为 window.devicePixelRatio */
  pixelRatio?: number;
  /** 画布宽度 */
  width?: number;
  /** 画布高度 */
  height?: number;
  /** 是否执行动画，默认为 true */
  animate?: boolean;
  /** 插槽内容 */
  children?: React.ReactNode;
}
```

## Usage

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context} pixelRatio={1} width={300} height={300}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

## Props

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `context` | `CanvasRenderingContext2D` | - | 画布的上下文，必须为标准的 CanvasRenderingContext2D 对象 |

### 尺寸配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number` | - | 画布宽度（像素） |
| `height` | `number` | - | 画布高度（像素） |

### 渲染配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pixelRatio` | `number` | `window.devicePixelRatio` | 像素比，用于高清屏适配 |
| `animate` | `boolean` | `true` | 是否执行动画 |

## 用法示例

### 基础用法

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

### 设置像素比

```jsx
<Canvas context={context} pixelRatio={1}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

### 设置画布尺寸

```jsx
<Canvas context={context} width={300} height={300}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

### 禁用动画

```jsx
<Canvas context={context} animate={false}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

### 完整配置

```jsx
<Canvas
  context={context}
  pixelRatio={1}
  width={300}
  height={300}
  animate={false}
>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

## 方法

### render()

渲染画布内容。

```javascript
const canvas = new Canvas(props)
await canvas.render()
```

### resize(width, height)

调整画布尺寸。

```javascript
await canvas.resize(200, 200)
```

## context 属性说明

`context` 属性必须是一个标准的 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对象。以下是获取 context 的常见方式：

### 浏览器环境

```javascript
const canvas = document.getElementById('container')
const context = canvas.getContext('2d')
```

### 小程序环境

```javascript
const query = wx.createSelectorQuery()
query.select('#myChart')
  .fields({ node: true, size: true })
  .exec((res) => {
    const canvas = res[0].node
    const context = canvas.getContext('2d')
  })
```

### Node.js 环境

```javascript
const { createCanvas } = require('canvas')
const canvas = createCanvas(300, 300)
const context = canvas.getContext('2d')
```

## 常见问题

### 画布模糊

在高清屏上，画布可能会显示模糊。解决方案是设置 `pixelRatio`：

```jsx
<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  {/* ... */}
</Canvas>
```

### 动画卡顿

如果设备性能较差，可以禁用动画：

```jsx
<Canvas context={context} animate={false}>
  {/* ... */}
</Canvas>
```

### 尺寸不正确

确保设置正确的 `width` 和 `height`：

```jsx
<Canvas context={context} width={300} height={300}>
  {/* ... */}
</Canvas>
```
