---
title: 快速上手
description: 本文档演示了如何快速上手使用 F2，包括安装、引入组件库和创建一个简单的柱状图。
keywords: ['快速上手', 'F2', 'React', '组件库', '柱状图', '前端', '可视化', '图表']
order: 0
---

## 一分钟上手

> 我们会以 React 为例，演示最基本的用法

### 安装

#### 通过 npm 安装

[![](https://img.shields.io/npm/v/@antv/f2.svg)](https://npmjs.com/package/@antv/f2) [![](https://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.com/package/@antv/f2)

```bash
npm install @antv/f2@next --save
# 引入 React 工程包
npm install @antv/f-react@next --save
```

#### CDN

我们也提供了 cdn 版本，可以通过 `<script>` 引入

```html
<script src="https://cdn.jsdelivr.net/npm/@antv/f2@5.0.20/dist/index.min.js"></script>
```

### 引入组件库

```jsx
import React from 'react';
import ReactDOM from 'react';
import Canvas from '@antv/f-react';
import { Chart, Interval, Axis, Tooltip } from '@antv/f2';
```

### 创建一个简单的柱状图：

```jsx
// 绘制图表的数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

ReactDOM.render(
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    {/* 声明一个图表 */}
    <Chart data={data}>
      {/* 声明 genre 和 sold 这两个字段为坐标轴 */}
      <Axis field="genre" />
      <Axis field="sold" />
      {/* 声明一个柱状图，x 轴为 genre， y 轴为sold， 同时根据 genre 进行颜色分类 */}
      <Interval x="genre" y="sold" color="genre" />
      {/* 声明一个按压的提示信息 */}
      <Tooltip />
    </Chart>
  </Canvas>,
  document.getElementById('root')
);
```

完成上述两步之后，保存文件并用浏览器打开，一张柱状图就绘制成功了：<br />![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/54ad3af8-c30d-43ca-b0e8-e21c4ea3d438.png)

## 更多示例

更多的示例直接查看 [Demo](/examples)。
