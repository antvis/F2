---
title: 矩形树图 - Treemap
order: 7
---

Treemap 组件用于展示层级数据的可视化图表，通过矩形的大小和颜色来表示数据的数值和分类。它将数据按照层级结构进行分割，每个矩形代表一个数据项，矩形的面积与数据的数值成正比。

## 何时使用

- 需要展示具有层级结构的数据
- 需要通过面积大小比较数据值
- 文件系统目录结构展示
- 组织架构的可视化
- 分类数据的层级展示
- 预算分配和资源分布分析
- 股票市值分布展示

## TypeScript 类型定义

```typescript
interface ColorAttrObject {
  /** 用于颜色映射的字段名 */
  field: string;
  /** 颜色范围数组 */
  range?: string[] | number[];
  /** 自定义颜色映射函数 */
  callback?: (value) => string | number;
}

interface RecordNode<TRecord = DataRecord> {
  /** 节点唯一标识 */
  key: string | number | null | undefined;
  /** 节点颜色 */
  color: string;
  /** 原始数据 */
  origin: TRecord;
  /** 矩形边界 */
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
  /** 样式 */
  style: any;
}

interface TreemapProps {
  /** 数据源，必须是具有层级结构的数组 */
  data: Data;
  /** 用于确定矩形大小的数值字段名 */
  value: string;
  /** 坐标系配置 */
  coord?: CoordProps;
  /** 颜色映射配置 */
  color?: ColorAttrObject;
  /** 矩形之间的间距，默认为 0 */
  space?: number;
  /** 主题配置 */
  theme?: Record<string, any>;
  /** 节点数据 */
  nodes?: RecordNode[];
  /** 选择配置 */
  selection?: any;
  /** 是否显示标签，默认为 false */
  label?: boolean | TextStyleProps;
  /** 点击事件回调函数 */
  onClick?: (record: RecordNode) => void;
}
```

## Usage

```jsx
import { Canvas, Treemap } from '@antv/f2';

const data = [
  { name: '贵州茅台', value: 0.16, rate: 0.1 },
  { name: '五粮液', value: 0.13, rate: -0.1 },
  { name: '招商银行', value: 0.15, rate: 0 },
  { name: '中国平安', value: 0.07, rate: 0.1 },
  { name: '同花顺', value: 0.1, rate: 0 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Treemap
    data={data}
    color={{ field: 'name' }}
    value="value"
    space={4}
    label={true}
    onClick={(record) => {
      console.log('点击了:', record.origin);
    }}
  />
</Canvas>
```

## Props

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Array` | - | 数据源，必须是具有层级结构的数组 |
| `value` | `string` | - | 用于确定矩形大小的数值字段名 |
| `coord` | `CoordProps` | - | 坐标系配置 |

### 样式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `ColorAttrObject` | - | 颜色映射配置 |
| `space` | `number` | `0` | 矩形之间的间距 |
| `theme` | `Record<string, any>` | - | 主题配置 |
| `label` | `boolean \| TextStyleProps` | `false` | 是否显示标签 |

### 交互配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `selection` | `object` | - | 选择配置 |
| `onClick` | `(record: RecordNode) => void` | - | 点击事件回调函数 |

### ColorAttrObject

| 属性 | 类型 | 说明 |
|------|------|------|
| `field` | `string` | 用于颜色映射的字段名 |
| `range` | `string[] \| number[]` | 颜色范围数组 |
| `callback` | `(value) => string \| number` | 自定义颜色映射函数 |

### Selection 配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `triggerOn` | `string` | - | 触发选择的事件类型，如 'click' |
| `type` | `'single' \| 'multiple'` | `'single'` | 选择类型 |
| `cancelable` | `boolean` | `true` | 是否允许取消选择 |
| `defaultSelected` | `any[]` | - | 默认选中的数据项 |
| `selectedStyle` | `object \| Function` | - | 选中项的样式 |
| `unSelectedStyle` | `object \| Function` | - | 未选中项的样式 |

## 用法示例

### 基础矩形树图

最简单的矩形树图配置：

```jsx
const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
  { name: 'C', value: 15 },
  { name: 'D', value: 5 },
];

<Canvas context={context}>
  <Treemap data={data} value="value" color={{ field: 'name' }} />
</Canvas>
```

### 自定义间距和标签

设置矩形间距和显示标签：

```jsx
<Canvas context={context}>
  <Treemap
    data={data}
    value="value"
    color={{ field: 'name' }}
    space={4}
    label={true}
  />
</Canvas>
```

### 自定义标签样式

使用对象配置标签样式：

```jsx
<Canvas context={context}>
  <Treemap
    data={data}
    value="value"
    color={{ field: 'name' }}
    space={2}
    label={{
      fontSize: '24px',
      fill: '#fff',
      fontWeight: 'bold',
    }}
  />
