---
title: 图形使用 - JSX
order: 8
---
在 F2 里，可以利用 JSX 和[图形标签 Shape](./shape.zh.md)更方便构造自定义图形。

```jsx
/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const Hello = () => {
  return (
    <group>
      <rect
        attrs={{
          x: 10,
          y: 10,
          width: 40,
          height: 40,
          lineWidth: '2px',
          stroke: '#000',
          fill: 'red',
        }}
      />
      <circle attrs={{ x: 80, y: 30, r: 20, lineWidth: '2px', stroke: '#000', fill: 'red' }} />
      <text
        attrs={{
          x: 120,
          y: 30,
          text: '文本',
          fontSize: 20,
          fill: '#000',
        }}
      />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Hello />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();

```

以上就可以利用标签绘制各种自定义元素。
假如想让 Hello 走组件Component渲染，拥有生命周期，可以监测数据变化，可以参考下一章节[组件介绍-Component](./component.zh.md)

假如想保留F2组件的计算逻辑，只是自定义视觉 View 部分，可以参考[进阶-自定义View](./advanced/custom-view.md)