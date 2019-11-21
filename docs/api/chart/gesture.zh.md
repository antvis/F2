---
title: Gesture
order: 12
---

用于图表绑定图表上的手势事件。该方法会返回 gestureController。除了支持系统基础事件 touchstart、touchmove、touchend，还支持复杂的手势，基于手势库 [hammerjs](https://github.com/hammerjs/hammer.js)。

![](https://cdn.yuque.com/yuque/0/2018/png/104396/1524466228977-0589fe3d-2cef-4d42-946f-ae54f2dfb18b.png#width=827)

## 如何引入使用插件

Gesture 作为 F2 的插件，完整版不包含该手势插件，如果需要使用的话，需要先将该组件注册入 Chart 类或者 Chart 实例。

`hammerjs`  压缩文件大小 20k。 GZIP 后大小 7.3k。

```javascript
const F2 = require('@antv/f2/lib/core');
const Gesture = require('@antv/f2/lib/plugin/gesture');
// 1.全局注册，也可以给 chart 的实例注册
F2.Chart.plugins.register(Gesture);
// 2.给具体的 chart 实例注册
const chart = new F2.Chart({
  id: 'canvas',
  plugins: Gesture
});
```

## API

```javascript
// 加载初始化手势插件
chart.pluginGesture({
  gesture: {},
  hammerOptions: {},
  options: {},
});
```

### 参数

- `gesture`: Object


需要绑定的手势事件，配置的属性为以事件名为 key 的回调方法。

```javascript
gesture: {
  touchstart(data, event) {
    console.log('touchstart')
  },
  press(data, event) {
    console.log('press')
  }
}
```

1. 回调事件的第一个参数，data 是手势事件触发中心点坐标对应的图形数据点。

2. 回调事件的第二个参数，event 是手势事件对象。三个基础手势事件返回的是 [touchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)。hammer 手势返回的事件是 [eventObject](http://hammerjs.github.io/api/#event-object)。


- `hammerOptions`: Object


传递给 hammer 的[参数配置](http://hammerjs.github.io/api/#hammer.defaults)。一般不需要配置。

- `options`: Object


手势插件的配置，配置如下

```javascript
options: {
  useCalculate: true, // 计算手势数据点，如果不需要可以关闭提高性能
  useOffset: false // 计算数据是否需要计算图表相对页面偏移的坐标。当图表宽度超出, scroll模式，计算位置需要加
```

