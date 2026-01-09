---
title: 度量
order: 4
---

度量（Scale）是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。

## 度量类型

根据数据类型，F2 支持以下几种度量类型：

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `identity` | 常量类型数值，数据字段是不变的常量 | 常量字段 |
| `linear` | 连续数字，如 [1, 2, 3, 4, 5] | 连续数值型数据 |
| `cat` | 分类，如 ['男', '女'] | 分类数据 |
| `timeCat` | 时间类型 | 时间日期数据 |

## 如何设置度量

通过 `Chart` 组件的 `scale` 属性定义度量：

```jsx
const data = [
  { a: 'a', b: 20 },
  { a: 'b', b: 12 },
  { a: 'c', b: 8 },
];

<Chart
  data={data}
  scale={{
    a: {
      type: 'cat',      // 声明 a 字段为分类类型
    },
    b: {
      min: 0,           // 手动指定最小值
      max: 100,         // 手动指定最大值
    },
  }}
>
  <Interval x="a" y="b" />
</Chart>
```

## 通用属性

所有度量类型都支持的通用属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | `string` | 度量类型：`identity`、`linear`、`cat`、`timeCat` |
| `formatter` | `Function` | 格式化刻度点文本，影响坐标轴、图例、tooltip 显示 |
| `range` | `Array` | 输出范围，格式为 `[min, max]`，默认 `[0, 1]` |
| `alias` | `string` | 字段显示别名，用于英文名称转中文名称 |
| `tickCount` | `number` | 坐标轴刻度点个数 |
| `ticks` | `Array` | 指定刻度点的文本信息 |

## Linear 度量

用于连续数值型数据。

### 配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `nice` | `boolean` | 优化数值范围，使刻度线均匀分布，默认 `true` |
| `min` | `number` | 数值范围最小值 |
| `max` | `number` | 数值范围最大值 |
| `tickInterval` | `number` | 刻度点间距，与 tickCount 互斥 |

### 配置示例

```jsx
// 基础配置
<Chart
  scale={{
    value: {
      type: 'linear',
      min: 0,
      max: 100,
      tickCount: 5,
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 使用 tickInterval
<Chart
  scale={{
    value: {
      type: 'linear',
      min: 0,
      max: 100,
      tickInterval: 20,  // 0, 20, 40, 60, 80, 100
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 使用 nice 优化范围
<Chart
  scale={{
    value: {
      type: 'linear',
      nice: true,  // [3, 97] → [0, 100]
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 使用 formatter 格式化
<Chart
  scale={{
    value: {
      type: 'linear',
      formatter: (val) => `${val}%`,
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

### 类型定义

```typescript
interface LinearScaleConfig {
  type?: 'linear';
  min?: number;
  max?: number;
  nice?: boolean;
  tickCount?: number;
  tickInterval?: number;
  range?: [number, number];
  alias?: string;
  formatter?: (value: number) => string;
  ticks?: number[];
}
```

## Cat 度量

用于分类数据。

### 配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `values` | `Array` | 指定分类值顺序 |
| `isRounding` | `boolean` | 是否允许取整以满足刻度均匀分布，默认 `false` |

### 配置示例

```jsx
// 基础配置
<Chart
  scale={{
    genre: {
      type: 'cat',
    },
  }}
>
  <Interval x="genre" y="sold" />
</Chart>

// 指定分类顺序
<Chart
  scale={{
    level: {
      type: 'cat',
      values: ['最小', '适中', '最大'],
    },
  }}
>
  <Interval x="level" y="value" />
</Chart>
```

### values 属性使用场景

**场景 1：指定分类顺序**

```jsx
const data = [
  { level: 'max', value: 100 },
  { level: 'min', value: 10 },
  { level: 'mid', value: 50 },
];

<Chart
  data={data}
  scale={{
    level: {
      type: 'cat',
      values: ['min', 'mid', 'max'],  // 按指定顺序显示
    },
  }}
>
  <Interval x="level" y="value" />
</Chart>
```

**场景 2：数值转分类（索引映射）**

```jsx
const data = [
  { month: 0, value: 7 },
  { month: 1, value: 12 },
  { month: 2, value: 18 },
];

<Chart
  data={data}
  scale={{
    month: {
      type: 'cat',
      values: ['一月', '二月', '三月'],  // month 值作为索引
    },
  }}
>
  <Line x="month" y="value" />
