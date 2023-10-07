---
title: 使用 svg 渲染
order: 16
---

借助 G 的 [渲染器](https://g.antv.antgroup.com/api/renderer/svg), F2 也可以使用 svg 渲染

### 安装依赖

```bash
npm i @antv/g-mobile-svg --save
```

### 定义渲染容器

```html
<div id="container"></div>
```

### 使用 svg renderer

```jsx
import { Canvas, Chart, Interval, jsx, Axis } from '@antv/f2';
import { Renderer } from '@antv/g-mobile-svg';

const container = document.getElementById('container');

// 实例化 svg 渲染器
const renderer = new Renderer();

...

const { props } = (
  // 生命渲染容器和渲染器
  <Canvas container={container} renderer={renderer} width={300} height={200}>
    {...}
  </Canvas>
);
const canvas = new Canvas(props);
canvas.render();
```

演示示例：https://codesandbox.io/s/prod-fire-nk4d8x
