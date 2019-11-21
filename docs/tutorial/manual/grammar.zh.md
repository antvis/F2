---
title: 图形语法
order: 0
---

F2 同 G2 一样，基于《The Grammar of Graphics》(Leland Wilkinson 著)一书所提的图形理论。该理论是一套用来描述所有统计图形深层特性的语法规则，该语法回答了『什么是统计图形』这一问题，以自底向上的方式组织最基本的元素形成更高级的元素。

所以对于 F2 来说，**没有具体的图表类型的概念，所有的图表都是通过组合不同的图形语法元素形成的**，这些图形语法元素包括：

- 最基础的部分是你想要可视化的[数据](https://www.yuque.com/antv/f2/data)以及一系列将数据中的变量对应到[图形属性](https://www.yuque.com/antv/f2/attribute)的映射；

- [几何标记](https://www.yuque.com/antv/f2/geometry)，可以理解为你在图表中实际看到的图形元素，如点、线、多边形等，每个几何标记对象含有多个图形属性，F2 图形语法的核心就是建立数据中的一系列变量到图形属性的映射；

- [度量](https://www.yuque.com/antv/f2/scale)，作为数据空间到图形属性空间的转换桥梁，每一个图形属性都对应着一个或者多个度量；

- [坐标系](https://www.yuque.com/antv/f2/coordinate)，描述了数据是如何映射到图形所在的平面的，一个几何标记在不同坐标系下会有不同的表现。目前 F2 提供了笛卡尔坐标系、极坐标系两种坐标系；

- 辅助元素是为了增强图表的可读性和可理解性，F2 中的辅助元素包含坐标轴 Axis、图例 Legend、提示信息 Tooltip、静态辅助标记 Guide。


所以，在 F2 中，我们通常这么描述一张图表：一张图表就是从数据到几何标记对象的图形属性的一个映射，此外图形中还可能包含数据的统计变换，最后绘制在某个特定的坐标系中。

更多内容请阅读以下篇章：

- [图表组成](https://www.yuque.com/antv/f2/understanding-f2-charts)

- [数据](https://www.yuque.com/antv/f2/data)

- [度量](https://www.yuque.com/antv/f2/scale)

- [几何标记](https://www.yuque.com/antv/f2/geometry)

- [图形属性](https://www.yuque.com/antv/f2/attribute)

- [坐标系](https://www.yuque.com/antv/f2/coordinate)


