---
title: 图表 - Chart
order: 0
---

图表组件，用于创建各类统计图表。Chart 组件是 F2 的核心组件，提供坐标系、度量、数据过滤等功能。

## Usage

```jsx
import { Canvas, Chart, Interval } from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Interval x="genre" y="sold" color="genre" />
  </Chart>
</Canvas>
```

### TypeScript 泛型

Chart 支持泛型以获得完整的类型推断：

```jsx
<Chart<MyDataType> data={data}>
  ...
</Chart>
```

## TypeScript 类型定义

```typescript
interface ChartProps<TRecord extends DataRecord = DataRecord> {
  /** 数据源，必填 */
  data: Data<TRecord>;
  /** 度量配置 */
  scale?: DataRecordScale<TRecord>;
  /** 坐标系配置 */
  coord?: CoordType | CoordProps;
  /** 图表容器样式 */
  style?: GroupStyleProps;
  /** 主题配置 */
  theme?: Record<string, any>;
  /** 子组件 */
  children?: any;
}

type DataRecord = Record<string, any>;
type Data<TRecord> = TRecord[];
type ScaleType = 'identity' | 'linear' | 'cat' | 'timeCat' | 'log' | 'pow';
type CoordType = 'rect' | 'polar';
```

## Props

### data

**必填**。可视化数据源，类型为对象数组。

### scale

图表的度量设置，用于定义数据字段的度量类型和配置。未指定 type 时会根据数据类型自动推断：
- 数值类型 → `linear`
- 字符串类型 → `cat`
- 常量字段 → `identity`

#### 通用属性

所有度量类型都支持的属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `ScaleType` | 自动推断 | 度量类型 |
| formatter | `(value) => string \| number` | - | 格式化坐标轴刻度点文本 |
| range | `[number, number]` | `[0, 1]` | 输出数据范围 |
| alias | `string` | - | 字段显示别名 |
| tickCount | `number` | - | 坐标轴刻度点个数 |
| ticks | `string[] \| number[]` | - | 指定刻度点文本 |
| sortable | `boolean` | - | 数据已排序时设为 false 可提升性能 |

#### linear 度量

连续数值类型的度量，type 可省略：

```jsx
scale={{
  sold: { min: 0, max: 100, nice: true },
}}
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| nice | `boolean` | `true` | 优化数值范围，使刻度均匀分布 |
| min | `number` | 自动计算 | 最小值 |
| max | `number` | 自动计算 | 最大值 |
| tickInterval | `number` | - | 刻度间隔 |

#### cat 度量

分类类型的度量，type 可省略：

```jsx
scale={{
  genre: { values: ['Sports', 'Strategy', 'Action'] },
}}
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| values | `string[]` | - | 指定分类值及其顺序 |
| isRounding | `boolean` | `false` | 计算刻度时是否取整 |

#### timeCat 度量

时间分类类型的度量，通常需要声明 type：

```jsx
scale={{
  date: { type: 'timeCat', mask: 'YYYY-MM-DD' },
}}
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| mask | `string` | `'YYYY-MM-DD'` | 日期格式化格式 |
| values | `string[]` | - | 指定分类值及其顺序 |

度量详细介绍可见：[度量](/tutorial/scale.zh.md)

### coord

图表的坐标系配置。

#### rect 直角坐标系

type 可省略（默认为 rect）：

```jsx
coord={{ transposed: true }}
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'rect'` | `'rect'` | 坐标系类型 |
| transposed | `boolean` | `false` | 是否翻转坐标系 |

#### polar 极坐标系

```jsx
coord={{
  type: 'polar',
  startAngle: -Math.PI / 2,
  endAngle: Math.PI * 1.5,
  radius: 0.8,
  innerRadius: 0.5,
}}
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `'polar'` | - | 坐标系类型 |
| transposed | `boolean` | `false` | 是否翻转坐标系 |
| startAngle | `number` | - | 起始弧度 |
| endAngle | `number` | - | 结束弧度 |
| innerRadius | `number` | - | 内半径，0-1 范围 |
| radius | `number` | - | 半径，0-1 范围 |
| ~~inner~~ | `number` | - | *已弃用，请使用 innerRadius* |

坐标系详细介绍可见：[坐标系](/tutorial/coordinate.zh.md)

### style

图表容器的样式属性，继承自 `@antv/g-base` 的 GroupStyleProps。支持数字和字符串单位：

```jsx
style={{
  left: 50,
  top: 0,
  width: '100%',
  height: '100%',
  padding: ['40px', '40px', '40px', '40px'],
}}
```

### theme

图表主题配置，用于覆盖默认主题样式。传入的配置会与默认主题深度合并：

```jsx
theme={{
  chart: { padding: ['40px', '40px', '40px', '40px'] },
  colors: ['#1890FF', '#2FC25B', '#FACC14'],
}}
```

#### 常用配置项

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `chart.padding` | `string[] \| number[]` | `['30px', '30px', '30px', '30px']` | 图表内边距 |
| `colors` | `string[]` | 见源码 | 默认配色数组 |
| `axis` | `object` | 见源码 | 坐标轴配置，见 [Axis 文档](/api/chart/axis.zh.md) |

完整默认主题见 `packages/f2/src/theme.ts`。