</Canvas>
```

### 自定义颜色范围

使用自定义颜色范围：

```jsx
<Canvas context={context}>
  <Treemap
    data={data}
    value="value"
    color={{
      field: 'name',
      range: ['#1890ff', '#52c41a', '#faad14', '#f5222d'],
    }}
    space={4}
    label={true}
  />
</Canvas>
```

### 使用颜色回调函数

通过回调函数自定义颜色：

```jsx
<Canvas context={context}>
  <Treemap
    data={data}
    value="value"
    color={{
      field: 'name',
      callback: (value) => {
        if (value > 20) return '#f5222d';
        if (value > 10) return '#faad14';
        return '#52c41a';
      },
    }}
    space={4}
  />
</Canvas>
```

### 选择交互

配置点击选择功能：

```jsx
<Canvas context={context}>
  <Treemap
    data={data}
    value="value"
    color={{ field: 'name' }}
    space={4}
    label={true}
    selection={{
      triggerOn: 'click',
      selectedStyle: {
        fillOpacity: 1,
      },
      unSelectedStyle: {
        fillOpacity: 0.4,
      },
    }}
  />
</Canvas>
```

### 多选模式

启用多选功能：

```jsx
<Canvas context={context}>
  <Treemap
    data={data}
    value="value"
    color={{ field: 'name' }}
    space={4}
    label={true}
    selection={{
      triggerOn: 'click',
      type: 'multiple',
      cancelable: false,
      selectedStyle: {
        fillOpacity: 1,
        stroke: '#1890ff',
        lineWidth: '4px',
      },
      unSelectedStyle: {
        fillOpacity: 0.4,
      },
    }}
  />
</Canvas>
```

### 默认选中

设置默认选中的数据项：

```jsx
<Canvas context={context}>
  <Treemap
    data={data}
    value="value"
    color={{ field: 'name' }}
    space={4}
    selection={{
      defaultSelected: [data[0], data[1]],
      selectedStyle: {
        fillOpacity: 1,
      },
      unSelectedStyle: {
        fillOpacity: 0.4,
      },
    }}
  />
</Canvas>
```

### 点击事件

监听矩形点击事件：

```jsx
<Canvas context={context}>
  <Treemap
    data={data}
    value="value"
    color={{ field: 'name' }}
    space={4}
    onClick={(record) => {
      console.log('点击了矩形:', record.origin);
      console.log('矩形坐标:', {
        x: [record.xMin, record.xMax],
        y: [record.yMin, record.yMax],
      });
    }}
  />
</Canvas>
```

## 数据格式

数据格式为扁平数组，每个对象包含必要的字段：

```jsx
const data = [
  {
    name: '贵州茅台',  // 名称/分类字段
    value: 0.16,      // 数值字段（用于矩形面积）
    rate: 0.1,        // 其他自定义字段
  },
  {
    name: '五粮液',
    value: 0.13,
    rate: -0.1,
  },
  // ...更多数据
];
```

**注意事项**：
- `value` 字段必填，用于确定矩形大小
- `color.field` 指定的字段用于颜色分组

## 常见问题

### 矩形大小不对

检查 `value` 属性是否正确指定数值字段：

```jsx
// 错误：value 字段不存在
<Treemap data={data} value="price" />  // 数据中只有 value 字段

// 正确：使用正确的字段名
<Treemap data={data} value="value" />
```

### 颜色不区分

确保 `color.field` 指定的字段在数据中存在且有不同值：

```jsx
// 错误：字段不存在
<Treemap color={{ field: 'category' }} />  // 数据中只有 name 字段

// 正确：使用存在的字段
<Treemap color={{ field: 'name' }} />
```

### 标签不显示

确保 `label` 属性设置为 `true` 或样式对象：

```jsx
// 错误：label 为 false
<Treemap label={false} />

// 正确：显示标签
<Treemap label={true} />
// 或自定义样式
<Treemap label={{ fontSize: '24px', fill: '#fff' }} />
```

### 选择功能不生效

检查 `selection` 配置是否正确，特别是 `triggerOn` 属性：

```jsx
<Treemap
  selection={{
    triggerOn: 'click',  // 确保设置了触发事件
    selectedStyle: { fillOpacity: 1 },
    unSelectedStyle: { fillOpacity: 0.4 },
  }}
/>
```

### 间距设置无效

`space` 属性的值应该是数字，注意单位是像素：

```jsx
// 正确：数字类型
<Treemap space={4} />

// 错误：字符串类型（在某些版本可能不生效）
<Treemap space="4px" />
```

## 注意事项

1. **数据结构**：数据应为扁平数组，每个对象包含 value 字段
2. **value 字段必填**：value 属性指定的字段必须存在于数据中
3. **颜色映射**：color.field 指定的字段用于分组，不同值会分配不同颜色
4. **标签内容**：标签默认显示 origin.name 字段的内容
5. **交互优先级**：onClick 和 selection 可以同时使用，onClick 先触发
