---
title: 小程序上渲染 F2
order: 9
---

# 小程序上渲染 F2

虽然 F2 默认基于 Html5 Canvas 进行图表绘制，但是对于当前运行时环境来说，只要能够提供和 Html5 Canvas 上下文环境一样的上下文接口，一样也能使用 F2 进行图表绘制。

下面的表格给出了各个运行环境下可使用的 F2 的功能对比：

| **--** | **Html5** | **Node** | **小程序（微信&&小程序）** |
| --- | --- | --- | --- |
| 图表绘制 | ✔︎ | ✔︎ | ✔︎ |
| Legend 组件 | ✔︎ | ✔︎ | ✔︎ |
| Tooltip 组件 | ✔︎ |  | ✔︎ |
| 事件（Tooltip、Legend 上的事件交互） | ✔︎ |  | ✔︎ |
| 动画 | ✔︎ |  | ✔︎ |


## 小程序

### 封装思路

详见：[《聊一聊 F2 与小程序》](https://yuque.com/antv/blog/bg9sxf)。

为了使用方便，我们分别对支付宝小程序和微信小程序分装了自定义组件，官网上的demo都是可以在小程序中运行的

### 支付宝小程序

F2 的支付宝小程序版本。

- github：[https://github.com/antvis/my-f2](https://github.com/antvis/my-f2)

- 使用文档：[这里](https://github.com/antvis/my-f2/blob/master/README.md)


### 微信小程序

F2 的微信小程序图表组件

- github：[https://github.com/antvis/wx-f2](https://github.com/antvis/wx-f2)

- 使用文档：[这里](https://github.com/antvis/wx-f2/blob/master/README.md)



