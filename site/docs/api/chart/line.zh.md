---
title: 线 - Line
description: 本文档介绍如何使用和配置线组件，用于绘制折线图、曲线图、阶梯线图等。
keywords: ['线', '折线', 'Line', '前端', '可视化', '图表']
order: 2
---

图表里面的折线类型, 用于绘制折线图、曲线图、阶梯线图等, 继承自 [几何标记 Line](Line)

## Usage

```jsx
import { Canvas, Chart, Line } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5, type: 'a' },
  { genre: 'Strategy', sold: 10, type: 'a' },
  { genre: 'Action', sold: 20, type: 'a' },
  { genre: 'Shooter', sold: 20, type: 'a' },
  { genre: 'Other', sold: 40, type: 'a' },
  { genre: 'Sports', sold: 15, type: 'b' },
  { genre: 'Strategy', sold: 10, type: 'b' },
  { genre: 'Action', sold: 25, type: 'b' },
  { genre: 'Shooter', sold: 30, type: 'b' },
  { genre: 'Other', sold: 45, type: 'b' },
];

<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" color="a" />
  </Chart>
</Canvas>;
```

## 属性 (Props)

### x: string

x 轴的数据映射字段名。

### y: string

y 轴的数据映射字段名。

### color

color 的数据映射字段，可使用如下几种方式：

#### 固定值

代表折线使用固定颜色 `#1890FF`

```jsx
<Line color="#1890FF" />
```

#### 字段名映射

表示折线根据 `field` 字段来显示不同的颜色，颜色值会由 F2 的默认主题定义

```jsx
<Line color={field} />
```

#### Array 形式

表示折线根据 `field` 字段来显示不同的颜色，并且颜色按数据出现的先后顺序依稀选择 `['red', 'green', 'blue']` 这 3 种颜色

```jsx
<Line color={[field, ['red', 'green', 'blue']]} />
```

#### Object 形式

```jsx
<Line
  color={{
    field,
    // 颜色列表
    range: ['red', 'green', 'blue'],
    // 也可通过回调的方式设置
    callback: (value) => {
      return 'gray';
    },
  }}
/>
```

#### 指定映射类型

默认 F2 会根据列表依次选择，我们也可以通过 `type` 来指定颜色的选择方式。F2 支持 **线性** 和 **分类** 两种形式进行数据映射，分别为：`'linear' | 'category'`

颜色渐变

```jsx
<Line
  color={{
    // linear 代表颜色为渐变色
    type: 'linear',
    field,
    // 指定颜色从 red 渐变到 green
    range: ['red', 'green'],
  }}
/>
```

顺序获取

```jsx
<Line
  color={{
    // category 代表颜色按 range 定义的列表依次获取
    type: 'category',
    field,
    // 不会渐变，只会映射这 3 种颜色
    range: ['red', 'green', 'blue'],
  }}
/>
```

### size

size 的数据映射字段，使用方式同 [color](#color)。

```jsx
// 固定值，代表折线粗细为固定 4px
<Line size={ 4 }  />

// 字段名映射，代表折线根据字段 field 变化大小，大小值默认由 theme 定义
<Line size={ field }  />

// array 形式，代表折线根据字段 field 变化大小，线条大小根据数据的先后依次为：2px 4px 6px
<Line size={ [field, [2, 4, 6]] }  />

// object 形式,
<Line size={{
  field,
  range: [2, 4, 6],
  // 也可通过回调的方式设置
  callback: (value) => { return 'gray' }
}}  />

// 指定类型
<Line size={{
  type: 'linear', // 分类为：category
  field,
  // 在映射时，大小会从 2 逐渐变化到 10
  range: [2, 10],
}}  />
```

### viewClip

只显示图表区域内（两轴之间）的，默认为 `false`。

### adjust: string

设置数据调整方式, F2 支持如下几种数据调整方式：

```jsx
<Line adjust={adjustType} />
```

#### stack

层叠，将同一个分类的数据值累加起来。以层叠的柱状图为例，x 轴方向的同一个分类下面的数据，按照顺序，将 y 轴对应的值累加，最终将数据调整的不再重叠。

#### dodge

分组散开，将同一个分类的数据进行分组在一个范围内均匀分布，例如分组柱状图。

#### symmetric

数据对称，使得生成的图形居中对齐，例如河流图、漏斗图。

### startOnZero: boolean

y 轴是否需要从 0 开始，默认为 `false`。

### animation

动画配置，F2 支持对动画进行 `appear`, `update`, `leave` 这 3 个阶段的动画配置。

```jsx
<Line
  animation={{
    appear: {
      easing: 'linear',
      duration: 300,
      delay: 0,
      property: ['fillOpacity'],
      start: {
        fillOpacity: 0,
      },
      end: {
        fillOpacity: 1,
      },
    },
    update: {
      easing: 'linear',
      duration: 450,
      delay: 0,
      property: ['x', 'y'],
    },
    leave: {
      easing: 'linear',
      duration: 450,
      delay: 0,
      property: ['fillOpacity'],
      start: {
        fillOpacity: 1,
      },
      end: {
        fillOpacity: 0,
      },
    },
  }}
/>
```

### connectNulls

是否连接空值， 默认为 `false`，不连接

## 方法

几何标记统一方法 详见：[几何标记](Line#方法)
