---
title: 旭日图
order: 0
---

旭日图是一种用于展示层级数据的径向图表，通过同心圆的形式展示数据的层级结构。每一层圆环代表数据的一个层级，扇形的大小表示数据的数值，适合展示具有层级关系的数据结构。

## 代码演示

### 基础示例

- [基础旭日图](./demo/sunburst.jsx)：展示层级数据结构的基础旭日图。

```jsx
import { jsx, Canvas, Sunburst } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Sunburst
      data={data.children}
      coord={{
        type: 'polar',
      }}
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

旭日图适用于以下场景：

1. 文件系统目录结构展示
2. 组织架构的可视化
3. 分类数据的层级展示
4. 预算分配和资源分布分析
