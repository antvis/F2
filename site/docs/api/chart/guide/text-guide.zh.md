---
title: 文本标注 - TextGuide
---

## Usage 用法

```jsx
import { Canvas, Chart, Interval, TextGuide } from '@antv/f2';

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
    {data.map((item) => (
      <TextGuide
        records={[item]}
        content={`${item.sold}`}
        style={{ fill: '#000', fontSize: '24px', textAlign: 'center', textBaseline: 'bottom' }}
      />
    ))}
  </Chart>
</Canvas>
```

## TypeScript 类型定义

```typescript
interface TextGuideProps {
  /** 标注位置的数据项或比例值 */
  records: RecordItem[];
  /** 文本内容 */
  content: string | number;
  /** x 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetX?: number | string;
  /** y 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetY?: number | string;
  /** 文本样式，支持对象或函数形式（函数接收 points 和 chart 参数）*/
  style?: Partial<TextStyleProps> | ((points: Point[], chart: Chart) => Partial<TextStyleProps>);
  /** 动画配置，详见 [动画文档](/tutorial/animation) */
  animation?: AnimationProps | ((points: Point[], chart: Chart) => AnimationProps);
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项或比例值，支持特殊值（见下方说明） |
| `content` | `string \| number` | - | 文本内容 |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `style` | `TextStyleProps \| Function` | - | 文本样式，支持对象或函数形式 |
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

**示例**：

```jsx
// 在每个 x 轴位置标注 y 轴最小值
{data.map((item) => (
  <TextGuide records={[{ genre: item.genre, sold: 'min' }]} content="Min" />
))}

// 标注 y 轴 50% 位置
{data.map((item) => (
  <TextGuide records={[{ genre: item.genre, sold: '50%' }]} content="50%" />
))}
```

## style 属性

`style` 支持两种形式：

**对象形式**：静态样式
```jsx
style={{ fill: '#000', fontSize: '24px', textAlign: 'center' }}
```

**函数形式**：动态样式，根据位置或数据计算样式
```jsx
style={(points) => ({
  fill: points[0].y > 100 ? '#f00' : '#00f'
})}
```

### 位置与对齐

`textAlign` 和 `textBaseline` 是控制文本相对于标注基准点（`points[0]`）对齐位置的关键属性：

- `textAlign` - 控制文本相对于基准点 X 坐标的对齐方式
- `textBaseline` - 控制文本相对于基准点 Y 坐标的对齐方式

例如 `textAlign: 'center'` + `textBaseline: 'bottom'` 表示文本中心线与基准点 X 坐标齐平、文本底线与基准点 Y 坐标齐平，即文本位于基准点**上方**。

#### 文本对齐（textAlign）

`textAlign` 控制文本的哪条垂直参考线（左边缘、中心线、右边缘）与基准点 X 坐标对齐：

| 值 | 说明 |
|----|------|
| `'start'` | 文本起始位置与基准点 X 坐标齐平（**默认**，从左到右时等于 left） |
| `'center'` | 文本中心线与基准点 X 坐标齐平 |
| `'end'` | 文本结束位置与基准点 X 坐标齐平（从左到右时等于 right） |
| `'left'` | 文本左边缘与基准点 X 坐标齐平 |
| `'right'` | 文本右边缘与基准点 X 坐标齐平 |

#### 文本基线对齐（textBaseline）

`textBaseline` 控制文本的哪条水平参考线（顶线、中线、底线、字母基线）与基准点 Y 坐标对齐：

| 值 | 说明 |
|----|------|
| `'top'` | 文本顶线与基准点 Y 坐标齐平 |
| `'middle'` | 文本中线与基准点 Y 坐标齐平（**默认**） |
| `'bottom'` | 文本底线与基准点 Y 坐标齐平 |
| `'alphabetic'` | 字母基线与基准点 Y 坐标齐平 |
| `'hanging'` | 悬挂基线与基准点 Y 坐标齐平 |

**典型组合示例**：

```jsx
// 文本位于数据点上方（底部紧贴）
<TextGuide
  records={[item]}
  content={item.sold}
  style={{ textAlign: 'center', textBaseline: 'bottom' }}
/>

// 文本中心与数据点重合
<TextGuide
  records={[item]}
  content={item.sold}
  style={{ textAlign: 'center', textBaseline: 'middle' }}
/>

// 文本位于数据点下方（顶部紧贴）
<TextGuide
  records={[item]}
  content={item.sold}
  style={{ textAlign: 'center', textBaseline: 'top' }}
/>
```

支持的样式属性见 [Shape 属性文档](/tutorial/shape-attrs)。

## 用法示例

### 折线图数据点标注

在折线图中，`records={[item]}` 的基准点 `points[0]` 就是折线图上该数据点的位置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <TextGuide
        records={[item]}
        content={item.sold}
        style={{
          fill: '#000',
          fontSize: '24px',
          textAlign: 'center',
          textBaseline: 'bottom',
        }}
      />
    ))}
  </Chart>
</Canvas>
```

### 使用特殊值标注

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" />
    {data.map((item) => (
      <TextGuide
        records={[{ genre: item.genre, sold: 'min' }]}
        content="最小值"
        style={{ fill: 'red', fontSize: '20px', textAlign: 'center' }}
      />
    ))}
  </Chart>
</Canvas>
```

### 使用偏移量

```jsx
<TextGuide
  records={[item]}
  content={item.sold}
  offsetX={10}
  offsetY="-10px"
  style={{ textAlign: 'center', textBaseline: 'bottom' }}
/>
```

### style 函数形式

函数接收 `points`（坐标数组）和 `chart`（图表实例）参数：

```jsx
<TextGuide
  records={[item]}
  content={item.sold}
  style={(points, chart) => ({
    fill: item.sold > 200 ? 'red' : 'black',
    fontSize: item.sold > 200 ? '28px' : '20px',
    textAlign: 'center',
  })}
/>
```

### 多标注组合

使用多个 `map` 分别生成多个标注：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" />
    {data.map((item) => (
      <TextGuide
        records={[{ genre: item.genre, sold: 'min' }]}
        content="Min"
        style={{ fill: 'green', textAlign: 'center' }}
      />
    ))}
    {data.map((item) => (
      <TextGuide
        records={[{ genre: item.genre, sold: 'max' }]}
        content="Max"
        style={{ fill: 'red', textAlign: 'center' }}
      />
    ))}
  </Chart>
</Canvas>
```

### 使用动画

```jsx
<TextGuide
  records={[item]}
  content={item.sold}
  animation={{
    appear: {
      duration: 600,
      easing: 'ease-in',
      property: ['opacity'],
      start: { opacity: 0 },
      end: { opacity: 1 },
    }
  }}
/>
```

更多动画配置详见 [动画文档](/tutorial/animation)。
