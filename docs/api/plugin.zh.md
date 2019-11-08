---
title: Plugin 插件机制
order: 10
---

F2 提供插件机制用于扩展图表的功能，该机制可以帮助用户在图表创建的各个阶段定制或更改图表的默认行为。

目前默认提供了 legend、guide、tooltip 以及动画（群组以及精细动画两个版本）这四种插件。

F2 在 Chart 类上注册一个静态属性 Chart.plugins, 使用发布-订阅模式，在 chart 的生命周期中通知注册的各个插件进行各自的操作。

目前开放的生命周期包括：

- `init` chart 初始化结束后

- `beforeGeomDraw` 绘制 geom 之前

- `afterGeomDraw`  绘制 geom 之后

- `beforeCanvasDraw` canvas draw 之前

- `clear` 清空图表，移除 geom

- `clearInner` 清空图层

- `repaint` 重绘


## 如何自定义插件

插件的实现非常简单，只需要在需要的生命周期节点定义具体的行为即可，可参考： [Guide 插件](https://github.com/antvis/f2/blob/master/src/plugin/guide.js)

```javascript
const plugin = {
    init(chart) {
       // do something when initialize the chart
    }
};
```

## 如何注册/使用插件

1. 全局注册 Chart.plugins.register(Pluign);


```javascript
const plugin1 = { /* plugin implementation */ };
const plugin2 = { /* plugin implementation */ };
// 全局注册插件 plugin1，所有创建的 chart 实例都默认注册上
Chart.plugins.register(plugin1);
// 全局注册多个插件
Chart.plugins.register([ plugin1, plugin2 ]);
```

1. 在 chart 实例上注册


```javascript
const plugin1 = { /* plugin implementation */ };
const plugin2 = { /* plugin implementation */ };

// chart1 use "plugin1"
const chart1 = new Chart({
  plugins: plugin1
);
// chart2 use "plugin2"
const chart2 = new Chart({
  plugins: plugin2
);
// chart3 doesn't use "plugin"
const chart3 = new Chart({});
```

## 注销插件

`Chart.plugins.unregister(plugins)` 注销 plugins

## 清除插件

`Chart.plugins.clear()` 清除插件

## 获取注册的所有插件

`Chart.plugins.getAll()`  获取注册的所有插件

## 现有插件

- [Tooltip](https://www.yuque.com/antv/f2/tooltip)

- [Legend](https://www.yuque.com/antv/f2/api-legend)

- [Guide](https://www.yuque.com/antv/f2/api-guide)

- [Animation](https://www.yuque.com/antv/f2/api-animate)

- [Gesture](https://www.yuque.com/antv/f2/api-gesture)

- [ScrollBar](https://www.yuque.com/antv/f2/api-scroll-bar)


