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

### 支付宝小程序

F2 的支付宝小程序版本（待支付宝支持自定义组件后，会基于此库提供一个支付宝小程序的组件）。

- github：[https://github.com/antvis/my-f2](https://github.com/antvis/my-f2)

- 使用文档：[这里](https://github.com/antvis/my-f2/blob/master/README.md)

- Demos:  [github](https://github.com/antvis/mini-program-f2-demos/tree/master/my-charts)，用户可以通过[蚂蚁开发者工具](https://docs.alipay.com/mini/ide/overview)直接打开此项目进行体验感受。

### 支付宝小程序图表库mini-chart
和上面小程序版本不同之处在于，my-f2是用f2的方式较为自定义底层地绘制，而mini-chart是封装成了自定义组件的形式，在使用上要简单些。

- github：[https://github.com/ant-mini-program/mini-chart](https://github.com/ant-mini-program/mini-chart)

文档和demo都在这个仓库中。

### 微信小程序

F2 的微信小程序图表组件

- github：[https://github.com/antvis/wx-f2](https://github.com/antvis/wx-f2)

- 使用文档：[这里](https://github.com/antvis/wx-f2/blob/master/README.md)

- Demos: 源码位于项目 pages/charts/ 目录下，可以使用[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=2018412)打开[ wx-f2](https://github.com/antvis/wx-f2) 项目进行体验感受，也可以打开微信扫描以下二维码进行体验：


![](https://cdn.yuque.com/lark/0/2018/png/514/1524555862386-7010f1b3-7100-4a84-bc97-ec4a6560155d.png#align=left&display=inline&height=344&originHeight=344&originWidth=344&status=done&width=344)
