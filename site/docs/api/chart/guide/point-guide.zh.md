---
title: 点标注 - PointGuide
---

## Usage 用法

```jsx
import { Canvas, Chart, Line, PointGuide } from '@antv/f2';

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
      <PointGuide
        records={[item]}
        offsetX={0}
        offsetY={0}
        style={{ fill: '#f00' }}
      />
    ))}
  </Chart>
</Canvas>
```

## TypeScript 类型定义

```typescript
interface PointGuideProps {
  /** 标注位置的数据项或比例值 */
  records: RecordItem[];
  /** x 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetX?: number | string;
  /** y 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetY?: number | string;
  /** 圆形样式，支持对象或函数形式 */
  style?: Partial<CircleStyleProps> | ((points: Point[], chart: Chart) => Partial<CircleStyleProps>);
  /** 动画配置，详见 [动画文档](/tutorial/animation) */
  animation?: AnimationProps | ((points: Point[], chart: Chart) => AnimationProps);
  /** 点击事件回调 */
  onClick?: (ev: Event) => void;
  /** 是否显示，默认 true */
  visible?: boolean;
  /** 是否精确定位（用于分组柱状图中精确定位到每个子柱子） */
  precise?: boolean;
}

/** 画布坐标点 */
interface Point {
  x: number;
  y: number;
}

/** 数据记录 */
type RecordItem = Record<string, string | number>;
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项或比例值，支持特殊值（见下方说明） |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `style` | `CircleStyleProps \| Function` | 见下方 | 圆形样式，支持对象或函数形式 |
| `animation` | `AnimationProps \| Function` | - | 动画配置，详见 [动画文档](/tutorial/animation) |
| `onClick` | `(ev: Event) => void` | - | 点击事件回调 |
| `visible` | `boolean` | `true` | 是否显示标注 |
| `precise` | `boolean` | - | 是否精确定位（用于分组柱状图中精确定位到每个子柱子） |

### 默认样式值

```typescript
{
  fill: '#fff',
  r: 3,
  lineWidth: 2,
  stroke: '#1890ff',
}
```

## records 特殊值

`records` 的值可以使用特殊字符串来表示位置，无需计算具体数值：

| 值 | 含义 | 对应位置 |
|----|------|----------|
| `'min'` | 最小值 | 0 |
| `'max'` | 最大值 | 1 |
| `'median'` | 中位值 | 0.5 |
| `'0%'` | 0% 位置 | 0.0 |
| `'50%'` | 50% 位置 | 0.5 |
| `'100%'` | 100% 位置 | 1.0 |

示例：标注每个 x 轴位置的 y 轴最小值
```jsx
{data.map((item) => (
  <PointGuide
    records={[{ genre: item.genre, sold: 'min' }]}
    style={{ stroke: '#262626' }}
  />
))}
```

## style 属性

`style` 支持两种形式：

**对象形式**：静态样式
```jsx
style={{ fill: '#f00', stroke: '#000', lineWidth: 2 }}
```

**函数形式**：动态样式，根据位置或数据计算样式
```jsx
style={(points, chart) => ({
  fill: points[0].y > 0.5 ? '#f00' : '#00f'
})}
```

函数接收两个参数：
- `points`: `Point[]` - 转换后的画布坐标点数组
- `chart`: `Chart` - 图表实例，可获取图表布局信息等

支持的样式属性见 [Shape 属性文档](/tutorial/shape-attrs)。

## 用法示例

### 使用特殊值标注

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <PointGuide
        records={[{ genre: item.genre, sold: 'min' }]}
        style={{ stroke: '#262626' }}
      />
    ))}
    {data.map((item) => (
      <PointGuide
        records={[{ genre: item.genre, sold: 'max' }]}
        style={{ stroke: '#82DC95' }}
      />
    ))}
  </Chart>
</Canvas>
```

### 标注百分比位置

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <PointGuide
        records={[{ genre: item.genre, sold: '100%' }]}
        style={{ stroke: 'blue' }}
      />
    ))}
    {data.map((item) => (
      <PointGuide
        records={[{ genre: item.genre, sold: '50%' }]}
        style={{ stroke: 'red' }}
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
    {data.map((item) => (
      <PointGuide
        records={[item]}
        style={(points, chart) => {
          const y = points[0].y;
          const { top, bottom } = chart.layout;
          const normalizedY = (y - bottom) / (top - bottom);
          return {
            fill: normalizedY > 0.7 ? 'red' : 'gray',
            r: normalizedY > 0.7 ? 6 : 4,
          };
        }}
      />
    ))}
  </Chart>
</Canvas>
```

### 多标注组合

使用多个 `map` 分别生成多个标注：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <PointGuide
        records={[{ genre: item.genre, sold: 'min' }]}
        style={{ stroke: '#262626' }}
      />
    ))}
    {data.map((item) => (
      <PointGuide
        records={[{ genre: item.genre, sold: 'median' }]}
        style={{ stroke: '#FF6797' }}
      />
    ))}
    {data.map((item) => (
      <PointGuide
        records={[{ genre: item.genre, sold: 'max' }]}
        style={{ stroke: '#82DC95' }}
      />
    ))}
  </Chart>
</Canvas>
```

### 使用动画

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <PointGuide
        records={[item]}
        style={{ fill: 'red', r: 6 }}
        animation={{
          appear: {
            duration: 450,
          }
        }}
      />
    ))}
  </Chart>
</Canvas>
```

更多动画配置详见 [动画文档](/tutorial/animation)。
