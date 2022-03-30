---
title: 配置 jsx transform
order: 10
---

F2 使用 JSX 语法来构建图表，所以需要在运行前对 JSX 语法进行编译， JSX 更多细节可参考 React 的官方文档 [JSX 简介](https://zh-hans.reactjs.org/docs/introducing-jsx.html)

Babel 和 TypeScript 都可以编译 JSX 语法，并且在编译时 JSX 语法时，会有 2 种编译模式，在实际项目中可根据自己实际情况选择和使用

JSX 2 种编译的差别可见：

- https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#runtime
- https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

## Babel

在 Babel 中是使用 [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) 这个插件来编译 JSX 的

### 安装

```bash
npm install --save-dev @babel/plugin-transform-react-jsx
```

### 配置 babel.config

#### classic

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "jsx",
        "pragmaFrag": "Fragment"
      }
    ]
  ]
}
```

#### automatic

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "runtime": "automatic",
        "importSource": "@antv/f2"
      }
    ]
  ]
}
```

## TypeScript

在 TypeScript 中也分别支持这 2 种编译模式

### 配置 tsconfig.json

#### classic

```json
{
  "compilerOptions": {
    "jsxFactory": "jsx",
    "jsxFragmentFactory": "Fragment"
  }
}
```

#### automatic

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@antv/f2"
  }
}
```
