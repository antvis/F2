---
title: 多端适配
order: 10
---

在 5.0 中，F 系列基于移动端特点和共性进行了移动端底层架构（Fengine）的统一，对接于最新的 G 5.0 之上。我们利用 Fengine 提供的多端适配，可以快速适配各种框架/端。

## 说明

![](https://mdn.alipayobjects.com/huamei_khb4xj/afts/img/A*eihISab7e24AAAAAAAAAAAAADq2NAQ/original)

其中：

- @antv/f-engine ---- 无框架
- @antv/f-react ---- react 框架
- @antv/f-vue ---- vue 框架
- @antv/f-my ---- 支付宝小程序端
- @antv/f-wx ---- 微信小程序端

## 使用方式

F2 默认引入 @antv/f-engine 中的 canvas。使用者根据框架/端，引入不同端的 canvas 以及 F2， 即可快速搭建可视化图表。具体使用方式可查看对应文档。

## 封装思路

F2 是基于 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 的标准接口绘制的，所以只要能提供标准 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 接口的实现对象，F2 就能进行图表绘制

因为在小程序中给的 `context` 对象不是标准的 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) , 所以封装的核心思路是将 `context` 和 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对齐，所以 F2 针对支付宝和微信这 2 个常见的场景做了一层 `context` 的对齐，详情可见: https://github.com/antvis/f2-context, 其他小程序也可以按同样的思路封装
