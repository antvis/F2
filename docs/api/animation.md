# 动画

F2 默认提供了两种动画版本：

1. 入场动画
2. 精细动画，包含入场动画、更新动画以及销毁动画

当图表仅用于展示时，为了缩减代码体量，用户可以选择第一种动画，即仅包含入场动画。如果图表包含较多交互，可以选择第二种动画策略。

另外 F2 还提供了自定义动画机制，帮助用户定制更加生动、更具场景的动画。

默认我们提供的是精细动画，当然用户也可以使用按需引用策略，选择适合自己场景的动画：

## 如何按需引用

1. 入场动画版本

```js
const GroupAnimation = require('@antv/f2/lib/animation/group-animation');
Chart.plugins.register(GroupAnimation); // 这里进行全局注册，也可以给 chart 的实例注册
```

2. 精细动画版本

```js
const Animation = require('@antv/f2/lib/animation/animation');
Chart.plugins.register(Animation); // 这里进行全局注册，也可以给 chart 的实例注册
```

两个版本的动画择其一即可。

## 配置动画

### 动画场景类型：

在 F2 中，我们提供了四种动画场景类型：

- appear: 初始化时的入场动画；
- enter: 更新时的出现动画；
- update: 更新时的变化动画；
- leave: 更新时的动画；

### geom.animate()

默认我们为各个类型的 geom 设定了动画类型以及配置，用户也可以通过 geom.animate() 接口进行配置，使用如下：

```js
// 配置更新时的入场动画，其他动画场景类型相同
geom.animate({
  appear: {
    animation: 'fadeIn', // 动画名称
    easing: 'elasticIn', // 动画缓动效果
    delay: 0.1, // 动画延迟执行时间，单位 s
    duration: 0.6 || function(index, id) { 
      // 回调函数
    }  // 动画执行时间， 单位 s，也可以是回调函数
  }
});
```

- `animation` 动画名称

默认我们提供了如下几种动画：

