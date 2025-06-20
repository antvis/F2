---
title: 金字塔图
order: 1
---

金字塔图是漏斗图的一种变形，通过金字塔形状来展示数据的层级结构和比例关系。与漏斗图不同，金字塔图通常用于展示稳定的层级结构，如组织架构、人口结构等。

## 代码演示

### 基础示例

- [基础金字塔图](./demo/pyramid.jsx)：展示层级结构数据的基础金字塔图。

```jsx
import { jsx, Canvas, Chart, Interval } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Interval x="action" y="pv" adjust="symmetric" shape="pyramid" color="action" showLabel />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [带边框金字塔图](./demo/stroke.jsx)：添加边框样式的金字塔图。
- [缩放金字塔图](./demo/scale.jsx)：支持缩放交互的金字塔图。

## 使用场景

金字塔图适用于以下场景：

1. 组织架构和层级关系展示
2. 人口年龄结构分析
3. 产品或服务的层级分类
4. 数据的等级分布展示
