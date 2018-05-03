# 动画

F2 默认提供了两种动画版本：

1. 群组入场动画
2. 精细动画，以 shape 为对象单位的动画，包含 `appear`、`enter` 两种入场动画、`update` 更新动画以及 `leave` 销毁动画

当图表仅用于展示时，为了缩减代码体量，用户可以选择第一种动画策略，即仅包含入场动画。如果需要更丰富的动画，可以选择第二种动画策略。

另外 F2 还提供了自定义动画机制，帮助用户定制更加生动、更具场景的动画。

完整版的 F2 我们默认提供的是精细动画，当然用户也可以使用按需引用策略，选择适合自己场景的动画：

## 如何按需引用

1. 群组入场动画

```js
const GroupAnimation = require('@antv/f2/lib/animation/group');
Chart.plugins.register(GroupAnimation); // 这里进行全局注册，也可以给 chart 的实例注册
```

2. 精细动画版本

```js
const Animation = require('@antv/f2/lib/animation/detail');
Chart.plugins.register(Animation); // 这里进行全局注册，也可以给 chart 的实例注册
```

**注意：**
1. 两个版本的动画择其一即可。
2. 当你引用 `require('@antv/f2')` 版本时，提供的是**精细动画**。

## 动画配置详解

### 动画分类

在 F2 的动画中，围绕图表数据的变化，我们将图形元素的动画划分为以下四种类型：

| 动画类型   | 解释  | 触发时机 |
| -------- | -------- | -------- |
| appear   | 图表第一次加载时的入场动画     |  第一次 `chart.render()`  |
| enter    | 图表绘制完成，数据发生变更后，产生的新图形的进场动画     | `chart.changeData(data)` |
| update   | 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画   | `chart.changeData(data)` |
| leave    | 图表绘制完成，数据发生变更后，被销毁图形的销毁动画   | `chart.changeData(data)` |

第一次 `chart.render()` 时会触发 `appear` 类型的动画，而 `chart.changeData(data)` 即数据发生变更时，会触发 `update`、`leave`、`enter` 类型的动画。

如果用户使用的是仅包含群组入场动画版本，那么仅提供了 `appear` 类型的动画。在精细动画版本中，完整提供了以上四种动画类型机制。具体的配置方法在下文进行说明。

### chart.animate()

图表动画的整体配置。

1. `chart.animate(false)`

关闭图表动画。

2. `chart.animate(cfg)`

对 chart 上的图形元素进行具体的动画配置。

* 参数：`cfg`
* 类型： Object
* 返回： 当前 chart 实例

具体配置参考如下：

```js
chart.animate({
  'axis-label': {
    appear: {
      animation: {String} || {Function}, // 定义动画执行函数
      easing: {String} || {Function}, // 动画缓动函数
      delay: {Number} || {Function}, // 动画延迟执行时间，单位 ms
      duration: {Number}  // 动画执行时间，单位 ms
    }, // 初始化入场动画配置
    update: {}, // 更新动画配置，配置属性同 appear
    enter: {}, // 数据变更后，新产生的图形的入场动画配置，配置属性同 appear
    leave: {} // 销毁动画配置，配置属性同 appear
  }, // 对坐标轴文本进行动画配置
  'axis-tick': {} // 对坐标轴刻度线进行动画配置，配置属性同 axis-label
  'axis-grid': {} // 对坐标轴网格线进行动画配置，配置属性同 axis-label
  'axis-line': {} // 对坐标轴线进行动画配置，配置属性同 axis-label
  line: {} // 对折线图进行动画配置，配置属性同 axis-label
  area: {} // 对面积图进行动画配置，配置属性同 axis-label
  interval: {} // 对柱状图进行动画配置，配置属性同 axis-label
  path: {} // 对路径图进行动画配置，配置属性同 axis-label
  point: {} // 对点图进行动画配置，配置属性同 axis-label
  polygon: {} // 对多边形进行动画配置，配置属性同 axis-label
  schema: {} // 对自定义图形进行动画配置，配置属性同 axis-label
});
```

