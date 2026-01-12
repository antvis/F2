---
title: 图例 - Legend
order: 7
---

图例组件用于展示图表中不同数据系列的标识，通过颜色、标记等元素帮助用户理解图表内容。F2 会根据图形属性映射（如 color、size）自动生成图例。

## 何时使用

- 需要展示图表中不同数据系列的标识
- 需要通过点击图例来过滤或高亮特定数据
- 需要自定义图例的位置、样式和布局

## TypeScript 类型定义

```typescript
interface LegendItem {
  /** 标记颜色 */
  color?: string;
  /** 名称 */
  name?: string;
  /** 值 */
  value?: string | number;
  /** 图例标记 */
  marker?: 'circle' | 'square' | 'line';
  [key: string]: any;
}

interface LegendProps {
  /** 图例的显示位置 */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /** 布局模式 */
  layoutMode?: 'uniform' | 'adaptive';
  /** 图例宽度（uniform 模式下生效） */
  width?: number | string;
  /** 图例高度 */
  height?: number | string;
  /** legend 和图表内容的间距 */
  margin?: number | string;
  /** 格式化图例每项的值显示 */
  itemFormatter?: (value: any, tickValue: any) => string;
  /** 图例项列表 */
  items?: LegendItem[];
  /** 图例样式 */
  style?: GroupStyleProps;
  /** 图例标记 */
  marker?: 'circle' | 'square' | 'line';
  /** 图例项样式 */
  itemStyle?: GroupStyleProps;
  /** 图例名称样式 */
  nameStyle?: Omit<TextStyleProps, 'text'>;
  /** 图例值样式 */
  valueStyle?: Omit<TextStyleProps, 'text'>;
  /** value 展示文案的前缀 */
  valuePrefix?: string;
  /** 是否可点击 */
  clickable?: boolean;
  /** 点击回调 */
  onClick?: (item: LegendItem) => void;
  /** 点击模式 */
  clickMode?: 'filter' | 'highlight';
}

interface GroupStyleProps {
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  alignSelf?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  flexWrap?: 'wrap' | 'nowrap';
  [key: string]: any;
}
```

## Usage

```jsx
import { Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Legend position="top" />
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

## Props

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | 图例的显示位置 |
| `layoutMode` | `'uniform' \| 'adaptive'` | `'uniform'` | 布局模式：uniform 为统一宽度，adaptive 为自适应宽度 |

### 尺寸配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number \| string` | - | 图例宽度（uniform 模式下生效） |
| `height` | `number \| string` | - | 图例高度 |
| `margin` | `number \| string` | `'30px'` | legend 和图表内容的间距 |

### 数据配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `items` | `LegendItem[]` | - | 自定义图例项列表 |
| `itemFormatter` | `(value, tickValue) => string` | - | 格式化图例每项的值显示。第一个参数为图例项的值，第二个参数为原始分类值。注意：`name` 会自动显示，itemFormatter 返回值会附加在 name 之后 |

### 样式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `marker` | `'circle' \| 'square' \| 'line'` | `'circle'` | 图例标记类型 |
| `style` | `GroupStyleProps` | - | 图例容器样式 |
| `itemStyle` | `GroupStyleProps` | - | 图例项样式 |
| `nameStyle` | `TextStyleProps` | - | 图例名称样式 |
| `valueStyle` | `TextStyleProps` | - | 图例值样式 |
| `valuePrefix` | `string` | `': '` | value 展示文案的前缀。最终渲染格式为 `${name}: ${value}` |

### 交互配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `clickable` | `boolean` | `true` | 是否可点击 |
| `onClick` | `(item: LegendItem) => void` | - | 点击回调 |
| `clickMode` | `'filter' \| 'highlight'` | `'filter'` | 点击模式：filter 为过滤模式，highlight 为高亮模式 |

## GroupStyleProps 属性

