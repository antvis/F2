---
title: 图形与动画
order: 9
---

在 F2 里，可以利用组件方便的构建图形，和图形动画

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
