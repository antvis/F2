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

## Props

### padding: number ｜ string

边距

### triggerOn: string

触发tooltip显示事件，默认为 press, 可以为 touchstart 等

### triggerOff: string

触发tooltip消失事件，默认为 pressend, 可以为 touchend 等

### alwaysShow: boolean

是否一直显示

### showCrosshairs: boolean

是否显示十字线
### crosshairsType: 'x' | 'y' | 'xy'

十字线类型

### crosshairsStyle: LineAttrs
> 类型为绘图属性：[线条属性](/zh/docs/tutorial/shape-attrs#线条属性) 

十字线样式

### nameStyle: TextAttrs
> 类型为绘图属性：[文本属性](/zh/docs/tutorial/shape-attrs#文本属性) 

名称样式

### valueStyle: TextAttrs
> 类型为绘图属性：[文本属性](/zh/docs/tutorial/shape-attrs#文本属性) 

值样式

### background: RectAttrs
> 类型为绘图属性：[通用属性](/zh/docs/tutorial/shape-attrs#通用属性)

背景样式

### showItemMarker: boolean

是否显示


## 方法

### show(point: {x: number, y: number})
在 x，y 处显示 tooltip 组件
### hide()
隐藏 tooltip 组件

