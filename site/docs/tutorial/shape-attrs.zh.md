---
title: 绘图属性 - Style
order: 7
---

F2 底层使用了 [G](https://g.antv.antgroup.com/api/basic/concept) 绘图引擎。本篇列出了常见的绘图属性，更多关于绘图以及绘图属性的使用请至 [G](https://g.antv.antgroup.com/) 中查看。

在 F2 中组件样式的定义全部直接使用 Style 统一的结构，例如 axis 的 label 样式、legend marker 样式、和其他自定义 shape 样式等等。

## 属性列表

### 位置属性

对于不同的图形，位置的几何意义也不同，例如：

- [Circle](/tutorial/shape#circle) [Arc](/tutorial/shape#arc) [Sector](/tutorial/shape#sector)为圆心位置，使用 [cx/cy](/tutorial/shape#circle)
- [Group](/tutorial/shape#group) [Rect](/tutorial/shape#rect)，[Image](/tutorial/shape#image) 为左上角顶点位置，使用 [x/y](/tutorial/shape#rect)
- [Text](/tutorial/shape#text) 为文本锚点位置
- [Line](/tutorial/shape#line)，[Polyline](/tutorial/shape#polyline)，[Polygon](/tutorial/shape#polygon)，[Path](/tutorial/shape#path) 为包围盒左上角顶点位置

| 属性名   | 描述                |
| -------- | ------------------- |
| `anchor` | 锚点，默认为 [0, 0] |

### 通用属性

| 属性名 | 描述 |
| ------ | ---- |

| `zIndex` | 控制图行显示层级。默认 0 |

| `clip` | 创建元素的可显示区域，区域内的部分显示，区域外的隐藏。参见(./shape-attrs#裁剪) |

| `visibility` | 控制图形的可见性。参见 [MDN]（https://developer.mozilla.org/en-US/docs/Web/CSS/visibility） |

| `opacity` | 设置图形和图片透明度的属性，默认值是 1。 数值的范围从 0.0 （完全透明）到 1.0 （完全不透明）。 |

| `fill` | 填充色、[渐变](./shape-attrs#渐变色)或[纹理](./shape-attrs#纹理)，默认值为空。 |

| `fillOpacity` | 用于设置图形填充颜色的透明度，默认值是 1。 |

| `stroke` | 描边色、[渐变](./shape-attrs#渐变色)或[纹理](./shape-attrs#纹理)，默认值为空； |

| `strokeOpacity` | 用于设置边颜色的透明度，默认值是 1。 |

| `shadowType` | 描述阴影类型，目前支持 'outer' 外阴影和 'inner' 内阴影 |

| `shadowColor` | 描述阴影颜色的属性，支持 String，暂不支持渐变或纹理，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowColor)。 |

| `shadowBlur` | 描述模糊效果程度的属性； 它既不对应像素值也不受当前转换矩阵的影响。 默认值是 0，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowBlur)。 |

| `shadowOffsetX` | 描述阴影水平偏移距离的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX)。 |

| `shadowOffsetY` | 描述阴影垂直偏移距离的属性，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY)。 |

| `filter` | 滤镜，目前支持单个或多个滤镜叠加,支持 blur、brightness、drop-shadow、contrast、grayscale、saturate、sepia、hue-rotate、invert 几种滤镜效果。参见 [MDN]（https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/filter） |

| `cursor` | 鼠标样式。参见 [MDN]（https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor） |

### 线条属性

| 属性名 | 描述 |
| ------ | ---- |

| `lineCap` | Canvas 2D API 指定如何绘制每一条线段末端的属性。有 3 个可能的值，分别是：`butt`, `round` and `square`。默认值是 butt，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineCap). |

| `lineJoin` | Canvas 2D API 用来设置 2 个长度不为 0 的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为 0 的变形部分，其指定的末端和控制点在同一位置，会被忽略），参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineJoin). | | `lineWidth` | Canvas 2D API 设置线段厚度的属性（即线段的宽度）。当获取属性值时，它可以返回当前的值（默认值是 1.0 ）。 当给属性赋值时， 0、 负数、 Infinity 和 NaN 都会被忽略；除此之外，都会被赋予一个新值，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineWidth). | | `miterLimit` | Canvas 2D API 设置斜接面限制比例的属性。 当获取属性值时， 会返回当前的值（默认值是 10.0 ）。当给属性赋值时， 0、负数、 Infinity 和 NaN 都会被忽略；除此之外都会被赋予一个新值。，参见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/miterLimit). | | `lineDash` | 设置线的虚线样式，可以指定一个数组。一组描述交替绘制线段和间距（坐标空间单位）长度的数字。 如果数组元素的数量是奇数， 数组的元素会被复制并重复。例如， [5, 15, 25] 会变成 [5, 15, 25, 5, 15, 25]。这个属性取决于浏览器是否支持 `setLineDash()` 函数，详情参考 [setLineDash](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash)。 |

