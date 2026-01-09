---
title: 数据处理
order: 3
---

数据是绘制图表最基本的部分。F2 要求数据源为 JSON 数组格式，数组的每个元素是一个标准 JSON 对象。

## 基本数据格式

F2 的基本数据格式是 JSON 数组：

```jsx
const data = [
  { year: 2010, sales: 40 },
  { year: 2011, sales: 30 },
  { year: 2012, sales: 50 },
  { year: 2013, sales: 60 },
  { year: 2014, sales: 70 },
  { year: 2015, sales: 80 },
  { year: 2016, sales: 80 },
  { year: 2017, sales: 90 },
  { year: 2018, sales: 120 },
];
```

使用数据：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="year" y="sales" />
    <Point x="year" y="sales" />
    <Tooltip />
  </Chart>
</Canvas>
```

## 数据格式要求

| 要求 | 说明 |
|------|------|
| **数组格式** | 数据源必须是数组 |
| **对象元素** | 数组元素必须是对象 |
| **字段名** | 对象的键作为字段名，用于映射到图表属性 |
| **字段值** | 支持字符串、数字、数组、日期等类型 |

## 特殊图表的数据格式

### 饼图

绘制饼图时，数据集中的每条记录**必须包含一个常量字段（且必须是字符串类型）**：

```jsx
const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.2, a: '1' },
  { name: '机器之血', percent: 0.18, a: '1' },
  { name: '心理罪', percent: 0.15, a: '1' },
  { name: '寻梦环游记', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' },
];

<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

**为什么需要常量字段？**

饼图使用极坐标系，所有数据需要映射到相同的角度范围。常量字段（如 `a: '1'`）确保所有数据点共享相同的角度起始位置。

### 区间柱状图

当 x 轴或 y 轴的数据为数组时，会自动映射为区间，绘制区间柱状图：

```jsx
const data = [
  { x: '分类一', y: [76, 100] },
  { x: '分类二', y: [56, 108] },
  { x: '分类三', y: [38, 129] },
  { x: '分类四', y: [58, 155] },
  { x: '分类五', y: [45, 120] },
  { x: '分类六', y: [23, 99] },
  { x: '分类七', y: [18, 56] },
  { x: '分类八', y: [18, 34] },
];

<Chart data={data}>
  <Interval x="x" y="y" />
</Chart>
```

数组表示区间的最小值和最大值：`[最小值, 最大值]`

### 股票图（K线图）

股票图需要包含开盘价、收盘价、最高价、最低价，使用数组格式：

```jsx
const data = [
  { date: '2023-01', value: [100, 110, 95, 120] },  // [open, close, lowest, highest]
  { date: '2023-02', value: [110, 105, 100, 115] },
  { date: '2023-03', value: [105, 120, 102, 125] },
];

<Chart data={data}>
  <Axis field="date" type="timeCat" />
  <Candlestick x="date" y="value" />
</Chart>
```

**数组格式说明：** `[open, close, lowest, highest]`
- `open` - 开盘价
- `close` - 收盘价
- `lowest` - 最低价
- `highest` - 最高价

### 散点图（气泡图）

散点图可以包含额外的维度（如大小）：

```jsx
const data = [
  { x: 10, y: 20, size: 5, category: 'A' },
  { x: 15, y: 25, size: 10, category: 'B' },
  { x: 20, y: 18, size: 8, category: 'A' },
];

<Chart data={data}>
  <Point x="x" y="y" size="size" color="category" />
</Chart>
```

## 数据处理

### 数据过滤

在传递给 Chart 前，可以使用 JavaScript 的数组方法过滤数据：

```jsx
const rawData = [
  { year: 2010, sales: 40, category: 'A' },
  { year: 2011, sales: 30, category: 'B' },
  { year: 2012, sales: 50, category: 'A' },
  { year: 2013, sales: 60, category: 'B' },
];

// 只保留 category 为 'A' 的数据
const data = rawData.filter(item => item.category === 'A');

<Chart data={data}>
  <Line x="year" y="sales" />
</Chart>
```

### 数据排序

```jsx
const rawData = [
  { name: 'A', value: 30 },
  { name: 'B', value: 50 },
  { name: 'C', value: 20 },
];

// 按 value 降序排列
const data = [...rawData].sort((a, b) => b.value - a.value);

<Chart data={data}>
  <Interval x="name" y="value" />
</Chart>
```

### 数据聚合

