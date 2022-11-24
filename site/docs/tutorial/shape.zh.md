---
title: 图形标签 - Shape
order: 6
---

F2 底层使用了 [G](https://g.antv.vision/zh/docs/api/shape/attrs) 绘图引擎。本篇列出了常见的图形标签

## 如何使用

详见：[图形使用](/zh/docs/tutorial/graphic)

## 图形标签

- [group](#group) 分组
  - [rect](#rect) 矩形
  - [circle](#circle) 圆
  - [sector](#sector) 扇形
  - [polygon](#polygon) 多边形
  - [line](#line) 线
  - [arc](#arc) 圆弧
  - [polyline](#polyline) 多点线段
  - [text](#text) 文本

## 图形属性

### Props

| **属性名**  | **类型** | **描述**                       |
| ----------- | -------- | ------------------------------ |
| `className` | String   | 对象标记，由用户指定           |
| `visible`   | Boolean  | 显示还是隐藏。                 |
| `zIndex`    | Number   | z-index 值，用于调整绘制顺序。 |
| `attrs`     | Attrs    | 图形样式                       |

### Attrs [绘图属性](/zh/docs/tutorial/shape-attrs)

更多详情可见：[绘图属性](/zh/docs/tutorial/shape-attrs)

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `fill` | String | 填充色、[渐变](/zh/docs/tutorial/shape-attrs#渐变色)或[纹理](/zh/docs/tutorial/shape-attrs#纹理)，默认值为空。 |
| `fillOpacity` | Number | 用于设置图形填充颜色的透明度，默认值是 1。 |
| `stroke` | String | 描边色、[渐变](/zh/docs/tutorial/shape-attrs#渐变色)或[纹理](/zh/docs/tutorial/shape-attrs#纹理)，默认值为空； |
| `strokeOpacity` | Number | 用于设置边颜色的透明度，默认值是 1。 |
| `lineWidth` | px | 描边的大小 |
| `shadowColor` | String | 描述阴影颜色的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor)。 |
| `shadowBlur` | Number | 描述模糊效果程度的属性； 它既不对应像素值也不受当前转换矩阵的影响。 默认值是 0，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur)。 |
| `shadowOffsetX` | Number | 描述阴影水平偏移距离的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)。 |
| `shadowOffsetY` | Number | 描述阴影垂直偏移距离的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)。 |
| `opacity` | Number | 设置图形和图片透明度的属性，默认值是 1。 数值的范围从 0.0 （完全透明）到 1.0 （完全不透明）。 |

### 演示

- [图形标签](/zh/examples/component/shape#shape)

## group

包含一组图形

### 示例

```jsx
<group className="group">
  <rect ... />
  <rect ... />
</group>
```

## rect

矩形

### Attrs

| **属性名** | **类型**           | **描述**      |
| ---------- | ------------------ | ------------- |
| `x`        | Number             | 左上角 x 坐标 |
| `y`        | Number             | 左上角 y 坐标 |
| `width`    | Number             | 宽度          |
| `height`   | Number             | 高度          |
| `radius`   | Number \| Number[] | 圆角          |

### 示例

```jsx
<rect
  attrs={{ x: 100, y: 100, width: 50, height: 50, lineWidth: '2px', stroke: '#000', fill: 'red' }}
/>
```

## circle

圆形

### Attrs

| **属性名** | **类型** | **描述**    |
| ---------- | -------- | ----------- |
| `x`        | Number   | 圆心 x 坐标 |
| `y`        | Number   | 圆心 y 坐标 |
| `r`        | Number   | 圆的半径    |

### 示例

```jsx
<circle attrs={{ x: 100, y: 100, r: 50, lineWidth: '2px', stroke: '#000', fill: 'red' }} />
```

## sector

扇形

### Attrs

| **属性名**      | **类型** | **描述**                    |
| --------------- | -------- | --------------------------- |
| `x`             | Number   | 圆心 x 坐标                 |
| `y`             | Number   | 圆心 y 坐标                 |
| `r`             | Number   | 外半径                      |
| `r0`            | Number   | 内半径， 默认为 0           |
| `startAngle`    | Number   | 其实弧度， 默认 0           |
| `endAngle`      | Number   | 结束弧度，默认 Math.PI \* 2 |
| `anticlockwise` | Boolean  | 逆时针方向，默认 false      |

### 示例

```jsx
<sector attrs={{ x: 100, y: 100, r: 50, lineWidth: '2px', stroke: '#000', fill: 'red' }} />
```

## polygon

多边形

### Attrs

| **属性名** | **类型** | **描述**   |
| ---------- | -------- | ---------- |
| `points`   | Point[]  | 多边形的点 |

### 示例

```jsx
<polygon
  attrs={{
    points: [
      { x: 10, y: 10 },
      { x: 50, y: 50 },
      { x: 30, y: 70 },
    ],
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

## line

绘制直线

### Attrs

| **属性名** | **类型** | **描述**      |
| ---------- | -------- | ------------- |
| `x0`       | Number   | 起始点 x 坐标 |
| `y0`       | Number   | 起始点 y 坐标 |
| `x1`       | Number   | 结束点 x 坐标 |
| `y1`       | Number   | 结束点 y 坐标 |

### 示例

```jsx
<line attrs={{ x0: 10, y0: 10, x1: 100, y1: 100, lineWidth: '2px', stroke: '#000' }} />
```

## arc

绘制圆弧

### Attrs

| **属性名**      | **类型** | **描述**                    |
| --------------- | -------- | --------------------------- |
| `x`             | Number   | 圆心 x 坐标                 |
| `y`             | Number   | 圆心 y 坐标                 |
| `r`             | Number   | 半径                        |
| `startAngle`    | Number   | 其实弧度， 默认 0           |
| `endAngle`      | Number   | 结束弧度，默认 Math.PI \* 2 |
| `anticlockwise` | Boolean  | 逆时针方向，默认 false      |

### 示例

```jsx
<arc attrs={{ x: 100, y: 100, r: 50, lineWidth: '2px', stroke: '#000' }} />
```

## polyline

多点线段

### Attrs

| **属性名** | **类型** | **描述**                 |
| ---------- | -------- | ------------------------ |
| `Points`   | Points[] | 线段的点                 |
| `smooth`   | Boolean  | 是否需要平滑，默认 false |

### 示例

```jsx
<polyline
  attrs={{
    points: [
      { x: 10, y: 10 },
      { x: 50, y: 50 },
      { x: 80, y: 70 },
    ],
    lineWidth: '2px',
    stroke: '#000',
    smooth: true,
  }}
/>
```

## text

文本

### Attrs

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `x` | Number | 文本位置 |
| `y` | Number | 文本位置 |
| `text` | String | 文本内容 |
| `textAlign` | String | 设置文本内容的当前对齐方式, 支持的属性：'start', 'center', 'end', 'left', 'right' |
| `textBaseline` | String | 设置在绘制文本时使用的当前文本基线, 支持的属性：'top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom' |
| `fontStyle` | String | 规定字体样式。可能的值：'normal', 'italic', 'oblique' |
| `fontSize` | Number | 规定字号，以像素计 |
| `fontFamily` | String | 规定字体系列 |
| `fontWeight` | String | 规定字体的粗细。可能的值：'normal', 'bold', 'bolder', 'lighter', '100', '200, '300', '400','500', '600', '700', '800', '900' |
| `fontVariant` | String | 规定字体变体。可能的值：'normal', 'small-caps' |
| `lineHeight` | Number | 规定行高，以像素计 |

### 示例

```jsx
<text
  attrs={{
    text: '文本',
    fontSize: 20,
    fill: '#000',
  }}
/>
```
