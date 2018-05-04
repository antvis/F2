# 绘图引擎
F2 3.1 版本之前底层直接采用原生 Canvas 绘制，虽然在性能上占据优势，但是过于底层，api 粗糙，加上即时绘制无状态无对象特性，使得它内部的图形不支持动画更不支持任何交互事件。于是在 3.1 版本我们引入了全新的绘图引擎 G，它具备：

* 层次化结构
* 支持容器、各种图形的创建、修改和销毁
* 动画
* 矩阵变换

## 容器层次结构

G 采用层次化结构设计，结构如下：

<img src="https://gw.alipayobjects.com/zos/skylark/bf8b4e5a-0421-48ae-ac32-a789b0079d17/2018/png/3c63f255-011a-4166-8715-0f72511175b5.png" style="width: 248px;">

其中：

- Canvas 画布的入口，包含所有 Group、Shape 对象
- Group 分组，可包含 Group 和 Shape 对象
- Shape 具体的 Shape

## API

1. 如何引入 `G`

```js
const { G } = F2; // 引入
```

2. `G` 命名空间上提供的类

```js
const { Canvas, Group, Shape, Matrix, Vector2 } = G;
```

- [Canvas](#_Canvas)
- [Group](#_Group)
- [Shape](#_Shape)
- [Matrix](#_Matrix)
- [Vector2](#_Vector2)

### Canvas

`new Canvas(config)` 创建 canvas 对象。

```js
// <canvas id="c1"></canvas>

new Canvas({
  el: 'c1',
  width: 500,
  height: 500
});
```

- 参数：`config`

类型：Object，创建 canvas 对象需要的传递的属性，具体包含：

| 属性名 | 类型 | 描述 |
| -------- | -------- | -------- |
| `el` | String/HtmlElement | 对应 canvas dom 的 id 或者 canvas dom 对象。 |
| `context` | CanvasRenderingContext2D | canvas 上下文，即通过传入 canvas 上下文对象来创建 Canvas 对象。 |
| `width` | Number | canvas 的宽度，可选，如果不设置则默认按照传入 canvas 元素的实际宽度。 |
| `height` | Number | canvas 的高度，可选，如果不设置则默认按照传入 canvas 元素的实际高度。 |
| `pixelRatio` | Number | canvas 的显示精度，默认读取当前设备的像素比。 |

#### 属性

快速索引：
- [children](#_children)
- [destroyed](#_destroyed)

属性的获取方式：`canvas.get(attributeName)`

##### `children`

类型：Array
描述：canvas 容器下包含的元素集合。

##### `destroyed`

类型：Boolean
描述：标识对象是否已被销毁

#### 方法

快速索引：
- [getWidth()](#_getWidth-)
- [getHeight()](#_getHeight-)
- [changeSize(width, height)](#_changeSize-width,-height-)
- [getPointByClient(clientX, clientY)](#_getPointByClient-clientX,-clientY-)
- [addShape(type, config)](#_addShape-type,-config-)
- [addGroup(config)](#_addGroup-config-)
- [add(items)](#_add-items-)
- [contain(item)](#_contain-item-)
- [sort()](#_sort-)
- [get(name)](#_get-name-)
- [set(name, value)](#_set-name,-value-)
- [clear()](#_clear-)
- [draw()](#_draw-)
- [destroy()](#_destroy-)

##### `getWidth()`

```js
/**
 * 获取 canvas 对应 dom 元素的宽度
 * @return {Number} 返回宽度
 */
getWidth()
```

##### `getHeight()`

```js
/**
 * 获取 canvas 对应 dom 元素的高度
 * @return {Number} 返回高度
 */
getHeight()
```

##### `changeSize(width, height)`

```js
/**
 * 改变 canvas 的宽高
 * @param  {Number} width  宽度
 * @param  {Number} height 高度
 */
changeSize(width, height)
```

##### `getPointByClient(clientX, clientY)`

```js
/**
 * 将窗口坐标转变成画布坐标
 * @param  {Number} clientX 窗口 x 坐标
 * @param  {Number} clientY 窗口 y 坐标
 * @return {Object} canvas 画布坐标坐标
 */
getPointByClient(clientX, clientY)
```

##### `addShape(type, config)`

```js
/**
 * 创建并往 canvas 上添加 Shape
 * @param {String} type 添加的 shape 类型
 * @param {Object} config  shape 的配置项
 * @return {Shape} 返回创建的 shape 实例
 */
addShape(type, config = {})
```

参数 `config` 传入的是 Shape 的配置项，包含：

```js
{
  className: String, // 标记，由用户指定
  zIndex: Number, // shape 的层次索引
  visible: Boolean, // 显示隐藏
  attrs: Object // shape 的图形属性配置，见 Shape 描述，不同 shape 的图形属性不同
}
```

##### `addGroup(config)`

```js
/**
 * 创建并添加 Group 组
 * @param {Object||null} cfg 配置信息
 * @return {Group} 返回创建的 Group 实例
 */
addGroup(config)
```

参数 `config` 传入的是 Group 的配置项，包含：

```js
{
  className: String, // 标记，由用户指定
  zIndex: Number, // group 的层次索引
  visible: Boolean // 显示隐藏
}
```

##### `add(items)`

```js
/**
 * 往 canvas 中添加元素
 * @param {Array||Group||Shape} items 可以是 group 实例或者 shape 实例或者他们的数组集合
 * @return {Canvas}  返回当前 canvas 对象
 */
add(items)
```

##### `contain(item)`

```js
/**
 * 判断 canvas 中是否包含 item 元素
 * @param  {Shape||Group} item shape 或者 group 实例
 * @return {Boolean}      返回判断结果，true 表示包含，false 表示不包含
 */
contain(item)
```

##### `sort()`

```js
/**
 * 按照当前容器中包含元素的 zIndex 进行从大到小的排序
 * @return {Canvas||Group} 返回自己
 */
sort()
```

##### `get(name)`

获取 canvas 的属性，name 对应属性名。

##### `set(name, value)`

设置属性值。

##### `clear()`

```js
/**
  * 清除所有的元素
  * @return {Canvas|Group} 返回自己
  */
clear()
```

##### `draw()`

绘制。

##### `destroy()`

销毁 canvas 对象。


### Group

`new Group(config)` 创建 group 对象。

```js
new Group({
  zIndex: 0,
  visible: true
});
```

- 参数：`config`

类型：Object，创建 group 对象需要的传递的属性，具体包含：

| 属性名 | 类型 | 描述 |
| -------- | -------- | -------- |
| `zIndex` | Number | 层次索引。 |
| `visible` | Boolean | 显示还是隐藏。 |
| `className` | String | 对象标记，由用户指定 |

#### 属性

快速索引：
- [children](#__children)
- [destroyed](#__destroyed)
- [visible](#_visible)
- [isGroup](#_isGroup)
- [attrs](#_attrs)

属性的获取方式：`group.get(attributeName)`

##### `children`

类型：Array
描述：group 容器下包含的元素集合。

##### `destroyed`

类型：Boolean
描述：标识对象是否已被销毁

##### `visible`

类型：Boolean
描述：当前 group 对象是否可见

##### `isGroup`

类型：Boolean
描述：标记当前对象为 group，true

##### `attrs`

类型：Object
描述：group 对象的图形属性，目前该属性只包含 `matrix` 矩阵属性。

#### 方法

快速索引：
- [addShape(type, config)](#__addShape-type,-config-)
- [addGroup(config)](#__addGroup-config-)
- [add(items)](l#__add-items-)
- [contain(item)](#__contain-item-)
- [sort()](#__sort-)
- [getBBox()](#_getBBox-)
- [getParent()](#_getParent-)
- [show()](#_show-)
- [hide()](#_hide-)
- [get(name)](#__get-name-)
- [set(name, value)](#__set-name,-value-)
- [getMatrix()](#_getMatrix-)
- [setMatrix(m)](#_setMatrix-m-)
- [transform(actions)](#_transform-actions-)
- [translate(x, y)](#_translate-x,-y-)
- [rotate(radian)](#_rotate-radian-)
- [scale(sx, sy)](#_scale-sx,-sy-)
- [setTransform(actions)](#_setTransform-actions-)
- [clear()](#__clear-)
- [remove(destroy)](#_remove-destroy-)
- [destroy()](#__destroy-)


##### `addShape(type, config)`

```js
/**
 * 创建并往 canvas 上添加 Shape
 * @param {String} type 添加的 shape 类型
 * @param {Object} config  shape 的配置项
 * @return {Shape} 返回创建的 shape 实例
 */
addShape(type, config = {})
```

参数 `config` 传入的是 Shape 的配置项，包含：

```js
{
  className: String, // 标记，由用户指定
  zIndex: Number, // shape 的层次索引
  visible: Boolean, // 显示隐藏
  attrs: Object // shape 的图形属性配置，见 Shape 描述，不同 shape 的图形属性不同
}
```

##### `addGroup(config)`

```js
/**
 * 创建并添加 Group 组
 * @param {Object||null} cfg 配置信息
 * @return {Group} 返回创建的 Group 实例
 */
addGroup(config)
```

参数 `config` 传入的是 Group 的配置项，包含：

```js
{
  className: String, // 标记，由用户指定
  zIndex: Number, // group 的层次索引
  visible: Boolean // 显示隐藏
}
```

##### `add(items)`

```js
/**
 * 往 canvas 中添加元素
 * @param {Array||Group||Shape} items 可以是 group 实例或者 shape 实例或者他们的数组集合
 * @return {Canvas}  返回当前 canvas 对象
 */
add(items)
```

##### `contain(item)`

```js
/**
 * 判断 canvas 中是否包含 item 元素
 * @param  {Shape||Group} item shape 或者 group 实例
 * @return {Boolean}      返回判断结果，true 表示包含，false 表示不包含
 */
contain(item)
```

##### `sort()`

```js
/**
 * 按照当前容器中包含元素的 zIndex 进行从大到小的排序
 * @return {Canvas||Group} 返回自己
 */
sort()
```

##### `getBBox()`

```js
/**
 * 获取当前 group 的最小包围盒
 * @return {Object} 返回包围盒
 */
getBBox()
```

返回的包围盒对象结构如下：

```js
{
  minX: 39.17999267578125,
  minY: 52.131654999999995,
  maxX: 211,
  maxY: 116.58097999999998,
  width: 171.82000732421875,
  height: 64.44932499999999
}
```

<img src="https://gw.alipayobjects.com/zos/rmsportal/yWPVnEUaOzHZItcKeIWD.png" style="width: 540px;">

##### `getParent()`

```js
/**
 * 获取父元素
 * @return {Group || Canvas} 返回当前元素的父元素，可能是 group 或者 canvas 对象
 */
getParent()
```

##### `show()`

显示。

##### `hide()`

隐藏。

##### `get(name)`

获取 group 的属性，name 对应属性名。

##### `set(name, value)`

设置属性值。

##### `getMatrix()`

```js
/**
  * 获取当前矩阵
  * @return {Array} 返回当前矩阵
  */
getMatrix()
```

##### `setMatrix(m)`

```js
/**
 * 设置矩阵
 * @param {Array} m 矩阵数组
 */
setMatrix(m)
```

##### `transform(actions)`

对当前对象进行矩阵变换。

```js
transform(actions) // actions 为 Array 类型，表示操作的集合
```

actions 支持的操作包含 't'（translate）、's'（scale）、'r'（rotate），可进行任意组合，如下实例所示：

```js
[
  [ 't', x, y ], // t 表示 translate, x 表示 x 方向的位移值，y 表示 y 方向的位移值
  [ 's', sx, sy ], // s 表示 scale, sx 表示 x 方向上的缩放值，sy 表示 y 方向的缩放值
  [ 'r', radian] // r 表示 rotate，radian 表示旋转的弧度值
]
```

##### `translate(x, y)`

```js
/**
 * 对当前元素进行平移操作
 * @param  {Number} x 水平坐标平移量
 * @param  {Number} y 竖直坐标平移量
 */
translate(x, y)
```

##### `rotate(radian)`

```js
/**
 * 对当前元素进行旋转操作
 * @param  {Number} radian 表示旋转的弧度值
 */
rotate(radian)
```

##### `scale(sx, sy)`

```js
/**
 * 对当前元素进行缩放操作
 * @param  {Number} sx 表示 x 方向上的缩放值
 * @param  {Number} sy 表示 y 方向上的缩放值
 */
scale(sx, sy)
```

##### `setTransform(actions)`

重置矩阵后，进行平移、旋转、缩放操作

```js
setTransform(actions) // actions 为 Array 类型，表示操作的集合setTransform
```

actions 操作同 `transform(acitons` 方法。

##### `clear()`

```js
/**
  * 清除所有的元素
  * @return {Group} 返回自己
  */
clear()
```

##### `remove(destroy)`

```js
/**
 * 将自己从父元素中移除
 * @param  {Boolean} destroy true 表示将自己移除的同时销毁自己，false 表示仅移除但不销毁
 * @return {null}
 */
remove(destroy)
```


##### `destroy()`

销毁并将自己从父元素中移除（如果有父元素的话）


### Shape

具体的 shape 对象，默认我们提供了：

```js
const { Line, Arc, Circle, Polygon, Polyline, Rect, Sector, Text, Custom } = Shape;
```

- [Line](#_Line-线) 线
- [Arc](#_Arc-圆弧) 圆弧
- [Circle](#_Circle-圆) 圆
- [Polygon](#_Polygon-多边形) 多边形
- [Polyline](#_Polyline-多点线段) 多点线段
- [Rect](#_Rect-矩形) 矩形
- [Sector](#_Sector-扇形) 扇形
- [Text](#_Text-文本) 文本
- [Custom](#_Custom-自定义图形) 自定义图形

这些 shape 拥有不同的图形属性以及一些通用的属性和方法。

`new Shape[shapeType](config)` 创建某个类型的 shape 对象。

```js
new Shape.Line({
  zIndex: 0,
  visible: true,
  attrs: {}
});
```

- 参数：`config`

类型：Object，创建 shape 对象需要的传递的属性，具体包含：

| 属性名 | 类型 | 描述 |
| -------- | -------- | -------- |
| `attrs` | Object | 图形属性，必须设置。 |
| `zIndex` | Number | 层次索引。 |
| `visible` | Boolean | 显示还是隐藏。 |
| `className` | String | 对象标记，由用户指定 |


#### 通用属性

快速索引：
- [type](#_type)
- [attrs](#__attrs)
- [destroyed](#___destroyed)
- [visible](#__visible)
- [isShape](#_isShape)

属性的获取方式：`shape.get(attributeName)`

##### `type`

类型：String
描述：返回当前 shape 的类型

##### `attrs`

类型：Object
描述：shape 对象的图形属性

##### `destroyed`

类型：Boolean
描述：标识对象是否已被销毁

##### `visible`

类型：Boolean
描述：当前 group 对象是否可见

##### `isShape`

类型：Boolean
描述：标记当前对象为 shape 类型，true


#### 通用方法

快速索引：
- [attr()](#_attr-)
- [getBBox()](#__getBBox-)
- [getParent()](#__getParent-)
- [show()](#__show-)
- [hide()](#__hide-)
- [get(name)](#___get-name-)
- [set(name, value)](#___set-name,-value-)
- [getMatrix()](#__getMatrix-)
- [setMatrix(m)](#__setMatrix-m-)
- [transform(actions)](#__transform-actions-)
- [translate(x, y)](#__translate-x,-y-)
- [rotate(radian)](#__rotate-radian-)
- [scale(sx, sy)](#__scale-sx,-sy-)
- [setTransform(actions)](#__setTransform-actions-)
- [remove(destroy)](#__remove-destroy-)
- [destroy()](#___destroy-)

##### `attr()`

获取/设置属性。

```js
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

获取 matrix 属性：`attr('matrix')`;
获取 clip：`attr('clip',)`;

##### `getBBox()`

```js
/**
 * 获取当前 shape 的最小包围盒
 * @return {Object} 返回包围盒
 */
getBBox()
```

返回的包围盒对象结构如下：

```js
{
  minX: 39.17999267578125,
  minY: 52.131654999999995,
  maxX: 211,
  maxY: 116.58097999999998,
  width: 171.82000732421875,
  height: 64.44932499999999
}
```

<img src="https://gw.alipayobjects.com/zos/rmsportal/yWPVnEUaOzHZItcKeIWD.png" style="width: 540px;">

##### `getParent()`

```js
/**
 * 获取父元素
 * @return {Group || Canvas} 返回当前元素的父元素，可能是 group 或者 canvas 对象
 */
getParent()
```

##### `show()`

显示。

##### `hide()`

隐藏。

##### `get(name)`

获取 shape 的属性，name 对应属性名。

##### `set(name, value)`

设置属性值。

##### `getMatrix()`

```js
/**
  * 获取当前矩阵
  * @return {Array} 返回当前矩阵
  */
getMatrix()
```

##### `setMatrix(m)`

```js
/**
 * 设置矩阵
 * @param {Array} m 矩阵数组
 */
setMatrix(m)
```

##### `transform(actions)`

对当前对象进行矩阵变换。

```js
transform(actions) // actions 为 Array 类型，表示操作的集合
```

actions 支持的操作包含 't'（translate）、's'（scale）、'r'（rotate），可进行任意组合，如下实例所示：

```js
[
  [ 't', x, y ], // t 表示 translate, x 表示 x 方向的位移值，y 表示 y 方向的位移值
  [ 's', sx, sy ], // s 表示 scale, sx 表示 x 方向上的缩放值，sy 表示 y 方向的缩放值
  [ 'r', radian] // r 表示 rotate，radian 表示旋转的弧度值
]
```

##### `translate(x, y)`

```js
/**
 * 对当前元素进行平移操作
 * @param  {Number} x 水平坐标平移量
 * @param  {Number} y 竖直坐标平移量
 */
translate(x, y)
```

##### `rotate(radian)`

```js
/**
 * 对当前元素进行旋转操作
 * @param  {Number} radian 表示旋转的弧度值
 */
rotate(radian)
```

##### `scale(sx, sy)`

```js
/**
 * 对当前元素进行缩放操作
 * @param  {Number} sx 表示 x 方向上的缩放值
 * @param  {Number} sy 表示 y 方向上的缩放值
 */
scale(sx, sy)
```

##### `setTransform(actions)`

重置矩阵后，进行平移、旋转、缩放操作

```js
setTransform(actions) // actions 为 Array 类型，表示操作的集合setTransform
```

actions 操作同 `transform(acitons` 方法。

##### `remove(destroy)`

```js
/**
 * 将自己从父元素中移除
 * @param  {Boolean} destroy true 表示将自己移除的同时销毁自己，false 表示仅移除但不销毁
 * @return {null}
 */
remove(destroy)
```


##### `destroy()`

销毁并将自己从父元素中移除（如果有父元素的话）

#### 具体的 shape 创建

#### Line 线

```js
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

#### Arc 圆弧

```js
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

#### Circle 圆

```js
new G.Shape.Circle({
  attrs: {
    x: 10, // 圆心 x 坐标
    y: 10, // 圆心 y 坐标
    r: 50, // 半径
    fill: 'red' // html5 canvas 绘图属性
  }
});
```

#### Polygon 多边形

```js
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

#### Polyline 多点线段

```js
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

#### Rect 矩形

```js
new G.Shape.Rect({
  attrs: {
    x: 50, // 矩形左上角 x 坐标
    y: 50, // 矩形左上角 y 坐标
    height: 20, // 矩形高度
    width: 80, // 矩形宽度
    lineWidth: 1, // html5 canvas 绘图属性
    fill: '#1890FF', // html5 canvas 绘图属性
    strokeStyle: '#000' // html5 canvas 绘图属性
    radius: 0 // 圆角的设置，可以是数值或者数组格式，支持为四个夹角分别设置，用法同 padding
  }
})
```

#### Sector 扇形

```js
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

#### Text 文本

```js
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
    rotate: Math.PI // 文本旋转弧度
  }
});
```

#### Custom 自定义图形

```js
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

### Matrix

提供 3x2 矩阵操作方法，具体提供了以下方法：

快速索引：
- [multiply(m1, m2)](#_multiply-m1,-m2-)
- [scale(out, m, v)](#_scale-out,-m,-v-)
- [rotate(out, m, radian)](#_rotate-out,-m,-radian-)
- [translate(out, m, v)](#_translate-out,-m,-v-)
- [transform(m, actions)](#_transform-m,-actions-)

#### `multiply(m1, m2)`

两个矩阵相乘。

```js
/**
  * 两个矩阵相乘
  * @param  {Array} m1 左矩阵
  * @param  {Array} m2 右矩阵
  * @return {Array}    返回结果
  */
multiply(m1, m2)
```

#### `scale(out, m, v)`

缩放变换。

```js
/**
  * 缩放变换
  * @param  {Array} out 该变量用于存储缩放结果
  * @param  {Array} m   需要变换矩阵
  * @param  {Array} v   缩放向量 [ sx, sy ]
  * @return {Array}     返回结果
  */
scale(out, m, v)
```

#### `rotate(out, m, radian)`

旋转变换。

```js
/**
  * 旋转变换
  * @param  {Array} out      该变量用于存储缩放结果
  * @param  {Array} m        需要变换矩阵
  * @param  {Array} radian   旋转的弧度
  * @return {Array}          返回结果
  */
rotate(out, m, radian)
```


#### `translate(out, m, v)`

平移变换。

```js
/**
  * 平移变换。
  * @param  {Array} out      该变量用于存储缩放结果
  * @param  {Array} m        需要变换矩阵
  * @param  {Array} v        平移向量 [ x, y ]
  * @return {Array}          返回结果
  */
translate(out, m, v)
```

#### `transform(m, actions)`

进行平移、旋转、缩放的变换，所有的操作配置在 actions 属性中进行，actions 支持的操作包含 't'（translate）、's'（scale）、'r'（rotate），可进行任意组合，如下实例所示：

```js
[
  [ 't', x, y ], // t 表示 translate, x 表示 x 方向的位移值，y 表示 y 方向的位移值
  [ 's', sx, sy ], // s 表示 scale, sx 表示 x 方向上的缩放值，sy 表示 y 方向的缩放值
  [ 'r', radian] // r 表示 rotate，radian 表示旋转的弧度值
]
```

```js
/**
  *
  * @param  {Array} m        需要变换矩阵
  * @param  {Array} actions  变换操作集合
  * @return {Array}          返回结果
  */
transform(m, actions)
```

### Vector2

二维向量操作方法，具体提供的方法如下：

快速索引：
- [create()](#_create-)
- [length(v)](#_length-v-)
- [normalize(out, v)](#_normalize-out,-v-)
- [add(out, v1, v2)](#_add-out,-v1,-v2-)
- [sub(out, v1, v2)](#_sub-out,-v1,-v2-)
- [scale(out, v, s)](#_scale-out,-v,-s-)
- [dot(v1, v2)](#_dot-v1,-v2-)
- [direction(v1, v2)](#_direction-v1,-v2-)
- [angle(v1, v2)](#_angle-v1,-v2-)
- [angleTo(v1, v2, direction)](#_angleTo-v1,-v2,-direction-)
- [zero(v)](#_zero-v-)
- [distance(v1, v2)](#_distance-v1,-v2-)
- [clone(v)](#_clone-v-)
- [min(out, v1, v2)](#_min-out,-v1,-v2-)
- [max(out, v1, v2)](#_max-out,-v1,-v2-)
- [transformMat2d(out, v, m)](#_transformMat2d-out,-v,-m-)

#### `create()`

创建一个新的二维向量，返回结果为 [ 0, 0 ]。

#### `length(v)`

```js
/**
 * 计算向量的长度
 * @param {Array} v   要计算的向量
 * @return {Number}   返回该向量的长度
 */
length(v)
```


#### `normalize(out, v)`

```js
/**
 * 向量归一化
 * @param {Array} out   该变量用于存储归一化结果
 * @param {Array} v     操作对象
 * @return {Array} out  返回归一化的结果
 */
normalize(out, v)
```

#### `add(out, v1, v2)`

```js
/**
 * v1 和 v2 两向量相加
 * @param {Array} out    该变量用于存储结果
 * @param {Array} v1     操作向量 1
 * @param {Array} v2     操作向量 2
 * @return {Array} out   返回相加结果
 */
add(out, v1, v2)
```

#### `sub(out, v1, v2)`

```js
/**
 * v1 和 v2 两向量相减
 * @param {Array} out    该变量用于存储结果
 * @param {Array} v1     操作向量 1
 * @param {Array} v2     操作向量 2
 * @return {Array} out   返回相减结果
 */
sub(out, v1, v2)
```

#### `scale(out, v, s)`

```js
/**
 * 向量缩放
 * @param {Array} out    该变量用于存储结果
 * @param {Array} v      操作向量
 * @param {Array} s      缩放向量 [ sx, sy ]
 * @return {Array} out   返回结果
 */
scale(out, v, s)
```

#### `dot(v1, v2)`

两向量点乘。

#### `direction(v1, v2)`

计算 v1、v2 两项量的方向。

#### `angle(v1, v2)`

计算 v1、v2 两项量的夹角。

#### `angleTo(v1, v2, direction)`

计算 v1、v2 两项量的夹角。

#### `zero(v)`

判断 v 是否为 0 向量。

#### `distance(v1, v2)`

计算两项量之间的距离。

#### `clone(v)`

克隆向量。

#### `min(out, v1, v2)`

求两个向量最小值。

#### `max(out, v1, v2)`

求两个向量最大值。

#### `transformMat2d(out, v, m)`

```js
/**
 * 矩阵左乘向量
 * @param  {Array} out  存储计算结果
 * @param  {Array} v    向量
 * @param  {Array} m    矩阵
 * @return {Array}      返回结果
 */
transformMat2d(out, v, m)
```


## 实例

<canvas id="canvas"></canvas>

```js+
const { Canvas } = F2.G; // 引入 Canvas
const canvas = new Canvas({
  el: 'canvas',
  width: 200,
  height: 100
}); // 创建 canvas 对象
const container = canvas.addGroup(); // canvas 上添加一个分组
const itemGroup = container.addGroup(); // container 上添加一个分组
itemGroup.addShape('circle', {
  attrs: {
    x: 5,
    y: 0,
    r: 5,
    fill: 'red'
  }
}); // 在该分组中添加一个圆
itemGroup.addShape('text', {
  attrs: {
    x: 17,
    y: 0,
    textAlign: 'start',
    textBaseline: 'middle',
    fontSize: 12,
    fill: 'red',
    text: '分类一'
  }
}); // 在该分组中添加一个文本
const bbox = itemGroup.getBBox(); // 获取改分组的包围盒，用于计算其他图形的显示位置
container.addShape('rect', {
  zIndex: -1,
  attrs: {
    x: bbox.minX - 5,
    y: bbox.minY - 5,
    width: bbox.width + 10,
    height: bbox.height + 10,
    fill: 'rgba(0, 0, 0, 0.09)'
  }
}); // 添加一个矩形

canvas.addShape('rect', {
  zIndex: 0,
  attrs: {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    fill: 'rgba(0, 0, 0, 0.09)'
  }
}); // 添加一个矩形

container.sort(); // 按照 zIndex 层级索引进行排序
container.moveTo(30, 50); // 移动 container
canvas.draw(); // 绘制
```
