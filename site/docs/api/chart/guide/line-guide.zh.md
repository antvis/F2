---
title: 辅助线标注 - LineGuide
---

## Usage 用法

```jsx
import { Canvas, Chart, Line, LineGuide } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <LineGuide
        records={[
          { genre: item.genre, sold: 'min' },
          { genre: item.genre, sold: item.sold },
        ]}
        style={{ stroke: '#f00', lineWidth: 2 }}
      />
    ))}
  </Chart>
</Canvas>
```

## TypeScript 类型定义

```typescript
interface LineGuideProps {
  /** 标注位置的数据项或比例值（需要 2 个点来定义线） */
  records: RecordItem[];
  /** x 轴偏移量，支持数字、字符串或数组（为数组时可为两个端点分别设置不同偏移） */
  offsetX?: number | string | (number | string)[];
  /** y 轴偏移量，支持数字、字符串或数组（为数组时可为两个端点分别设置不同偏移） */
  offsetY?: number | string | (number | string)[];
  /** 线样式，支持对象或函数形式（函数接收 points 和 chart 参数）*/
  style?: Partial<LineStyleProps> | ((points: Point[], chart: Chart) => Partial<LineStyleProps>);
  /** 动画配置，详见 [动画文档](/tutorial/animation) */
  animation?: AnimationProps | ((points: Point[], chart: Chart) => AnimationProps);
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项或比例值，**需要 2 个点来定义线**，支持特殊值（见下方说明） |
| `offsetX` | `number \| string \| Array` | `0` | x 轴偏移量，支持数组形式为两个端点分别设置偏移 |
| `offsetY` | `number \| string \| Array` | `0` | y 轴偏移量，支持数组形式为两个端点分别设置偏移 |
| `style` | `LineStyleProps \| Function` | - | 线样式，支持对象或函数形式 |
| `animation` | `AnimationProps \| Function` | - | 动画配置，详见 [动画文档](/tutorial/animation) |

## records 特殊值

`records` 的值可以使用特殊字符串来表示位置，无需计算具体数值：

| 值 | 含义 | 对应位置 |
|----|------|----------|
| `'min'` | 最小值 | 0 |
| `'max'` | 最大值 | 1 |
| `'median'` | 中位值 | 0.5 |
| `'50%'` | 50% 位置 | 0.5 |
| `'100%'` | 100% 位置 | 1.0 |

**注意**：x 轴和 y 轴都支持这些特殊值。

## style 属性

`style` 支持两种形式：

**对象形式**：静态样式
```jsx
style={{ stroke: '#f00', lineWidth: 2, lineDash: [4, 4] }}
```

**函数形式**：函数接收 `points`（坐标数组）和 `chart`（图表实例）参数
```jsx
style={(points, chart) => ({
  stroke: '#f00',
  lineWidth: 2,
  lineDash: [4, 4],
})}
```

支持的样式属性见 [Shape 属性文档](/tutorial/shape-attrs)。

## 用法示例

### 水平参考线

使用 `min`/`max` 配合百分比位置，绘制横跨整个图表的水平参考线：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {/* 在 y 轴 50% 位置绘制水平参考线 */}
    <LineGuide
      records={[
        { genre: 'min', sold: '50%' },
        { genre: 'max', sold: '50%' },
      ]}
      style={{ stroke: '#999', lineWidth: 1, lineDash: [4, 4] }}
    />
  </Chart>
</Canvas>
```

### 从最小值画线到实际值

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <LineGuide
        records={[
          { genre: item.genre, sold: 'min' },
          { genre: item.genre, sold: item.sold },
        ]}
        style={{ stroke: 'rgba(0, 0, 0, 0.25)', lineWidth: '2px' }}
      />
    ))}
  </Chart>
</Canvas>
```

### 使用数组偏移

`offsetX` 和 `offsetY` 支持数组形式，可为两个端点分别设置不同的偏移量：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <LineGuide
        records={[
          { genre: item.genre, sold: 'min' },
          { genre: item.genre, sold: item.sold },
        ]}
        // 第一个点向下偏移 120px，第二个点不偏移
        offsetY={['120px', 0]}
        style={{ stroke: '#f00', lineWidth: 2 }}
      />
    ))}
  </Chart>
</Canvas>
```

### style 函数形式

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    <LineGuide
      records={[
        { genre: 'Sports', sold: 'min' },
        { genre: 'Sports', sold: 'max' },
      ]}
      style={(points, chart) => {
        // Canvas 坐标系中 y 轴向下，points[0].y > points[1].y 表示上升
        const isRising = points[0].y > points[1].y;
        return {
          stroke: isRising ? 'green' : 'red',
          lineWidth: 2,
        };
      }}
    />
  </Chart>
</Canvas>
```

### 虚线样式

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    <LineGuide
      records={[
        { genre: 'Sports', sold: 'min' },
        { genre: 'Sports', sold: 'max' },
      ]}
      style={{ stroke: '#999', lineWidth: 1, lineDash: [4, 4] }}
    />
  </Chart>
</Canvas>
```

### 多条辅助线组合

横线与竖线组合，标注平均值线与峰值点：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {/* 水平参考线：50% 位置 */}
    <LineGuide
      records={[
        { genre: 'min', sold: '50%' },
        { genre: 'max', sold: '50%' },
      ]}
      style={{ stroke: '#999', lineWidth: 1, lineDash: [4, 4] }}
    />
    {/* 竖线：标注最大值点 */}
    {data.filter((item) => item.sold > 300).map((item) => (
      <LineGuide
        records={[
          { genre: item.genre, sold: 'min' },
          { genre: item.genre, sold: item.sold },
        ]}
        style={{ stroke: '#f00', lineWidth: 2 }}
      />
    ))}
  </Chart>
</Canvas>
```

### 使用动画

线条从下往上生长的动效：

```jsx
<LineGuide
  records={[
    { genre: 'Sports', sold: 'min' },
    { genre: 'Sports', sold: 275 },
  ]}
  style={{ stroke: '#f00', lineWidth: 2 }}
  animation={(points, chart) => ({
    appear: {
      duration: 800,
      easing: 'easeOut',
      property: ['y2'],  // 支持端点坐标动画：x1, y1, x2, y2
      start: { y2: points[0].y },  // 从起点开始
      end: { y2: points[1].y },     // 生长到终点
    }
  })}
/>
```

更多动画配置详见 [动画文档](/tutorial/animation)。
