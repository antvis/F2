---
title: 提示 - tooltip
order: 8
---

## Usage

```jsx
import { Canvas, Chart, Line, Tooltip } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Tooltip>
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## 组成

![](https://mdn.alipayobjects.com/huamei_khb4xj/afts/img/A*CdXbTJnr2v4AAAAAAAAAAAAADq2NAQ/original)

## Props

### padding: number ｜ string

边距

### triggerOn: 'click' | 'press'

触发 tooltip 显示事件，默认为 press

### triggerOff: 'pressend'

触发 tooltip 消失事件，默认为 pressend

### alwaysShow: boolean

是否一直显示

### showCrosshairs: boolean

是否显示十字线

### crosshairsType: 'x' | 'y' | 'xy'

十字线类型

### crosshairsStyle: LineAttrs

> 类型为绘图属性：[线条属性](/tutorial/shape-attrs#线条属性)

十字线样式

### nameStyle: TextAttrs

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性)

主体名称样式

### valueStyle: TextAttrs

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性)

主体值样式

### background: RectAttrs

> 类型为绘图属性：[通用属性](/tutorial/shape-attrs#通用属性)

主体背景样式

### xTip： string ｜ function

xTip 中显示的 text 定义

### xTipTextStyle：TextAttrs

> 类型为绘图属性：[文本属性](/tutorial/shape-attrs#文本属性)

xTip 中字体样式

### xTipBackground：RectAttrs

> 类型为绘图属性：[通用属性](/tutorial/shape-attrs#通用属性)

xTip 中背景样式

### showItemMarker: boolean

是否显示

### onChange：function

tooltip 选中数据发生改变时的回调函数

## 方法

可通过获取 ref 调用

### show(point: {x: number, y: number})

在 x，y 处显示 tooltip 组件

### hide()

隐藏 tooltip 组件
