---
title: 常见问题
order: 2
---

## 1. 图表模糊怎么办？
#### 现象描述：
绘制的图表上的字体和文字模糊<br />![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/7ac3aa87-910a-43c3-8e03-f9c41f04b68d.png)

#### 原因分析

由于目前的手持设备大多数都是高清屏，也就说浏览器的一像素会对应手机屏幕上的多个像素点，以 iphone plus 为例，屏幕的 3 个像素会对应浏览器上的 1 个像素，所以就会出现模糊的现象。

浏览器上有个属性 `window.devicePixelRatio` 就是标明了屏幕像素的比例。

#### 解决方案

F2 提供了两种方式来解决这个问题：

1. 全局配置项更改

2. 单个图表更改


```javascript
// 全局修改
F2.Global.pixelRatio = window.devicePixelRatio;

// 单个图表更改
const chart1 = new F2.Chart({
  id: 'can2',
  pixelRatio: 2 // 单独设置，经常设置 window.devicePixelRatio
});
```

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/1730501d-ce3e-4644-998c-9674f7eaaa2b.png)

#### 更多说明

F2 没有默认设置 `window.devicePixelRatio` 的原因：

- 由于 F2 除了应用在 Web 端的 H5 应用外，还嵌入了一些 native 的应用中，而这些环境中不能使用这个属性

- 不同的团队的高清方案不同，有些团队会使用整体缩放页面的方案，此时不应该设置这个属性


## 2. 怎么显示时间类型

#### 现象描述：

现有数据格式：

```javascript
const data = [
  { time: '2011-01-01', value: 10 },
  { time: '2011-01-02', value: 20 },
  ...
  { time: '2011-01-20', value: 0 }
];
```

则显示成：<br />![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/6fc11496-5f0b-4630-93af-a7c77407bd6d.png)

#### 问题分析

F2 没有支持时间类型的[度量](https://www.yuque.com/antv/f2/scale)，所以会自动将时间字符串识别成分类类型，不能自动计算时间坐标轴。

#### 解决方案

遇到这种情况下 F2 有两种解决方案

1. 将时间数据按照分类数据的方式显示，指定坐标点的个数


```javascript
chart.source(data, {
  time: {
    tickCount: 3
  }
})
```

或者直接指定坐标点

```javascript
chart.source(data, {
  time: {
    ticks: [ '2011-01-01', '2011-01-10', '2011-01-20' ]
  }
})
```

如果是显示折线图时，由于分类数据的 x 轴会在两边留下空白，所以需要设置 `range: [0, 1]`

```javascript
chart.source(data, {
  time: {
    range: [ 0, 1 ],
    ticks: [ '2011-01-01', '2011-01-10', '2011-01-20' ]
  }
})
```

2. 上面的方案如果在数据已经排序过时表现非常好，但是如果数据未进行排序，则可以将数据字段声明成 timeCat 类型


```javascript
chart.source(data, {
  time: {
    type: 'timeCat',
    tickCount: 3
  }
});
```
![](https://gw.alipayobjects.com/zos/rmsportal/FFmrEHSufiuzKqojzzyD.png#width=700)
## 3. 怎么跟图表交互

#### 问题描述：

经常有场景需要手（鼠标）在图表上滑动显示滑动位置的相关信息，没有看到 F2 的 demo 或者 API！

#### 问题分析：

由于 F2 主要是提供绘制图表和定制个性化图表的能力，由于各种手机环境下交互的方式和样式差别很大，所以 F2 对交互没有进行封装，需要用户自己监听 canvas 的事件，但是 F2 提供了一些接口来完成交互。

#### 解决方案

F2 提供了三个方法用于跟获取图表的信息：

- `getPosition(record)` 根据数据值获取画布上的位置

- `getRecord(point)` 根据画布上的像素位置获取记录信息

- `getSnapRecords(point)` 根据画布上的位置获取临近的数据


`getRecord()` 和 `getSnapRecords()` 差别在于 前者将画布的坐标转换成数据对应的值，无论用户数据中是否存在对应的数据，而后者会在原始的数据中进行查找并返回。

常见的点击画布获取信息的步骤如下：

1. 获取点击的画布的坐标，可以通过 [F2.Util.getRelativePosition(point, canvas)](https://www.yuque.com/antv/f2/api-util#r9p1ni) 方法将事件坐标转换为画布坐标

2. 通过 `getSnapRecords()` 方法获取临近的数据


```javascript
canvas.onclick=function(event){
  let point = {
    x: event.clientX,
    y: event.clientY
  };
  point = F2.Util.getRelativePosition(point, canvas);
  const x = parseInt(point.x);
  const y = parseInt(point.y);
  console.log("x:" + x + ";" + "y:" + y);
  // 根据画布坐标获取对应数据集
  const data = chart.getSnapRecords(point);
  console.log(data);
}
```

用户获取到数据后可以进行任何自己想进行的交互。

## 4. 如何设置渐变色

#### 问题描述：

面积图需要显示渐变色。

#### 解决方案

F2 **3.2.1** 版本开始支持使用渐变色的声明方式：

```javascript
chart.area().position('year*age').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
```

详见 [demo](/en/examples/area/basic#gradient)。渐变色声明使用方式详见：[渐变色](https://www.yuque.com/antv/f2/canvas#zrhdmb)。

3.2.1 版本之前，需要用户自己获取 `context` 生成渐变对象，参考：[canvas 渐变](http://www.w3school.com.cn/jsref/dom_obj_canvasgradient.asp)，如下：

```javascript
// 创建渐变对象
const canvas = document.getElementById('mountNode');
const ctx = canvas.getContext('2d');
const grd = ctx.createLinearGradient(0,0,500,0);
grd.addColorStop(0,"#293c55");
grd.addColorStop(1,"#f7f7f7");

// 直接设置渐变颜色
chart.area().position('x*y').color(grd);
```

[示例](/en/examples/area/basic#gradient)

## 5. 坐标轴上数字混乱

#### 问题描述

有时候坐标轴上的数字没有排序，例如 '2,4,1,0,10'![](https://gw.alipayobjects.com/zos/rmsportal/sGpgCogaOcoBUpKqcsWr.png#width=)

#### 问题分析

这种情况都是将数字类型的数据表示成了字符串，如下所示：

```javascript
const data = [
  { time: '2010-01-01', value: '10' },
  { time: '2010-01-02', value: '8' },
  { time: '2010-01-03', value: '11' },
  { time: '2010-01-04', value: '9' }
];
```

#### 解决方案

将字符串改成数字就解决了这个问题

```javascript
const data = [
  { time: '2010-01-01', value: 10 },
  { time: '2010-01-02', value: 8 },
  { time: '2010-01-03', value: 11 },
  { time: '2010-01-04', value: 9 }
];
```

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/5463499e-8065-4a76-9d8d-3586d3435fd1.png)

## 6. 如何显示文本

#### 问题描述

在移动端的图表经常需要显示图表，但是 F2 的图表上并没有提供 .label 方法

```javascript
// g2 代码
chart.line().position('time*value').label('value');
```

#### 问题分析

由于图表的文本显示非常复杂，不同的图表，在不同的坐标系下显示都不一样，所以 F2 为了精简代码方面的考虑并没有像 G2 一样提供 .label 方法，但是 F2 提供了非常强大的 guide 功能，可以通过 guide 来绘制文本。

#### 解决方案

使用 F2 的 guide，参考 [guide 接口](https://www.yuque.com/antv/f2/api-guide)。

[查看示例](/en/examples/component/guide#text)。
