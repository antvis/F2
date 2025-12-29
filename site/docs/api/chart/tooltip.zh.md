---
title: 提示 - tooltip
order: 8
---

## Usage

```jsx
import { Canvas, Chart, Line, Tooltip } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Tooltip />
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## 组成

![](https://mdn.alipayobjects.com/huamei_khb4xj/afts/img/A*CdXbTJnr2v4AAAAAAAAAAAAADq2NAQ/original)

## TypeScript 类型定义

```typescript
interface TooltipProps {
  /** 是否显示 tooltip */
  visible?: boolean;
  /** 顶部边距，默认 '10px' */
  padding?: string;
  /** 显示事件，默认 'press' */
  triggerOn?: 'press' | 'click';
  /** 消失事件，默认 'pressend' */
  triggerOff?: 'pressend';
  /** 是否一直显示，默认 false */
  alwaysShow?: boolean;
  /** 是否显示十字线，默认 false */
  showCrosshairs?: boolean;
  /** 十字线类型，默认 'y' */
  crosshairsType?: 'x' | 'y' | 'xy';
  /** 十字线样式 */
  crosshairsStyle?: LineStyleProps;
  /** 是否显示辅助点，默认 false */
  snap?: boolean;
  /** 名称文本样式 */
  nameStyle?: TextStyleProps;
  /** 值文本样式 */
  valueStyle?: TextStyleProps;
  /** 背景样式 */
  background?: RectStyleProps;
  /** 是否显示数据项标记，默认 true */
  showItemMarker?: boolean;
  /** 数据项标记样式 */
  itemMarkerStyle?: any;
  /** 名称和值的连接字符串，默认 ': ' */
  joinString?: string;
  /** 是否显示 tooltip 标记背景，默认 false */
  showTooltipMarker?: boolean;
  /** tooltip 标记背景样式 */
  markerBackgroundStyle?: any;
  /** tooltip 标记样式 */
  tooltipMarkerStyle?: any;
  /** 是否显示 X 轴辅助信息 */
  showXTip?: boolean;
  /** X 轴辅助信息文本 */
  xTip?: string | ((text: string, record: DataRecord) => string);
  /** X 轴辅助信息文本样式 */
  xTipTextStyle?: TextStyleProps;
  /** X 轴辅助信息背景样式 */
  xTipBackground?: RectStyleProps;
  /** X 轴位置点类型，默认 'record' */
  xPositionType?: 'record' | 'coord';
  /** 是否显示 Y 轴辅助信息 */
  showYTip?: boolean;
  /** Y 轴辅助信息文本 */
  yTip?: string | ((text: string, record: DataRecord) => string);
  /** Y 轴辅助信息文本样式 */
  yTipTextStyle?: TextStyleProps;
  /** Y 轴辅助信息背景样式 */
  yTipBackground?: RectStyleProps;
  /** Y 轴位置点类型，默认 'record' */
  yPositionType?: 'record' | 'coord';
  /** 是否自定义内容，默认 false */
  custom?: boolean;
  /** 自定义文本内容渲染函数 */
  customText?: (record: DataRecord) => JSX.Element;
  /** 每个 tooltip 项的宽度 */
  itemWidth?: number;
  /** 默认显示的数据项 */
  defaultItem?: any;
  /** 选中数据改变时的回调 */
  onChange?: (records: DataRecord[]) => void;
  /** tooltip 显示时的回调 */
  onShow?: () => void;
  /** tooltip 隐藏时的回调 */
  onHide?: () => void;
}

