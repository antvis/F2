---
title: 坐标轴 - Axis
description: 本文档介绍如何使用和配置坐标轴组件
keywords: ['坐标轴', 'Axis', '前端', '可视化']
order: 6
---

坐标轴组件

坐标轴配置。F2 的坐标轴的组成如下：![](https://gw.alipayobjects.com/zos/rmsportal/YhhBplZmzxzwvUBeEvPE.png#width=500)

| **术语**     | **英文** |
| ------------ | -------- |
| 坐标轴文本   | label    |
| 坐标轴线     | line     |
| 坐标轴刻度线 | tickLine |
| 坐标轴网格线 | grid     |

## 使用方法 (Usage)

首先引入必要的组件库：

```jsx
import { Canvas, Chart, Line, Axis } from '@antv/f2';
```

然后创建一个简单的折线图，并配置坐标轴：

```jsx
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Axis field="genre" />
    <Axis field="sold" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## 属性 (Props)

部分属性可参考 scale 图表度量，度量详细介绍可见：[度量](../../tutorial/scale.zh.md)

### visible: boolean

是否显示坐标轴，默认为 `true`。

### field: string

坐标轴的数据字段。

### type: string

指定不同的度量类型，等效于 `chart.scale` 的 `type` 配置，支持的 type 为： `identity`、`linear`、`cat`、`timeCat`。默认会根据数据类型类型自动判断，`Number` 默认为 `linear`, `String` 默认为 `cat`

#### 示例

指定为 `cat` 类型

```jsx
<Axis field="genre" type="cat" />
```

### position: string

坐标轴显示的位置：`'top' | 'right' | 'bottom' | 'left'`, 分别对应 `「上边」、「右边」、「下边」、「左边」` 。

#### 示例

x 轴显示在上面

```jsx
<Axis field="genre" position="top" />
```

### tickCount: Number

坐标轴上刻度点的个数，不同的度量类型对应不同的默认值。

#### 示例

y 轴显示 3 个刻度

```jsx
<Axis field="sold" tickCount={3} />
```

### formatter: Function

回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示。

#### 示例

y 轴保留 2 位小数点

```jsx
<Axis
  field="sold"
  formatter={(v) => {
    return v.toFixed(2);
  }}
/>
```

### range: string

输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1。

### min: string

定义数值范围的最小值，在 `type=linear` 时生效

#### 示例

指定 y 轴最小值为 `0`

```jsx
<Axis field="sold" min={0} />
```

### max: string

定义数值范围的最大值,在 `type=linear` 时生效

#### 示例

指定 y 轴最大值为 `100`

```jsx
<Axis field="sold" max={110} />
```

### nice: boolean

默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布，更符合阅读习惯。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]。

### mask: string

在 `type=timeCat` 时生效，表示时间格式化形式，如 `YYYY-MM-DD HH:mm:ss`

#### 示例

指定 y 轴最大值为 `100`

```jsx
<Axis field="time" mask="YYYY-MM-DD" />
```

### grid: string

网格线类型：可选值为：`'arc' | 'line'`，分别代表`「弧线」和 「直线」`

### style

坐标轴的样式配置

#### style.label: TextAttr | Function

> 类型为绘图属性：[文本属性](/zh/docs/tutorial/shape-attrs#文本属性) 文本样式文本样式

#### style.tickLine

```js
{
  tickLine: {
    // 刻度线长度
    length: 10,
  }
}
```

#### style.line

> 类型为绘图属性：[线条属性](/zh/docs/tutorial/shape-attrs#线条属性) 线条样式

轴线样式

#### style.grid

> 类型为绘图属性：[线条属性](/zh/docs/tutorial/shape-attrs#线条属性) 线条样式

网格线样式
