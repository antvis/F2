---
title: 使用 SVG 渲染
order: 16
---

借助 G 的 [渲染器](https://g.antv.antgroup.com/api/renderer/svg)，F2 也可以使用 SVG 渲染。

## 安装依赖

```bash
npm install @antv/g-mobile-svg --save
```

## 使用步骤

### 1. 定义渲染容器

```html
<div id="container"></div>
```

### 2. 使用 SVG 渲染器

```jsx
import { Canvas, Chart, Interval, jsx, Axis } from '@antv/f2';
import { Renderer } from '@antv/g-mobile-svg';

const container = document.getElementById('container');

// 实例化 SVG 渲染器
const renderer = new Renderer();

const { props } = (
  // 声明渲染容器和渲染器
  <Canvas container={container} renderer={renderer} width={300} height={200}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

## 完整示例

[CodeSandbox 示例](https://codesandbox.io/s/prod-fire-nk4d8x)

## 说明

- SVG 渲染器适用于需要矢量输出或可缩放图表的场景
- 通过 `renderer` 属性将 SVG 渲染器传递给 Canvas 组件
- SVG 渲染器会生成 SVG DOM 元素，可以方便地进行后续操作（如导出 SVG 文件）
