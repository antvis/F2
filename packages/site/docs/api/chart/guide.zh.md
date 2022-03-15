---
title: 标注 - Guide
order: 9
---

提示和标注， 主要用于在图表上标识额外的标记注解

## Usage

```jsx
import { Canvas, Chart, Interval, TextGuide } from '@antv/f2';
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
    <Interval x="genre" y="sold" />
    {data.map((item) => {
      const { sold } = item;
      return (
        <TextGuide
          records={[item]}
          content={`${sold}`}
          attrs={{
            fill: '#000',
            fontSize: '24px',
          }}
          offsetY={-20}
          offsetX={-15}
        />
      );
    })}
  </Chart>
</Canvas>;
```

## Props

### records: Array

#### 数据项

可传入具体数据项，表示在改数据位置标注内容

```jsx
<Guide records={[{ genre: 'Sports', sold: 5 }]}>
```

#### 比例值

可传入比例值，可选值: `'min' | 'median' | 'max' | '0%' | '50%' | '100'`

```jsx
// 表示在 genre 的最小值，sold 的最大值位置标注内容
<Guide records={[{ genre: 'min', sold: 'max' }]}>
```

### style

标注样式

## PointGuide

标注点

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

## TextGuide

文本标注

### content: string

文本内容

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

## ImageGuide

图片标注

### src: string

图片地址

### attrs

图片属性 更多详见：[绘图属性 - ShapeAttrs](/zh/docs/tutorial/shape-attrs)

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

## LineGuide

辅助线标注

### offsetX: number

x 轴偏移量

### offsetY: number

y 轴偏移量

## demo 示例

- [文本标注](/zh/examples/component/guide#text)
- [点标注](/zh/examples/component/guide#point)
- [图片标注](/zh/examples/component/guide#image)
- [辅助线](/zh/examples/component/guide#line)
- [自定义标注内容](/zh/examples/component/guide#custom)
