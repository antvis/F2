---
title: 散点图
order: 0
---

散点图是一种使用点来表示数据的图表类型，通过在二维坐标系中绘制数据点来展示两个变量之间的关系。每个点的位置由其在 X 轴和 Y 轴上的值决定，适合用于发现变量间的相关性和分布模式。

## 代码演示

### 基础示例

- [基础散点图](./demo/scatter.jsx)：展示两个变量之间关系的基础散点图。

```jsx
import { jsx, Canvas, Chart, Point, Axis } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      scale={{
        height: {
          tickCount: 5,
        },
        weight: {
          tickCount: 5,
        },
      }}
    >
      <Axis field="height" />
      <Axis field="weight" />
      <Point x="height" y="weight" color="gender" style={{ fillOpacity: 0.65 }} />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [气泡图](./demo/bubble.jsx)：通过点的大小表示第三个维度的数据。
- [有序气泡图](./demo/ordered-bubble.jsx)：按照某个维度排序的气泡图。
- [可缩放散点图](./demo/roam.jsx)：支持缩放和平移交互的散点图。

## 使用场景

散点图适用于以下场景：

1. 分析两个连续变量之间的相关性
2. 识别数据中的异常值和离群点
3. 展示数据的分布和聚类模式
4. 多维数据的可视化分析
