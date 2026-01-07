---
title: Quick Start
order: 0
---

This guide will help you get started with F2, from installation to rendering your first chart.

## Features

Starting from F2 4.0, we use declarative programming to build charts, providing a more intuitive development experience:

### Declarative

Declarative programming makes code more intuitive and concise, avoiding complex API calls. F2 uses JSX syntax, which is not only easy to use but also integrates seamlessly with frameworks like React and Vue.

### Component-Based

Components are essential for building complex visualizations. F2 follows React's design patterns and provides a complete set of component capabilities, making it simple to encapsulate your own components.

## Installation

### Install via npm

[![](https://img.shields.io/npm/v/@antv/f2.svg)](https://npmjs.com/package/@antv/f2) [![](https://img.shields.io/npm/dm/@antv/f2.svg)](https://npmjs.com/package/@antv/f2)

```bash
npm install @antv/f2 --save
```

### Install via CDN

```html
<script src="https://unpkg.com/@antv/f2/dist/f2.min.js"></script>
```

## Configure JSX Transform

F2 uses JSX syntax to build charts, so you need to configure JSX transformation tools.

> Note: If your project is already using React, refer to [How to use with React](/tutorial/framework/react.en.md)

For detailed configuration instructions, see: [Configure JSX Transform](/tutorial/framework/jsx-transform.zh.md)

## One-Minute Quick Start

### 1. Create a canvas element

Create a `<canvas>` element on your page:

```html
<canvas id="myChart" width="400" height="260"></canvas>
```

### 2. Write the code

```jsx
// F2 requires data in JSON array format, where each element is a standard JSON object
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// Get canvas context
const context = document.getElementById('myChart').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
      <Tooltip />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

After completing these two steps, save the file and open it in your browser. A bar chart will be successfully rendered:

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/54ad3af8-c30d-43ca-b0e8-e21c4ea3d438.png)

## Code Analysis

### Canvas Component

`Canvas` is the root container of the chart, responsible for providing the rendering environment:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `CanvasRenderingContext2D` | - | **Required**, Canvas 2D context |
| `pixelRatio` | `number` | `window.devicePixelRatio` | Device pixel ratio for high-DPI screen adaptation |
| `width` | `number` | - | Canvas width (prioritizes canvas element's width) |
| `height` | `number` | - | Canvas height (prioritizes canvas element's height) |
| `animate` | `boolean` | `true` | Whether to enable animation |
| `children` | `ReactNode` | - | Child components |

### Chart Component

`Chart` is the core component of the chart, responsible for data processing and coordinate transformation:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Data[]` | - | **Required**, data source |
| `scale` | `ScaleConfig` | - | Scale configuration |
| `coord` | `CoordConfig` | - | Coordinate system configuration |
| `children` | `ReactNode` | - | Child components |

### Interval Component

`Interval` is used to render bar charts:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `x` | `string` | - | **Required**, x-axis field name |
| `y` | `string` | - | **Required**, y-axis field name |
| `color` | `string \| Function` | - | Color field or color mapping function |

### Axis Component

`Axis` is used to configure coordinate axes:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `field` | `string` | - | **Required**, field name |
| `position` | `string` | - | Axis position (`top`, `bottom`, `left`, `right`) |

### Tooltip Component

`Tooltip` is used to display data tooltip information.

## More Examples

For more examples, see [Demos](/examples).

## Next Steps

- Learn about [Core Concepts](/tutorial/understanding.en.md)
- Study [Chart Grammar](/tutorial/grammar.en.md)
- View [Component API](/api/chart/chart.zh.md)
- Learn how to [Use with Frameworks](/tutorial/framework/overview.zh.md)
