---
title: 坐标轴 Axis
order: 3
---

坐标轴（Axis）是图表中用于展示数据范围和刻度的组件，帮助用户理解数据的分布和趋势。F2 提供了灵活的坐标轴配置，支持自动旋转、自动隐藏、自定义样式等功能。

## 代码演示

### 自动旋转标签

当坐标轴标签过长或数量过多时，可以启用自动旋转功能，避免标签重叠。

```jsx
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  { category: 'Category1', value: 10 },
  { category: 'Category2', value: 15 },
  { category: 'Category3', value: 20 },
  { category: 'Category4', value: 25 },
  { category: 'Category5', value: 30 },
  { category: 'Category6', value: 35 },
  { category: 'Category7', value: 40 },
  { category: 'Category8', value: 45 },
  { category: 'Category9', value: 50 },
  { category: 'Category10', value: 55 },
  { category: 'Category11', value: 60 },
  { category: 'Category12', value: 65 },
  { category: 'Category13', value: 70 },
  { category: 'Category14', value: 75 },
  { category: 'Category15', value: 80 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="category" labelAutoRotate={true} />
      <Axis field="value" />
      <Interval x="category" y="value" color="#2FC25B" />
    </Chart>
  </Canvas>
);
```

### 自动隐藏标签

当标签过多时，可以启用自动隐藏功能，自动隐藏部分标签以避免重叠。

```jsx
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = Array.from({ length: 100 }, (_, i) => ({
  category: `Cat${i + 1}`,
  value: ((i % 10) + 1) * 10,
}));

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="category" labelAutoHide={true} />
      <Axis field="value" />
      <Interval x="category" y="value" color="#722ED1" />
    </Chart>
  </Canvas>
);
```

## API

| 属性名          | 类型    | 默认值 | 说明                                 |
| --------------- | ------- | ------ | ------------------------------------ |
| field           | string  | -      | 绑定的数据字段名                     |
| labelAutoRotate | boolean | false  | 是否启用标签自动旋转                 |
| labelAutoHide   | boolean | false  | 是否启用标签自动隐藏                 |
| safetyDistance  | number  | 0      | 标签之间的安全距离，用于自动旋转计算 |
| style           | object  | -      | 自定义样式配置                       |
