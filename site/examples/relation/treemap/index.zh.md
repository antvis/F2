---
title: 矩形树图
order: 1
---

矩形树图是一种用于展示层级数据的可视化方法，通过嵌套的矩形来表示数据的层级结构和数值大小。每个矩形的面积大小对应数据的数值，适合展示具有层级关系且数值差异明显的数据。

## 代码演示

### 基础示例

- [基础矩形树图](./demo/treemap.jsx)：展示层级数据的基础矩形树图。

```jsx
import { jsx, Canvas, Treemap } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Treemap
      data={data}
      color={{
        field: 'name',
      }}
      value="value"
      space={4}
    />
  </Canvas>
);
```

## 使用场景

矩形树图适用于以下场景：

1. 股票市场热力图展示
2. 磁盘空间使用情况分析
3. 预算分配和资源占用可视化
4. 产品销售额的层级分析
