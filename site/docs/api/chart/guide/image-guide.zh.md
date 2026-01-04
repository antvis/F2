---
title: 图片标注 - ImageGuide
---

## Usage 用法

```jsx
import { Canvas, Chart, Line, ImageGuide } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 黄色星形图标
const starIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cG9seWdvbiBwb2ludHM9IjEyLDIgMTUsOSAyMiw5IDE3LDE0IDE5LDIxIDEyLDE3IDUsMjEgNywxNCAyLDkgOSw5IiBmaWxsPSIjZmFhZDE0Ii8+Cjwvc3ZnPg==';

<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    <ImageGuide
      records={[data[3]]}
      src={starIcon}
      style={{ width: 36, height: 36 }}
    />
  </Chart>
</Canvas>
```

## TypeScript 类型定义

```typescript
interface ImageGuideProps {
  /** 标注位置的数据项，支持 1 个数据项或特殊值（如 'min', 'max', '50%'） */
  records: RecordItem[];
  /** 图片地址 */
  src: string;
  /** 图片属性，会覆盖 style 中的同名属性 */
  attrs?: ImageStyleProps;
  /** 图片样式，支持对象或函数形式 */
  style?: Partial<ImageStyleProps> | ((points: Point[], chart: Chart) => Partial<ImageStyleProps>);
  /** x 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetX?: number | string;
  /** y 轴偏移量，支持数字或带单位的字符串（如 '10px'）*/
  offsetY?: number | string;
  /** 点击事件回调 */
  onClick?: (event: { points: Point[] }) => void;
  /** 动画配置，详见 [动画文档](/tutorial/animation) */
  animation?: AnimationProps | ((points: Point[], chart: Chart) => AnimationProps);
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `Array<RecordItem>` | - | 标注位置的数据项，支持特殊值（见下方说明） |
| `src` | `string` | - | 图片地址 |
| `attrs` | `ImageStyleProps` | - | 图片属性，会覆盖 `style` 中的同名属性 |
| `style` | `ImageStyleProps \| Function` | - | 图片样式，支持对象或函数形式 |
| `offsetX` | `number \| string` | `0` | x 轴偏移量 |
| `offsetY` | `number \| string` | `0` | y 轴偏移量 |
| `onClick` | `Function` | - | 点击事件回调，参数为 `{ points: Point[] }` |
| `animation` | `AnimationProps \| Function` | - | 动画配置，详见 [动画文档](/tutorial/animation) |

**注意**：图片以**中心点**定位，偏移量是相对于中心点的偏移。

## attrs vs style

`style` 是设置图片样式的**主要方式**。`attrs` 属性也可设置样式，但会与 `style` 合并，同名属性以 `style` 为准：

```typescript
// 合并顺序
{ ...attrs, ...style }  // style 覆盖 attrs
```

**建议**：优先使用 `style`，`attrs` 仅在需要提供默认值时使用。

## records 特殊值

`records` 的值可以使用特殊字符串来表示位置，无需计算具体数值：

| 值 | 含义 | 对应位置 |
|----|------|----------|
| `'min'` | 最小值 | 0 |
| `'max'` | 最大值 | 1 |
| `'median'` | 中位值 | 0.5 |
| `'50%'` | 50% 位置 | 0.5 |
| `'100%'` | 100% 位置 | 1.0 |

## style 属性

`style` 支持两种形式：

**对象形式**：静态样式
```jsx
style={{ width: 24, height: 24 }}
```

**函数形式**：动态样式，接收 `points` 和 `chart` 参数
```jsx
style={(points, chart) => ({
  width: points[0].y > 0.5 ? 30 : 20,
  height: points[0].y > 0.5 ? 30 : 20,
})}
```

支持的样式属性见 [Shape 属性文档](/tutorial/shape-attrs)。

## 用法示例

### 基础用法

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {data.map((item) => (
      <ImageGuide
        records={[item]}
        src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"
        style={{ width: 24, height: 24 }}
      />
    ))}
  </Chart>
</Canvas>
```

