---
title: 图形使用 - JSX
order: 8
---

在 F2 里，可以利用 JSX 方便的构建图形，和图形动画，图形属性可使用[绘图属性](shape-attrs)里的所有属性，动画可定义 `appear`, `update`, `leave` 3 个阶段的不同动画

```jsx
import { Canvas } from '@antv/f2';

const Hello = (props) => {
  return (
    <group>
      <rect attrs={ ...props } animation={{
        // 定义图形的出场动画
        appear: {
          easing: 'linear',
          duration: 300,
          property: ['x', 'y', 'width', 'height', 'fillOpacity'],
          start: {
            fillOpacity: 0,
          },
          end: {
            fillOpacity: 1,
          }
        },
        // 定义图形的变化动画
        update: {
          easing: 'linear',
          duration: 300,
          property: ['x', 'y', 'width', 'height'],
        },
        // 定义图形的消失
        leave: {
          easing: 'linear',
          duration: 300,
          property: ['fillOpacity'],
          end: {
            fillOpacity: 0,
          }
        };
      }}/>
    </group>
  );
}

<Canvas>
  <Hello x={ 10 } y={ 10 } width={ 50 } height={20} fill="red" />
</Canvas>

```

更多缓动函数可见：[easing 函数](https://github.com/antvis/F2/blob/master/packages/f2/src/canvas/animation/easing.ts)， 也可直接传入缓动 `function`