### 文本属性

| 属性名 | 描述 |
| --- | --- |
| `textAlign` | 设置文本内容的当前对齐方式, 支持的属性：'start', 'center', 'end', 'left', 'right' |
| `textBaseline` | 设置在绘制文本时使用的当前文本基线, 支持的属性：'top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom' |
| `fontStyle` | 规定字体样式。可能的值：'normal', 'italic', 'oblique' |
| `fontSize` | 规定字号，以像素计 |
| `fontFamily` | 规定字体系列 |
| `fontWeight` | 规定字体的粗细。可能的值：'normal', 'bold', 'bolder', 'lighter', '100', '200, '300', '400','500', '600', '700', '800', '900' |
| `fontVariant` | 规定字体变体。可能的值：'normal', 'small-caps' |
| `lineHeight` | 规定行高，以像素计 |

## 渐变色

为了方便用户使用，F2 中提供与 css 中用法一致的渐变色使用方法，参见[MDN]（https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient），定义方式如下：

在 css 中，渐变通过函数创建，在下面例子中展示了目前支持的渐变效果，包括线性和径向渐变、多个渐变叠加等：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*sXoJTKPWg70AAAAAAAAAAAAAARQnAQ" width="400" alt="gradient">

### 线性渐变

线性渐变指创建一个表示两种或多种颜色延某一方向线性变化。渐变方向在 CSS 中默认为从下到上，而我们为了和 Canvas / SVG 保持一致，使用从左到右，且可以多个渐变叠加。示例：

```javascript
// example
fill: 'linear-gradient(0deg, blue, green 40%, red)';
```

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*aU84RIJaH6AAAAAAAAAAAAAAARQnAQ" width="300" alt="linear gradient">

### 径向渐变

径向渐变指从图形中心发出的两种或者多种颜色之间的逐步过渡变化。

```javascript
// example
fill: 'radial-gradient(circle at center, red, blue, green 100%)';
```

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*Z4QLTr3lC80AAAAAAAAAAAAAARQnAQ" width="300" alt="radial gradient">

## 纹理

使用相同的图案填充图形，目前支持的 Pattern 可以是图片 URL，`HTMLImageElement`，`HTMLCanvasElement`，`HTMLVideoElement` 和 `Rect` 等，还可以指定重复方向：

<img src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*cRmFTItZOtYAAAAAAAAAAAAAARQnAQ" width="400" alt="pattern">

支持参数如下：

```ts
interface Pattern {
  image: string | CanvasImageSource | Rect;
  repetition?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
  transform?: string;
}
```

使用方法：

```js
// example
// 使用纹理填充，在水平和垂直方向重复图片
fill: {
    image:'https://gw.alipayobjects.com/zos/rmsportal/ibtwzHXSxomqbZCPMLqS.png',
    repetition: 'repeat',
    transform: 'rotate(30deg)',
}
```

## 裁剪

参考 [CSS clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)。该属性值可以定义可视区域，可以是任意图形，例如 Circle、Rect 等等。同一个裁剪区域可以被多个图形共享使用，并且裁剪区域也会影响图形的拾取区域。

使用方法：

```js
<rect
  style={{
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    clip: {
      type: 'circle',
      style: {
        cx: 100,
        cy: 100,
        r: 50,
      },
    },
  }}
/>
```

## 历史用法

历史用法见 https://f2-v4.antv.visiondocs/tutorial/shape-attrs#渐变色
