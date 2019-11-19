---
title: Util
order: 4
---

# Util

获取方式：

```javascript
const Util = F2.Util;
```

## 方法

### upperFirst

`upperFirst(s)`

- 描述：将字符串的第一个字母转换成大写

- 参数：String 类型

- 返回：返回首字母大写后的字符串


### lowerFirst

`lowerFirst(s)`

- 描述：将字符串的第一个字母转换成小写

- 参数：String 类型

- 返回：返回首字母小写后的字符串


### isString

`isString(value)`

- 描述：判断是否是字符串

- 参数：任意类型的值

- 返回：返回判断结果


### isNumber

`isNumber(value)`

- 描述：判断是否数字

- 参数：任意类型的值

- 返回：返回判断结果


### isBoolean

`isBoolean(value)`

- 描述：判断是否是布尔类型

- 参数：任意类型的值

- 返回：返回判断结果


### isFunction

`isFunction(fn)`

- 描述：判断是否为函数

- 参数：任意类型的值

- 返回：返回判断结果


### isArray

`isArray(value)`

- 描述：判断是否为数组

- 参数：任意类型的值

- 返回：返回判断结果


### isDate

`isDate(value)`

- 描述：判断是否为日期类型

- 参数：任意类型的值

- 返回：返回判断结果


### isNil

`isNil(o)`

- 描述：判断值是否为空（undefined 或者 null）

- 参数：任意类型的值

- 返回：返回判断结果


### isObject

`isObject(value)`

- 描述：判断是否为对象类型

- 参数：任意类型的值

- 返回：返回判断结果


### deepMix

`deepMix(target, source1, source2 source3)`

- 描述：深拷贝

- 参数：target 拷贝的目标，source 拷贝对象，最多支持 3 个对象

- 返回：拷贝结果


### mix

`mix(target, source1, source2 source3)`

- 描述：浅拷贝

- 参数：target 拷贝的目标，source 拷贝对象，最多支持 3 个对象

- 返回：拷贝结果


### indexOf

`indexOf(arr, element)`

- 描述：查找元素在数组中的索引

- 参数：arr：查找的数组，element: 查找的元素

- 返回：返回索引值


### each

`each(elements, func)`

- 描述：遍历数组或者对象

- 参数：elements：需要遍历的数组或者对象，func：回调函数

- 返回：


```javascript
Util.each([ 1, 2, 3 ], (val, index) => {
  console.log('每项的值', val);
  console.log('索引', index);
});

Util.each([ 1, 2, 3, 4, 5 ], (val, index) => {
 if (val === 4) {
   return false; // 跳出循环
 }
});
```

### getPixelRatio

`getPixelRatio()`

- 描述：获取当前设备的像素比

- 参数：无

- 返回：Number, 返回当前设备像素比


### getRelativePosition

`getRelativePosition(point, canvas)`

- 描述：将当前鼠标的坐标转换为画布的相对坐标

- 参数：point: 当前鼠标坐标，canvas: 当前图表的 canvas 对象，chart.get('canvas') 获取

- 返回：画布坐标，Object 类型


```javascript
const chart = new Chart({});

const mousePoint = {
  x: 10,
  y:39
};

const canvasPoint = F2.Util.getRelativePosition(mousePoint, chart.get('canvas'));
```
