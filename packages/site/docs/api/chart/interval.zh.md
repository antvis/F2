---
title: 区间 - Interval
order: 3
---

用于绘制柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图（玉缺图）、漏斗图等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>;
```

## Props

几何标记统一 Props 详见：[几何标记](geometry#props)

### selection

选中交互配置

#### type: string

设置单选/多选， 默认为 `single`（单选），可选值： `'single' | 'multiple'`

#### triggerOn: string

触发的事件，默认为 `click`，可选 `'click' | 'press'`

> 设置 press 时，需要把 cancelable 设置成 false, 否则会有明显的闪动

#### defaultSelected: Array

默认的选中项，可设置多个

```jsx
<Interval selection={{ defaultSelected: [{ genre: 'Sports', sold: 5 }] }} />
```

#### selectedStyle

选中的样式，可设置图形属性或者函数

```jsx
<Interval selection={{ selectedStyle: { fillOpacity: 1 } }} />
```

或者

```jsx
<Interval
  selection={{
    selectedStyle: (record) => {
      return { fillOpacity: 1 };
    },
  }}
/>
```

#### unSelectedStyle

非选中的样式，可设置图形属性或者函数， 同 selectedStyle

```jsx
<Interval selection={{ unSelectedStyle: { fillOpacity: 0.4 } }} />
```

或者

```jsx
<Interval
  selection={{
    unSelectedStyle: (record) => {
      return { fillOpacity: 0.4 };
    },
  }}
/>
```

#### cancelable: boolean

是否可取消，单选下表现为选择和反选，默认为 `true`

```jsx
<Interval selection={{ cancelable: false }} />
```

#### demo 示例

- [柱状图选中](/zh/examples/column/column#selection)
- [饼图选中](/zh/examples/pie/pie#selection)

### sizeRatio

大小比例，范围 `[0, 1]`, 比如柱状图默认为 `0.5`, 表示柱子和空白处各占 `50%`

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)
