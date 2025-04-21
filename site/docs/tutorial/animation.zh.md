---
title: 动画属性 - Animation
order: 8
---

F2 动画定义与 [Web Animations API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API) 靠齐，除了组件层面，每个图形标签也都可以添加自定义动画。目前只支持基于 Keyframe 的动画，可定义动画执行阶段，以及变化效果 KeyframeEffect。

动画执行阶段分为 appear，update 以及 leave：

- appear：初始化时的入场动画 , render 阶段.
- update：数据更新时的更新动画 , props 发生改变.
- leave：销毁前的离场动画 , destroy 阶段.

每个阶段都可以配置相应的 animation

### 属性

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| `easing` | string | 缓动函数，动画持续效果 |
| `duration` | number | 动画持续时间 |
| `delay` | number | 开始动画前的延迟 |
| `fill` | 可能值为 'none','forwards','backwards','both' | 定义图形在动画执行前后的表现 |
| `iterations` | number | 循环次数，默认值为 1，Infinity 为无限循环 |
| `iterationStart` | number | 从何处执行动画，默认为 0 |
| `property` | [] | 声明需要变换的属性 |
| `start` | Keyframe | 开始帧状态 |
| `end` | Keyframe | 结束帧状态 |
| `clip` | Clip | 裁剪区域动画，可参见[clip](/tutorial/shape-attrs##裁剪) |

#### easing

缓动函数，默认为 `linear`，并且内置提供以下缓动函数，可参考[效果](https://easings.net/)

| constant   | accelerate         | decelerate     | accelerate-decelerate | decelerate-accelerate |
| :--------- | :----------------- | :------------- | :-------------------- | :-------------------- |
| linear     | ease-in / in       | ease-out / out | ease-in-out / in-out  | ease-out-in / out-in  |
| ease       | in-sine            | out-sine       | in-out-sine           | out-in-sine           |
| steps      | in-quad            | out-quad       | in-out-quad           | out-in-quad           |
| step-start | in-cubic           | out-cubic      | in-out-cubic          | out-in-cubic          |
| step-end   | in-quart           | out-quart      | in-out-quart          | out-in-quart          |
|            | in-quint           | out-quint      | in-out-quint          | out-in-quint          |
|            | in-expo            | out-expo       | in-out-expo           | out-in-expo           |
|            | in-circ            | out-circ       | in-out-circ           | out-in-circ           |
|            | in-back            | out-back       | in-out-back           | out-in-back           |
|            | in-bounce          | out-bounce     | in-out-bounce         | out-in-bounce         |
|            | in-elastic         | out-elastic    | in-out-elastic        | out-in-elastic        |
|            | spring / spring-in | spring-out     | spring-in-out         | spring-out-in         |

#### Keyframe

目前支持变换的属性有：

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| transform | `string` | 和 [CSS Transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 保持一致 |
| opacity | `number` | 透明度 |
| strokeOpacity | `number` | 描边透明度 |
| fill | `string` | 填充色 |
| stroke | `string` | 描边色 |
| lineWidth | `number` | 线宽 |
| r | `number` | Circle 的半径 |
| rx/ry | `number` | Ellipse 的半径 |
| width | `number` | Rect/Image 的宽度 |
| height | `number` | Rect/Image 的高度 |
| x1/y1/x2/y2 | `number` | Line 的端点坐标 |
| offsetDistance | `number` | 路径偏移，和[CSS Offset](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)保持一致 |
| lineDash | `number` | 实线和间隔的长度 |
| lineDashOffset | `[number, number]` | 设置虚线的偏移量，和[Canvas lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)保持一致，可以实现蚂蚁线的效果 |
| path | `string` | Path 的定义，可做形变动画 |

### 使用方法

```js
<text
  style={{
    text: `测试`,
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 450,
      property: ['x', 'y'],
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 100,
        y: 100,
      },
    },
    update: {
      {
        easing: 'quadraticOut',
        duration: 450,
        clip: {
          type: 'rect',
          property: ['width'],
          style: {
            x: 100,
            y: 100,
            height: 20,
          },
          start: {
            width: 0,
          },
          end: {
            width: 50,
          },
        },
      }
    },
    leave: {},
  }}
/>
```

### 其他动画

#### 路径动画

让图形沿着某个路径移动，在 css 中可通过[MotionPath](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path)实现，F2 可通过图形标签上设置 offset 属性实现，目前支持 <line/> 和 <polyline>。

```js
<circle
  style={{
    fill: '#808080',
    r: 10,
    offset: {
      type: 'polyline',
      style: {
        points: [
          [0, 3],
          [50, 10],
          [130, 80],
          [250, 40],
        ],
      },
    },
  }}
  animation={{
    appear: {
      easing: 'quadraticOut',
      duration: 1000,
      property: ['offsetDistance'],
      start: {
        offsetDistance: 0,
      },
      end: {
        offsetDistance: 1,
      },
    },
  }}
/>
```

F2 在组件 Line 中内置了该功能，提供 endView 接口，可设置沿着线段移动的元素，具体可见 [demo](/examples/creative/case/#line-race)
