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
npm i @antv/f2-my --save

# 微信小程序
npm i @antv/f2-wx --save

```

### 2. 配置 jsx transform

> 如果项目已有 jsx 编译，可忽略此步骤

详见：[配置 jsx transform](./jsx-transform)

### 3. 添加 jsx 编译

package.js

```json
{
  "scripts": {
    "beforeCompile": "babel pages --out-dir pages --only **/*.jsx"
  }
}
```

## 支付宝小程序

mini.project.json

```json
{
  "scripts": {
    "beforeCompile": "npm run beforeCompile"
  }
}
```

### 页面使用

page.json

```json
{
  "usingComponents": {
    "f2": "@antv/f2-my"
  }
}
```

page.axml

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

- 参考示例：https://github.com/antvis/F2/tree/master/packages/my/examples

## 微信小程序

### 页面使用

page.json

```json
{
  "usingComponents": {
    "f2": "@antv/f2-wx"
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

- 参考示例：https://github.com/antvis/F2/tree/master/packages/wx/examples

## 更多

F2 是基于 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 的标准接口绘制的，所以只要能提供标准 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 接口的实现对象，F2 就能进行图表绘制

### 封装思路

因为在小程序中给的 `context` 对象不是标准的 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) , 所以封装的核心思路是将 `context` 和 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对齐，所以 F2 针对支付宝和微信这 2 个常见的场景做了一层 `context` 的对齐，详情可见: https://github.com/antvis/f2-context, 其他小程序也可以按同样的思路封装
