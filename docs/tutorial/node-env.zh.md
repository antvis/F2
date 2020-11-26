---
title: Node 端渲染 F2
order: 9
---

F2 是基于 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 的标准接口绘制的，所以只要能提供标准 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 接口的实现对象，F2就能进行图表绘制


## 使用说明

将 F2 运行于 node 的后台服务上，可以提供强大的服务端渲染可视化图表的能力，这种能力可以应用于生成离线报表、图文 pdf 等场景。

1. **首先安装模块**，[node-canvas](https://github.com/Automattic/node-canvas)

该模块提供了在 node 中实现 canvas 渲染的能力，结合该模块，就可以实现 F2 在 node 端的图表渲染了


```bash
npm install canvas
```

1. **引入 F2**


```javascript
const F2 = require('@antv/f2');
```

1. **创建一个 canvas 对象**

```javascript
const Canvas = require('canvas');
const canvas = Canvas.createCanvas(400, 267);
```


2. 使用 F2 绘制图表，**需要注意的是在创建 Chart 对象时传入的属性**，下面两种方式 **width** 和 **height** 属性都是必须设置的，这里需要说明的是：F2默认会引入动画模块，所以在node端需要把动画关掉，否则会出现渲染不完整的情况


```javascript
// 传入上下文环境
const chart = new F2.Chart({
  context: canvas.getContext('2d'), // 将第三步创建的 canvas 对象的上下文传入
  width: 400, // 必选，图表宽度，同 canvas 的宽度相同
  height: 267, // 必选，图表高度，同 canvas 的高度相同
  animate: false // 关闭动画
});
```

下面是 F2 在 node 端绘制饼图的完整代码:

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/6154589f-b6eb-4647-9634-9baf6fc70991.png)

```javascript
const fs = require('fs');
const path = require('path');
const Canvas = require('canvas'); // 引入 node canvas
const F2 = require('@antv/f2');

const canvas = Canvas.createCanvas(375, 260); // 创建 canvas 对象

// 使用 F2 绘制饼图
const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.2, a: '1' },
  { name: '机器之血', percent: 0.18, a: '1' },
  { name: '心理罪', percent: 0.15, a: '1' },
  { name: '寻梦环游记', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' }
];
const chart = new F2.Chart({
  context: canvas.getContext('2d'),
  width: 375,
  height: 260,
  animate: false,
  padding: [ 45, 'auto', 'auto' ]
});
chart.source(data, {
  percent: {
    formatter(val) {
      return val * 100 + '%';
    }
  }
});
chart.legend({
  position: 'right'
});
chart.coord('polar', {
  transposed: true,
  radius: 0.85
});
chart.axis(false);
chart.interval()
  .position('a*percent')
  .color('name', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0' ])
  .adjust('stack')
  .style({
    lineWidth: 1,
    stroke: '#fff',
    lineJoin: 'round',
    lineCap: 'round'
  });

chart.render();

canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'pie.png'))) // 导出图片
```

## 高清适配

适配方案很简单，假设当前设备的像素比为 2，只要把宽高都放大2倍即可：

```javascript
const canvas = Canvas.createCanvas(375 * 2, 260 * 2); // 创建 canvas 对象
const chart = new F2.Chart({
  el: canvas,
  width: 375 * 2,
  height: 260 * 2,
  padding: [ 45, 'auto', 'auto' ],
});
```

- 屏幕分辨率： 2

- 图片实际大小：750 * 520

- 图片的样式(显示大小)： `style="width: 375px;height: 260px;"`


![](https://gw.alipayobjects.com/zos/rmsportal/IWrhQtTcEaBxGnXsPwiP.png#width=375)

