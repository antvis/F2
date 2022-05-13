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

### 2. 配置 F2 的 JSX 编译

```bash
npm install @babel/plugin-transform-react-jsx --save-dev
```

打开 `vue.config.js` 添加如下代码

```js
{
  chainWebpack: (config) => {
    config.module
      .rule('F2')
      .test(/\.jsx$/)
      .use('babel')
      .loader('babel-loader')
      .options({
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
              importSource: '@antv/f2',
            },
          ],
        ],
      })
      .end();
  },
}
```

### 3. Vite 中配置

```bash
npm install @rollup/plugin-babel --save-dev
npm install @babel/plugin-transform-react-jsx --save-dev
```

打开 `vite.config.js` 添加如下配置

```js
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          {
            runtime: 'automatic',
            importSource: '@antv/f2',
          },
        ],
      ],
    }),
    vue(),
    vueJsx(),
  ],
});
```

### 4. 使用示例

```vue
<script>
import { toRaw } from 'vue';
import Canvas from '@antv/f2-vue';
import { Chart, Interval, Axis } from '@antv/f2';

const data1 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
const data2 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 50 },
  { genre: 'Other', sold: 50 },
];
export default {
  name: 'App',
  data() {
    return {
      year: '2021',
      chartData: data1,
    };
  },
  mounted() {
    setTimeout(() => {
      this.year = '2022';
      this.chartData = data2;
    }, 1000);
  },
  render() {
    const { year, chartData } = this;
    return (
      <div className="container">
        <Canvas pixelRatio={window.devicePixelRatio}>
          <Chart data={toRaw(chartData)}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      </div>
    );
  },
};
</script>

<style>
.container {
  width: 500px;
  height: 300px;
}
</style>
```

**完整示例可参考**

- https://github.com/antvis/F2/tree/master/packages/vue/examples
