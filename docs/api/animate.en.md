---
title: 自定义 Animate
order: 7
---

## 动画注册机制

使用动画注册机制以达到动画函数的复用。使用方式如下：

```javascript
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

在 F2 中执行的都是 [Shape(图形)](g/shape) 元素的动画，通过逐帧改变 shape 对象的图形属性来达到动画的效果，以下面圆的移动动画为例：![](https://gw.alipayobjects.com/zos/rmsportal/VsphIrCJSqpILogoZTiS.gif#width=)

这个动画的实现非常简单，由于动画的最终效果是将圆移至 B 点（画布坐标为 `{ x: 230, y: 50 }`），那么我们只需要通过调用 `shape.animate()` 方法指定 shape 的最终状态（图形属性）即可：

```javascript
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

各类型 shape 的图形属性说明见 [graphic 图形 api](g/shape)。

F2 会为用户自定义的动画函数传递三个参数，按照顺序，分别为 `shape`、`animateCfg`、`coord`

```javascript
chart.line().animate({
  appear: {
    animation: (shape, animateCfg, coord) => {}
  }
})
```

- `shape`，shape 对象，当前执行动画的主体


通过操作该 shape 对象的图形属性，即可进行动画的个性化定制。

shape 对象具体提供了以下属性来帮助用户进行操作：

| **属性名** | **获取方式** | **类型** | **解释** |
| --- | --- | --- | --- |
| `attrs` | shape.get('attrs') | Object | 获取 shape 全部的图形属性 |
| `className` | shape.get('className') | String | 获取当前 shape 的图形元素类型 |
| `origin` | shape.get('origin') | Object | 获取当前 shape 的绘制数据以及对应的原始数据记录 |
| `index` | shape.get('index') | Number | 获取当前 shape 的索引值，即顺序 |


另外图形属性的获取还可以通过调用 `shape.attr(name)` 方法来获取，更多 shape 对象的方法请阅读 [Shape API](g/shape#attr)。

另外对于处理 `update` 更新状态下的 shape 对象，我们还会提供一个 `cacheShape` 属性，该属性为一个 Object 对象，存储的是当前 shape 在上一个状态（数据变更前）的内容，以便于用户进行变更动画的定制，该属性包含的内容如下：

```javascript
{
  animateCfg: {}, // 动画效果配置
  attrs: {}, // 上一个状态的图形属性
  className: "", // 图形元素名称
}
```

- `animateCfg`，Object 类型，动画的配置


该对象包含的内容如下：

```javascript
{
  easing: , // 缓动函数配合
  duration: , // 动画执行时间
  delay: // 动画延迟时间
}
```

- `coord`，Coord 坐标系对象，表示当前 chart 的坐标系，该对象包含的属性详见 [Coordinate API](chart/coordinate)


## 示例

下面的示例对柱状图的初始化出场动画（appear）进行了自定义：

![](https://gw.alipayobjects.com/zos/skylark/477ede4d-3496-42c9-97a6-f63195765dbd/2018/gif/2e743bec-fefb-46f1-96f3-cc0e965d4234.gif#width=)

```javascript
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