```jsx
const rawData = [
  { category: 'A', value: 10 },
  { category: 'A', value: 20 },
  { category: 'B', value: 30 },
  { category: 'B', value: 40 },
];

// 按 category 聚合求和
const aggregated = {};
rawData.forEach(item => {
  if (!aggregated[item.category]) {
    aggregated[item.category] = 0;
  }
  aggregated[item.category] += item.value;
});

const data = Object.entries(aggregated).map(([category, value]) => ({
  category,
  value,
}));

// 结果: [{ category: 'A', value: 30 }, { category: 'B', value: 70 }]
```

### 数据转换

```jsx
const rawData = [
  { date: '2023-01-01', value: 100 },
  { date: '2023-02-01', value: 120 },
];

// 转换日期格式
const data = rawData.map(item => ({
  ...item,
  date: new Date(item.date),
  // 或添加计算字段
  valueFormatted: item.value.toFixed(2),
}));
```

## 数据更新

F2 支持动态更新数据，实现动画过渡效果：

```jsx
let chart = null;

// 初始化数据
const data1 = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
];

const { props } = (
  <Canvas context={context}>
    <Chart data={data1}>
      <Interval x="genre" y="sold" />
    </Chart>
  </Canvas>
);

chart = new Canvas(props);
chart.render();

// 更新数据
const data2 = [
  { genre: 'Sports', sold: 350 },
  { genre: 'Strategy', sold: 200 },
];

const { props: newProps } = (
  <Canvas context={context}>
    <Chart data={data2}>
      <Interval x="genre" y="sold" />
    </Chart>
  </Canvas>
);

chart.update(newProps); // 自动触发动画
```

## 常见问题

### 空数据处理

```jsx
// 数据为空时显示空状态
const data = [];

if (data.length === 0) {
  // 显示空状态提示
  return <EmptyState />;
}

return (
  <Chart data={data}>
    <Interval x="genre" y="sold" />
  </Chart>
);
```

### 缺失值处理

```jsx
const data = [
  { year: 2010, sales: 40 },
  { year: 2011, sales: null }, // 缺失值
  { year: 2012, sales: 50 },
];

// 过滤掉缺失值
const cleanData = data.filter(item => item.sales != null);

// 或使用默认值填充
const filledData = data.map(item => ({
  ...item,
  sales: item.sales ?? 0,
}));
```

### 大数据量处理

对于大数据量，建议：

1. **数据抽样**：在前端进行随机抽样
2. **数据分页**：只加载当前页的数据
3. **服务端聚合**：在服务端完成聚合计算

```jsx
// 数据抽样示例
function sampleData(data, maxSize) {
  if (data.length <= maxSize) return data;
  const step = Math.ceil(data.length / maxSize);
  return data.filter((_, index) => index % step === 0);
}

const largeData = [...]; // 大数据集
const sampledData = sampleData(largeData, 1000);

<Chart data={sampledData}>
  <Line x="date" y="value" />
</Chart>
```

## 完整示例

```jsx
import { Canvas, Chart, Interval, Axis, Tooltip } from '@antv/f2';

const rawData = [
  { month: '1月', sales: 100, profit: 20 },
  { month: '2月', sales: 120, profit: 25 },
  { month: '3月', sales: 90, profit: 15 },
  { month: '4月', sales: 150, profit: 35 },
  { month: '5月', sales: 180, profit: 40 },
  { month: '6月', sales: 200, profit: 45 },
];

// 数据处理：添加利润率字段
const data = rawData.map(item => ({
  ...item,
  profitRate: (item.profit / item.sales * 100).toFixed(2) + '%',
}));

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      scale={{
        sales: {
          min: 0,
        },
      }}
    >
      <Axis field="month" />
      <Axis field="sales" />
      <Interval x="month" y="sales" color="month" />
      <Tooltip />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

## 数据源类型

### 静态数据

直接定义在代码中的常量数据：

```jsx
const data = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
];
```

### API 数据

从远程 API 获取：

```jsx
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  const { props } = (
    <Canvas context={context}>
      <Chart data={data}>
        <Interval x="category" y="value" />
      </Chart>
    </Canvas>
  );

  const canvas = new Canvas(props);
  canvas.render();
}

fetchData();
```

### 用户输入

响应用户交互：

```jsx
function updateChart(userInput) {
  const data = processData(userInput);

  const { props: newProps } = (
    <Canvas context={context}>
      <Chart data={data}>
        <Interval x="category" y="value" />
      </Chart>
    </Canvas>
  );

  chart.update(newProps);
}
```

## 更多示例

- [饼图示例](/examples#pie-pie)
- [区间柱状图示例](/examples#column-column)
- [股票图示例](/examples#candlestick-candlestick)
- [动态数据示例](/examples#dynamic-data)

## 相关文档

- [度量](/tutorial/scale.zh.md)
- [核心概念](/tutorial/understanding.zh.md)
- [图形语法](/tutorial/grammar.zh.md)
