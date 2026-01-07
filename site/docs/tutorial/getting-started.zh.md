---
title: 快速上手
order: 0
---

本指南将帮助你快速上手 F2，从安装到绘制第一个图表。

## 特性介绍

F2 4.0 开始采用声明式编写图表，带来更直观的开发体验：

### 声明式

声明式编程可以让代码更直观和简洁，避免了复杂的 API 调用。F2 采用了 JSX 语法，不仅方便使用，还可以很方便地和 React、Vue 等框架结合。

### 组件化

为了构建复杂的可视化图表，组件是一种不可或缺的能力。F2 参考了 React 的设计模式，内置了一套完善的组件能力，能简单方便地封装自己的组件。

## 安装

### 通过 npm 安装

[![](https://img.shields.io/npm/v/@antv/f2.svg)](https://npmjs.com/package/@antv/f2) [![](https://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.com/package/@antv/f2)

```bash
npm install @antv/f2 --save
```

### 通过 CDN 引入

```html
<script src="https://unpkg.com/@antv/f2/dist/f2.min.js"></script>
```

## 配置 JSX 转换

F2 使用 JSX 语法构建图表，需要配置 JSX 转换工具。

> 注意：如果项目已经是 React，可以参考 [如何在 React 中使用](/tutorial/framework/react.zh.md)

详细配置说明请参考：[配置 JSX Transform](/tutorial/framework/jsx-transform.zh.md)

## 一分钟上手

### 1. 创建 canvas 标签

在页面上创建一个 `<canvas>` 元素：

```html
<canvas id="myChart" width="400" height="260"></canvas>
```

### 2. 编写代码

```jsx
// F2 对数据源格式的要求是 JSON 数组，数组的每个元素是一个标准 JSON 对象
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

完成上述两步之后，保存文件并用浏览器打开，一张柱状图就绘制成功了：

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/54ad3af8-c30d-43ca-b0e8-e21c4ea3d438.png)

## 代码解析

### Canvas 画布组件

`Canvas` 是图表的根容器，负责提供渲染环境：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `context` | `CanvasRenderingContext2D` | - | **必填**，Canvas 2D 上下文 |
| `pixelRatio` | `number` | `window.devicePixelRatio` | 设备像素比，用于高清屏适配 |
| `width` | `number` | - | 画布宽度（优先使用 canvas 元素的 width） |
| `height` | `number` | - | 画布高度（优先使用 canvas 元素的 height） |
| `animate` | `boolean` | `true` | 是否开启动画 |
| `children` | `JSX.Element` | - | 通过 JSX 语法创建的 F2 组件节点（如 `<Chart />`） |

### Chart 图表组件

`Chart` 是图表的核心组件，负责数据处理和坐标转换：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Data[]` | - | **必填**，数据源 |
| `scale` | `ScaleConfig` | - | 度量配置 |
| `coord` | `CoordConfig` | - | 坐标系配置 |
| `children` | `JSX.Element` | - | 通过 JSX 语法创建的 F2 组件节点（如 `<Interval />`、`<Axis />` 等） |

### Interval 柱状图组件

`Interval` 用于绘制柱状图：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `x` | `string` | - | **必填**，x 轴字段名 |
| `y` | `string` | - | **必填**，y 轴字段名 |
| `color` | `string \| Function` | - | 颜色字段或颜色映射函数 |

### Axis 坐标轴组件

`Axis` 用于配置坐标轴：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `field` | `string` | - | **必填**，字段名 |
| `position` | `string` | - | 坐标轴位置（`top`、`bottom`、`left`、`right`） |

### Tooltip 提示框组件

`Tooltip` 用于显示数据提示信息。

## 更多示例

更多示例请查看 [示例](/examples)。

## 下一步

- 了解 [核心概念](/tutorial/understanding.zh.md)
- 学习 [图表语法](/tutorial/grammar.zh.md)
- 查看 [组件 API](/api/chart/chart.zh.md)
- 了解 [如何在框架中使用](/tutorial/framework/overview.zh.md)
