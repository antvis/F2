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
      <Chart ：data="state.data">
        <Axis field="genre" />
        <Axis field="sold" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    </Canvas>
  </div>
</template>
<script lang="ts" setup>
import { shallowReactive, onMounted } from "vue"
import Canvas from "@antv/f2-vue"
import { Chart, Interval, Axis, Tooltip } from "@antv/f2"
import Grahpic from "@/components/Grahpic"
import Legend from "@/components/Legend"

const data1 = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 120 },
  { genre: "Shooter", sold: 350 },
  { genre: "Other", sold: 150 },
]

const data2 = [
  { genre: "Sports", sold: 275 },
  { genre: "Strategy", sold: 115 },
  { genre: "Action", sold: 20 },
  { genre: "Shooter", sold: 50 },
  { genre: "Other", sold: 50 },
]

const state = shallowReactive<{
  year: string
  data: Record<string, string | number>[]  
}>({
  year: '2021',
  data: data1  
})

onMounted(() => {
  setTimeout(() => {
      state.year = '2022';
      state.chartData = data2;
    }, 1000)
})
</script>

<style>
.container {
  width: 500px;
  height: 300px;
}
</style>
```

### 3. 自定义 View
在Vue中，自定义View的高阶组件需要从@antv/f2-vue中引入，例如：import { withLegend } from "@antv/f2-vue"。

```tsx
/** @jsxImportSource @antv/f2 */
import { withLegend } from "@antv/f2-vue"

// 自定义 Legend
const Legend = withLegend((props: Record<string, unknown>) => {
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
        //@ts-ignore
        items.map((item) => {
          const { color, name } = item
          return (
            <group
              className="legend-item"
              style={{
                width: itemWidth as number,
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
在JSX/TSX中使用[图形标签（Shape）](./shape.zh.md)时，会有运行时警告 ``` [Vue warn]: resolveComponent can only be used in render() or setup(). ```。如需忽略警告，可在compilerOptions中添加isCustomElement定义，以便忽略图形标签。

Vue Cli中的vue.config.js配置：
```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          // Clear [Vue warn]: resolveComponent can only be used in render() or setup().
          isCustomElement: (tagName) =>
            ['group', 'text'].includes(tagName),
        };
        return options;
      })
      .end();
  },
});
```

Vite中的vite.config.ts配置：
```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // Clear [Vue warn]: resolveComponent can only be used in render() or setup().
      isCustomElement: (tagName) =>
        ['group', 'text'].includes(tagName),
    }),
  ],
});
```

**完整示例可参考**

- codesandbox: https://codesandbox.io/s/f2-vue-9yywsh?file=/src/App.vue
- https://github.com/antvis/F2/tree/master/packages/vue/examples
