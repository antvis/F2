---
title: 快速上手
order: 0
---

## 声明式

F2 4.0 开始，我们将以声明式编写图表，声明式可以让你的代码更直观和简介，避免了复杂的 API 调用，而且我们也采用了 JSX 语法，不仅方便使用，还可以很方便地和 React、Vue 这些框架结合

## 组件化

为了构建复杂的可视化图表，组件是一种不可或缺的能力，在 F2 里，我们也参考 React 的设计模式，内置了一套完善的组件能力，能简单方便地分装自己的组件

## 快速开始

> 下面示例是以非 React 为演示的，如果项目已经是 React， 可以参考 [如何在 React 中使用](./framework/react)

### 配置 jsx transform

可见详细介绍：[配置 jsx transform](./framework/jsx-transform)

## 安装

### 通过 npm 安装

[![](https://img.shields.io/npm/v/@antv/f2.svg)](https://npmjs.com/package/@antv/f2) [![](https://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.com/package/@antv/f2)

```bash
npm install @antv/f2 --save
```

## 一分钟上手

### 1. 创建 canvas 标签

在页面上创建一个 `<canvas>`

```html
<canvas id="myChart" width="400" height="260"></canvas>
```

### 2. 编写代码

```jsx
// F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 获取 canvas context
const context = document.getElementById('myChart').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
      <Tooltip />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

完成上述两步之后，保存文件并用浏览器打开，一张柱状图就绘制成功了：<br />![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/54ad3af8-c30d-43ca-b0e8-e21c4ea3d438.png)

## 更多示例

更多的示例直接查看 [Demo](/examples)。
