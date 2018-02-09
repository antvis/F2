# 绘图引擎

## 容器层次结构

![undefined](https://gw.alipayobjects.com/zos/skylark/bf8b4e5a-0421-48ae-ac32-a789b0079d17/2018/png/3c63f255-011a-4166-8715-0f72511175b5.png)  

## API

### Canvas

```html
<canvas id="c1"></canvas>
```

```js
new Canvas({
  el: 'c1',
  width: 500,
  height: 500
});
```

#### 属性

- `el` String | HtmlElement： 容器的 id 或者 canvas dom 对象。
- `context` CanvasRenderingContext2D：canvas 上下文，也支持传入 canvas 上下文对象来创建 Canvas 对象。
- `width` Number：canvas 的宽度，可选，如果不设置则默认按照传入 canvas 元素的实际宽度。
- `height` Number：canvas 的高度，可选，如果不设置则默认按照传入 canvas 元素的实际高度。
- `pixelRatio` Number: canvas 的显示精度，默认读取当前设备的像素比。
- `children` Array：canvas 容器下包含的元素集合。
- `destroyed` Boolean: 是否对象已被销毁

#### 方法

- getWidth

```js
/**
 * 获取 canvas 对应 dom 元素的宽度
 * @return {Number} 返回宽度
 */
getWidth()
```

- getHeight

```js
/**
 * 获取 canvas 对应 dom 元素的高度
 * @return {Number} 返回高度
 */
getHeight()
```

- changeSize

```js
/**
 * 改变 canvas 的宽高
 * @param  {Number} width  宽度
 * @param  {Number} height 高度
 */
changeSize(width, height)
```

- getPointByClient

```js
/**
 * 将窗口坐标转变成 canvas 坐标
 * @param  {Number} clientX 窗口x坐标
 * @param  {Number} clientY 窗口y坐标
 * @return {Object} canvas坐标
 */
getPointByClient(clientX, clientY)
```

- addShape

```js
/**
 * 创建并添加 Shape
 * @param {String} type 添加的 shape 类型
 * @param {Object} cfg  shape 的配置项
 * @return {Shape} 返回创建的 shape 实例
 */
addShape(type, cfg = {})
```

- addGroup

```js
/**
 * 创建并添加 Group 组
 * @param {Object||null} cfg 配置信息
 * @return {Group} 返回创建的 Group 实例
 */
addGroup(cfg)
```

- add

```js
/**
 * 添加元素
 * @param {Array||Group||Shape} items group 实例或者 shape 实例或者他们的数组集合
 */
add(items)
```

- contain

```js
/**
 * 判断是否包含 item 
 * @param  {Shape||Group} item shape 或者 group 实例
 * @return {Boolean}      true 表示包含，false 表示不包含
 */
contain(item)
```

- sort

```js
/**
 * 按照各个元素的 zIndex 进行从大到小的排序
 * @return {Canvas||Group} 返回自己
 */
sort()
```

```js
get(name) // 获取属性
set(name, value) // 设置属性
clear() // 清除所有元素
draw() // 绘制
destroy() // 销毁
```

### Group

```js
new Group({
  zIndex: 0
});
```

#### 属性
- `className` String: 标记
- `zIndex` Number: 层级，默认值为 0
- `visible` Boolean：显示还是隐藏
- `children` Array：子元素集合
- `isGroup` Boolean: true，标识 Group 身份
- `destroyed` Boolean: 是否对象已被销毁

#### 方法

- addShape

```js
/**
 * 创建并添加 Shape
 * @param {String} type 添加的 shape 类型
 * @param {Object} cfg  shape 的配置项
 * @return {Shape} 返回创建的 shape 实例
 */
addShape(type, cfg = {})
```


- addGroup

```js
/**
 * 创建并添加 Group 组
 * @param {Object||null} cfg 配置信息
 * @return {Group} 返回创建的 Group 实例
 */
addGroup(cfg)
```

-add

```js
/**
 * 添加元素
 * @param {Array||Group||Shape} items group 实例或者 shape 实例或者他们的数组集合
 */
add(items)
```

- contain

```js
/**
 * 判断是否包含 item 
 * @param  {Shape||Group} item shape 或者 group 实例
 * @return {Boolean}      true 表示包含，false 表示不包含
 */
contain(item)
```

- sort

```js
/**
 * 按照各个元素的 zIndex 进行从大到小的排序
 * @return {Canvas||Group} 返回自己
 */
sort()
```

- getBBox

```js
/**
 * 获取最小包围盒
 * @return {Object} 返回包围盒
 */
getBBox()
```

- remove

```js
/**
 * 移除
 * @param  {Boolean} destroy true 表示将自己移除的同时销毁自己，false 表示仅移除自己
 * @return {null}
 */
remove(destroy)
```

- transform 平移、旋转、缩放

```js
transform(actions) // actions 为 Array 类型，表示操作的集合
```

actions 格式：

```js
[
  [ 't', x, y ], // t 表示 translate, x 表示 x 方向的位移值，y 表示 y 方向的位移值
  [ 's', sx, sy ], // s 表示 scale, sx 表示 x 方向上的缩放值，sy 表示 y 方向的缩放值
  [ 'r', radian] // r 表示 rotate，radian 表示旋转的弧度值
]
```

- setTransform 重新设置矩阵后，在进行平移、旋转、缩放操作

```js
setTransform(actions) // actions 为 Array 类型，表示操作的集合setTransform
```

- `translate(x, y)` 平移
- `rotate(radian)` 旋转
- `scale(sx, sy)` 缩放
- `moveTo(x, y)` 移动到指定位置

```js
get(name) // 获取属性
set(name, value) // 设置属性
getParent() // 获取父亲元素
show() // 显示
hide() // 隐藏
clear() // 清除所有元素
draw() // 绘制上下文
destroy() // 销毁并将自己从父元素中移除（如果有父元素的话）
```

### Shape
#### 通用属性
- `type` String: 图形类型
- `attrs` Object：绘图属性，不同的图形有所差异
- `zIndex` Number: 层级，默认值为 0
- `visible` Boolean：显示还是隐藏
- `isShape` Boolean: true，标识 Shape 身份
- `destroyed` Boolean: 是否对象已被销毁
- `className` String: 标记

#### 通用方法

- attr 获取/设置属性

```js
attr() // 返回所有的图形属性
attr(name) // 返回 name 对应的图形属性值
attr(name, value) // 设置单个图形属性
attr({}) // 设置多个图形属性
```

- getBBox

```js
/**
 * 获取最小包围盒
 * @return {Object} 返回包围盒
 */
getBBox()
```

- remove

```js
/**
 * 移除
 * @param  {Boolean} destroy true 表示将自己移除的同时销毁自己，false 表示仅移除自己
 * @return {null}
 */
remove(destroy)
```

- transform 平移、旋转、缩放

```js
transform(actions) // actions 为 Array 类型，表示操作的集合
```

actions 格式：

```js
[
  [ 't', x, y ], // t 表示 translate, x 表示 x 方向的位移值，y 表示 y 方向的位移值
  [ 's', sx, sy ], // s 表示 scale, sx 表示 x 方向上的缩放值，sy 表示 y 方向的缩放值
  [ 'r', radian] // r 表示 rotate，radian 表示旋转的弧度值
]
```

- setTransform 重新设置矩阵后，在进行平移、旋转、缩放操作

```js
setTransform(actions) // actions 为 Array 类型，表示操作的集合setTransform
```

- `translate(x, y)` 平移
- `rotate(radian)` 旋转
- `scale(sx, sy)` 缩放
- `moveTo(x, y)` 移动到指定位置

```js
get(name) // 获取属性
set(name, value) // 设置属性
getParent() // 获取父亲元素
show() // 显示
hide() // 隐藏
draw() // 绘制上下文
destroy() // 销毁并将自己从父元素中移除（如果有父元素的话）
```

#### Line 线

```js
new G.Line({
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
new G.Arc({
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
new G.Circle({
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
new Polygon({
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
new G.Polyline({
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
new G.Rect({
  attrs: {
    x: 50, // 矩形左上角 x 坐标
    y: 50, // 矩形左上角 y 坐标
    height: 20, // 矩形高度
    width: 80, // 矩形宽度
    lineWidth: 1, // html5 canvas 绘图属性
    fill: '#1890FF', // html5 canvas 绘图属性
    strokeStyle: '#000' // html5 canvas 绘图属性
    radius: 0 // 圆角的设置，可以是数值或者数组格式，用法同 padding
  }
})
```

#### Ring 圆环

```js
new G.Ring({
  attrs: {
    x: 100, // 圆心 x 坐标
    y: 150, // 圆心 y 坐标
    r: 50, // 圆环外半径
    r0: 30, // 圆环内半径
    lineWidth: 6, // html5 canvas 绘图属性
    fill: '#223273', // html5 canvas 绘图属性
    stroke: '#bfbfbf' // html5 canvas 绘图属性
  }
})
```

#### Sector 扇形

```js
new G.Sector({
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
new G.Text({
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
  }
});
```

#### Custom 自定义图形

```js
new G.Custom({
  attrs: {},
  createPath(context) {
    // 在这里绘制图形
  }
})
```

## 实例

<img src="https://gw.alipayobjects.com/zos/skylark/dd38786f-e8c1-41f9-9832-15b08b93dccc/2018/png/09c8c952-7f5f-4abc-8706-c479b53f0d62.png">

```js
const canvas = new Canvas({
  el: 'canvas',
  width: 200,
  height: 100
});
const container = canvas.addGroup();
const itemGroup = container.addGroup();
itemGroup.addShape('circle', {
  attrs: {
    x: 5,
    y: 0,
    r: 5,
    fill: 'red'
  }
});
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
});
const bbox = itemGroup.getBBox();
container.addShape('rect', {
  zIndex: -1,
  attrs: {
    x: bbox.minX - 5,
    y: bbox.minY - 5,
    width: bbox.width + 10,
    height: bbox.height + 10,
    fill: 'rgba(0, 0, 0, 0.09)'
  }
});

canvas.addShape('rect', {
  zIndex: 0,
  attrs: {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    fill: 'rgba(0, 0, 0, 0.09)'
  }
});

container.sort();
container.moveTo(30, 50);
canvas.draw();
```
