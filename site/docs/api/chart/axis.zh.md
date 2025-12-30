---
title: 坐标轴 - Axis
order: 6
---

坐标轴配置。F2 的坐标轴的组成如下：![](https://gw.alipayobjects.com/zos/rmsportal/YhhBplZmzxzwvUBeEvPE.png#width=500)

| **术语**     | **英文** | **对应属性** |
| ------------ | -------- | ------------ |
| 坐标轴文本   | label    | `style.label` |
| 坐标轴线     | line     | `style.line` |
| 坐标轴刻度线 | tickLine | `style.tickLine` |
| 坐标轴网格线 | grid     | `style.grid` |

## TypeScript 类型定义

```typescript
interface AxisProps {
  visible?: boolean;
  field: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  formatter?: (value: any) => string | number;
  type?: 'identity' | 'linear' | 'cat' | 'timeCat';
  tickCount?: number;
  range?: [number, number];
  mask?: string;
  min?: number;
  max?: number;
  nice?: boolean;
  ticks?: Array<string | number>;
  style?: StyleProps;
  grid?: 'arc' | 'line';
  labelAutoRotate?: boolean;
  labelAutoHide?: boolean;
  safetyDistance?: number | string;
}

interface StyleProps {
  label?: TextStyleProps | LabelCallback;
  line?: LineStyleProps;
  tickLine?: TickLineProps;
  grid?: LineStyleProps | GridCallback;
  labelOffset?: number | string;
  symbol?: MarkerStyleProps | MarkerStyleProps[];
  width?: number | string;
  height?: number | string;
}

interface Tick {
  /** 归一化值 (0-1) */
  value: number;
  /** 显示文本 */
  text: string;
  /** 原始值 */
  tickValue: string | number;
}

interface TickLineProps {
  length?: number;
  stroke?: string;
  lineWidth?: number | string;
  lineDash?: Array<string | number>;
}

interface MarkerStyleProps {
  /** 标记类型 */
  symbol?: 'circle' | 'square' | 'arrow';
  /** 标记半径 */
  radius?: string | number;
}
```

## Usage

```jsx
import { Canvas, Chart, Interval, Axis } from '@antv/f2';

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
    <Axis field="sold" />
    <Interval x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

部分属性可参考 scale 图表度量，度量详细介绍可见：[度量](/tutorial/scale.zh.md)

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `field` | `string` | - | 坐标轴的数据字段（必填） |
| `visible` | `boolean` | `true` | 是否显示该坐标轴 |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | 自动判断 | 坐标轴显示位置 |

### 度量配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `'identity' \| 'linear' \| 'cat' \| 'timeCat'` | - | 度量类型 |
| `tickCount` | `number` | - | 坐标轴刻度点个数 |
| `range` | `[number, number]` | - | 输出范围 [min, max]，值域 0-1 |
| `mask` | `string` | - | 时间格式化 mask |
| `min` | `number` | - | 数值范围最小值 |
| `max` | `number` | - | 数值范围最大值 |
| `nice` | `boolean` | `true` | 优化数值范围使刻度均匀分布 |
| `ticks` | `Array<string \| number>` | - | 自定义刻度值 |
| `formatter` | `(value: any) => string \| number` | - | 格式化刻度点文本 |

### 标签自动处理

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `labelAutoRotate` | `boolean` | `false` | 自动旋转标签以防止重叠 |
| `labelAutoHide` | `boolean` | `false` | 自动隐藏重叠标签 |
| `safetyDistance` | `number \| string` | `2` | 重叠检测安全边距 |

### 样式配置（style）

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `style.label` | `TextStyleProps \| LabelCallback` | `#808080, 20px` | 标签样式 |
| `style.line` | `LineStyleProps` | `#E8E8E8, 1px` | 坐标轴线样式 |
| `style.tickLine` | `TickLineProps` | `#E8E8E8` | 刻度线样式 |
| `style.grid` | `LineStyleProps \| GridCallback` | `#E8E8E8, 1px` | 网格线样式（默认虚线） |
| `style.labelOffset` | `number \| string` | `'15px'` | 标签偏移距离 |
| `style.symbol` | `MarkerStyleProps \| MarkerStyleProps[]` | - | 轴箭头/圆点标记 |
| `style.width` | `number \| string` | - | 组件宽度 |
| `style.height` | `number \| string` | - | 组件高度 |

### 极坐标配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `grid` | `'arc' \| 'line'` | - | 极坐标网格线类型 |

## 默认样式值

> 来源：[packages/f2/src/theme.ts](https://github.com/antvis/F2/blob/master/packages/f2/src/theme.ts)

```javascript
const defaultStyle = {
  labelOffset: '15px',
  line: { stroke: '#E8E8E8', lineWidth: '1px' },
  symbol: { fill: '#E8E8E8', radius: '10px' },
  tickLine: { stroke: '#E8E8E8' },
  label: { fill: '#808080', fontSize: '20px' },
  grid: { stroke: '#E8E8E8', lineWidth: '1px', lineDash: ['4px'] },
};
```

## 用法示例

### 格式化刻度值

```jsx
<Axis
  field="sold"
  formatter={(value) => value.toFixed(2) + '%'}
/>
```

### 自定义标签样式（函数形式）

```jsx
<Axis
  field="value"
  formatter={(v) => v.toFixed(2) + '%'}
  style={{
    label: (text, index, ticks) => {
      // text: formatter 处理后的文本，如 "-0.48%"
      // ticks: 所有刻度数组，ticks[index].tickValue 是原始值
      const number = parseFloat(text);
      if (number > 0) {
        return { text: '+' + text, fill: '#F5222D' };
      } else if (number === 0) {
        return { fill: '#000', fontWeight: 'bold' };
      } else {
        return { fill: '#52C41A' };
      }
    },
  }}
/>
```

### 使用 ticks 数组数据

```jsx
<Axis
  field="value"
  style={{
    label: (text, index, ticks) => {
      const total = ticks.length;
      const isFirst = index === 0;
      const isLast = index === total - 1;

      if (isFirst || isLast) {
        return { fill: '#1890FF', fontWeight: 'bold' };
      }
      return { fill: '#808080' };
    },
  }}
/>
```

> **注意**: `ticks[index].value` 是归一化值（0-1），原始值请使用 `ticks[index].tickValue`。

### 自定义网格线（函数形式）

```jsx
<Axis
  field="value"
  style={{
    grid: (text, index, total) => {
      // text: 格式化后的文本，index: 当前索引，total: 刻度总数
      if (index === total - 1) {
        return { stroke: 'rgb(113, 113, 112)', strokeOpacity: 1, lineDash: null };
      }
      return { stroke: 'rgb(220, 220, 220)', strokeOpacity: 0.4, lineDash: null };
    },
  }}
/>
```

### 自动处理标签

```jsx
<Axis
  field="month"
  labelAutoRotate={true}
  labelAutoHide={true}
/>
```

> **注意**：`safetyDistance` 默认值为 `2`，通常无需手动设置。

### 坐标轴箭头标记

```jsx
<Axis
  field="value"
  style={{
    line: {},
    // symbol 数组：[最大值端, 最小值端]
    // 单箭头：[{ type: 'arrow' }]，双端：[{ type: 'arrow' }, { type: 'circle' }]
    symbol: [{ type: 'arrow' }],
  }}
/>
```

### 旋转标签

旋转标签用于解决**标签重叠**问题，但会降低可读性。

#### ⚠️ 使用优先级

```
1. labelAutoRotate（推荐）
2. 旋转 45°
3. 旋转 90°（谨慎）
```

#### 自动旋转

```jsx
<Axis field="month" labelAutoRotate={true} />
```

#### 手动旋转 45°

```jsx
<Axis
  field="month"
  style={{
    label: { transform: 'rotate(-45deg)', align: 'end', textBaseline: 'middle' },
  }}
/>
```

#### 手动旋转 90°

```jsx
<Axis
  field="year"
  style={{
    label: { transform: 'rotate(-90deg)', align: 'end', textBaseline: 'middle' },
  }}
/>
```
