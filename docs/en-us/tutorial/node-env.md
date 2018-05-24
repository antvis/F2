# Rendering F2 in Node

Although F2 uses HTML5 Canvas to draw chart by defaults, for the current runtime environment, as long as it provides the same context interface as HTML5 Canvas does, F2 can still be able to run correctly.

The following table shows the functions that can be used under different runtime environment:

|                                     | HTML5 | Node | Mini Program (Wechat && Mini program) |
| ----------------------------------- | ----- | ---- | ------------------------------------- |
| Chart Drawing                       | ✔︎     | ✔︎    | ✔︎                                     |
| Legend                              | ✔︎     | ✔︎    | ✔︎                                     |
| Tooltip                             | ✔︎     |      | ✔︎                                     |
| Event (Tooltip, Legend interaction) | ✔︎     |      | ✔︎                                     |
| Animation                           | ✔︎     |      | ✔︎                                     |

## Rendering in Node

Running F2 on the node can provides a powerful server-side ability to render visualization charts. In this way, F2 can be used to generate offline reports, pdf and other visualization charts.

F2 currently supports all chart drawing functions in node runtime environment, but it does not provides events, interactions and animation capabilities (Please remove the code associated with chart.tooltip() and .animate when experimenting with the demos). The usage shows in the following:

1. First install [node-canvas](https://github.com/Automattic/node-canvas) module, it provides the ability to achieve canvas rendering in node, combined with this module, you are able to use F2 in node

   ```
   npm install canvas
   ```

2. Import F2. What needs to be explained here is that node does not support animation, events and Tooltip. Therefore, please try to avoid using above modules when using F2. This can also make F2 more light-weighted. For  convenience, it is recommended to package the following code into a common module:

   ```js
   const F2 = require('@antv/f2/lib/core'); // import core library
   
   require('@antv/f2/lib/geom/'); // geometry objects
   require('@antv/f2/lib/geom/adjust/'); // data adjustment
   
   require('@antv/f2/lib/coord/polar'); // polar coordinate
   require('@antv/f2/lib/component/axis/circle'); // Arc length coordinate axis in polar coordinate system
   
   require('@antv/f2/lib/scale/time-cat'); // timeCat
   
   require('@antv/f2/lib/component/guide'); // load guide
   const Guide =  require('@antv/f2/lib/plugin/guide'); // Guide
   const Legend =  require('@antv/f2/lib/plugin/legend'); // Legend
   F2.Chart.plugins.register([ Legend, Guide ]); // register above plug-ins
   ```

3. create a canvas object

   ```js
   const Canvas = require('canvas');
   const canvas = Canvas.createCanvas(400, 267);
   ```

4. Draw a chart using F2. Followings are two ways to create a chart, and note that **width** and **height** properties must be set in both ways.

   ```js
   // First way to create a chart, pass canvas directly
   const chart = new F2.Chart({
     el: canvas, // pass the canvas object created in step 3
     width: 400, // must be set, width of the chart, same as the canvas
     height: 267 // must be set, height of the chart, same as the canvas
   });
   
   // Second way to create a chart, pass the canvas context
   const chart = new F2.Chart({
     context: canvas.getContext('2d'), // pass the canvas context created in step 3
     width: 400, // must be set, width of the chart, same as the canvas
     height: 267 // must be set, height of the chart, same as the canvas
   });
   ```

Following is a complete example for drawing a pie chart:

![pie.png | left | 375x260](https://cdn.yuque.com/lark/0/2018/png/514/1524314241103-865e6682-9508-4bb3-9f30-676bf0042d58.png "")

```js
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

canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'pie.png'))) // generated the pie chart
```

## Solution for device resolution adaptation

The solution for resolution adaptation is simple: Assume that the pixel ratio of the current device is 2, then just set the pixelRation property when  creating an F2 chart.

```js
const chart = new F2.Chart({
  el: canvas,
  width: 375,
  height: 260,
  padding: [ 45, 'auto', 'auto' ],
  pixelRatio: 2
});
```

Here we set the width and height of the canvas to 375 * 360. After setting the pixelRatio to 2, the width and height of the canvas will be magnified by 2 times accordingly, therefore the chart's size will be 750 * 520. This way, you can ensure the clear display of the chart, as shown below:

- pixel ratio: 2
- chart's actual size: 750 * 520
- chart's style (display size): `style="width: 375px;height: 260px;"`

<img src="https://gw.alipayobjects.com/zos/rmsportal/IWrhQtTcEaBxGnXsPwiP.png" style="width: 375px;height: 260px;">

