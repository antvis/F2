# 数据

数据是绘制一张图表最基本的部分。F2 支持的数据格式为标准的 JSON 数组。

## 数据格式

F2 接收的数据格式非常简单：标准的 JSON 数组，其中每个数组元素是一个标准的 JSON 对象：

Example:

```js
const data = [
  { gender: '男', count: 40 },
  { gender: '女', count: 30 }
];
```

## 如何加载数据

```js
chart.source(data);
```
