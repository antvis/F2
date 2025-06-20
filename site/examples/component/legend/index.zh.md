---
title: 图例
order: 1
---

图例组件用于展示图表中不同数据系列的标识和说明，帮助用户理解图表中各种颜色、形状、线型等视觉元素的含义。图例是图表可读性的重要组成部分，提供了数据分类和识别的关键信息。

## 代码演示

### 基础示例

- [基础图例](./demo/legend.jsx)：展示基本的图例组件。

```jsx
import { jsx, Canvas, Chart, Legend } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Legend
        position="bottom"
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      />
    </Chart>
  </Canvas>
);
```

### 进阶用法

- [自定义图例](./demo/custom.jsx)：自定义样式和布局的图例。
- [可交互图例](./demo/interactive.jsx)：支持点击交互的图例组件。

## 使用场景

图例组件适用于以下场景：

1. 多数据系列的图表标识
2. 分类数据的颜色说明
3. 图表的数据解释和说明
4. 提高图表的可读性和理解性
