---
title: Data Processing
order: 3
---

Data is the most fundamental part of creating charts. F2 requires data sources to be in JSON array format, where each element is a standard JSON object.

## Basic Data Format

F2's basic data format is a JSON array:

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

Using data:

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="year" y="sales" />
    <Point x="year" y="sales" />
    <Tooltip />
  </Chart>
</Canvas>
```

## Data Format Requirements

| Requirement | Description |
|-------------|-------------|
| **Array Format** | Data source must be an array |
| **Object Elements** | Array elements must be objects |
| **Field Names** | Object keys serve as field names for mapping to chart properties |
| **Field Values** | Supports string, number, array, date, and other types |

## Special Chart Data Formats

### Pie Chart

When drawing a pie chart, each record in the dataset **must include a constant field (and must be of string type)**:

```jsx
const data = [
  { name: 'Movie A', percent: 0.4, a: '1' },
  { name: 'Movie B', percent: 0.2, a: '1' },
  { name: 'Movie C', percent: 0.18, a: '1' },
  { name: 'Movie D', percent: 0.15, a: '1' },
  { name: 'Movie E', percent: 0.05, a: '1' },
  { name: 'Others', percent: 0.02, a: '1' },
];

<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

**Why is a constant field needed?**

Pie charts use polar coordinate systems where all data needs to be mapped to the same angular range. The constant field (e.g., `a: '1'`) ensures all data points share the same angular starting position.

### Interval Bar Chart

When data on the x-axis or y-axis is an array, it will automatically be mapped to an interval, creating an interval bar chart:

```jsx
const data = [
  { x: 'Category 1', y: [76, 100] },
  { x: 'Category 2', y: [56, 108] },
  { x: 'Category 3', y: [38, 129] },
  { x: 'Category 4', y: [58, 155] },
  { x: 'Category 5', y: [45, 120] },
  { x: 'Category 6', y: [23, 99] },
  { x: 'Category 7', y: [18, 56] },
  { x: 'Category 8', y: [18, 34] },
];

<Chart data={data}>
  <Interval x="x" y="y" />
</Chart>
```

The array represents the minimum and maximum values of the interval: `[minimum, maximum]`

### Candlestick Chart

Candlestick charts require open, close, highest, and lowest prices, using array format:

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

**Array format:** `[open, close, lowest, highest]`
- `open` - Opening price
- `close` - Closing price
- `lowest` - Lowest price
- `highest` - Highest price

### Scatter Plot (Bubble Chart)

Scatter plots can include additional dimensions (such as size):

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

## Data Processing

### Data Filtering

Before passing to Chart, you can use JavaScript array methods to filter data:

```jsx
const rawData = [
  { year: 2010, sales: 40, category: 'A' },
  { year: 2011, sales: 30, category: 'B' },
  { year: 2012, sales: 50, category: 'A' },
  { year: 2013, sales: 60, category: 'B' },
];

// Keep only data where category is 'A'
const data = rawData.filter(item => item.category === 'A');

<Chart data={data}>
  <Line x="year" y="sales" />
</Chart>
```

### Data Sorting

```jsx
const rawData = [
  { name: 'A', value: 30 },
  { name: 'B', value: 50 },
  { name: 'C', value: 20 },
];

// Sort by value in descending order
const data = [...rawData].sort((a, b) => b.value - a.value);

<Chart data={data}>
  <Interval x="name" y="value" />
</Chart>
```

### Data Aggregation

```jsx
const rawData = [
  { category: 'A', value: 10 },
  { category: 'A', value: 20 },
  { category: 'B', value: 30 },
  { category: 'B', value: 40 },
];

// Aggregate by category (sum)
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

// Result: [{ category: 'A', value: 30 }, { category: 'B', value: 70 }]
```

### Data Transformation

```jsx
const rawData = [
  { date: '2023-01-01', value: 100 },
  { date: '2023-02-01', value: 120 },
];

// Transform date format
const data = rawData.map(item => ({
  ...item,
  date: new Date(item.date),
  // Or add computed fields
  valueFormatted: item.value.toFixed(2),
}));
```

## Data Updates

F2 supports dynamic data updates with animated transitions:

```jsx
let chart = null;

// Initial data
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

// Update data
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

chart.update(newProps); // Automatically triggers animation
```

## Common Issues

### Handling Empty Data

```jsx
// Display empty state when data is empty
const data = [];

if (data.length === 0) {
  // Show empty state
  return <EmptyState />;
}

return (
  <Chart data={data}>
    <Interval x="genre" y="sold" />
  </Chart>
);
```

### Handling Missing Values

```jsx
const data = [
  { year: 2010, sales: 40 },
  { year: 2011, sales: null }, // Missing value
  { year: 2012, sales: 50 },
];

// Filter out missing values
const cleanData = data.filter(item => item.sales != null);

// Or fill with default value
const filledData = data.map(item => ({
  ...item,
  sales: item.sales ?? 0,
}));
```

### Handling Large Datasets

For large datasets, consider:

1. **Data Sampling**: Random sampling on the frontend
2. **Data Pagination**: Only load current page data
3. **Server-side Aggregation**: Complete aggregation calculations on the server

```jsx
// Data sampling example
function sampleData(data, maxSize) {
  if (data.length <= maxSize) return data;
  const step = Math.ceil(data.length / maxSize);
  return data.filter((_, index) => index % step === 0);
}

const largeData = [...]; // Large dataset
const sampledData = sampleData(largeData, 1000);

<Chart data={sampledData}>
  <Line x="date" y="value" />
</Chart>
```

## Complete Example

```jsx
import { Canvas, Chart, Interval, Axis, Tooltip } from '@antv/f2';

const rawData = [
  { month: 'Jan', sales: 100, profit: 20 },
  { month: 'Feb', sales: 120, profit: 25 },
  { month: 'Mar', sales: 90, profit: 15 },
  { month: 'Apr', sales: 150, profit: 35 },
  { month: 'May', sales: 180, profit: 40 },
  { month: 'Jun', sales: 200, profit: 45 },
];

// Data processing: Add profit rate field
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

## Data Source Types

### Static Data

Constant data defined directly in code:

```jsx
const data = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
];
```

### API Data

Fetched from remote API:

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

### User Input

Responsive to user interactions:

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

## More Examples

- [Pie Chart Example](/examples#pie-pie)
- [Interval Bar Chart Example](/examples#column-column)
- [Candlestick Chart Example](/examples#candlestick-candlestick)
- [Dynamic Data Example](/examples#dynamic-data)

## Related Documentation

- [Scale](/tutorial/scale.en.md)
- [Core Concepts](/tutorial/understanding.en.md)
- [Chart Grammar](/tutorial/grammar.en.md)
