---
title: 如何在 Node.js 中使用
order: 14
---

在 Node.js 环境中使用 F2，可以通过 `canvas` 库提供 Canvas 实现，从而生成图表图片。

## 配置 JSX Transform

详见：[配置 JSX Transform](/tutorial/framework/jsx-transform.zh.md)

## 安装依赖

```bash
npm install @antv/f2 --save
npm install canvas --save
```

## 使用示例

```jsx
import { Canvas, Chart, Interval, Axis } from '@antv/f2';
import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

(async () => {
  const { props } = (
    <Canvas context={ctx} pixelRatio={1} animate={false}>
      <Chart data={data}>
        <Axis field="genre" />
        <Axis field="sold" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    </Canvas>
  );

  const fcanvas = new Canvas(props);
  await fcanvas.render();

  const out = fs.createWriteStream(path.join(__dirname, 'chart.png'));
  const stream = canvas.createPNGStream();
  stream.pipe(out);

  out.on('finish', () => {
    process.exit();
  });
})();
```

## 说明

- 使用 `canvas` 库的 `createCanvas` 方法创建 Canvas 实例
- 将 Canvas 的 2D context 传递给 F2 的 `Canvas` 组件
- 设置 `animate={false}` 关闭动画，因为图片导出场景不需要动画
- 使用 `createPNGStream` 将 Canvas 内容输出为 PNG 图片文件