| 动画名称 | 描述 | 效果 |
| -------- | -------- | -------- |
| `groupWaveIn`  | 整体动画，不同坐标系下效果不同  | ![line1.gif](https://gw.alipayobjects.com/zos/skylark/7f6b6a19-b7bf-42ee-b8fd-d9128390ca02/2018/gif/b124e6f0-dcdd-4450-9cd6-fcd7e5ddfc8a.gif)   ![pie1.gif](https://gw.alipayobjects.com/zos/skylark/63413703-2864-4aa0-8066-895235a5ef44/2018/gif/aee88888-17b3-48ae-863b-8df3313afdbd.gif)    |
| `groupScaleInX`  | 整体动画  | ![bar1.gif](https://gw.alipayobjects.com/zos/skylark/20b87a04-e640-4a0b-9fe7-55b0a66253e9/2018/gif/725dfd08-31be-4a40-aad7-79eafa0bf252.gif)   ![bar3.gif](https://gw.alipayobjects.com/zos/skylark/7b038ba8-208f-4f69-859c-fe5f6867054c/2018/gif/07dd9c4b-547b-44f5-952f-7b5894f4191d.gif)      |
| `groupScaleInY`  | 整体动画  | ![bar2.gif](https://gw.alipayobjects.com/zos/skylark/7f269fd8-2271-4074-8fac-615efc09b269/2018/gif/d9e0af21-e3ba-4394-a29a-db052e8a07bb.gif)  ![bar5.gif](https://gw.alipayobjects.com/zos/skylark/64d238d0-6798-42b0-a3bb-5fbcb91faa5f/2018/gif/7493b01b-adf1-4603-8105-343c4eec718f.gif)      |
| `groupScaleInXY`  | 整体动画  |    ![POLAR1.gif](https://gw.alipayobjects.com/zos/skylark/46dcc363-ef4f-46e9-8ffb-fd2bc333381f/2018/gif/67a5bcec-fa9a-4880-9efd-9b8f1ad0d8a2.gif)    ![radar1.gif](https://gw.alipayobjects.com/zos/skylark/d89e7fca-91db-4edf-93da-dc71e1646dc1/2018/gif/a20f8e21-3522-4c83-a36e-1ef6fde1f76e.gif)   |
| `shapesScaleInX`  | 整体动画，不同于 groupScale，每个 shape 都会参与  |  ![bar6.gif](https://gw.alipayobjects.com/zos/skylark/d2b714be-42aa-4183-8de6-249c39a8c2d3/2018/gif/65e050f2-1789-4b04-9a89-6552334c946c.gif)     |
| `shapesScaleInY`  | 整体动画，不同于 groupScale，每个 shape 都会参与  |  ![bar7.gif](https://gw.alipayobjects.com/zos/skylark/c7a90e7d-fdc3-4d72-b06b-60f9eecced4d/2018/gif/021ee262-e0a3-4396-8232-774f8136f138.gif)  |
| `shapesScaleInXY`  | 整体动画，不同于 groupScale，每个 shape 都会参与  |  ![scatter1.gif](https://gw.alipayobjects.com/zos/skylark/cf2f660f-48d2-46e9-b7e2-e6b59f0333df/2018/gif/6d08442e-df89-4116-83e9-8a36c2459645.gif)    |
| `fadeIn` | 单个 shape 的动画 | ![fadeIn.gif](https://gw.alipayobjects.com/zos/skylark/1645e658-c007-43da-9d1f-baa326bcefef/2018/gif/2ea38ccf-8d7c-42c6-a1fb-7baf64026dd9.gif)   |


- `easing` 缓动函数

默认提供的缓动函数如下：

1. `linear`
2. `quadraticIn`
3. `quadraticOut`
4. `quadraticInOut`
5. `cubicIn`
6. `cubicOut`
7. `cubicInOut`
8. `elasticIn`
9. `elasticOut`
10. `elasticInOut`
11. `backIn`
12. `backOut`
13. `backInOut`
14. `bounceIn`
15. `bounceOut`
16. `bounceInOut`

各个函数的缓动效果可参考：http://sole.github.io/tween.js/examples/03_graphs.html


### 自定义动画

如果上述动画动作不满足需求，用户也可以自己注册动画动作：

```js
const Animate = require('@antv/f2/lib/animation/animate');
/**
 * @param  {String} 动画名称，用户自定义即可
 * @param  {Function} 动画执行函数
 **/
Animate.registerAnimation(animationName, animationFun);
```

#### 自定义动画实例

![column1.gif](https://gw.alipayobjects.com/zos/skylark/477ede4d-3496-42c9-97a6-f63195765dbd/2018/gif/2e743bec-fefb-46f1-96f3-cc0e965d4234.gif) 

```js
  const { Chart, Animate, Util, G } = F2;
  Animate.registerAnimation('delayScaleInY', function(shape, animateCfg) {
    const box = shape.getBBox();
    const origin = shape.get('origin');
    const points = origin.points; // 获取柱子顶点
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
    ]);
    const index = shape.get('index');
    let delay = animateCfg.delay;
    if (Util.isFunction(delay)) {
      delay = animateCfg.delay(index);
    }
    const easing = animateCfg.easing;

    const matrix = shape.getMatrix();
    const endMatrix = G.Matrix.transform(matrix, [
      [ 't', centerX, centerY ],
      [ 's', 1, 10 ],
      [ 't', -centerX, -centerY ]
    ]);

    shape.animate().to({
      attrs: {
        matrix: endMatrix
      },
      delay,
      easing,
      duration: animateCfg.duration
    });
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
    width: window.innerWidth,
    height: window.innerWidth * 0.64,
    pixelRatio: window.devicePixelRatio
  });
  chart.axis('x', false);
  chart.legend(false);
  chart.source(data);
  chart.interval()
    .position('x*y')
    .color('y', '#4a657a-#308e92-#b1cfa5-#f5d69f-#f5898b-#ef5055')
    .animate({
      appear: {
        animation: 'delayScaleInY',
        easing: 'elasticOut',
        delay(index) {
          return index * 0.01;
        }
      }
    });
  chart.render();
```


### shape.animate()

我们为每个 shape 提供了 animate 接口，使用如下
```js
shape.animate().to({
  attrs: {Object}, // shape 最终的图形属性
  easing: {String}, // 缓动函数
  duration: {Number}, // 动画持续时间，单位为 s
  delay: {Number} // 动画延迟时间，单位为 s
}).onStart(function() {
  // 动画开始的回调函数
}).onUpdate(function() {
  // 动画进行时的回调函数
}).onEnd(function() {
  // 动画结束时的回调函数
});
```



