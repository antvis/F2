---
title: 自定义 Interaction
order: 8
---

**F2 3.2** 提供一套交互行为的注册机制，达到通用交互行为的封装和复用。

一系列基础的事件组成一种具体的交互行为，同时交互行为也可提供配置化的反馈（结果）。在我们交互机制中，每一个交互行为包括三个环节：

1. 触发，对应一种触发事件

2. 持续，对应一种持续事件

3. 结束，对应一种结束事件


举个例子，tooltip 的交互行为，就是从 touchstart 开始触发，touchmove 时 tooltip 持续展示并更新，touchend 时 tooltip 消失，此交互行为结束。

## 自定义交互

自定义交互行为的流程如下：

基于 Interaction 基类，定义交互行为子类 -> 注册该交互行为类 -> 使用该交互行为。

### Interaction 基类

交互模块默认没有打包至 `@antv/f2` 模块包中。所以在使用时需要手动引入：

```javascript
// 引入 Interaction 基类
const Interaction = require('@antv/f2/lib/interaction/base');
```

**Interaction 基类类图**<br />![](https://gw.alipayobjects.com/zos/rmsportal/xNcQrbxFUhrrtNbnDams.png#width=373)

#### 支持的事件

该基类基于 [Hammer.js](http://hammerjs.github.io/) 手势库，支持手势事件以及 H5 的 touchstart、touchmove、touchend 事件。

#### 公有属性

基类中定义了如下公有属性：

```javascript
// 公有属性
startEvent: 'touchstart', // 触发事件名称
processEvent: 'touchmove', // 持续事件名称
endEvent: 'touchend', // 结束事件名称
resetEvent: null // 恢复图表原始状态的触发事件
```

#### 公有方法

同时还默认提供了在每种状态事件触发后的钩子，用户可以通过使用这些钩子做一些操作。

```javascript
onStart(e) {}    // 交互行为触发后的钩子
onProcess(e) {}  // 交互行为持续过程中的钩子
onEnd(e) {}      // 交互行为结束时的钩子
onReset(e) {}    // reset 执行后的钩子
```

对于每一种交互行为的子类，其配置项以及钩子不同，根据每种需求以及交互行为的特征自己定义。

#### 例子

```javascript
const Interaction = require('@antv/f2/lib/interaction/base');

const MyInteraction extends Interaction {
  getDefaultCfg() {
    return {
      startEvent: 'touchstart',
      processEvent: 'touchmove',
      endEvent: 'touchend',
      resetEvent: 'touchstart'
    }
  }
  start(ev) {}
  process(ev) {}
  end(ev) {}
  reset(ev) {}
}
```

更多可参考 [pie-select](https://github.com/antvis/f2/blob/master/src/interaction/pie-select.js) 交互行为类的实现。

### 注册交互行为

定义好交互行为类之后，需要注册该交互行为：

- 'my-interaction', 交互行为的名称

- MyInteraction，交互行为类


```javascript
F2.Chart.registerInteraction('my-interaction', MyInteraction);
```

### 使用交互行为

```javascript
chart.interaction('my-interaction', {
  startEvent: 'touchstart',
  /* ... */
});
```

### 清除交互行为

```javascript
chart.clearInteraction()       // 清除 chart 实例上所有的交互行为
chart.clearInteraction('type') // 清除名称为 'type' 的交互行为
```


