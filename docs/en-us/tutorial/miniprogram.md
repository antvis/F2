# Rendering F2 in Mini-program

Although F2 uses HTML5 canvas to draw charts by default, for the current runtime environment, as long as it provides the same context interface as the HTML5 canvas context, F2 can also work correctly.

The following table shows the functions that can be used under different runtime environment:

|                                     | HTML5 | Node | Mini Program (Wechat && Mini program) |
| ----------------------------------- | ----- | ---- | ------------------------------------- |
| Chart Drawing                       | ✔︎     | ✔︎    | ✔︎                                     |
| Legend                              | ✔︎     | ✔︎    | ✔︎                                     |
| Tooltip                             | ✔︎     |      | ✔︎                                     |
| Event (Tooltip, Legend interaction) | ✔︎     |      | ✔︎                                     |
| Animation                           | ✔︎     |      | ✔︎                                     |

## Mini-program

### Packaging Idea

More details in [Let's talk about F2 and mini-program](https://yuque.com/antv/blog/bg9sxf)

### Mini-program in Alipay

F2 for Alipay (soon after Alipay supports custom components, a custom component based on F2 will be provided):

* github: [https://github.com/antvis/my-f2](https://github.com/antvis/my-f2)
* [documents](https://github.com/antvis/my-f2/blob/master/README.md)
* demos: [github](https://github.com/antvis/my-f2/blob/master/README.md). Developers can open demos directly using IDE provided by [ant-open.com](https://docs.alipay.com/mini/ide/overview).

### Mini-program in Wechat

F2 for Wechat mini-program:

* github: [https://github.com/antvis/wx-f2](https://github.com/antvis/wx-f2)
* [documents](https://github.com/antvis/wx-f2/blob/master/README.md)
* Demos: Source code is located in `pages/charts/` directory. Developers can open [wx-f2](https://github.com/antvis/wx-f2)  project using [Wechat Develop Tools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=2018412), and you can also scan the following QR code to experience F2 directly:

![image.png | left | 344x344](https://cdn.yuque.com/lark/0/2018/png/514/1524555862386-7010f1b3-7100-4a84-bc97-ec4a6560155d.png "")