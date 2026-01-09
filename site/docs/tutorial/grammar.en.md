---
title: Chart Grammar
order: 2
---

## Introduction

F2 is based on the graphic theory proposed in the book "The Grammar of Graphics" by Leland Wilkinson. This theory is a set of grammar rules that describe the deep characteristics of all statistical graphics, answering the question "what is a statistical graphic" by organizing the most basic elements in a bottom-up manner to form higher-level elements.

For F2, **there is no concept of specific chart types. All charts are formed by combining different graphic grammar elements**.

## Graphic Grammar Components

F2's graphic grammar consists of the following core elements:

```
Data
  ↓
Scale
  ↓
Geometry + Attribute
  ↓
Coordinate
  ↓
Auxiliary Elements (Axis, Legend, Tooltip, Guide)
```

## Data

Data is the most fundamental part of visualization. F2 requires the data source to be in JSON array format:

```jsx
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
```

For detailed data processing instructions, see: [Data Processing](/tutorial/data.en.md)

## Geometry

Geometry marks are the graphic elements you actually see in charts, such as points, lines, polygons, etc. Each geometry mark object contains multiple graphic attributes. The core of F2's graphic grammar is establishing the mapping from variables in data to graphic attributes.

### Built-in Geometry Marks

| Geometry Mark | Component | Chart Type |
|---------------|-----------|------------|
| Interval | `<Interval />` | Bar chart, column chart, histogram |
| Line | `<Line />` | Line chart, curve chart |
| Point | `<Point />` | Scatter plot, dot plot, bubble chart |
| Area | `<Area />` | Area chart, interval chart |
| Candlestick | `<Candlestick />` | Candlestick chart |

### Geometry Examples

```jsx
// Bar chart
<Interval x="genre" y="sold" color="genre" />

// Line chart
<Line x="date" y="value" color="type" />

// Scatter plot
<Point x="weight" y="height" color="gender" size="value" />

// Area chart
<Area x="date" y="value" color="type" />
```

For detailed geometry instructions, see: [Geometry](/api/chart/geometry.zh.md)

## Graphic Attributes

Graphic attributes control the visual appearance of geometry marks. F2 provides the following four graphic attributes:

| Attribute | Description | Example |
|-----------|-------------|---------|
| `position` | Position, maps fields to x or y axis | `x="genre", y="sold"` |
| `color` | Color, supports field or function | `color="genre"` or `color={datum => datum.value > 100 ? 'red' : 'blue'}` |
| `size` | Size, controls point size, line thickness, etc. | `size={10}` or `size={datum => datum.value}` |
| `shape` | Shape, controls the shape of geometry marks | `shape="circle"` or `shape="hollowCircle"` |

### Graphic Attribute Examples

```jsx
// Color mapping - field
<Interval x="genre" y="sold" color="genre" />

// Color mapping - function
<Point
  x="weight"
  y="height"
  color={datum => datum.weight > 70 ? 'red' : 'blue'}
/>

// Size mapping
<Point x="category" y="value" size={datum => datum.value} />

// Shape mapping
<Point x="category" y="value" shape="circle" />
```

For detailed graphic attribute instructions, see: [Shape Attributes](/tutorial/shape-attrs.zh.md)

## Scale

Scale serves as the bridge for converting from data space to graphic attribute space. Each graphic attribute corresponds to one or more scales.

### Scale Types

| Type | Description | Use Case |
|------|-------------|----------|
| `linear` | Linear scale | Continuous numeric data |
| `cat` | Category scale | Categorical data |
| `time` | Time scale | Time/date data |
| `log` | Logarithmic scale | Exponential growth data |
| `pow` | Power scale | Data emphasizing differences |

### Scale Configuration Examples

```jsx
<Chart
  data={data}
  scale={{
    sold: {
      type: 'linear',
      min: 0,
      max: 500,
      tickCount: 5,
    },
    genre: {
      type: 'cat',
    },
    date: {
      type: 'time',
      mask: 'YYYY-MM-DD',
    },
  }}
>
  {/* ... */}
</Chart>
```

For detailed scale instructions, see: [Scale](/tutorial/scale.en.md)

## Coordinate

Coordinate describes how data is mapped to the plane where the graphic is located. A geometry mark will have different appearances under different coordinate systems.

### Coordinate Types

| Type | Description | Use Case |
|------|-------------|----------|
| `rect` | Cartesian coordinate system (default) | Bar charts, line charts, scatter plots, etc. |
| `polar` | Polar coordinate system | Pie charts, rose charts, radar charts, etc. |
| `helix` | Helix coordinate system | Special visualization scenarios |

### Coordinate Configuration Examples

```jsx
// Cartesian coordinate system (default)
<Chart data={data}>
  <Interval x="genre" y="sold" />
</Chart>

// Polar coordinate system - pie chart
<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="genre" y="sold" color="genre" coord="polar" />
</Chart>

// Polar coordinate system - rose chart
<Chart data={data} coord={{ type: 'polar', innerRadius: 0.3 }}>
  <Interval x="genre" y="sold" color="genre" coord="polar" />
</Chart>
```

For detailed coordinate instructions, see: [Coordinate](/tutorial/coordinate.en.md)

## Auxiliary Elements

Auxiliary elements are used to enhance the readability and comprehensibility of charts, including:

| Component | Description |
|-----------|-------------|
| `Axis` | Coordinate axis, displaying data ticks and labels |
| `Legend` | Legend, indicating different data types |
| `Tooltip` | Tooltip, displaying detailed data information |
| `Guide` | Guide mark, adding auxiliary lines, text, etc. |

### Auxiliary Element Examples

```jsx
<Chart data={data}>
  <Axis field="genre" />
  <Axis field="sold" />
  <Interval x="genre" y="sold" color="genre" />
  <Tooltip />
  <Legend />
</Chart>
```

## Complete Example

The following is an example using the complete graphic grammar:

```jsx
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context}>
    <Chart
      data={data}
      scale={{
        sold: {
          min: 0,
          tickInterval: 50,
        },
      }}
    >
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
      <Tooltip />
      <Legend />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

### Graphic Grammar Mapping

The graphic grammar mapping relationship in the above example:

| Level | Element | Description |
|-------|---------|-------------|
| Data | `data` | Sales data in JSON array format |
| Scale | `scale` | sold field uses linear scale with minimum value of 0 |
| Geometry | `<Interval />` | Uses bar chart geometry mark |
| Graphic Attributes | `x`, `y`, `color` | genre maps to x-axis, sold maps to y-axis, genre maps to color |
| Coordinate | Default rect | Uses Cartesian coordinate system |
| Auxiliary Elements | `<Axis />`, `<Tooltip />`, `<Legend />` | Adds coordinate axis, tooltip, and legend |

## Summary

In F2, a chart is a mapping from data to the graphic attributes of geometry mark objects. After understanding the graphic grammar, you can:

1. **Flexible Combination**: Create various charts by combining different geometry marks and graphic attributes
2. **Precise Control**: Precisely control chart appearance through scales, coordinates, and other elements
3. **Quick Extension**: Quickly create new visualization types based on graphic grammar

## More Content

- [Core Concepts](/tutorial/understanding.en.md)
- [Data Processing](/tutorial/data.en.md)
- [Scale](/tutorial/scale.en.md)
- [Geometry](/api/chart/geometry.zh.md)
- [Shape Attributes](/tutorial/shape-attrs.zh.md)
- [Coordinate](/tutorial/coordinate.en.md)
