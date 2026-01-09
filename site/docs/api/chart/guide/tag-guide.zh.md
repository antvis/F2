---
title: 标签标注 - TagGuide
---

## Usage 用法

```jsx
import { Canvas, Chart, Interval, TagGuide } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" />
    <TagGuide
      records={[{ genre: 'Sports', sold: 350 }]}
      content="最高销量"
      direct="tr"
      background={{ fill: '#fff' }}
      textStyle={{ fill: '#000' }}
    />
  </Chart>
</Canvas>
```

## TypeScript 类型定义

```typescript
interface TagGuideProps {
  /** 标注位置的数据项或比例值 */
  records: RecordItem[];
  /** 文本内容 */
  content?: string;
  /** x 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetX?: number | string;
  /** y 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetY?: number | string;
  /** 箭头方向 */
  direct?: 'tl' | 'tc' | 'tr' | 'cl' | 'cr' | 'bl' | 'bc' | 'br';
  /** 箭头的边长 */
  side?: string | number;
  /** 是否自动调整方向避免超出画布 */
  autoAdjust?: boolean;
  /** 背景容器样式，支持 rect 组件属性 */
  background?: Partial<RectStyleProps>;
  /** 文本样式，支持 text 组件属性 */
  textStyle?: Partial<TextStyleProps>;
  /** 是否精确定位（用于分组柱状图），详见下方说明 */
  precise?: boolean;
  /** 是否显示标注 */
  visible?: boolean;
  /** 点击事件回调 */
  onClick?: (ev: Event) => void;
  /** 动画配置，详见 [动画文档](/tutorial/animation) */
  animation?: AnimationProps | ((points: Point[], chart: Chart) => AnimationProps);
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项或比例值，支持特殊值（见下方说明） |
| `content` | `string` | - | 文本内容 |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `direct` | `'tl' \| 'tc' \| 'tr' \| 'cl' \| 'cr' \| 'bl' \| 'bc' \| 'br'` | `'tl'` | 箭头方向（见下方说明） |
| `side` | `string \| number` | `'8px'` | 箭头的边长 |
| `autoAdjust` | `boolean` | `true` | 是否自动调整标签方向，避免超出画布 |
| `background` | `RectStyleProps` | - | 背景容器样式，支持 rect 组件属性（见下方说明） |
| `textStyle` | `TextStyleProps` | - | 文本样式，支持 text 组件属性 |
| `precise` | `boolean` | `false` | 是否精确定位，用于分组柱状图中精确定位到每个子柱子（见下方说明） |
| `visible` | `boolean` | `true` | 是否显示标注 |
| `onClick` | `Function` | - | 点击事件回调 |
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

## direct 方向说明

`direct` 属性控制标签相对于标注点的方向：

| 值 | 含义 | 图示 |
|----|------|------|
| `tl` | top-left，标签在左上方 | ↖ |
| `tc` | top-center，标签在上方居中 | ↑ |
| `tr` | top-right，标签在右上方 | ↗ |
| `cl` | center-left，标签在左侧居中 | ← |
| `cr` | center-right，标签在右侧居中 | → |
| `bl` | bottom-left，标签在左下方 | ↙ |
| `bc` | bottom-center，标签在下方居中 | ↓ |
| `br` | bottom-right，标签在右下方 | ↘ |

## background 属性

`background` 用于设置标签背景容器的样式，支持 rect 组件属性：

```jsx
background={{
  fill: '#fff',
  stroke: '#1677FF',
  strokeWidth: 2,
  radius: '8px',
  padding: ['8px', '12px'],
}}
```

支持的属性见 [Rect 属性文档](/tutorial/shape-attrs)。

## precise 精确定位模式

在**分组柱状图**中使用 `precise` 属性，可以让标注精确定位到每个子柱子的中心位置，而不是分组位置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Interval x="月份" y="销量" color="城市" adjust={{ type: 'dodge' }} />
    {data.map((item) => (
      <TagGuide
        records={[item]}
        precise
        content={`${item.销量}`}
        direct="tc"
      />
    ))}
  </Chart>
</Canvas>
```

**适用场景**：当使用 `adjust="dodge"` 分组调整时，设置 `precise={true}` 可确保标注准确对应每个子柱子。

## 默认样式

```javascript
{
  container: {
    fill: '#1677FF',
    radius: '4px',
    padding: ['4px', '8px'],
  },
  text: {
    fontSize: '22px',
    fill: '#fff',
  },
  arrow: {
    fill: '#1677FF',
  },
}
```

## 用法示例