图例容器和图例项支持的样式属性：

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `flexDirection` | `'row' \| 'column'` | 主轴方向 |
| `justifyContent` | `'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around'` | 主轴对齐方式 |
| `alignItems` | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch'` | 交叉轴对齐方式 |
| `alignSelf` | `'flex-start' \| 'center' \| 'flex-end' \| 'stretch'` | 自身对齐方式 |
| `flexWrap` | `'wrap' \| 'nowrap'` | 是否换行 |

## 用法示例

### 基础用法

```jsx
<Legend />
```

### 自定义位置

```jsx
<Legend position="bottom" />
```

### 自定义标记类型

```jsx
<Legend marker="line" />
```

### 自定义样式

```jsx
<Legend
  style={{
    justifyContent: 'flex-start',
    flexDirection: 'column',
  }}
/>
```

### 自定义图例项样式

```jsx
<Legend
  itemStyle={{
    justifyContent: 'center',
  }}
/>
```

### 自定义文本样式

```jsx
<Legend
  nameStyle={{
    fontSize: '24px',
    fill: '#000',
  }}
  valueStyle={{
    fontSize: '20px',
    fill: '#666',
  }}
/>
```

### 使用 itemFormatter 格式化自动生成的图例

当不传 `items` 属性时，F2 会自动从图表的图形属性映射生成图例。此时可以使用 `itemFormatter` 对图例值进行格式化：

```jsx
// 数据（环形图示例）
const data = [
  { name: '股票类', percent: 83.59, a: '1' },
  { name: '债券类', percent: 2.17, a: '1' },
  { name: '现金类', percent: 14.24, a: '1' },
];

// 创建分类名到百分比的查找表
const nameToPercentMap = Object.fromEntries(
  data.map(({ name, percent }) => [name, percent])
);

<Chart
  data={data}
  coord={{
    type: 'polar',
    transposed: true,
  }}
>
  <Interval x="a" y="percent" adjust="stack" color="name" />
  <Legend
    position="bottom"
    itemFormatter={(value, tickValue) => {
      // value: undefined（自动生成的图例没有值）
      // tickValue: 分类名称，如 '股票类'、'债券类'
      // 返回值会显示在 name 之后，最终格式：股票类: 83.59%
      return nameToPercentMap[tickValue] + '%';
    }}
  />
</Chart>
```

> **注意**：name 会自动显示，itemFormatter 返回值会附加在 name 之后，默认渲染格式为 `${name}: ${value}`。因此 itemFormatter 只需返回值部分，无需包含 name。

### 自定义图例项

```jsx
<Legend
  items={[
    { name: 'Sports', value: 0.1, color: 'blue' },
    { name: 'Strategy', value: 0.2, color: 'red' },
    { name: 'Action', value: 0.3, color: 'green' },
  ]}
  itemFormatter={(value) => (value * 100).toFixed(2) + '%'}
/>
```

### 带值前缀的自定义图例

```jsx
<Legend
  items={[
    { name: '股票类', value: '83.59', color: '#FE5D4D' },
    { name: '债券类', value: '2.17', color: '#3BA4FF' },
    { name: '现金类', value: '14.24', color: '#737DDE' },
  ]}
  valuePrefix="占比："
  itemFormatter={(value) => value + '%'}
/>
```

### 点击事件

```jsx
<Legend
  onClick={(item) => {
    console.log(item) // => { field: 'genre', color: '#1890FF', name: 'Sports' }
  }}
/>
```

### 禁用点击

```jsx
<Legend clickable={false} />
```

### 高亮模式

```jsx
<Legend clickMode="highlight" />
```

### 自定义 items Marker

```jsx
<Legend
  items={[
    { color: 'blue', name: 'Sports', value: 0.1, marker: 'square' },
    { color: 'red', name: 'Strategy', value: 0.2 },
    { color: 'green', name: 'Action', value: 0.3 },
  ]}
/>
```

## 方法

### getOriginItems()

获取图表中原始分类数据。

```javascript
const legend = chartRef.current.getComponents().find(c => c.type === 'legend')
const items = legend.getOriginItems()
```

### getMaxItemBox(node)

获取 legendShape 包围盒。

### getItemBoxes(node)

获取所有图例项的包围盒。

### setItems(items)

设置图例项数据。
