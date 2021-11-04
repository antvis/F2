---
title: Group
order: 2
---

## 获取方式
```javascript
const Group = F2.G.Group;
```

## 创建 Group 实例

`new Group(config)` 创建 group 对象。

```javascript
new Group({
  zIndex: 0,
  visible: true
});
```

- 参数：`config`


类型：Object，创建 group 对象需要的传递的属性，具体包含：

| **属性名** | **类型** | **描述** |
| --- | --- | --- |
| `zIndex` | Number | z-index 值，用于调整绘制顺序。 |
| `visible` | Boolean | 显示还是隐藏。 |
| `className` | String | 对象标记，由用户指定 |

## 方法

### getChildren()

```javascript
/**
 * 获取 group 容器下包含的元素集合
 * @return {Array}
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

### isVisible()

```javascript
/**
 * 判断当前 group 对象是否可见
 * @return {Boolean}
 */
isVisible()
```

### isGroup()

```javascript
/**
 * 标记当前对象为 group
 * @return {Boolean}
 */
isGroup()
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

## getBBox()

```javascript
/**
 * 获取当前 group 的最小包围盒
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

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/c516e878-4619-4fea-ac2b-4fc2b74dfd8c.png)

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

获取 group 的属性，name 对应属性名。

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

### clear()

```javascript
/**
  * 清除所有的元素
  * @return {Group} 返回自己
  */
clear()
```

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
