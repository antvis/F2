---
title: 图形标签 - Shape
order: 6
---

F2 底层使用了 [G](https://g.antv.antgroup.com/api/basic/concept) 绘图引擎。本篇列出了常见的图形标签

## 如何使用

详见：[图形使用](/tutorial/graphic)

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
  - [image](#image) 图片

## 图形属性

### Props

| **属性名**  | **类型**  | **描述**                       |
| ----------- | --------- | ------------------------------ |
| `className` | String    | 对象标记，由用户指定           |
| `visible`   | Boolean   | 显示还是隐藏。                 |
| `zIndex`    | Number    | z-index 值，用于调整绘制顺序。 |
| `style`     | Style     | 图形样式                       |
| `animation` | Animation | 图形动画                       |
| `onPan` 等  | Event     | 图形事件                       |

### Style [绘图属性](/tutorial/shape-attrs)

更多详情可见：[绘图属性](/tutorial/shape-attrs)

### Animation [图形动画属性](/tutorial/animation)

更多详情可见：[图形动画属性](/tutorial/animation)

### Event [图形事件属性](/tutorial/event)

更多详情可见：[图形事件属性](/tutorial/event)

### 演示

- [图形标签](/examples/component/shape#shape)

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

### Style

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
  style={{ x: 100, y: 100, width: 50, height: 50, lineWidth: '2px', stroke: '#000', fill: 'red' }}
/>
```

## circle

圆形

### Style

| **属性名** | **类型** | **描述**     |
| ---------- | -------- | ------------ |
| `cx`       | Number   | 圆心 cx 坐标 |
| `cy`       | Number   | 圆心 cy 坐标 |
| `r`        | Number   | 圆的半径     |

### 示例

```jsx
<circle style={{ cx: 100, cy: 100, r: 50, lineWidth: '2px', stroke: '#000', fill: 'red' }} />
```

## sector

扇形

### Style

| **属性名**      | **类型**         | **描述**               |
| --------------- | ---------------- | ---------------------- |
| `cx`            | Number           | 圆心 cx 坐标           |
| `cy`            | Number           | 圆心 cy 坐标           |
| `r`             | Number           | 外半径                 |
| `r0`            | Number           | 内半径， 默认为 0      |
| `startAngle`    | Number \| String | 起始角度/弧度， 默认 0 |
| `endAngle`      | Number \| String | 结束角度/弧度，默认 0  |
| `anticlockwise` | Boolean          | 逆时针方向，默认 false |

### 示例

```jsx
<sector
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: '0 rad',
    endAngle: '3.14 rad',
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

## polygon

多边形

### Style

| **属性名** | **类型**           | **描述**   |
| ---------- | ------------------ | ---------- |
| `points`   | [Number, Number][] | 多边形的点 |

### 示例

```jsx
<polygon
  style={{
    points: [
      [10, 10],
      [50, 50],
      [30, 70],
    ],
    lineWidth: '2px',
    stroke: '#000',
    fill: 'red',
  }}
/>
```

## line

绘制直线

### Style

| **属性名** | **类型** | **描述**      |
| ---------- | -------- | ------------- |
| `x1`       | Number   | 起始点 x 坐标 |
| `y1`       | Number   | 起始点 y 坐标 |
| `x2`       | Number   | 结束点 x 坐标 |
| `y2`       | Number   | 结束点 y 坐标 |

### 示例

```jsx
<line style={{ x1: 10, y1: 10, x2: 100, y2: 100, lineWidth: '2px', stroke: '#000' }} />
```

## arc

绘制圆弧

### Style

| **属性名**      | **类型**      | **描述**               |
| --------------- | ------------- | ---------------------- |
| `cx`            | Number        | 圆心 cx 坐标           |
| `cy`            | Number        | 圆心 cy 坐标           |
| `r`             | Number        | 半径                   |
| `startAngle`    | Number/String | 起始角度/弧度， 默认 0 |
| `endAngle`      | Number/String | 结束角度/弧度，默认 0  |
| `anticlockwise` | Boolean       | 逆时针方向，默认 false |

### 示例

```jsx
<arc
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    startAngle: 0,
    endAngle: 360,
    lineWidth: '2px',
    stroke: '#000',
  }}
/>
```

## polyline

多点线段

### Style

| **属性名** | **类型**           | **描述**                 |
| ---------- | ------------------ | ------------------------ |
| `Points`   | [Number, Number][] | 线段的点                 |
| `smooth`   | Boolean            | 是否需要平滑，默认 false |

### 示例

```jsx
<polyline
  style={{
    points: [
      [10, 10],
      [50, 50],
      [80, 70],
    ],
    lineWidth: '2px',
    stroke: '#000',
    smooth: true,
  }}
/>
```

## text

文本

### Style

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
  style={{
    text: '文本',
    fontSize: 20,
    fill: '#000',
  }}
/>
```

## image

图片

### Style

| **属性名**   | **类型** | **描述**                                   |
| ------------ | -------- | ------------------------------------------ |
| `x`          | Number   | 左上角 x 坐标                              |
| `y`          | Number   | 左上角 y 坐标                              |
| `width`      | Number   | 宽度                                       |
| `height`     | Number   | 高度                                       |
| `src`        | string   | 图片 url                                   |
| `cacheImage` | boolean  | 是否需要缓存(如果图片有闪动，可以添加缓存) |

### 示例

```jsx
<image
  style={{
    src: 'https://f2.antv.vision/favicon-32x32.png?v=9772447a8d07a8fe19894b5176c6cb0d',
    x: 10,
    y: 10,
    width: 32,
    height: 32,
  }}
/>
```
