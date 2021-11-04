---
title: 自定义 Shape
order: 6
---

## 获取方式
```javascript
const Shape = F2.Shape;
```

通过在 Shape 上注册图形，实现自定义 Shape 的功能。

## 创建方式

自定义 Shape 的入口如下：

```javascript
const Shape = F2.Shape;
const shapeObj = Shape.registerShape('geomType', 'shapeName', {
  getPoints(pointInfo) {
    // 获取每种 shape 绘制的关键点
  },
  draw(cfg, container) {
    // 自定义最终绘制的逻辑

    return shape; // 返回最后绘制的 shape
  }
});
```

下面主要对其中需要覆写的方法做下详细说明：

## 方法

### getPoints

`getPoints` 方法用于计算绘制每种 shape 的关键点，在 F2 中每种几何形状都是由特定的几个关键点通过线连接而成。

`getPoints` 方法中传入的参数 pointInfo 数据结构如下，所有的数值都是**归一化后的结果**（即 0 至 1 范围内的数据）：

```javascript
{
  size: 0.1, // 形状的尺寸，不同的 shape 该含义不同，0 - 1 范围的数据
  x: 0.2, // 该点归一化后的 x 坐标
  y: 0.13, // 该点归一化后的 y 坐标
  y0: 0.1 // 整个数据集 y 轴对应数据的最小值，也是归一化后的数据，注意如果 y 对应的源数据是数组则 y 也将是个数组
}
```

下表列出了 F2 各个 geom 几何形状的关键点形成机制：

| **geom 类型** | **解释** |
| --- | --- |
| point | 点的绘制很简单，只要获取它的坐标以及大小即可，其中的 `size` 属性代表的是点的半径。<br />![](https://zos.alipayobjects.com/skylark/940c75cf-8400-415a-9e2d-040ce46e6a03/attach/3378/269e0e2c77a555a5/image.png#width=) |
| line | 线其实是由无数个点组成，在 F2 中我们将参与绘制的各个数据转换成坐标上的点然后通过线将逐个点连接而成形成线图，其中的 `size` 属性代表的是线的粗细。<br />![](https://zos.alipayobjects.com/skylark/f9b84b83-1cc8-4b81-9319-f643ef0e280a/attach/3378/d49e02be2f48a136/image.png#width=) |
| area | area 面其实是在 line 线的基础之上形成的, 它将折线图中折线与自变量坐标轴之间的区域使用颜色或者纹理填充。<br />![](https://zos.alipayobjects.com/skylark/dbcd60f3-7662-4ebd-8e0e-85d7d754d0c7/attach/3378/f67277978d5d8e3e/image.png#width=) |
| interval | interval 默认的图形形状是矩形，而矩形实际是由四个点组成的，在 F2 中我们根据 pointInfo 中的 x、y、size 以及 y0 这四个值来计算出这四个点，然后顺时针连接而成。<br />![](https://zos.alipayobjects.com/skylark/f36a2e27-13e8-4d55-8c93-b698e15bcc1f/attach/3378/94a6515e2eb60265/image.png#width=) |
| polygon | polygon 多边形其实也是由多个点连接而成，在 pointInfo 中 x 和 y 都是数组结构。<br />![](https://zos.alipayobjects.com/skylark/b4f6981c-ccd3-4237-97bd-dd88950758ea/attach/3378/ed2b5c05a1ff3581/image.png#width=) |
| schema | schema 作为一种自定义的几何图形，在 F2 中默认提供了 candle（烛形图，又称股票图、k 线图） shape，用于绘制股票图，注意矩形部分四个点的连接顺序都是顺时针，并且起始点均为左下角，这样就可以无缝转换至极坐标。<br />![](https://zos.alipayobjects.com/skylark/340c229d-be30-4f98-8a2a-8d55c8422645/attach/3378/1bfed6f3f5f90e13/image.png#width=)![](https://zos.alipayobjects.com/skylark/8afa13da-95d1-4282-a08b-f1c421b0d972/attach/3378/d82c45d3a526bd80/image.png#width=) |


### draw

`getPoints` 用于计算绘制 shape 的关键点，那么 `draw` 方法就是用来定义如何连接这些关键点的。

注意：该方法需要返回最后绘制的 shape。

#### 参数

- `cfg`: Object


该参数包含经过图形映射后的所有数据以及该数据对应的原始数据，结构如下图所示：![](https://gw.alipayobjects.com/zos/rmsportal/GIutZIjQWLrTeLxgQNMJ.png#width=300)

- 原始数据存储于 `cfg.origin._origin` 中；

- 通过 getPoints 计算出的图形关键点都储存于 points 中；

- cfg 对象中的 `color`、`size`、`shape` 都是通过映射之后的图形属性数据，可以直接使用。


- `container`: F2.G.Group


图形容器，需要将自定义的 shape 加入该容器中才能最终渲染出来。

**另外我们还提供了一些工具类方法，帮助用户快速将归一化后的数据转换为画布上的坐标**，使用的时候直接在上述两个方法内通过如下方式调用即可：

```javascript
Shape.registerShape('interval', 'rect', {
  getPoints(pointInfo) {
    // ...
  },
  draw(cfg, container) {
    // ...
    path = this.parsePath(path);
    // ...
    //
    return shape; // 返回最后绘制的 shape
  }
});
```

### parsePoint

方法名： `shapeObj.parsePoint(point)`

说明：将 0 - 1 范围内的点转化为画布上的实际坐标。

#### 参数

- `point`: object


结构如下：

```javascript
{
  x: 0.3,
  y: 0.34
}
```

### parsePoints

方法名：`shapeObj.parsePoints(points)`

说明：将一组 0 - 1 范围内的点转化为画布上的实际坐标。

#### 参数

- `point`: Array


结构如下：

```javascript
[
  { x: 0.3, y: 0.34 },
  { x: 0.3, y: 0.34 }
]
```

## 代码示例

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/40986088-7d33-466f-a598-30e580c693fd.png)

```javascript
const Shape = F2.Shape;
Shape.registerShape('interval', 'triangle', {
  getPoints: function(cfg) {
    const x = cfg.x;
    const y = cfg.y;
    const y0 = cfg.y0;
    const width = cfg.size;
    return [
      { x: x - width / 2, y: y0 },
      { x: x, y: y },
      { x: x + width / 2, y: y0 }
    ]
  },
  draw: function(cfg, group) {
    const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
    const polygon = group.addShape('polygon', {
      attrs: {
        points: [
          { x:points[0].x, y:points[0].y },
          { x:points[1].x, y:points[1].y },
          { x:points[2].x, y:points[2].y }
        ],
        fill: cfg.color
      }
    });
    return polygon; // 将自定义Shape返回
  }
});

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

const chart = new F2.Chart({
  id: 'mountNode',
  width: 500,
  height: 320,
  pixelRatio: window.devicePixelRatio
});

chart.source(data);
chart.interval().position('genre*sold').color('genre').shape('triangle');
chart.render();
```
