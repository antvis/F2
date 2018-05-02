# 多平台支持说明

虽然 F2 默认基于 Html5 Canvas 进行图表绘制，但是对于当前运行时环境来说，只要能够提供和 Html5 Canvas 上下文环境一样的上下文接口，一样也能使用 F2 进行图表绘制。

下面的表格给出了各个运行环境下可使用的 F2 的功能对比：

  ----  | Html5 | Node  | 小程序（微信&&小程序） |
 ----- | ----- | ----- | ----- |
图表绘制 | ✔︎ | ✔︎  | ✔︎ |
Legend 组件 | ✔︎  | ✔︎ | ✔︎ |
Tooltip 组件 | ✔︎ | | ✔︎ |
事件（Tooltip、Legend 上的事件交互） | ✔︎ |   | ✔︎ |
动画 | ✔︎ |   | ✔︎ |


下面就两个典型场景进行说明：

## Node

将 F2 运行于 node 的后台服务上，可以提供强大的服务端渲染可视化图表的能力，这种能力可以应用于生成离线报表、图文 pdf 等场景。

目前 F2 在 node 环境中能够提供完整的图表绘制能力，但无法提供事件、交互以及动画功能（**所以在试验官网 demo 时请删除 chart.tooltip() 以及 .animate() 相关的代码哦**）。具体的使用方法如下:

1. **首先安装模块**: [node-canvas](https://github.com/Automattic/node-canvas)

该模块提供了在 node 中实现 canvas 渲染的能力，结合该模块，就可以实现 F2 在 node 端的图表渲染了

```Bash
npm install canvas
```

2. **引入 F2**，这里需要说明的是：node 端不支持动画、事件以及 Tooltip，所以在引入 F2 时请选择[按需引入](https://antv.alipay.com/zh-cn/f2/3.x/tutorial/require-on-demand.html)
以避免上述模块的引入，这样也能够使得 F2 的代码体量更小巧。为了使用更便利，建议将以下代码封装成通用模块。

> 注意：请安装 3.1.4-beta.1 及以上版本！

```JavaScript
const F2 = require('@antv/f2/lib/core'); // 引入核心包

require('@antv/f2/lib/geom/'); // 几何标记对象
require('@antv/f2/lib/geom/adjust/'); // 数据调整

require('@antv/f2/lib/coord/polar'); // 极坐标系
require('@antv/f2/lib/component/axis/circle'); // 极坐标系下的弧长坐标轴

require('@antv/f2/lib/scale/time-cat'); // timeCat 类型的度量

require('@antv/f2/lib/component/guide'); // 加载 guide 组件
const Guide =  require('@antv/f2/lib/plugin/guide'); // Guide 插件
const Legend =  require('@antv/f2/lib/plugin/legend'); // Legend 插件
F2.Chart.plugins.register([ Legend, Guide ]); // 注册以上插件
```

3. **创建一个 canvas 对象**

```JavaScript
const Canvas = require('canvas');
const canvas = Canvas.createCanvas(400, 267);
```

4. 使用 F2 绘制图表，**需要注意的是在创建 Chart 对象时传入的属性**，下面两种方式 **width** 和 **height** 属性都是**必须设置的**

```JavaScript
// 第一种方式直接传入 canvas
const chart = new F2.Chart({
  el: canvas, // 将第三步创建的 canvas 对象传入
  width: 400, // 必选，图表宽度，同 canvas 的宽度相同
  height: 267 // 必选，图表高度，同 canvas 的高度相同
});

// 第二种方式传入上下文环境
const chart = new F2.Chart({
  context: canvas.getContext('2d'), // 将第三步创建的 canvas 对象的上下文传入
  width: 400, // 必选，图表宽度，同 canvas 的宽度相同
  height: 267 // 必选，图表高度，同 canvas 的高度相同
});
```


下面是 F2 在 node 端绘制饼图的完整代码:

<img src="https://cdn-pri.yuque.com/lark/0/2018/png/514/1524314241103-865e6682-9508-4bb3-9f30-676bf0042d58.png">


```JavaScript
const fs = require('fs');
const path = require('path');

const Canvas = require('canvas'); // 引入 node canvas

// 引入 F2: start
const F2 = require('@antv/f2/lib/core'); // 引入核心包
require('@antv/f2/lib/geom/'); // 几何标记对象
require('@antv/f2/lib/geom/adjust/'); // 数据调整
require('@antv/f2/lib/coord/polar'); // 极坐标系
require('@antv/f2/lib/component/axis/circle'); // 极坐标系下的弧长坐标轴
require('@antv/f2/lib/scale/time-cat'); // timeCat 类型的度量
require('@antv/f2/lib/component/guide'); // 加载 guide 组件
const Guide =  require('@antv/f2/lib/plugin/guide'); // Guide 插件
const Legend =  require('@antv/f2/lib/plugin/legend'); // Legend 插件
F2.Chart.plugins.register([ Legend, Guide ]); // 注册以上插件
// 引入 F2: end

const canvas = Canvas.createCanvas(375, 260); // 创建 canvas 对象

// 使用 F2 绘制饼图
function drawPie() {
  const data = [
    { name: '芳华', percent: 0.4, a: '1' },
    { name: '妖猫传', percent: 0.2, a: '1' },
    { name: '机器之血', percent: 0.18, a: '1' },
    { name: '心理罪', percent: 0.15, a: '1' },
    { name: '寻梦环游记', percent: 0.05, a: '1' },
    { name: '其他', percent: 0.02, a: '1' }
  ];
  const chart = new F2.Chart({
    el: canvas,
    width: 375,
    height: 260,
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

}

drawPie();

canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'pie.png'))) // 导出图片
```


## 小程序

### 封装思路

详见：[《聊一聊 F2 与小程序》](https://yuque.com/antv/blog/bg9sxf)。

### my-f2

F2 的支付宝小程序版本（待支付宝支持自定义组件后，会基于此库提供一个支付宝小程序的组件）。

- GitHub: https://github.com/antvis/my-f2
- 使用文档：[这里](https://github.com/antvis/my-f2/blob/master/README.md)
- Demos:  [github](https://github.com/antvis/mini-program-f2-demos/tree/master/my-charts)，用户可以通过蚂蚁开发者工具，直接打开此项目进行体验感受。

### wx-f2
F2 的微信小程序图表组件

- GitHub: https://github.com/antvis/wx-f2
- 使用文档：[这里](https://github.com/antvis/wx-f2/blob/master/README.md)
- Demos: 源码位于项目 pages/charts/ 目录下，可以使用微信开发者工具打开 wx-f2 项目进行体验感受，也可以打开微信扫描以下二维码进行体验：

<img src="https://cdn-pri.yuque.com/lark/0/2018/png/514/1524314704711-b1919567-c26a-42e0-9fc6-586e95f0990f.png">





