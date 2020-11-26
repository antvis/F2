---
title: Shape
order: 3
---

## 获取方式
```javascript
const Shape = F2.G.Shape;
```

## 创建 Shape 实例

具体的 shape 对象，默认我们提供了：

```javascript
const { Line, Arc, Circle, Polygon, Polyline, Rect, Sector, Text, Custom } = Shape;
```

这些 shape 拥有不同的图形属性以及一些通用的属性和方法。

`new Shape[shapeType](config)` 创建某个类型的 shape 对象。

```javascript
new Shape.Line({
  zIndex: 0,
  visible: true,
  attrs: {}
});
```

- 参数：`config`


类型：Object，创建 shape 对象需要的传递的属性，具体包含：

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `attrs` | Object | 图形属性，必须设置。 |
| `zIndex` | Number | 层次索引。 |
| `visible` | Boolean | 显示还是隐藏。 |
| `className` | String | 对象标记，由用户指定 |

## 通用方法
### getType()

```javascript
/**
 * 获取当前 shape 的类型
 * @return {String}
 */
getType()
```

### isDestroyed()

```javascript
/**
 * 标识对象是否已被销毁
 * @return {Boolean}
 */
isDestroyed()
```

### isVisible()

```javascript
/**
 * 判断当前 group 对象是否可见
 * @return {Boolean}
 */
isVisible()
```

### isShape()

```javascript
/**
 * 标记当前对象为 Shape
 * @return {Boolean}
 */
isGroup()
```

### attr()

获取/设置属性。

```javascript
/**
 * 返回所有的图形属性
 * @return {Object} 返回结果为包含所有图形属性的对象
 */
attr()

/**
 * 返回同 name 对应的图形属性值
 * @return 返回同 name 对应的图形属性值
 */
attr(name)

/**
 * 为具体的图形属性设置值
 * @param  {String} name  图形属性名
 * @param  {Any} value 属性值
 * @return {Shape}       返回当前 shape 实例
 */
attr(name, value)

/**
 * 设置多个图形属性
 * @param  {Object} config  设置的图形属性对象
 * @return {Shape}       返回当前 shape 实例
 */
attr(config)
```

获取 matrix 属性：`attr('matrix')`;<br />获取 clip：`attr('clip',)`;

### getBBox()

```javascript
/**
 * 获取当前 shape 的最小包围盒
 * @return {Object} 返回包围盒
 */
getBBox()
```

返回的包围盒对象结构如下：

```javascript
{
  minX: 39.17999267578125,
  minY: 52.131654999999995,
  maxX: 211,
  maxY: 116.58097999999998,
  width: 171.82000732421875,
  height: 64.44932499999999
}
```

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/10f300ec-2f26-42e5-9f51-c0e4756e9852.png)
### getParent()

```javascript
/**
 * 获取父元素
 * @return {Group || Canvas} 返回当前元素的父元素，可能是 group 或者 canvas 对象
 */
getParent()
```

### show()

显示。

### hide()

隐藏。

### get(name)

获取 shape 的属性，name 对应属性名。

### set(name, value)

设置属性值。

### getMatrix()

```javascript
/**
  * 获取当前矩阵
  * @return {Array} 返回当前矩阵
  */
getMatrix()
```

### setMatrix(m)

```javascript
/**
 * 设置矩阵
 * @param {Array} m 矩阵数组
 */
setMatrix(m)
```

### transform(actions)

对当前对象进行矩阵变换。

```javascript
transform(actions) // actions 为 Array 类型，表示操作的集合
```

actions 支持的操作包含 't'（translate）、's'（scale）、'r'（rotate），可进行任意组合，如下实例所示：

```javascript
[
  [ 't', x, y ], // t 表示 translate, x 表示 x 方向的位移值，y 表示 y 方向的位移值
  [ 's', sx, sy ], // s 表示 scale, sx 表示 x 方向上的缩放值，sy 表示 y 方向的缩放值
  [ 'r', radian] // r 表示 rotate，radian 表示旋转的弧度值
]
```

### translate(x, y)

```javascript
/**
 * 对当前元素进行平移操作
 * @param  {Number} x 水平坐标平移量
 * @param  {Number} y 竖直坐标平移量
 */
translate(x, y)
```

### rotate(radian)

```javascript
/**
 * 对当前元素进行旋转操作
 * @param  {Number} radian 表示旋转的弧度值
 */
rotate(radian)
```

### scale(sx, sy)

```javascript
/**
 * 对当前元素进行缩放操作
 * @param  {Number} sx 表示 x 方向上的缩放值
 * @param  {Number} sy 表示 y 方向上的缩放值
 */
scale(sx, sy)
```

### setTransform(actions)

重置矩阵后，进行平移、旋转、缩放操作

```javascript
setTransform(actions) // actions 为 Array 类型，表示操作的集合setTransform
```

actions 操作同 `transform(acitons` 方法。

### remove(destroy)

```javascript
/**
 * 将自己从父元素中移除
 * @param  {Boolean} destroy true 表示将自己移除的同时销毁自己，false 表示仅移除但不销毁
 * @return {null}
 */
remove(destroy)
```