### 基础用法

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" />
    <TagGuide
      records={[{ genre: 'Shooter', sold: 350 }]}
      content="最高销量"
      direct="tr"
    />
  </Chart>
</Canvas>;
```

### 自定义样式

```jsx
<TagGuide
  records={[{ genre: 'Shooter', sold: 350 }]}
  content="最高销量"
  direct="tl"
  background={{
    fill: '#fff',
    stroke: '#1677FF',
    strokeWidth: 2,
    radius: '8px',
    padding: ['8px', '12px'],
  }}
  textStyle={{
    fill: '#1677FF',
    fontSize: '24px',
    fontWeight: 'bold',
  }}
/>
```

### 不同方向标注

```jsx
{/* 右上方向 */}
<TagGuide records={[item]} content="右上" direct="tr" />
{/* 下方居中 */}
<TagGuide records={[item]} content="下方" direct="bc" />
{/* 左侧居中 */}
<TagGuide records={[item]} content="左侧" direct="cl" />
```

### 使用特殊值

```jsx
{/* 标注最大值 */}
<TagGuide
  records={[{ genre: 'Sports', sold: 'max' }]}
  content="最大值"
  direct="tc"
  background={{ fill: 'green' }}
/>
```

### 禁用自动调整

```jsx
<TagGuide
  records={[item]}
  content="固定方向"
  direct="tl"
  autoAdjust={false}
/>
```

### 自定义箭头大小

```jsx
<TagGuide
  records={[item]}
  content="大箭头"
  direct="tr"
  side="12px"
/>
```

### 多标签组合

使用多个 `map` 分别生成多个标签：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" />
    {data.map((item) => (
      <TagGuide
        records={[{ genre: item.genre, sold: 'max' }]}
        content="Max"
        direct="tc"
        background={{ fill: 'red' }}
      />
    ))}
    {data.map((item) => (
      <TagGuide
        records={[{ genre: item.genre, sold: 'min' }]}
        content="Min"
        direct="bc"
        background={{ fill: 'green' }}
      />
    ))}
  </Chart>
</Canvas>;
```

### 配合 offset 使用

```jsx
<TagGuide
  records={[item]}
  content="偏移标签"
  direct="tr"
  offsetX={20}
  offsetY={-30}
/>
```

### 使用动画

```jsx
<TagGuide
  records={[item]}
  content="标签"
  direct="tr"
  animation={{
    appear: {
      duration: 450,
      easing: 'linear',
    }
  }}
/>
```

更多动画配置详见 [动画文档](/tutorial/animation)。

### 分组柱状图精确定位

在分组柱状图中使用 `precise` 属性，让标注精确定位到每个子柱子：

```jsx
import { Canvas, Chart, Interval, TagGuide, Axis } from '@antv/f2';

const data = [
  { name: 'London', 月份: 'Jan.', 月均温度: 5.2 },
  { name: 'London', 月份: 'Feb.', 月均温度: 6.8 },
  { name: 'Beijing', 月份: 'Jan.', 月均温度: -3.9 },
  { name: 'Beijing', 月份: 'Feb.', 月均温度: 2.1 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Axis field="月份" />
    <Axis field="月均温度" min={-10} />
    <Interval x="月份" y="月均温度" color="name" adjust={{ type: 'dodge', marginRatio: 0.05 }} />
    {data.map((item) => (
      <TagGuide
        records={[item]}
        precise
        content={`${item['月均温度']}°C`}
        direct={item['月均温度'] >= 0 ? 'tc' : 'bc'}
        background={(points) => {
          const colorMap = { 'London': '#1677FF', 'Beijing': '#22C678' };
          return { fill: colorMap[item.name] };
        }}
        textStyle={{ fontSize: '20px', fill: '#fff' }}
      />
    ))}
  </Chart>
</Canvas>
```

**说明**：
- `min={-10}`：Y 轴底部预留空间，避免负数标签遮挡 X 轴刻度
- `direct` 根据数值正负动态调整：正数标签向上（`tc`），负数标签向下（`bc`）
- `background` 函数让标签背景色与对应柱子颜色一致

### 点击事件

```jsx
<TagGuide
  records={[item]}
  content="点击我"
  direct="tr"
  onClick={(e) => {
    console.log('标签被点击', e);
  }}
/>
```

### 根据条件控制显示

通过 `visible` 属性动态控制标签显示：

```jsx
{data.map((item) => (
  <TagGuide
    records={[item]}
    content={item.sold}
    direct="tc"
    visible={item.sold > 200}
  />
))}
```