</Chart>
```

## TimeCat 度量

用于时间日期数据，**默认会对数据排序**。

### 配置属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `nice` | `boolean` | 是否优化 ticks，使刻度更易理解 |
| `mask` | `string` | 时间格式，默认 `'YYYY-MM-DD'` |
| `sortable` | `boolean` | 是否排序，默认 `true`，已排序数据可设为 `false` 提升性能 |
| `values` | `Array` | 指定具体的时间值顺序 |

### 配置示例

```jsx
// 基础配置
<Chart
  scale={{
    date: {
      type: 'timeCat',
      mask: 'YYYY-MM-DD',
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 自定义时间格式
<Chart
  scale={{
    date: {
      type: 'timeCat',
      mask: 'MM/DD',  // 01/15
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 性能优化：数据已排序
<Chart
  data={sortedData}
  scale={{
    date: {
      type: 'timeCat',
      sortable: false,  // 跳过排序，提升性能
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// 指定时间顺序
<Chart
  scale={{
    quarter: {
      type: 'cat',
      values: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
  }}
>
  <Interval x="quarter" y="value" />
</Chart>
```

### 类型定义

```typescript
interface TimeCatScaleConfig {
  type?: 'timeCat';
  nice?: boolean;
  mask?: string;
  sortable?: boolean;
  tickCount?: number;
  values?: string[];
  range?: [number, number];
  alias?: string;
  formatter?: (value: string | Date) => string;
  ticks?: string[];
}
```

## 常用配置场景

### 设置坐标轴范围

```jsx
<Chart
  scale={{
    value: {
      min: 0,       // 设置最小值
      max: 100,     // 设置最大值
      tickCount: 5, // 5 个刻度点
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

### 格式化刻度标签

```jsx
<Chart
  scale={{
    value: {
      formatter: (val) => `${val}万`,
    },
    date: {
      formatter: (val) => {
        const date = new Date(val);
        return `${date.getMonth() + 1}月${date.getDate()}日`;
      },
    },
  }}
>
  <Line x="date" y="value" />
  <Axis field="value" />
  <Axis field="date" />
</Chart>
```

### 设置刻度间隔

```jsx
<Chart
  scale={{
    value: {
      min: 0,
      max: 100,
      tickInterval: 25,  // 0, 25, 50, 75, 100
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

### 自定义刻度值

```jsx
<Chart
  scale={{
    value: {
      ticks: [0, 25, 50, 75, 100],  // 自定义刻度值
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

### 多个度量配置

```jsx
<Chart
  scale={{
    // x 轴：分类度量
    genre: {
      type: 'cat',
      values: ['Sports', 'Strategy', 'Action', 'Shooter', 'Other'],
    },
    // y 轴：线性度量
    sold: {
      type: 'linear',
      min: 0,
      nice: true,
    },
    // 颜色：分类度量
    color: {
      type: 'cat',
    },
  }}
>
  <Interval x="genre" y="sold" color="genre" />
</Chart>
```

## 高级配置

### 范围控制

控制数据映射到图形的位置：

```jsx
<Chart
  scale={{
    value: {
      min: 0,
      max: 100,
      range: [0, 0.8],  // 留出顶部 20% 空间
    },
  }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

### 别名设置

用于将字段英文名称转换为中文名称：

```jsx
<Chart
  scale={{
    genre: {
      alias: '类型',  // 图例、tooltip 等显示别名
    },
    sold: {
      alias: '销量',
    },
  }}
>
  <Interval x="genre" y="sold" />
  <Legend />
  <Tooltip />
</Chart>
```

### 动态度量配置

```jsx
class DynamicChart extends Component {
  state = {
    maxValue: 100,
  };

  updateMaxValue = () => {
    this.setState({
      maxValue: 200,
    });
  };

  render() {
    const { maxValue } = this.state;
    return (
      <Chart
        data={data}
        scale={{
          value: {
            type: 'linear',
            max: maxValue,
          },
        }}
      >
        <Interval x="genre" y="sold" />
      </Chart>
    );
  }
}
```

## 类型定义

### ScaleConfig 完整类型

```typescript
interface ScaleConfig {
  type?: 'linear' | 'cat' | 'timeCat' | 'identity';

  // 通用属性
  range?: [number, number];
  alias?: string;
  formatter?: (value: any) => string;
  tickCount?: number;
  ticks?: any[];

  // linear 特有
  min?: number;
  max?: number;
  nice?: boolean;
  tickInterval?: number;

  // cat 特有
  values?: any[];
  isRounding?: boolean;

  // timeCat 特有
  mask?: string;
  sortable?: boolean;
}

interface ChartScaleConfig {
  [fieldName: string]: ScaleConfig;
}
```

## 常见问题

### 如何设置坐标轴从 0 开始？

```jsx
scale={{
  value: {
    min: 0,  // 设置最小值为 0
  },
}}
```

### 如何设置刻度间隔？

使用 `tickInterval` 属性：

```jsx
scale={{
  value: {
    tickInterval: 20,
  },
}}
```

### 如何自定义刻度标签？

使用 `formatter` 或 `ticks`：

```jsx
// 方式 1: formatter
scale={{
  value: {
    formatter: (val) => `${val}K`,
  },
}}

// 方式 2: ticks
scale={{
  value: {
    ticks: [0, 25, 50, 75, 100],
  },
}}
```

### 如何优化已排序时间数据的性能？

设置 `sortable: false` 跳过排序：

```jsx
scale={{
  date: {
    type: 'timeCat',
    sortable: false,
  },
}}
```

### mask 和 formatter 能同时使用吗？

**不能**。如果同时设置，`formatter` 优先生效，`mask` 不生效。

## 相关文档

- [坐标系](/tutorial/coordinate.zh.md)
- [图形语法](/tutorial/grammar.zh.md)
- [核心概念](/tutorial/understanding.zh.md)
