---
title: Matrix
order: 4
---

## 获取方式
```javascript
const Matrix = F2.G.Matrix;
```

## 方法
提供 3x2 矩阵操作方法，具体提供了以下方法：

### multiply(m1, m2)

两个矩阵相乘。

```javascript
/**
  * 两个矩阵相乘
  * @param  {Array} m1 左矩阵
  * @param  {Array} m2 右矩阵
  * @return {Array}    返回结果
  */
multiply(m1, m2)
```

### scale(out, m, v)

缩放变换。

```javascript
/**
  * 缩放变换
  * @param  {Array} out 该变量用于存储缩放结果
  * @param  {Array} m   需要变换矩阵
  * @param  {Array} v   缩放向量 [ sx, sy ]
  * @return {Array}     返回结果
  */
scale(out, m, v)
```

### rotate(out, m, radian)

旋转变换。

```javascript
/**
  * 旋转变换
  * @param  {Array} out      该变量用于存储缩放结果
  * @param  {Array} m        需要变换矩阵
  * @param  {Array} radian   旋转的弧度
  * @return {Array}          返回结果
  */
rotate(out, m, radian)
```

### translate(out, m, v)

平移变换。

```javascript
/**
  * 平移变换。
  * @param  {Array} out      该变量用于存储缩放结果
  * @param  {Array} m        需要变换矩阵
  * @param  {Array} v        平移向量 [ x, y ]
  * @return {Array}          返回结果
  */
translate(out, m, v)
```

### transform(m, actions)

进行平移、旋转、缩放的变换，所有的操作配置在 actions 属性中进行，actions 支持的操作包含 't'（translate）、's'（scale）、'r'（rotate），可进行任意组合，如下实例所示：

```javascript
[
  [ 't', x, y ], // t 表示 translate, x 表示 x 方向的位移值，y 表示 y 方向的位移值
  [ 's', sx, sy ], // s 表示 scale, sx 表示 x 方向上的缩放值，sy 表示 y 方向的缩放值
  [ 'r', radian] // r 表示 rotate，radian 表示旋转的弧度值
]
```

```javascript
/**
  *
  * @param  {Array} m        需要变换矩阵
  * @param  {Array} actions  变换操作集合
  * @return {Array}          返回结果
  */
transform(m, actions)
```