### 使用偏移量

```jsx
<ImageGuide
  records={[{ genre: 'Sports', sold: 275 }]}
  src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"
  style={{ width: 24, height: 24 }}
  offsetY="-8px"
/>
```

### 使用特殊值定位

```jsx
// 红色奖杯图标（最高值）
const trophyIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNiA4aDN2NGMwIDIuMiAxLjggNCA0IDRoNmMyLjIgMCA0LTEuOCA0LTR2LTRoM3Y0YzMuOSAwIDctMy4xIDctN2gtMnYybDQgM3YyLTQtMnYybDQtM3YtMmgtMWMtMy45IDAtNy0zLjEtNy03di00em01LTJoMTB2MkgxMVY2eiIgZmlsbD0iI2ZmNGQ0ZiIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMyIgcj0iMiIgZmlsbD0iI2ZmNGQ0ZiIvPjwvc3ZnPg==';
// 绿色向下箭头（最低值）
const arrowDownIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMTZsLTYtNmg0VjRoNHY2aDRsLTYgNnoiIGZpbGw9IiM1MmM0MWEiLz48L3N2Zz4=';

<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" />
    {/* 标记全局最高销量（Shooter, 350） */}
    <ImageGuide
      records={[{ genre: 'Shooter', sold: 'max' }]}
      src={trophyIcon}
      style={{ width: 32, height: 32 }}
    />
    {/* 标记全局最低销量（Strategy, 115） */}
    <ImageGuide
      records={[{ genre: 'Strategy', sold: 'min' }]}
      src={arrowDownIcon}
      style={{ width: 32, height: 32 }}
    />
  </Chart>
</Canvas>
```

### style 函数形式

```jsx
<ImageGuide
  records={[{ genre: 'Sports', sold: 275 }]}
  src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"
  style={(points) => ({
    width: points[0].y > 0.5 ? 32 : 24,
    height: points[0].y > 0.5 ? 32 : 24,
  })}
/>
```

### 使用 onClick 事件

```jsx
<ImageGuide
  records={[{ genre: 'Sports', sold: 275 }]}
  src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"
  style={{ width: 24, height: 24 }}
  onClick={(ev) => {
    console.log('点击位置:', ev.points);
  }}
/>
```

### 多图片标注组合

```jsx
// 绿色小圆点
const dotIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI2IiBjeT0iNiIgcj0iNSIgZmlsbD0iIzUyYzQxYSIvPjwvc3ZnPg==';
// 黄色星形图标
const starIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cG9seWdvbiBwb2ludHM9IjE2LDIgMjAsMTIgMzAsMTIgMjIsMTggMjUsMjggMTYsMjIgNywyOCAxMCwxOCAyLDEyIDEyLDEyIiBmaWxsPSIjZmFhZDE0Ii8+PC9zdmc+';

<Canvas context={context}>
  <Chart data={data}>
    <Line x="genre" y="sold" color="type" />
    {/* 在数据点上显示小圆点 */}
    {data.map((item) => (
      <ImageGuide
        records={[item]}
        src={dotIcon}
        style={{ width: 12, height: 12 }}
      />
    ))}
    {/* 在每个类别的最大值位置显示星形图标 */}
    {data.map((item) => (
      <ImageGuide
        records={[{ genre: item.genre, sold: 'max' }]}
        src={starIcon}
        style={{ width: 32, height: 32 }}
        offsetY="-10px"
      />
    ))}
  </Chart>
</Canvas>
```

### 使用动画

```jsx
<ImageGuide
  records={[{ genre: 'Sports', sold: 275 }]}
  src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"
  style={{ width: 24, height: 24 }}
  animation={{
    appear: {
      property: ['opacity'],
      duration: 1000,
      easing: 'easeOut',
      start: {
        opacity: 0,
      },
      end: {
        opacity: 1,
      },
    }
  }}
/>
```

更多动画配置详见 [动画文档](/tutorial/animation)。