关闭动画的方式如下：
```js
// 关闭图表所有动画
chart.animate(false);

// 关闭某种图形元素的动画，如线图 line
chart.animate({
  line: false // 关闭线图动画
});

// 关闭某种图形元素下某一类动画，如线图的出场动画
chart.animate({
  line: {
    appear: false
  }
});
```

目前对动画开放的图形元素包括：

| 图形元素名 | 解释 |
| -------- | -------- |
| `axis-label` | 坐标轴文本   |
| `axis-grid`  | 坐标轴网格线 |
| `axis-tick`  | 坐标轴刻度线 |
| `axis-line`  | 坐标轴线     |
| `line`       | 折线图      |
| `area`       | 面积图      |
| `interval`   | 柱状图      |
| `path`       | 路径图      |
| `point`      | 点图        |
| `polygon`    | 多边形      |
| `schema`     | 自定义图形  |

每一种图形元素均包含以上四种动画类型(appear、enter、update、leave)，而每一种动画类型，可进行如下属性的配置：

```js
// 对首次出场动画的配置
appear: {
  animation: 'fadeIn', // 执行的具体动画
  easing: 'elasticIn', // 动画缓动函数
  delay: 1000, // 动画延迟执行时间，单位 ms
  duration: 600 // 动画执行时间，单位 ms
}
```

- `animation`，类型：String/Function，定义动画的具体执行动作

