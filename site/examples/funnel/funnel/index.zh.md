---
title: 基础漏斗图
order: 0
---

漏斗图是一种特殊的图表类型，通过漏斗形状来展示业务流程中各个阶段的数据变化。它能够直观地显示从一个阶段到下一个阶段的转化率，常用于分析用户行为路径和业务流程优化。

## 代码演示

### 基础示例

- [基础漏斗图](./demo/funnel.jsx)：展示业务流程各阶段转化的基础漏斗图。

```jsx
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      coord={{
        transposed: true,
      }}
      scale={{
        percent: {
          min: 0,
        },
        action: {
          range: [0, 1],
        },
      }}
    >
      <Interval x="action" y="percent" adjust="symmetric" shape="funnel" color="action" showLabel />
      <Legend />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [带边框漏斗图](./demo/stroke.jsx)：添加边框样式的漏斗图。

## 使用场景

漏斗图适用于以下场景：

1. 用户转化流程分析
2. 销售漏斗和营销效果评估
3. 业务流程各环节效率分析
4. 产品功能使用路径分析
