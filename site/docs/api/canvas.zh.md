---
title: 画布 - Canvas
description: 本文档介绍 F2 提供的顶层组件 Canvas，该组件可理解为画布对象。
keywords: ['画布', 'Canvas', '前端', '可视化', '图表']
order: 2
redirect_from:
  - /zh/docs/api
---

F2 提供的顶层组件，可以理解成画布对象

## Usage

```jsx
import { Canvas, Component } from '@antv/f2';

<Canvas context={context}>
  <Component />
  ...
</Canvas>;
```

## Props

### context: CanvasRenderingContext2D

画布的上下文，需要为 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对象，F2 使用的是标准的 [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D) 对象接口，只要符合这个接口定义的对象都可以

### pixelRatio: number

_可选_

默认为 `window.devicePixelRatio`

### width: number

_可选_

画布宽度

### height: number

_可选_

画布高度

### animate: boolean

是否执行动画，默认为 `true`
