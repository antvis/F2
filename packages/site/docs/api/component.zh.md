---
title: 组件 - Component
order: 1
redirect_from:
  - /zh/docs/api
---

提供了组件定义

## Usage

```jsx
import { Component } from '@antv/f2';
// TODO
```

## 生命周期

### constructor(props)

构造函数，传入组件参数

### willMount()

在组件将要挂载阶段执行

### render()

在组件渲染阶段执行

### didMount()

在组件完成挂载后执行

### shouldUpdate(nextProps)

在组件触发更新前触发，`return false` 时，不会触发组件更新

### willReceiveProps(nextProps)

在更新组件前，接收 props 时触发

### willUpdate()

组件更新前执行

### didUpdate()

完成更新后执行

### didUnmount()

完成销毁后执行

### setState(state, callback)

组件状态修改

### forceUpdate(callback)

触发强制更新

### setAnimate(boolean)

组件渲染时是否需要执行动画

## 组件属性

### props

构造函数传入的属性

### state

组件状态
