---
title: 插件
order: 1
---

F2 的插件机制主要用于扩展底层渲染能力（如渲染器、风格化等），插件通过渲染器（如 CanvasRenderer）的 `registerPlugin` 方法注册。

## 插件机制说明

- 插件通常用于扩展渲染器的功能，比如支持 rough-canvas 效果、交互增强等。
- 插件以类的形式实现，通过 `new` 实例化后注册到渲染器。
- 通过 `renderer.registerPlugin(pluginInstance)` 注册插件。
- 渲染器作为 Canvas 组件的 renderer 传入。

## 代码演示

### 基础用法

以 rough-canvas 插件为例，展示如何注册并使用插件：

```jsx
import { Canvas, CanvasRenderer, Chart, Axis, Interval, jsx } from '@antv/f2';
import { Plugin as PluginRoughCanvasRenderer } from '@antv/g-plugin-rough-canvas-renderer';

const context = document.getElementById('container').getContext('2d');
const data = [
  { version: '5.0.21', rate: 1, type: 'iphone6' },
  { version: '5.0.21', rate: 13, type: '仿真' },
  // ... 省略部分数据
];

// 创建 renderer 并注册插件
const canvasRenderer = new CanvasRenderer();
canvasRenderer.registerPlugin(new PluginRoughCanvasRenderer());

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} renderer={canvasRenderer}>
    <Chart data={data}>
      <Axis field="version" />
      <Axis field="rate" />
      <Interval x="version" y="rate" color="version" />
    </Chart>
  </Canvas>
);
const canvas = new Canvas(props);
canvas.render();
```

## 适用场景

- 扩展底层 G 的渲染能力（如 rough-canvas、SVG、WebGL 等）
- 增强渲染器的交互、动画等功能
- 集成第三方渲染相关库
