---
title: Canvas
order: 1
---

## 获取方式
```javascript
const Canvas = F2.G.Canvas;
```

## 创建 Canvas 实例

`new Canvas(config)` 创建 canvas 对象。

```javascript
// <canvas id="c1"></canvas>

new Canvas({
  el: 'c1',
  width: 500,
  height: 500
});
```

- 参数：`config`


类型：Object，创建 canvas 对象需要的传递的属性，具体包含：

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `el` | String/HtmlElement | 对应 canvas dom 的 id 或者 canvas dom 对象。 |
| `context` | CanvasRenderingContext2D | canvas 上下文，即通过传入 canvas 上下文对象来创建 Canvas 对象。 |
| `width` | Number | canvas 的宽度，可选，如果不设置则默认按照传入 canvas 元素的实际宽度。 |
| `height` | Number | canvas 的高度，可选，如果不设置则默认按照传入 canvas 元素的实际高度。 |
| `pixelRatio` | Number | canvas 的显示精度，默认读取当前设备的像素比。 |


## 方法

### getChildren()

```javascript
/**
 * 获取 canvas 容器下包含的元素集合
 * @return {Array} 返回容器内包含的元素集合
 */
getChildren()
```

### isDestroyed()

```javascript
/**
 * 标识对象是否已被销毁
 * @return {Boolean}
 */
isDestroyed()
```

### getWidth()

```javascript
/**
 * 获取 canvas 对应 dom 元素的宽度
 * @return {Number} 返回宽度
 */
getWidth()
```

### getHeight()

```javascript
/**
 * 获取 canvas 对应 dom 元素的高度
 * @return {Number} 返回高度
 */
getHeight()
```

### changeSize(width, height)

```javascript
/**
 * 改变 canvas 的宽高
 * @param  {Number} width  宽度
 * @param  {Number} height 高度
 */
changeSize(width, height)
```

### getPointByClient(clientX, clientY)

```javascript
/**
 * 将窗口坐标转变成画布坐标
 * @param  {Number} clientX 窗口 x 坐标
 * @param  {Number} clientY 窗口 y 坐标
 * @return {Object} canvas 画布坐标坐标
 */
getPointByClient(clientX, clientY)
```

### addShape(type, config)

```javascript
/**
 * 创建并往 canvas 上添加 Shape
 * @param {String} type 添加的 shape 类型
 * @param {Object} config  shape 的配置项
 * @return {Shape} 返回创建的 shape 实例
 */
addShape(type, config = {})
```

参数 `config` 传入的是 Shape 的配置项，包含：

```javascript
{
  className: String, // 标记，由用户指定
  zIndex: Number, // shape 的层次索引
  visible: Boolean, // 显示隐藏
  attrs: Object // shape 的图形属性配置，见 Shape 描述，不同 shape 的图形属性不同
}
```

### addGroup(config)

```javascript
/**
 * 创建并添加 Group 组
 * @param {Object||null} cfg 配置信息
 * @return {Group} 返回创建的 Group 实例
 */
addGroup(config)
```

参数 `config` 传入的是 Group 的配置项，包含：

```javascript
{
  className: String, // 标记，由用户指定
  zIndex: Number, // group 的层次索引
  visible: Boolean // 显示隐藏
}
```

### add(items)

```javascript
/**
 * 往 canvas 中添加元素
 * @param {Array||Group||Shape} items 可以是 group 实例或者 shape 实例或者他们的数组集合
 * @return {Canvas}  返回当前 canvas 对象
 */
add(items)
```

### contain(item)

```javascript
/**
 * 判断 canvas 中是否包含 item 元素
 * @param  {Shape||Group} item shape 或者 group 实例
 * @return {Boolean}      返回判断结果，true 表示包含，false 表示不包含
 */
contain(item)
```

### sort()

```javascript
/**
 * 按照当前容器中包含元素的 zIndex 进行从大到小的排序
 * @return {Canvas||Group} 返回自己
 */
sort()
```

### get(name)

获取 canvas 的属性，name 对应属性名。

### set(name, value)

设置属性值。

### clear()

```javascript
/**
  * 清除所有的元素
  * @return {Canvas|Group} 返回自己
  */
clear()
```

### draw()

绘制。

### destroy()

销毁 canvas 对象。
