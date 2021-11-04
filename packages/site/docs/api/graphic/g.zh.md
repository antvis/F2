---
title: G
order: 0
---

`G` 作为 F2 图表的渲染引擎，具备以下特点：

- 层次化结构

- 支持容器、各种图形的创建、修改和销毁

- 动画

- 矩阵变换


G 采用层次化结构设计，结构如下：![](https://gw.alipayobjects.com/zos/rmsportal/nreSRkPdaGHPhWXTZdQr.png#width=350)

其中：

- Canvas 画布的入口，包含所有 Group、Shape 对象

- Group 容器，可包含 Group 和 Shape 对象

- Shape 为 G 提供的具体的图形


## 如何引入 G

```javascript
const F2 = require('@antv/f2');
const { G } = F2;
```

### 类

- [Canvas](#_Canvas)

- [Group](#_Group)

- [Shape](#_Shape)

  - [Shape.Line](#_Line-%E7%BA%BF) 线

  - [Shape.Arc](#_Arc-%E5%9C%86%E5%BC%A7) 圆弧

  - [Shape.Circle](#_Circle-%E5%9C%86) 圆

  - [Shape.Polygon](#_Polygon-%E5%A4%9A%E8%BE%B9%E5%BD%A2) 多边形

  - [Shape.Polyline](#_Polyline-%E5%A4%9A%E7%82%B9%E7%BA%BF%E6%AE%B5) 多点线段

  - [Shape.Rect](#_Rect-%E7%9F%A9%E5%BD%A2) 矩形

  - [Shape.Sector](#_Sector-%E6%89%87%E5%BD%A2) 扇形

  - [Shape.Text](#_Text-%E6%96%87%E6%9C%AC) 文本

  - [Shape.Custom](#_Custom-%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E5%BD%A2) 自定义图形


### 命名空间

- [Matrix](#_Matrix)

- [Vector2](#_Vector2)


**示例：**

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/e66df1e1-ce1b-4fce-a123-51219527872b.png)

```javascript
const { Canvas } = F2.G; // 引入 Canvas
const canvas = new Canvas({
  el: 'canvas',
  width: 200,
  height: 100
}); // 创建 canvas 实例
const container = canvas.addGroup({
  zIndex: 2
}); // canvas 添加一个 group
const itemGroup = container.addGroup({
  zIndex: 1
}); // container 添加一个 group
itemGroup.addShape('circle', {
  attrs: {
    x: 5,
    y: 0,
    r: 5,
    fill: 'red'
  }
}); // itemGroup 中添加一个圆
itemGroup.addShape('text', {
  attrs: {
    x: 17,
    y: 0,
    textAlign: 'start',
    textBaseline: 'middle',
    fontSize: 12,
    fill: 'red',
    text: '分类一'
  }
}); // itemGroup 中添加一个文本
const bbox = itemGroup.getBBox(); // 获取 itemGroup 的包围盒
container.addShape('rect', {
  zIndex: 0,
  attrs: {
    x: bbox.minX - 5,
    y: bbox.minY - 5,
    width: bbox.width + 10,
    height: bbox.height + 10,
    fill: 'rgba(0, 0, 0, 0.09)',
    radius: 4
  }
}); // container 中添加一个矩形
container.sort(); // container 容器内元素排序
container.moveTo(30, 50); // 将 container 移至 (30, 50)

canvas.addShape('rect', {
  zIndex: 0,
  attrs: {
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    fill: 'rgba(0, 0, 0, 0.09)',
    radius: 4
  }
}); // canvas 中添加一个矩形

canvas.sort(); // canvas 容器内的元素排序
canvas.draw(); // 绘制
```

