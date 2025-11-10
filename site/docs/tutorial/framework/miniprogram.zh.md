---
title: 如何在小程序中使用
order: 13
---

## 前置配置

### 1. 安装 F2 依赖

```bash
# 安装 F2 依赖
npm i @antv/f2 --save

# 安装小程序组件
npm i @antv/f-my --save

# 微信小程序
npm i @antv/f-wx --save

```

### 2. 配置 jsx transform

> 如果项目已有 jsx 编译，可忽略此步骤

详见：[配置 jsx transform](./jsx-transform)

### 3. 添加 jsx 编译

package.json

```json
{
  "scripts": {
    "beforeCompile": "babel pages --out-dir pages --only **/*.jsx"
  }
}
```

## 支付宝小程序

f-my / f-my-web（双 Canvas 模式说明）在小程序生态中，F2 提供了两套小程序组件：f-my（默认 NativeCanvas 实现）与 f-my-web（基于 WebCanvas 实现）。不是通过 canvasType 属性切换，而是通过引入不同组件包来选择 Canvas 类型。

要点：

- f-my：使用 NativeCanvas（原生 Canvas 实现），对齐 Web Canvas API，适用于对原生特性有依赖或兼容性要求较高的场景。
- f-my-web：使用 WebCanvas（在小程序内基于 web 技术栈实现的 Canvas），在包含大量同层组件或频繁跨层通信的复杂页面中，通常能显著降低总耗时，获得更优的交互性能。
- 兼容性：F2 已屏蔽两者的 API 差异，图表代码无需修改即可在 f-my 与 f-my-web 之间复用。

mini.project.json

```json
{
  "scripts": {
    "beforeCompile": "npm run beforeCompile"
  }
}
```

使用示例（切换组件包）：

使用 NativeCanvas（f-my）： page.json

```json
{
  "usingComponents": {
    "f2": "@antv/f-my"
  }
}
```

使用 WebCanvas（f-my-web）： page.json

```json
{
  "usingComponents": {
    "f2": "@antv/f-my-web"
  }
}
```

使用 NativeCanvas（f-my）：page.axml

```jsx
<view class="container">
  <f2 onRender="onRenderChart" onCanvasReady="onCanvasReady"></f2>
</view>
```

使用 WebCanvas（f-my-web）： page.json

```jsx
<view class="container">
  <f2 onRender="onRenderChart"></f2>
</view>
```

page.acss

```css
.container {
  width: 100%;
  height: 600rpx;
}
```

chart.jsx

```jsx
import { Chart, Interval, Axis } from '@antv/f2';

export default (props) => {
  const { data } = props;
  return (
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  );
};
```

page.jsx

```jsx
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {},
  onRenderChart() {
    return <Chart data={data} />;
  },
});
```

如果不想在入口文件写 jsx 语法，可以使用下面方式

page.js

```jsx
// 通过 createElement 方式创建
import { createElement } from '@antv/f2';
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {},
  onRenderChart() {
    return createElement(Chart, {
      data: data,
    });
  },
});
```

### demo

- 参考示例：https://github.com/antvis/FEngine/tree/master/packages/f-my/examples

## 微信小程序

### 页面使用

page.json

```json
{
  "usingComponents": {
    "f2": "@antv/f-wx"
  }
}
```

page.wxml

```jsx
<view class="container">
  <f2 onRender="{{onRenderChart}}" />
</view>
```

page.wxss

```css
.container {
  width: 100%;
  height: 600rpx;
}
```

chart.jsx

```jsx
import { Chart, Interval, Axis } from '@antv/f2';

export default (props) => {
  const { data } = props;
  return (
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  );
};
```

page.jsx

```jsx
import Chart from './chart';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {
    onRenderChart() {
      return <Chart data={data} />;
    },
  },
});
```

如果不想在入口文件写 jsx 语法，可以使用下面方式

page.js

```jsx
import { createElement } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

Page({
  data: {
    onRenderChart() {
      return createElement(Chart, {
        data: data,
      });
    },
  },
});
```

### demo

- 参考示例：https://github.com/antvis/FEngine/tree/master/packages/f-wx/examples
