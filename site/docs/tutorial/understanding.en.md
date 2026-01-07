---
title: Core Concepts
order: 1
---

To better use F2 for data visualization, we need to understand the composition of F2 charts and related terminology.

## Chart Structure

F2 charts adopt a declarative component-based architecture. A complete chart is composed of multiple components:

```
Canvas (Canvas Container)
  └── Chart (Chart Core)
        ├── Axis (Coordinate Axis)
        ├── Geometry (Geometry Mark)
        ├── Tooltip (Tooltip)
        ├── Legend (Legend)
        └── Guide (Guide Mark)
```

### Chart Examples

![](https://gw.alipayobjects.com/zos/rmsportal/tpfdzWDYmxzHkquTihJe.png#width=600)
![](https://gw.alipayobjects.com/zos/rmsportal/lUqXwLjgRWhugemcNsqc.png#width=600)

## Core Terminology

| Term | English | Description |
|------|---------|-------------|
| **Coordinate Axis** | Axis | Charts typically contain two axes. In Cartesian coordinates, these are the x-axis and y-axis; in polar coordinates, they are composed of angle and radius. Each axis consists of axis line, tick line, label, and grid. |
| **Legend** | Legend | An auxiliary element for charts, used to indicate different data types and ranges, assisting in reading charts and helping users filter data. |
| **Geometry Mark** | Geometry | Geometric shapes such as points, lines, and areas. The type of geometry mark determines the chart type and represents the actual visualization of data. |
| **Graphic Attribute** | Attribute | Corresponds to visual channels in visual encoding, including position, color, size, and shape. |
| **Coordinate System** | Coordinate | A 2D positioning system combining two position scales, describing how data is mapped to the graphic plane. |
| **Tooltip** | Tooltip | Displays data information in a tooltip when hovering over a point, helping users obtain specific data. |
| **Guide Mark** | Guide | Useful for drawing auxiliary lines, boxes, or text on charts, such as warning lines, maximum value lines, or highlighting specific ranges. |

## Declarative Syntax

F2 uses declarative JSX syntax for more intuitive and concise code:

```jsx
<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    {/* Coordinate axes */}
    <Axis field="genre" />
    <Axis field="sold" />

    {/* Geometry mark - bar chart */}
    <Interval x="genre" y="sold" color="genre" />

    {/* Tooltip */}
    <Tooltip />

    {/* Legend */}
    <Legend />
  </Chart>
</Canvas>
```

### Advantages of Declarative Syntax

- **Intuitive**: Clear component structure at a glance
- **Concise**: Avoid complex API call chains
- **Composable**: Components can be combined and nested flexibly
- **Framework-friendly**: Seamless integration with React, Vue

## Component Details

### Canvas - Canvas Container

Canvas is the root container of the chart, providing the rendering environment:

```jsx
<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  {/* Child components */}
</Canvas>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `CanvasRenderingContext2D` | - | **Required**, Canvas 2D context |
| `pixelRatio` | `number` | `window.devicePixelRatio` | Device pixel ratio |
| `width` | `number` | - | Canvas width |
| `height` | `number` | - | Canvas height |
| `animate` | `boolean` | `true` | Whether to enable animation |

### Chart - Chart Core

Chart is responsible for data processing and coordinate transformation:

```jsx
<Chart data={data}>
  {/* Geometry marks and components */}
</Chart>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Data[]` | - | **Required**, data source |
| `scale` | `ScaleConfig` | - | Scale configuration |
| `coord` | `CoordConfig` | - | Coordinate system configuration |

### Geometry - Geometry Mark

Geometry marks determine the chart type. F2 provides various built-in geometry marks:

| Geometry Mark | Component | Chart Type |
|---------------|-----------|------------|
| Interval | `<Interval />` | Bar chart, column chart |
| Line | `<Line />` | Line chart, curve chart |
| Point | `<Point />` | Scatter plot, dot plot |
| Area | `<Area />` | Area chart |
| Candlestick | `<Candlestick />` | Candlestick chart |

```jsx
// Bar chart
<Interval x="genre" y="sold" color="genre" />

// Line chart
<Line x="date" y="value" color="type" />

// Scatter plot
<Point x="weight" y="height" color="gender" />
```

### Graphic Attributes

Graphic attributes control the visual appearance of geometry marks:

| Attribute | Description | Example |
|-----------|-------------|---------|
| `position` | Position, maps fields to x or y axis | `x="genre", y="sold"` |
| `color` | Color, supports field or function | `color="genre"` or `color={datum => datum.value > 100 ? 'red' : 'blue'}` |
| `size` | Size, controls point size, line thickness, etc. | `size={10}` or `size={datum => datum.value}` |
| `shape` | Shape, controls the shape of geometry marks | `shape="circle"` or `shape="hollowCircle"` |

### Coordinate System

Coordinate system describes how data is mapped to the plane:

| Type | Description | Configuration |
|------|-------------|---------------|
| rect | Cartesian coordinate system (default) | `<coord type="rect" />` |
| polar | Polar coordinate system | `<coord type="polar" />` |
| helix | Helix coordinate system | `<coord type="helix" />` |

```jsx
// Use polar coordinate system (pie chart, rose chart, etc.)
<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="genre" y="sold" color="genre" coord="polar" />
</Chart>
```

### Scale

Scale is used to convert data into graphic attributes:

```jsx
<Chart
  data={data}
  scale={{
    sold: {
      min: 0,
      max: 500,
      tickCount: 5,
    },
    genre: {
      type: 'cat',
    },
  }}
>
  {/* ... */}
</Chart>
```

For detailed configuration, see: [Scale](/tutorial/scale.en.md)

## Data Format

F2 requires the data source to be a JSON array, where each element is a standard JSON object:

```jsx
const data = [
  { genre: 'Sports', sold: 275, year: 2023 },
  { genre: 'Strategy', sold: 115, year: 2023 },
  { genre: 'Action', sold: 120, year: 2023 },
  { genre: 'Shooter', sold: 350, year: 2023 },
  { genre: 'Other', sold: 150, year: 2023 },
];
```

For data processing, see: [Data Processing](/tutorial/data.en.md)

## Complete Example

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
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
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

## Next Steps

- Learn [Chart Grammar](/tutorial/grammar.en.md)
- Understand [Data Processing](/tutorial/data.en.md)
- View [Component API](/api/chart/chart.zh.md)
- Learn [Graphic Attributes](/tutorial/shape-attrs.zh.md)