该属性用于定义动画执行函数，可以指定动画名称，该动画名称可以是 F2 默认提供的动画（见以下列表），也可以是用户通过[动画注册机制](#_动画注册机制)进行注册之后的动画名称。

```js
// 指定动画名称
animation: 'groupWaveIn'
```

也可以直接定义回调函数，使用如下：

```js
/**
 * 定义动画执行函数
 * @param  {Shape} shape       指定动画的 shape
 * @param  {Object} animateCfg 动画的配置，包含 easing、duration 等
 * @param  {Coord} coord       当前的坐标系对象
 * @return {null}              不需要返回
 */
animation: (shape, animateCfg, coord) {

}
```


默认我们提供了如下几种动画：

| 动画名称 | 描述 | 效果 |
| -------- | -------- | -------- |
| `groupWaveIn`  | 整体动画，不同坐标系下效果不同  | <img src="https://gw.alipayobjects.com/zos/skylark/7f6b6a19-b7bf-42ee-b8fd-d9128390ca02/2018/gif/b124e6f0-dcdd-4450-9cd6-fcd7e5ddfc8a.gif" style="width: 50%;"><img src="https://gw.alipayobjects.com/zos/skylark/63413703-2864-4aa0-8066-895235a5ef44/2018/gif/aee88888-17b3-48ae-863b-8df3313afdbd.gif" style="width: 50%;"> |
| `groupScaleInX`  | 整体动画  | <img src="https://gw.alipayobjects.com/zos/skylark/20b87a04-e640-4a0b-9fe7-55b0a66253e9/2018/gif/725dfd08-31be-4a40-aad7-79eafa0bf252.gif" style="width: 50%;"><img src="https://gw.alipayobjects.com/zos/skylark/7b038ba8-208f-4f69-859c-fe5f6867054c/2018/gif/07dd9c4b-547b-44f5-952f-7b5894f4191d.gif" style="width: 50%;"> |
| `groupScaleInY`  | 整体动画  | <img src="https://gw.alipayobjects.com/zos/skylark/7f269fd8-2271-4074-8fac-615efc09b269/2018/gif/d9e0af21-e3ba-4394-a29a-db052e8a07bb.gif" style="width: 50%;"> <img src="https://gw.alipayobjects.com/zos/skylark/64d238d0-6798-42b0-a3bb-5fbcb91faa5f/2018/gif/7493b01b-adf1-4603-8105-343c4eec718f.gif" style="width: 50%;"> |
| `groupScaleInXY`  | 整体动画  | <img src="https://gw.alipayobjects.com/zos/skylark/46dcc363-ef4f-46e9-8ffb-fd2bc333381f/2018/gif/67a5bcec-fa9a-4880-9efd-9b8f1ad0d8a2.gif" style="width:50%;"><img src="https://gw.alipayobjects.com/zos/skylark/d89e7fca-91db-4edf-93da-dc71e1646dc1/2018/gif/a20f8e21-3522-4c83-a36e-1ef6fde1f76e.gif" style="width:50%;"> |
| `shapesScaleInX`  | 整体动画，不同于 groupScale，每个 shape 都会参与  |  <img src="https://gw.alipayobjects.com/zos/skylark/d2b714be-42aa-4183-8de6-249c39a8c2d3/2018/gif/65e050f2-1789-4b04-9a89-6552334c946c.gif" style="width:50%;"> |
| `shapesScaleInY`  | 整体动画，不同于 groupScale，每个 shape 都会参与  | <img src="https://gw.alipayobjects.com/zos/skylark/c7a90e7d-fdc3-4d72-b06b-60f9eecced4d/2018/gif/021ee262-e0a3-4396-8232-774f8136f138.gif" style="width:50%;"> |
| `shapesScaleInXY`  | 整体动画，不同于 groupScale，每个 shape 都会参与  |<img src="https://gw.alipayobjects.com/zos/skylark/cf2f660f-48d2-46e9-b7e2-e6b59f0333df/2018/gif/6d08442e-df89-4116-83e9-8a36c2459645.gif" style="width:50%;">  |
| `fadeIn` | 单个 shape 的动画 | <img src="https://gw.alipayobjects.com/zos/skylark/1645e658-c007-43da-9d1f-baa326bcefef/2018/gif/2ea38ccf-8d7c-42c6-a1fb-7baf64026dd9.gif" style="width:50%;">  |

- `easing`，类型：String/Function，定义动画的缓动函数

使用 F2 默认提供的缓动函数名，或者直接传入缓动函数：

```js
// 方式一：指定缓动函数名称
easing: 'quadraticOut',

// 方式二：直接传入缓动函数
easing: (t) => {
  return Math.sqrt(1 - --t * t);
}
```

默认提供的缓动函数名为：`linear` `quadraticIn` `quadraticOut` `quadraticInOut` `cubicIn` `cubicOut` `cubicInOut` `elasticIn` `elasticOut` `elasticInOut` `backIn` `backOut` `backInOut` `bounceIn` `bounceOut`  `bounceInOut`

各个函数的缓动效果可参考：http://sole.github.io/tween.js/examples/03_graphs.html

- `delay`，类型：Number/Function，指定动画的延迟执行时间

该属性支持回调函数，回调函数的使用如下：

```js
// 方式一，直接指定延迟时间，单位为 ms
delay: 1000,

// 方式二，使用回调函数
/**
 * 返回动画延迟执行时间
 * @param  {Number} index      当前 shape 的索引值（相对于数据集中的顺序）
 * @param  {String} id         当前 shape 的 id
 * @return {Number}            返回延迟执行时间，单位为 ms
 */
delay: (index, id) {

}
```

- `duration`，类型：Number，动画的执行时间，单位为 ms

### geom.animate()

为 geometry 图形元素进行具体的动画配置，默认 F2 已针对各个 geometry 设定了动画类型以及配置，用户可以通过该接口进行动画的个性化配置。

**注意：**
1. 当用户调用 `chart.animate(false)` 关闭了图表动画之后，`geom.animate()` 方法上的配置不生效。
2. 当用户在 `chart.animate()` 和 `geom.animate()` 两个接口上均对该 geometry 进行了动画配置时，以 `geom.animate()` 的配置为准。


具体可配置的属性为 `animation` `easing` `delay` `duration`，具体的使用见上文：

```js
geom.animate({
  appear: {
    animation: {String} || {Function}, // 定义动画执行函数
    easing: {String} || {Function}, // 动画缓动函数
    delay: {Number} || {Function}, // 动画延迟执行时间，单位 ms
    duration: {Number}  // 动画执行时间，单位 ms
  },
  enter: {
    animation: {String} || {Function}, // 定义动画执行函数
    easing: {String} || {Function}, // 动画缓动函数
    delay: {Number} || {Function}, // 动画延迟执行时间，单位 ms
    duration: {Number}  // 动画执行时间，单位 ms
  },
  update: {
    animation: {String} || {Function}, // 定义动画执行函数
    easing: {String} || {Function}, // 动画缓动函数
    delay: {Number} || {Function}, // 动画延迟执行时间，单位 ms
    duration: {Number}  // 动画执行时间，单位 ms
  },
  leave: {
    animation: {String} || {Function}, // 定义动画执行函数
    easing: {String} || {Function}, // 动画缓动函数
    delay: {Number} || {Function}, // 动画延迟执行时间，单位 ms
    duration: {Number}  // 动画执行时间，单位 ms
  },
});
```


### shape.animate()

我们为每个 shape 实例提供了 animate 接口，用于执行具体的动画行为，具体使用如下：

```js
shape.animate()
  .to({
    attrs: {Object}, // shape 最终的图形属性
    easing: {String} || {Function}, // 缓动函数
    duration: {Number}, // 动画持续时间，单位为 ms
    delay: {Number} // 动画延迟时间，单位为 ms
  }) // 定义动画行为
  .onStart(function() {
    // 动画开始的回调函数
  })
  .onUpdate(function() {
    // 动画进行时的回调函数
  })
  .onEnd(function() {
    // 动画结束时的回调函数
  })
  .onFrame(t => {
    // t 为 0 - 1 范围的数字，表示当前执行的进度
    // 用户自定义每一帧的动画操作
  });
```

## 动画注册机制

使用动画注册机制以达到动画函数的复用。使用方式如下：

```js
// 加载动画注册类
const Animate = require('@antv/f2/lib/animation/animate');
/**
 * @param  {String} animationName   动画名称，用户自定义即可
 * @param  {Function} animationFun  动画执行函数
 **/
Animate.registerAnimation('animationName', animationFun); // 注册名为 animationName 的动画函数


// 使用上述注册的函数
chart.line().animate({
  appear: {
    animation: 'animationName'  // 对应上述注册的动画函数名
  }
})
```

## 自定义动画详解

F2 提供了完善的动画自定义机制，用户可对任意支持动画的图形元素定制不同状态下的动画行为，这里所说的状态即为 appear enter leave update 这四种动画类型。

在 F2 中执行的都是 [Shape(图形)](../developer/graphic.md#Shape) 元素的动画，通过逐帧改变 shape 对象的图形属性来达到动画的效果，以下面圆的移动动画为例：

<img src="https://gw.alipayobjects.com/zos/rmsportal/VsphIrCJSqpILogoZTiS.gif" style="width: 50%;">

这个动画的实现非常简单，由于动画的最终效果是将圆移至 B 点（画布坐标为 `{ x: 230, y: 50 }`），那么我们只需要通过调用 `shape.animate()` 方法指定 shape 的最终状态（图形属性）即可：

```js
// circle 初始画布位置为 x: 100, y: 100
circle.animate().to({
  attrs: {
    x: 230, // 最终的 x 坐标
    y: 50   // 最终的 y 坐标
  }, // 指定最终的图形属性
  easing: 'linear', // 指定动画的缓动效果
  duration: 1500 // 指定动画的执行时间
})

```

各类型 shape 的图形属性说明见 [graphic 图形 api](./developer/graphic.md#Shape)。

F2 会为用户自定义的动画函数传递三个参数，按照顺序，分别为 `shape`、`animateCfg`、`coord`

```js
chart.line().animate({
  appear: {
    animation: (shape, animateCfg, coord) => {}
  }
})
```

- `shape`，shape 对象，当前执行动画的主体

通过操作该 shape 对象的图形属性，即可进行动画的个性化定制。

shape 对象具体提供了以下属性来帮助用户进行操作：

| 属性名 | 获取方式| 类型 | 解释 |
| -------- | -------- | -------- | -------- |
| `attrs` | shape.get('attrs') | Object   | 获取 shape 全部的图形属性 |
| `className`  | shape.get('className')| String | 获取当前 shape 的图形元素类型 |
| `origin`  | shape.get('origin') | Object | 获取当前 shape 的绘制数据以及对应的原始数据记录 |
| `index`  | shape.get('index') | Number | 获取当前 shape 的索引值，即顺序 |

另外图形属性的获取还可以通过调用 `shape.attr(name)` 方法来获取，更多 shape 对象的方法请阅读 [Shape API](../developer/graphic.md#通用方法)。

另外对于处理 `update` 更新状态下的 shape 对象，我们还会提供一个 `cacheShape` 属性，该属性为一个 Object 对象，存储的是当前 shape 在上一个状态（数据变更前）的内容，以便于用户进行变更动画的定制，该属性包含的内容如下：

```js
{
  animateCfg: {}, // 动画效果配置
  attrs: {}, // 上一个状态的图形属性
  className: "", // 图形元素名称
}
```

- `animateCfg`，Object 类型，动画的配置

该对象包含的内容如下：

```js
{
  easing: , // 缓动函数配合
  duration: , // 动画执行时间
  delay: // 动画延迟时间
}
```

- `coord`，Coord 坐标系对象，表示当前 chart 的坐标系，该对象包含的属性详见 [Coordinate API](./coordinate.md#获取坐标系对象)

## 示例

下面的示例对柱状图的初始化出场动画（appear）进行了自定义：

![column1.gif](https://gw.alipayobjects.com/zos/skylark/477ede4d-3496-42c9-97a6-f63195765dbd/2018/gif/2e743bec-fefb-46f1-96f3-cc0e965d4234.gif)

```js
  const { Chart, Animate, Util, G } = F2;
  // 注册函数名为 delayScaleInY 的自定义动画，实现柱子 y 轴方向的放大效果
  Animate.registerAnimation('delayScaleInY', function(shape, animateCfg) {
    const box = shape.getBBox(); // 获取图形的包围盒
    const origin = shape.get('origin'); // 获取当前 shape 的绘制数据
    const points = origin.points; // 获取柱子的各个顶点
    const centerX = (box.minX + box.maxX) / 2;
    let centerY;
    if (points[0].y - points[1].y <= 0) { // 当顶点在零点之下
      centerY = box.maxY;
    } else {
      centerY = box.minY;
    }

    shape.transform([
      [ 't', centerX, centerY ],
      [ 's', 1, 0.1 ],
      [ 't', -centerX, -centerY ]
    ]); // 进行矩阵变换，将 shape 的原始状态改变，y 方向缩小至 0.1 倍
    const index = shape.get('index');
    let delay = animateCfg.delay; // 获取动画配置
    if (Util.isFunction(delay)) {
      delay = animateCfg.delay(index); // 根据 shape 的索引设置不同的延迟时间
    }
    const easing = animateCfg.easing; // 获取动画配置

    const matrix = shape.getMatrix(); // 获取当前矩阵
    const endMatrix = G.Matrix.transform(matrix, [
      [ 't', centerX, centerY ],
      [ 's', 1, 10 ],
      [ 't', -centerX, -centerY ]
    ]); // shape 最终状态下的矩阵

    shape.animate().to({
      attrs: {
        matrix: endMatrix
      },
      delay,
      easing,
      duration: animateCfg.duration
    }); // 执行动画
  });

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      x: i,
      y: (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5
    });
  }
  const chart = new Chart({
    id: 'mountNode',
    width: 375,
    height: 200,
    pixelRatio: window.devicePixelRatio
  });
  chart.axis('x', false);
  chart.legend(false);
  chart.source(data);
  chart.interval()
    .position('x*y')
    .color('y', '#4a657a-#308e92-#b1cfa5-#f5d69f-#f5898b-#ef5055')
    .animate({ // 进行自定义的动画配置
      appear: {
        animation: 'delayScaleInY', // 使用上面注册过的动画 delayScaleInY，当然也可以使用回调函数
        easing: 'elasticOut', // 定义缓动函数
        delay(index) {
          return index * 10;
        } // 根据索引值为各个 shape 设置不同的动画延迟执行时间
      }
    });
  chart.render();
```

