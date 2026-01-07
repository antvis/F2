---
title: 饼图标签 - PieLabel
type: 组件
order: 9
---

饼图标签组件用于在极坐标下（常见的饼图/环图场景）为扇区显示标签，支持两种布局：默认布局与蜘蛛网布局。文档示例统一采用 Interval + PieLabel 的写法（Interval 用于绘制扇区并映射颜色），以便与测试用例一致。

## 何时使用

- 需要在饼图/环图上显示数据标签（两行文本常见：名称 + 值）
- 需要自动避免标签重叠并提供清晰的视觉引导
- 需要响应标签的点击事件

## TypeScript 类型定义

```typescript
interface PieLabelProps {
  /** 标签布局类型 */
  type?: 'default' | 'spider';
  /** 标签线锚点偏移 */
  anchorOffset?: string | number;
  /** 标签线拐点偏移 */
  inflectionOffset?: string | number;
  /** 文本距离画布边缘的最小距离 */
  sidePadding?: string | number;
  /** 第一行标签配置 */
  label1?: LabelConfig | ((origin: any, record: any) => LabelConfig);
  /** 第二行标签配置 */
  label2?: LabelConfig | ((origin: any, record: any) => LabelConfig);
  /** 指定只显示的记录数组 */
  records?: any[];
  /** 触发事件类型 */
  triggerOn?: 'click' | 'press';
  /** 标签点击回调 */
  onClick?: (ev: { origin: any; [key: string]: any }) => void;
  /** 调整布局高度的阈值比例 */
  adjustRatio?: number;
  /** 调整布局时的偏移量 */
  adjustOffset?: string | number;
  /** 标签项高度 */
  height?: number;
  /** 第一行标签 Y 轴偏移 */
  label1OffsetY?: string | number;
  /** 第二行标签 Y 轴偏移 */
  label2OffsetY?: string | number;
  /** 是否显示锚点 */
  showAnchor?: boolean;
}

interface LabelConfig {
  /** 标签文本内容 */
  text: string;
  /** 文本颜色 */
  fill?: string;
  /** 字体大小 */
  fontSize?: number | string;
  /** 字体粗细 */
  fontWeight?: number | string;
  /** 文本对齐方式 */
  textAlign?: 'start' | 'center' | 'end';
  /** 文本基线对齐方式 */
  textBaseline?: 'top' | 'middle' | 'bottom';
}
```

## Usage

```jsx
import { Canvas, Chart, Interval, PieLabel } from '@antv/f2';

const data = [
  { amount: 20, memo: 'Study', const: 'const' },
  { amount: 10, memo: 'Eat', const: 'const' },
  { amount: 20, memo: 'Sports', const: 'const' },
  { amount: 10, memo: 'Other', const: 'const' },
];

<Canvas context={context}>
  <Chart
    data={data}
    coord={{
      type: 'polar',
      transposed: true,
      innerRadius: 0.3,
      radius: 0.5,
    }}
  >
    <Interval x="const" y="amount" adjust="stack" color="memo" />
    <PieLabel
      label1={(d) => ({ text: d.memo })}
      label2={(d) => ({ fill: '#000000', text: '$' + d.amount.toFixed(2) })}
    />
  </Chart>
</Canvas>
```

## Props

### 布局配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'default' \| 'spider'` | `'default'` | 标签布局类型 |
| `anchorOffset` | `string \| number` | `'10px'` | 标签线锚点偏移 |
| `inflectionOffset` | `string \| number` | `'30px'` | 标签线拐点偏移 |
| `sidePadding` | `string \| number` | `'15px'` | 文本距离画布边缘的最小距离 |
| `adjustRatio` | `number` | `1` | 调整布局高度的阈值比例 |
| `adjustOffset` | `string \| number` | `'30'` | 调整布局时的偏移量 |

### 标签配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label1` | `LabelConfig \| Function` | - | 第一行标签配置 |
| `label2` | `LabelConfig \| Function` | - | 第二行标签配置 |
| `height` | `number` | 自动计算 | 标签项高度 |
| `label1OffsetY` | `string \| number` | `'-4px'` | 第一行标签 Y 轴偏移 |
| `label2OffsetY` | `string \| number` | `'4px'` | 第二行标签 Y 轴偏移 |
| `showAnchor` | `boolean` | `true` | 是否显示锚点 |

### 数据配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `records` | `any[]` | - | 指定只显示的记录数组 |

