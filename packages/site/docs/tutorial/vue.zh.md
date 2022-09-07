---
title: 如何在 Vue 中使用
order: 12
---

为了方便 Vue 项目的使用，F2 也封装了一个 vue 的组件

## Usage

### 1. 安装依赖

```bash
npm install @antv/f2 --save
npm install @antv/f2-vue --save
```

### 2. 使用示例

```vue
<template>
  <div class="container">
    <Canvas>
      <Chart :data="data">
        <Axis field="genre" />
        <Axis field="sold" />
        <Tooltip :showTooltipMarker="true" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    </Canvas>
  </div>
</template>
<script setup>
import Canvas from '@antv/f2-vue';
import { Chart, Interval, Axis, Tooltip } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
</script>
<style>
.container {
  width: 500px;
  height: 300px;
}
</style>
```

### 3. 自定义 View
在Vue中，[自定义View](advanced/custom-view)的高阶组件（HOC）需要从`@antv/f2-vue`中引入，即：`import { withXXX } from "@antv/f2-vue"`。

以下是自定义图例的示例：
```jsx
/** @jsxImportSource @antv/f2 */
import { withLegend } from "@antv/f2-vue"

// 自定义 Legend
const Legend = withLegend((props) => {
  const { items = [], itemWidth } = props

  return (
    <group
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {
        items.map((item) => {
          const { color, name } = item
          return (
            <group
              className="legend-item"
              style={{
                width: itemWidth,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-item={item}
            >
              <text
                attrs={{
                  fill: color,
                  text: name,
                }}
              />
            </group>
          )
        })
      }
    </group>
  )
})

export default Legend
```

### 4. 忽略运行时警告信息 
在JSX/TSX中使用[图形标签（Shape）](shape.zh.md)时，控制台中会有运行时警告：`[Vue warn]: Failed to resolve component: group` 及 `[Vue warn]: resolveComponent can only be used in render() or setup().`，如需忽略此警告，可在compilerOptions的isCustomElement中添加group标签的判断。

Vue Cli 的 vue.config.js 配置：
```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          // Clear [Vue warn]: Failed to resolve component: group
          isCustomElement: (tagName) => ['group'].includes(tagName),
        };
        return options;
      })
      .end();
  },
});
```

Vite 中的 vite.config.ts 配置：
```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // Clear [Vue warn]: Failed to resolve component: group
      isCustomElement: (tagName) => ['group'].includes(tagName),
    }),
  ],
});
```

**完整示例可参考**

- codesandbox: https://codesandbox.io/s/f2-vue-9yywsh?file=/src/App.vue
- https://github.com/antvis/F2/tree/master/packages/vue/examples
