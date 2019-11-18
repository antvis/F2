---
title: Vector2
order: 5
---

## 获取方式

```javascript
const Vector2 = F2.G.Vector2;
```

## 方法

二维向量操作方法，具体提供的方法如下：

### create()

创建一个新的二维向量，返回结果为 [ 0, 0 ]。

### length(v)

```javascript
/**
 * 计算向量的长度
 * @param {Array} v   要计算的向量
 * @return {Number}   返回该向量的长度
 */
length(v)
```

### normalize(out, v)

```javascript
/**
 * 向量归一化
 * @param {Array} out   该变量用于存储归一化结果
 * @param {Array} v     操作对象
 * @return {Array} out  返回归一化的结果
 */
normalize(out, v)
```

### add(out, v1, v2)

```javascript
/**
 * v1 和 v2 两向量相加
 * @param {Array} out    该变量用于存储结果
 * @param {Array} v1     操作向量 1
 * @param {Array} v2     操作向量 2
 * @return {Array} out   返回相加结果
 */
add(out, v1, v2)
```

### sub(out, v1, v2)

```javascript
/**
 * v1 和 v2 两向量相减
 * @param {Array} out    该变量用于存储结果
 * @param {Array} v1     操作向量 1
 * @param {Array} v2     操作向量 2
 * @return {Array} out   返回相减结果
 */
sub(out, v1, v2)
```

### scale(out, v, s)

```javascript
/**
 * 向量缩放
 * @param {Array} out    该变量用于存储结果
 * @param {Array} v      操作向量
 * @param {Array} s      缩放向量 [ sx, sy ]
 * @return {Array} out   返回结果
 */
scale(out, v, s)
```

### dot(v1, v2)

两向量点乘。

### direction(v1, v2)

计算 v1、v2 两项量的方向。

### angle(v1, v2)

计算 v1、v2 两项量的夹角。

### angleTo(v1, v2, direction)

计算 v1、v2 两项量的夹角。

### zero(v)

判断 v 是否为 0 向量。

### distance(v1, v2)

计算两项量之间的距离。

### clone(v)

克隆向量。

### min(out, v1, v2)

求两个向量最小值。

### max(out, v1, v2)

求两个向量最大值。

### transformMat2d(out, v, m)

```javascript
/**
 * 矩阵左乘向量
 * @param  {Array} out  存储计算结果
 * @param  {Array} v    向量
 * @param  {Array} m    矩阵
 * @return {Array}      返回结果
 */
transformMat2d(out, v, m)
```