### 交互配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `triggerOn` | `'click' \| 'press'` | `'click'` | 触发事件类型 |
| `onClick` | `(ev) => void` | - | 标签点击回调，回调参数包含 `origin` 字段（原始数据项） |

## 标签配置属性

标签配置对象（LabelConfig）支持以下字段：

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `text` | `string` | 标签文本内容 |
| `fill` | `string` | 文本颜色 |
| `fontSize` | `number \| string` | 字体大小 |
| `fontWeight` | `number \| string` | 字体粗细 |
| `textAlign` | `'start' \| 'center' \| 'end'` | 文本对齐方式 |
| `textBaseline` | `'top' \| 'middle' \| 'bottom'` | 文本基线对齐方式 |

## 默认样式值

> 来源：`packages/f2/src/components/pieLabel/withPieLabel.tsx:5-22`

```javascript
const DEFAULT_CONFIG = {
  anchorOffset: '10px',
  inflectionOffset: '30px',
  sidePadding: '15px',
  adjustOffset: '30',
  triggerOn: 'click',
  label1OffsetY: '-4px',
  label2OffsetY: '4px',
  type: 'default',
  adjustRatio: 1,
  showAnchor: true,
};
```

## 用法示例

### 基础用法

```jsx
<PieLabel
  label1={(d) => ({ text: d.memo })}
  label2={(d) => ({ fill: '#000000', text: '$' + d.amount.toFixed(2) })}
/>
```

### 点击事件

```jsx
<PieLabel
  label1={(d) => ({ text: d.memo })}
  label2={(d) => ({ fill: '#000000', text: '$' + d.amount.toFixed(2) })}
  onClick={(evt) => {
    // evt.origin 为原始数据项，例如 { amount: 10, memo: 'Eat', const: 'const' }
    console.log('点击标签，原始数据：', evt.origin);
  }}
/>
```

### 蜘蛛网布局

```jsx
<PieLabel
  type="spider"
  label1={(d) => ({ text: d.memo })}
  label2={(d) => ({ fill: '#000000', text: '$' + d.amount.toFixed(2) })}
/>
```

### 筛选显示标签

使用 `records` 属性指定只显示部分数据的标签：

```jsx
<PieLabel
  records={[
    { amount: 20, memo: 'Eat', const: 'const' },
    { amount: 10, memo: 'Language', const: 'const' },
  ]}
  label1={(d) => ({ text: d.memo })}
  label2={(d) => ({ fill: '#000000', text: '$' + d.amount.toFixed(2) })}
/>
```

### 仅显示单行标签

将 `label2` 设置为空字符串即可：

```jsx
<PieLabel
  type="spider"
  label1={(d) => ({
    text: `${d.memo} ${d.amount}%`,
    fill: '#333',
  })}
  label2=""
/>
```

### 自定义标签样式

```jsx
<PieLabel
  label1={(d) => ({
    text: d.memo,
    fill: '#1890FF',
    fontSize: '24px',
    fontWeight: 'bold',
  })}
  label2={(d) => ({
    text: '$' + d.amount.toFixed(2),
    fill: '#666',
    fontSize: '20px',
  })}
/>
```

### 自定义布局参数

```jsx
<PieLabel
  anchorOffset="15px"
  inflectionOffset="40px"
  sidePadding="20px"
  label1OffsetY="-6px"
  label2OffsetY="6px"
  label1={(d) => ({ text: d.memo })}
  label2={(d) => ({ text: '$' + d.amount.toFixed(2) })}
/>
```

## 象限布局说明

当某一侧（左右）显示标签超过最大数量时，PieLabel 会按优先级将部分象限的标签重新放置到对侧以避免重叠：

- 左侧超过最大显示个数时，第四象限可能显示在第一象限，或第三象限显示在第二象限
- 右侧超过最大显示个数时，第一象限可能显示在第四象限，或第二象限显示在第三象限

## 常见问题

### 标签显示不全或重叠

调整 `sidePadding`、`anchorOffset`、`inflectionOffset`，或使用 `type="spider"`；也可通过 `records` 筛选显示的标签。

### 标签位置不理想

检查 coord（极坐标）及 `radius`/`innerRadius` 是否给足空间，调整偏移量或布局类型。

### 点击事件不响应

检查 `triggerOn` 是否设置正确，确认没有遮挡元素，并确保回调绑定正确（回调接收事件对象，原始数据在 `event.origin` 中）。
