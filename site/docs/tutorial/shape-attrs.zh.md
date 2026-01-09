---
title: 绘图属性 - Style
order: 7
---

F2 底层使用了 [G](https://g.antv.antgroup.com/api/basic/concept) 绘图引擎。本篇列出了常见的绘图属性，更多关于绘图以及绘图属性的使用请至 [G](https://g.antv.antgroup.com/) 中查看。

在 F2 中组件样式的定义全部直接使用 Style 统一的结构，例如 axis 的 label 样式、legend marker 样式、和其他自定义 shape 样式等等。

## 属性列表

### 位置属性

对于不同的图形，位置的几何意义也不同：

| 图形 | 位置说明 | 使用的属性 |
|------|----------|------------|
| [Circle](/tutorial/shape.zh.md#circle) | 圆心位置 | `cx/cy` |
| [Arc](/tutorial/shape.zh.md#arc) | 圆心位置 | `cx/cy` |
| [Sector](/tutorial/shape.zh.md#sector) | 圆心位置 | `cx/cy` |
| [Group](/tutorial/shape.zh.md#group) | 左上角顶点位置 | `x/y` |
| [Rect](/tutorial/shape.zh.md#rect) | 左上角顶点位置 | `x/y` |
| [Image](/tutorial/shape.zh.md#image) | 左上角顶点位置 | `x/y` |
| [Text](/tutorial/shape.zh.md#text) | 文本锚点位置 | `x/y` |
| [Line](/tutorial/shape.zh.md#line) | 包围盒左上角顶点位置 | `x/y` |
| [Polyline](/tutorial/shape.zh.md#polyline) | 包围盒左上角顶点位置 | `x/y` |
| [Polygon](/tutorial/shape.zh.md#polygon) | 包围盒左上角顶点位置 | `x/y` |

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `anchor` | `[number, number]` | `[0, 0]` | 锚点位置 |

### 通用属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `zIndex` | `number` | `0` | 控制图形显示层级 |
| `clip` | `Clip` | - | 创建元素的可显示区域，区域内的部分显示，区域外的隐藏。见[裁剪](#裁剪) |
| `visibility` | `string` | - | 控制图形的可见性，见 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility) |
| `opacity` | `number` | `1` | 设置图形和图片透明度，范围从 0.0（完全透明）到 1.0（完全不透明） |
| `fill` | `string \| Gradient \| Pattern` | - | 填充色、[渐变](#渐变色)或[纹理](#纹理) |
| `fillOpacity` | `number` | `1` | 设置图形填充颜色的透明度，范围从 0.0 到 1.0 |
| `stroke` | `string \| Gradient \| Pattern` | - | 描边色、[渐变](#渐变色)或[纹理](#纹理) |
| `strokeOpacity` | `number` | `1` | 设置边颜色的透明度，范围从 0.0 到 1.0 |
| `shadowType` | `string` | - | 阴影类型，支持 `'outer'` 外阴影和 `'inner'` 内阴影 |
| `shadowColor` | `string` | - | 阴影颜色，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor) |
| `shadowBlur` | `number` | `0` | 阴影模糊程度，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur) |
| `shadowOffsetX` | `number` | `0` | 阴影水平偏移距离，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX) |
| `shadowOffsetY` | `number` | `0` | 阴影垂直偏移距离，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY) |
| `filter` | `string` | - | 滤镜，支持 blur、brightness、drop-shadow、contrast、grayscale、saturate、sepia、hue-rotate、invert 等，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/filter) |
| `cursor` | `string` | - | 鼠标样式，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor) |

### 线条属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `lineCap` | `string` | `'butt'` | 线段末端样式，可选值：`'butt'`、`'round'`、`'square'`，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap) |
| `lineJoin` | `string` | `'miter'` | 线段连接处样式，可选值：`'bevel'`、`'round'`、`'miter'`，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin) |
| `lineWidth` | `number` | `1` | 线段宽度，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth) |
| `miterLimit` | `number` | `10` | 斜接面限制比例，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit) |
| `lineDash` | `number[]` | `[]` | 虚线样式，如 `[5, 5]` 表示 5px 实线、5px 空白，见 [setLineDash](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash) |

### 文本属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `textAlign` | `string` | `'start'` | 文本水平对齐方式，可选值：`'start'`、`'center'`、`'end'`、`'left'`、`'right'` |
| `textBaseline` | `string` | `'alphabetic'` | 文本垂直基线，可选值：`'top'`、`'hanging'`、`'middle'`、`'alphabetic'`、`'ideographic'`、`'bottom'` |
| `fontStyle` | `string` | `'normal'` | 字体样式，可选值：`'normal'`、`'italic'`、`'oblique'` |
| `fontSize` | `number` | `12` | 字号（像素） |
| `fontFamily` | `string` | `'sans-serif'` | 字体系列 |
| `fontWeight` | `string` | `'normal'` | 字体粗细，可选值：`'normal'`、`'bold'`、`'bolder'`、`'lighter'`、`'100'`~`'900'` |
| `fontVariant` | `string` | `'normal'` | 字体变体，可选值：`'normal'`、`'small-caps'` |
| `lineHeight` | `number` | - | 行高（像素） |

## 渐变色

F2 提供与 CSS 用法一致的渐变色使用方法，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient)。

渐变效果包括线性和径向渐变、多个渐变叠加等：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*sXoJTKPWg70AAAAAAAAAAAAAARQnAQ" width="400" alt="gradient">

### 线性渐变

线性渐变指创建一个表示两种或多种颜色沿某一方向线性变化。渐变方向默认为从左到右（与 Canvas / SVG 保持一致），且可以多个渐变叠加。

```jsx
// 基础线性渐变
<rect
  style={{
    x: 10,
    y: 10,
    width: 200,
    height: 100,
    fill: 'linear-gradient(90deg, blue, green 40%, red)',
  }}
/>
```

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*aU84RIJaH6AAAAAAAAAAAAAAARQnAQ" width="300" alt="linear gradient">

### 径向渐变

径向渐变指从图形中心发出的两种或者多种颜色之间的逐步过渡变化。

```jsx
// 径向渐变
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 80,
    fill: 'radial-gradient(circle at center, red, blue, green 100%)',
  }}
/>
```

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*Z4QLTr3lC80AAAAAAAAAAAAAARQnAQ" width="300" alt="radial gradient">

### 渐变类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `linear-gradient(angle, ...)` | 线性渐变，angle 为角度 | `linear-gradient(90deg, red, blue)` |
| `radial-gradient(shape at position, ...)` | 径向渐变 | `radial-gradient(circle at center, red, blue)` |

## 纹理

使用相同的图案填充图形，支持的 Pattern 可以是图片 URL、`HTMLImageElement`、`HTMLCanvasElement`、`HTMLVideoElement` 和 `Rect` 等，还可以指定重复方向。

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*cRmFTItZOtYAAAAAAAAAAAAAARQnAQ" width="400" alt="pattern">

### Pattern 类型定义

```typescript
interface Pattern {
  image: string | CanvasImageSource | Rect
  repetition?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'
  transform?: string
}
```

### 使用示例

```jsx
// 使用纹理填充，在水平和垂直方向重复图片
<rect
  style={{
    x: 10,
    y: 10,
    width: 200,
    height: 200,
    fill: {
      image: 'https://gw.alipayobjects.com/zos/rmsportal/ibtwzHXSxomqbZCPMLqS.png',
      repetition: 'repeat',
      transform: 'rotate(30deg)',
    },
  }}
/>
```

### repetition 参数说明

| 值 | 说明 |
|------|------|
| `'repeat'` | 水平和垂直方向重复 |
| `'repeat-x'` | 仅水平方向重复 |
| `'repeat-y'` | 仅垂直方向重复 |
| `'no-repeat'` | 不重复 |

## 裁剪

参考 [CSS clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)。该属性值可以定义可视区域，可以是任意图形，例如 Circle、Rect 等。同一个裁剪区域可以被多个图形共享使用，并且裁剪区域也会影响图形的拾取区域。

### 使用示例

```jsx
// 圆形裁剪
<rect
  style={{
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: 'blue',
    clip: {
      type: 'circle',
      style: {
        cx: 150,
        cy: 150,
        r: 50,
      },
    },
  }}
/>

// 矩形裁剪
<rect
  style={{
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: 'red',
    clip: {
      type: 'rect',
      style: {
        x: 150,
        y: 150,
        width: 100,
        height: 100,
      },
    },
  }}
/>
```

### Clip 类型定义

```typescript
type Clip =
  | {
      type: 'circle'
      style: CircleStyle
    }
  | {
      type: 'rect'
      style: RectStyle
    }
  | {
      type: 'polygon'
      style: PolygonStyle
    }
```

## TypeScript 类型定义

```typescript
interface ShapeStyle {
  // 位置
  anchor?: [number, number]

  // 通用属性
  zIndex?: number
  clip?: Clip
  visibility?: 'visible' | 'hidden' | 'collapse'
  opacity?: number
  fill?: string | Gradient | Pattern
  fillOpacity?: number
  stroke?: string | Gradient | Pattern
  strokeOpacity?: number
  shadowType?: 'outer' | 'inner'
  shadowColor?: string
  shadowBlur?: number
  shadowOffsetX?: number
  shadowOffsetY?: number
  filter?: string
  cursor?: string

  // 线条属性
  lineCap?: 'butt' | 'round' | 'square'
  lineJoin?: 'bevel' | 'round' | 'miter'
  lineWidth?: number
  miterLimit?: number
  lineDash?: number[]

  // 文本属性
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right'
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontSize?: number
  fontFamily?: string
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  fontVariant?: 'normal' | 'small-caps'
  lineHeight?: number
}

type Gradient = string // 'linear-gradient(...)' | 'radial-gradient(...)'

interface Pattern {
  image: string | CanvasImageSource | Rect
  repetition?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'
  transform?: string
}
```

## 常见问题

### 如何设置透明度？

使用 `opacity` 设置整体透明度，或使用 `fillOpacity` 和 `strokeOpacity` 分别设置填充和描边透明度：

```jsx
// 整体透明度
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'red',
    opacity: 0.5,
  }}
/>

// 分别设置填充和描边透明度
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'red',
    fillOpacity: 0.5,
    stroke: 'blue',
    strokeOpacity: 0.8,
    lineWidth: 2,
  }}
/>
```

### 如何添加阴影？

使用阴影相关属性：

```jsx
<rect
  style={{
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: 'blue',
    shadowType: 'outer',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
  }}
/>
```

### 如何设置虚线？

使用 `lineDash` 属性：

```jsx
<line
  style={{
    x1: 10,
    y1: 10,
    x2: 200,
    y2: 10,
    stroke: '#000',
    lineWidth: 2,
    lineDash: [10, 5], // 10px 实线，5px 空白
  }}
/>
```

### 渐变色如何使用？

渐变色可以直接作为 `fill` 或 `stroke` 的值：

```jsx
// 线性渐变填充
<rect
  style={{
    x: 10,
    y: 10,
    width: 200,
    height: 100,
    fill: 'linear-gradient(90deg, red 0%, yellow 50%, blue 100%)',
  }}
/>

// 径向渐变描边
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    stroke: 'radial-gradient(circle, white, black)',
    lineWidth: 5,
  }}
/>
```

### 如何控制图形层级？

使用 `zIndex` 属性，值越大越靠前：

```jsx
<group>
  <rect
    style={{
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      fill: 'red',
      zIndex: 1,
    }}
  />
  <rect
    style={{
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: 'blue',
      zIndex: 2, // 会显示在红色矩形上方
    }}
  />
</group>
```

## 相关文档

- [图形标签](/tutorial/shape.zh.md)
- [图形动画](/tutorial/animation.zh.md)
- [图形事件](/tutorial/event.zh.md)
- [图形使用](/tutorial/graphic.zh.md)
