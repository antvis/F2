---
title: 和 React 同时使用时，TS 类型报错
order: 1
---

当和 React 同时使用时，碰到 `group`, `circle`, `rect` 等这些标签的类型提示错误时，如下图所以 ![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/d5dd37c7-b7b8-415c-8675-f41de22715f1.png)

## 问题原因

因为 React svg 的标签类型里也有 `circle`， `rect` 等这些标签，这些和 F2 定义的冲突了，需要我们再单独引入 F2 标签定义的命名空间

## 解决方式

1. 先确定当前项目的 jsx 编译模式，打开 `tsconfig.json`
2. 找到 `compilerOptions` 下的 `jsx` 配置项，如果没有则默认为 `react`，`react` 为 [classic](/tutorial/jsx-transform#classic-1) 编译模式，`react-jsx` 为 [automatic](/tutorial/jsx-transform#automatic-1) 编译模式

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/bb848e34-451f-4819-909d-e31d09a122f8.png)

### 1. classic 编译模式

在文件顶部增加如下注释代码和模块引用

```jsx
/** @jsx jsx */
import { jsx } from '@antv/f2';
...
```

### 2. automatic 编译模式

在文件顶部增加如下注释代码

```jsx
/** @jsxImportSource @antv/f2 */
...
```

3. 完成后即可解决类型错误问题

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/57feeb7b-d1c3-4b40-ac52-dd1abb0d83c7.png)

## 注意事项

因为代码编译是以文件为单位的，在一个文件里只能使用一种标签类型，如果是在同一文件中的，需要再新建一个新的文件