### destroy()

销毁并将自己从父元素中移除（如果有父元素的话）。

## 具体的 shape 类型

### Line 线

```javascript
new G.Shape.Line({
  attrs: {
    x1: 50, // 线段起始点 x 坐标
    y1: 50,// 线段起始点 y 坐标
    x2: 100,// 线段结束点 x 坐标
    y2: 100,// 线段结束点 y 坐标
    lineWidth: 40, // html5 canvas 绘图属性
    strokeStyle: '#223273', // html5 canvas 绘图属性
    lineCap: 'round' // html5 canvas 绘图属性
  }
})
```

### Arc 圆弧

```javascript
new G.Shape.Arc({
  attrs: {
    x: 20, // 圆心 x 坐标
    y: 20, // 圆心 y 坐标
    r: 50, // 半径
    startAngle: 0, // 起始弧度
    endAngle: Math.PI / 2, // 结束弧度
    lineWidth: 2, // html5 canvas 绘图属性
    stroke: '#18901f' // html5 canvas 绘图属性
  }
})
```

### Circle 圆

```javascript
new G.Shape.Circle({
  attrs: {
    x: 10, // 圆心 x 坐标
    y: 10, // 圆心 y 坐标
    r: 50, // 半径
    fill: 'red' // html5 canvas 绘图属性
  }
});
```

### Polygon 多边形

```javascript
new G.Shape.Polygon({
  attrs: {
    points: [
      { x: 10, y: 10 },
      { x: 20, y: 45 },
      { x: 40, y: 80 },
      { x: 123, y: 70 },
      { x: 80, y: 32 }
    ], // 组成多边形的各个点
    lineWidth: 1, // html5 canvas 绘图属性
    fill: 'red' // html5 canvas 绘图属性
  }
})
```

### Polyline 多点线段

```javascript
new G.Shape.Polyline({
  attrs: {
    points: [
      { x: 10, y: 10 },
      { x: 20, y: 45 },
      { x: 40, y: 80 },
      { x: 123, y: 70 },
      { x: 80, y: 32 }
    ],
    smooth: true | false, // 是否转曲线，默认为 false，绘制曲线时使用
    lineWidth: 1, // html5 canvas 绘图属性
    stroke: 'red' // html5 canvas 绘图属性
  }
})
```

### Rect 矩形

```javascript
new G.Shape.Rect({
  attrs: {
    x: 50, // 矩形左上角 x 坐标
    y: 50, // 矩形左上角 y 坐标
    height: 20, // 矩形高度
    width: 80, // 矩形宽度
    lineWidth: 1, // html5 canvas 绘图属性
    fill: '#1890FF', // html5 canvas 绘图属性
    strokeStyle: '#000', // html5 canvas 绘图属性
    radius: 0 // 圆角的设置，可以是数值或者数组格式，支持为四个夹角分别设置，用法同 padding
  }
})
```

`radius` 圆角的设置如下图所示：<br />![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/8f170673-175e-408a-bd0b-bc4d39c078fe.png)

### Sector 扇形

```javascript
new G.Shape.Sector({
  attrs: {
    x: 100, // 圆心 x 坐标
    y: 150, // 圆心 y 坐标
    r: 50, // 圆环外半径
    r0: 30, // 圆环内半径
    startAngle: -Math.PI / 3, // 起始弧度
    endAngle: Math.PI / 2, // 结束弧度
    lineWidth: 0, // html5 canvas 绘图属性
    fill: '#223273' // html5 canvas 绘图属性
  }
});
```

### Text 文本

```javascript
new G.Shape.Text({
  attrs: {
    x: 30, // 显示位置 x 坐标
    y: 30, // 显示位置 x 坐标
    fontFamily: 'Arial', // 字体
    fontSize: 12, // 字体大小
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    fill: 'red', // html5 canvas 绘图属性
    lineWidth: 1, // html5 canvas 绘图属性
    rotate: Math.PI // 文本旋转，以弧度为单位
  }
});
```

### Image 图片型图形

```javascript
new G.Shape.Image({
  attrs: {
    x: 0, // 显示位置 x 坐标 左上角
    y: 0, // 显示位置 y 坐标 左上角
    src: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
    width: 50, // 图形宽度
    height: 50, // 图形高度
  }
});

new G.Shape.Image({
  attrs: {
    x: 0, // 显示位置 x 坐标 左上角
    y: 0, // 显示位置 y 坐标 左上角
    src: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
    width: 50, // 图形宽度
    height: 50, // 图形高度
    sx: 0, // 可选,开始剪切的 x 坐标位置。
    sy: 0, // 可选,开始剪切的 y 坐标位置。
    swidth: 512, // 可选,剪切宽度
    sheight: 512, // 可选,剪切高度
  }
});
```

### Custom 自定义图形

```javascript
new G.Shape.Custom({
  attrs: {},
  createPath(context) {
    // 在这里绘制图形
  },
  calculateBox() {
    // 自定义包围盒
  }
})
```
