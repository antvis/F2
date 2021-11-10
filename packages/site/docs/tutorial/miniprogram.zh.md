---
title: 小程序上渲染 F2
order: 13
redirect_from:
  - /zh/docs/tutorial/manual/miniprogram
---

F2 是基于 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 的标准接口绘制的，所以只要能提供标准 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 接口的实现对象，F2 就能进行图表绘制

## 封装思路

因为在小程序中给的 `context` 对象不是标准的 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) , 所以封装的核心思路是将 `context` 和 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对齐，所以 F2 针对支付宝和微信这 2 个常见的场景做了一层 `context` 的对齐，详情可见: https://github.com/antvis/f2-context, 其他小程序也可以按同样的思路封装

## 小程序组件

为了方便使用， 我们针对支付宝和微信分别分装了对应的自定义组件

### 支付宝小程序

F2 的支付宝小程序版本。

- github：[https://github.com/antvis/my-f2](https://github.com/antvis/my-f2)

- 使用文档：[这里](https://github.com/antvis/my-f2/blob/master/README.md)

### 微信小程序

F2 的微信小程序图表组件

- github：[https://github.com/antvis/wx-f2](https://github.com/antvis/wx-f2)

- 使用文档：[这里](https://github.com/antvis/wx-f2/blob/master/README.md)
