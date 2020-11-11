---
title: 快速上手
order: 0
---

## 安装

### 通过 npm 安装

[![](https://img.shields.io/npm/v/@antv/f2.svg)](https://npmjs.com/package/@antv/f2)
[![](https://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.com/package/@antv/f2)

```bash
npm install @antv/f2 --save
```

成功安装完成之后，即可使用 `import` 进行引用。

```javascript
import F2 from '@antv/f2';
```

### 浏览器引入

既可以通过将脚本下载到本地也可以直接引入在线资源。

```html
<!-- 引入在线资源 -->
<script src="https://gw.alipayobjects.com/os/lib/antv/f2/3.7.0/dist/f2.min.js"></script>
<!-- 友情提醒：请按需更新版本号。 -->
```


```html
<!-- 引入本地脚本 -->
<script src="./f2.js"></script>
```
你也可以直接通过 [unpkg](https://unpkg.com/@antv/f2) 下载。

## 一分钟上手

在 F2 引入页面后，我们就已经做好了创建第一个图表的准备了。

下面是以一个基础的柱状图为例开始我们的第一个图表创建。

### 1. 创建canvas标签

在页面上创建一个 `<canvas>` 并指定 `id`：

```html
<canvas id="myChart" width="400" height="260"></canvas>
```

### 2. 编写代码

创建 `<canvas>` 标签后，我们就可以进行简单的图表绘制:

1. 创建 Chart 图表对象，指定图表 ID、指定图表的宽高、边距等信息；

2. 载入图表数据源；

3. 使用图形语法进行图表的绘制；

4. 渲染图表。


```javascript
// F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// Step 1: 创建 Chart 对象
const chart = new F2.Chart({
  id: 'myChart',
  pixelRatio: window.devicePixelRatio // 指定分辨率
});

// Step 2: 载入数据源
chart.source(data);

// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
chart.interval().position('genre*sold').color('genre');

// Step 4: 渲染图表
chart.render();
```

完成上述两步之后，保存文件并用浏览器打开，一张柱状图就绘制成功了：<br />![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/54ad3af8-c30d-43ca-b0e8-e21c4ea3d438.png)


```javascript
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const chart = new F2.Chart({
  id: 'myChart',
  pixelRatio: window.devicePixelRatio // 指定分辨率
});
// load the data
chart.source(data);
// draw a column chart
chart.interval().position('genre*sold').color('genre');
chart.render();
```

## 更多示例

更多的示例直接查看 [Demo](/zh/examples/basic)。
