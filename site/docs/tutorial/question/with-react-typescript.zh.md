---
title: 和 React 同时使用时，TS 类型报错
order: 1
---

当和 React 同时使用时，遇到 `group`、`circle`、`rect` 等标签的类型提示错误，如下图所示：

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/d5dd37c7-b7b8-415c-8675-f41de22715f1.png)

## 问题原因

因为 React SVG 的标签类型里也有 `circle`、`rect` 等标签，这些和 F2 定义的冲突了，需要单独引入 F2 标签定义的命名空间。

## 解决方式

### 1. 确定当前项目的 JSX 编译模式

打开 `tsconfig.json`，找到 `compilerOptions` 下的 `jsx` 配置项。如果没有则默认为 `react`。

- `react` 为 [Classic 编译模式](/tutorial/framework/jsx-transform.zh.md#classic-模式)
- `react-jsx` 为 [Automatic 编译模式](/tutorial/framework/jsx-transform.zh.md#automatic-模式)

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/bb848e34-451f-4819-909d-e31d09a122f8.png)

### 2. Classic 编译模式

在文件顶部增加如下注释和模块引用：

```jsx
/** @jsx jsx */
import { jsx } from '@antv/f2';
```

### 3. Automatic 编译模式

在文件顶部增加如下注释：

```jsx
/** @jsxImportSource @antv/f2 */
```

完成后即可解决类型错误问题：

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/57feeb7b-d1c3-4b40-ac52-dd1abb0d83c7.png)

## 注意事项

因为代码编译是以文件为单位的，在一个文件里只能使用一种标签类型。如果需要在同一文件中混用，需要将 F2 图表代码拆分到新文件中。