interface DataRecord {
  /** 原始数据 */
  origin: any;
  /** 数据项名称 */
  name: string;
  /** 数据项值 */
  value: string;
  /** x 坐标 */
  x: number;
  /** y 坐标 */
  y: number;
  /** 颜色 */
  color?: string;
  /** x 字段名 */
  xField: string;
  /** y 字段名 */
  yField: string;
  /** 坐标信息 */
  coord?: any;
  [key: string]: any;
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| **基础配置** |
| `visible` | `boolean` | - | 是否显示 tooltip（不传时默认显示，设为 false 隐藏） |
| `padding` | `string` | `'10px'` | 顶部边距，用于计算坐标空间 |
| `triggerOn` | `'press' \| 'click'` | `'press'` | 触发 tooltip 显示的事件 |
| `triggerOff` | `'pressend'` | `'pressend'` | 触发 tooltip 消失的事件 |
| `alwaysShow` | `boolean` | `false` | 是否一直显示（忽略 triggerOff 事件） |
| `defaultItem` | `any` | - | 默认显示的数据项，设置后会立即显示 tooltip |
| **十字线配置** |
| `showCrosshairs` | `boolean` | `false` | 是否显示十字辅助线 |
| `crosshairsType` | `'x' \| 'y' \| 'xy'` | `'y'` | 十字线类型：x-水平线、y-垂直线、xy-双向 |
| `crosshairsStyle` | `LineStyleProps` | 见下方 | 十字线样式配置 |
| `snap` | `boolean` | `false` | 是否在数据点位置显示辅助圆点 |
| `tooltipMarkerStyle` | `any` | 见下方 | 辅助点的样式配置 |
| **内容样式配置** |
| `showItemMarker` | `boolean` | `true` | 是否在文本前显示数据项颜色标记 |
| `itemMarkerStyle` | `any` | 见下方 | 数据项标记的样式 |
| `joinString` | `string` | `': '` | 名称和值之间的连接字符串 |
| `nameStyle` | `TextStyleProps` | 见下方 | 名称文本样式 |
| `valueStyle` | `TextStyleProps` | 见下方 | 值文本样式 |
| `background` | `RectStyleProps` | 见下方 | tooltip 背景样式 |
| `itemWidth` | `number` | - | 每个 tooltip 项的宽度，用于控制自动换行 |
| **标记区域配置** |
| `showTooltipMarker` | `boolean` | `false` | 是否显示 tooltip 标记背景区域 |
| `markerBackgroundStyle` | `any` | 见下方 | 标记背景区域的样式 |
| **X/Y 轴辅助信息** |
| `showXTip` | `boolean` | `false` | 是否在 X 轴位置显示辅助信息 |
| `xTip` | `string \| (text, record) => string` | - | X 轴辅助信息文本，支持函数自定义 |
| `xTipTextStyle` | `TextStyleProps` | 见下方 | X 轴辅助信息文本样式 |
| `xTipBackground` | `RectStyleProps` | 见下方 | X 轴辅助信息背景样式 |
| `xPositionType` | `'record' \| 'coord'` | `'record'` | X 轴位置点类型：record-按数据取点、coord-按坐标取点 |
| `showYTip` | `boolean` | `false` | 是否在 Y 轴位置显示辅助信息 |
| `yTip` | `string \| (text, record) => string` | - | Y 轴辅助信息文本，支持函数自定义 |
| `yTipTextStyle` | `TextStyleProps` | 见下方 | Y 轴辅助信息文本样式 |
| `yTipBackground` | `RectStyleProps` | 见下方 | Y 轴辅助信息背景样式 |
| `yPositionType` | `'record' \| 'coord'` | `'record'` | Y 轴位置点类型：record-按数据取点、coord-按坐标取点 |
| **自定义内容** |
| `custom` | `boolean` | `false` | 是否使用自定义模式（禁用默认内容渲染） |
| `customText` | `(record: DataRecord) => JSX.Element` | - | 自定义文本内容的渲染函数 |
| **回调函数** |
| `onChange` | `(records: DataRecord[]) => void` | - | tooltip 选中数据改变时的回调 |
| `onShow` | `() => void` | - | tooltip 显示时的回调（仅首次显示触发） |
| `onHide` | `() => void` | - | tooltip 隐藏时的回调 |

### 样式属性类型说明

- **TextStyleProps**: [文本属性](/tutorial/shape-attrs#文本属性)
- **RectStyleProps**: [通用属性](/tutorial/shape-attrs#通用属性)
- **LineStyleProps**: [线条属性](/tutorial/shape-attrs#线条属性)

### 默认样式值

```javascript
// 十字线默认样式
crosshairsStyle: {
  stroke: 'rgba(0, 0, 0, 0.25)',
  lineWidth: '2px',
}

// 背景默认样式
background: {
  radius: '4px',
  fill: 'rgba(0, 0, 0, 0.65)',
  padding: ['6px', '10px'],
}

// 名称文本默认样式
nameStyle: {
  fontSize: '24px',
  fill: 'rgba(255, 255, 255, 0.65)',
  textAlign: 'start',
  textBaseline: 'middle',
}

// 值文本默认样式
valueStyle: {
  fontSize: '24px',
  fill: '#fff',
  textAlign: 'start',
  textBaseline: 'middle',
}

// 数据项标记默认样式
itemMarkerStyle: {
  width: '12px',
  radius: '6px',
  symbol: 'circle',
  lineWidth: '2px',
  stroke: '#fff',
}

// X/Y Tip 默认样式
xTipTextStyle / yTipTextStyle: {
  fontSize: '24px',
  fill: '#fff',
}

xTipBackground / yTipBackground: {
  radius: '4px',
  fill: 'rgba(0, 0, 0, 0.65)',
  padding: ['6px', '10px'],
}
```

## 用法示例

### 基础用法

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Tooltip />
    <Axis field="genre" />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>
```

### 配置十字线

```jsx
<Tooltip
  showCrosshairs={true}
  crosshairsType="xy"
  snap={true}
  crosshairsStyle={{
    stroke: '#326BFB',
    lineDash: [2, 2],
  }}
/>
```

### 自定义样式

```jsx
<Tooltip
  background={{
    fill: 'rgba(50, 107, 251, 0.75)',
    radius: '8px',
    padding: ['10px', '16px'],
  }}
  nameStyle={{
    fontSize: '26px',
    fill: 'rgba(255, 255, 255, 0.8)',
  }}
  valueStyle={{
    fontSize: '28px',
    fill: '#fff',
    fontWeight: 'bold',
  }}
  joinString=": "
/>
```

### 显示 X/Y 轴辅助信息

```jsx
<Tooltip
  showXTip={true}
  showYTip={true}
  showCrosshairs={true}
  crosshairsType="xy"
  xTip={(text, record) => `${text}年`}
  yTip={(text, record) => `${text}万元`}
  xTipBackground={{
    fill: '#326BFB',
    radius: '4px',
  }}
  yTipBackground={{
    fill: '#326BFB',
    radius: '4px',
  }}
/>
```

### 自定义文本内容

```jsx
<Tooltip
  alwaysShow={true}
  defaultItem={data[0]}
  customText={(record) => {
    const { origin } = record;
    return (
      <text attrs={{
        fill: '#fff',
        text: `类型：${origin.genre}\n销量：${origin.sold}`,
      }} />
    );
  }}
/>
```

### 监听数据变化

```jsx
<Tooltip
  onChange={(records) => {
    console.log('当前选中的数据：', records);
    // records[0].name - 数据项名称
    // records[0].value - 数据项值
    // records[0].origin - 原始数据对象
  }}
  onShow={() => {
    console.log('tooltip 已显示');
  }}
  onHide={() => {
    console.log('tooltip 已隐藏');
  }}
/>
```

### 默认显示指定数据

```jsx
<Tooltip
  alwaysShow={true}
  defaultItem={data[0]}  // 初始显示第一条数据的 tooltip
  showCrosshairs={true}
  snap={true}
/>
```

### 分组图表的标记区域

```jsx
<Tooltip
  showTooltipMarker={true}
  markerBackgroundStyle={{
    fill: '#CCD6EC',
    opacity: 0.3,
    padding: '6px',
  }}
/>
```

## 方法

通过 ref 可以调用以下方法：

### show(point)

在指定坐标位置显示 tooltip。

```typescript
show(point: { x: number; y: number }): void
```

**示例：**

```jsx
import { createRef } from '@antv/f2';

const tooltipRef = createRef();

<Canvas context={context}>
  <Chart data={data}>
    <Tooltip ref={tooltipRef} />
    <Line x="genre" y="sold" />
  </Chart>
</Canvas>;

// 手动显示 tooltip
tooltipRef.current?.show({ x: 100, y: 200 });
```

### hide()

隐藏 tooltip。

```typescript
hide(): void
```

**示例：**

```jsx
// 手动隐藏 tooltip
tooltipRef.current?.hide();
```

