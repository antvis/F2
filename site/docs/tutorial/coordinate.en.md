---
title: Coordinate System
order: 5
---

A coordinate system is a 2D positioning system that combines two position scales, describing how data is mapped to the plane where graphics are located.

F2 provides two types of coordinate systems: Cartesian (rect) and Polar. All coordinate systems are 2-dimensional.

## Coordinate System Types

| Type | Description | Use Cases |
|------|-------------|-----------|
| `rect` | Cartesian coordinate system, formed by two perpendicular x and y axes | Bar charts, line charts, scatter plots, etc. |
| `polar` | Polar coordinate system, formed by angle and radius dimensions | Pie charts, rose charts, radar charts, etc. |

### Coordinate System Comparison

Transforming coordinate system types changes the shape of geometry marks. For example, bar charts transform into various types under different coordinate systems:

| Chart Type | Cartesian | Polar (Not Transposed) | Polar (Transposed) |
|------------|------------|------------------------|---------------------|
| Stacked Bar | ![](https://gw.alipayobjects.com/zos/skylark/e3c2af2e-8c42-4743-9eb2-00be4beecb50/2018/png/4b932828-aad3-4934-99be-0580dd6b88ba.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/a0e92822-3020-4f2c-b63b-19e9e7204a86/2018/png/cdb767a2-105d-499d-af09-383323b35222.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/5de8fa15-6ea1-4a13-93c0-e4646ca6601c/2018/png/a43c60de-692f-433a-bab2-93fc6e9bba3b.png#width=) |
| Bar | ![](https://gw.alipayobjects.com/zos/skylark/e392736b-86a1-4452-9265-f7a5e8dc1805/2018/png/47caf538-6703-4db5-ae68-6605837f2803.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/383cdf9f-a631-4fc4-9f6a-593a22822242/2018/png/dd798932-1555-4988-bc68-353835d051b3.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/1a056c5c-13da-46d4-9315-2d589588d889/2018/png/4171f504-2f52-4ed6-ba8f-b7b286650692.png#width=) |

## How to Set Coordinate System

F2 uses Cartesian coordinate system by default. To switch coordinate systems, set the `coord` attribute on the `Chart` component:

```jsx
<Chart
  data={data}
  coord={{
    type: 'polar',
  }}
>
  {/* ... */}
</Chart>
```

## Cartesian Coordinate System

The Cartesian coordinate system (rect) is the default coordinate system type, formed by two perpendicular x and y axes.

### Configuration Syntax

```jsx
<Chart
  coord={{
    type: 'rect',        // Declare Cartesian (can be omitted, default value)
    transposed: false,   // Whether to transpose axes
  }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

### Transposed Coordinate System

Swap x and y axes, suitable for bar charts:

```jsx
<Chart
  coord={{
    type: 'rect',
    transposed: true,    // Transpose axes
  }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

## Polar Coordinate System

The polar coordinate system is formed by angle and radius dimensions, suitable for visualizing periodic data such as time and direction.

### Configuration Syntax

```jsx
<Chart
  coord={{
    type: 'polar',           // Declare polar coordinate system
    startAngle: -Math.PI,    // Start angle (optional)
    endAngle: 0,             // End angle (optional)
    innerRadius: 0.3,        // Inner radius, for donut charts (optional)
    radius: 1,               // Outer radius (optional)
    transposed: false,       // Whether to transpose (optional)
  }}
>
  {/* ... */}
</Chart>
```

### CoordConfig Type Definition

```typescript
interface CoordConfig {
  type?: 'rect' | 'polar';  // Coordinate system type
  transposed?: boolean;      // Whether to transpose
  startAngle?: number;       // Start angle (polar only)
  endAngle?: number;         // End angle (polar only)
  innerRadius?: number;      // Inner radius (polar only)
  radius?: number;           // Outer radius (polar only)
}
```

### Angle Description

The default start and end angles for F2 polar coordinates are shown below:

![](https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png#width=)

- Default start angle: -π (9 o'clock direction)
- Default end angle: 0 (3 o'clock direction)

## Chart Examples

### Pie Chart

Draw a pie chart using polar coordinates:

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

### Rose Chart

Draw a rose chart using polar coordinates:

```jsx
const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 60 },
];

<Chart data={data} coord={{ type: 'polar', transposed: true }}>
  <Interval x="name" y="value" color="name" coord="polar" />
</Chart>
```

### Donut Chart

Set inner radius to draw a donut chart:

```jsx
<Chart
  data={data}
  coord={{
    type: 'polar',
    innerRadius: 0.5,  // Set inner radius to 0.5
  }}
>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

### Semi-Circle Pie Chart

Adjust start and end angles:

```jsx
<Chart
  data={data}
  coord={{
    type: 'polar',
    startAngle: -Math.PI / 2,  // -90 degrees
    endAngle: Math.PI / 2,     // 90 degrees
  }}
>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

### Radar Chart

Use transposed mode of polar coordinates:

```jsx
const data = [
  { item: 'Attack', value: 80 },
  { item: 'Defense', value: 70 },
  { item: 'Speed', value: 90 },
  { item: 'Power', value: 60 },
  { item: 'Stamina', value: 75 },
];

<Chart
  data={data}
  scale={{
    value: {
      min: 0,
      max: 100,
    },
  }}
  coord={{
    type: 'polar',
    radius: 0.8,
  }}
>
  <Line x="item" y="value" />
  <Point x="item" y="value" />
  <Axis field="item" />
  <Axis field="value" />
</Chart>
```

### Bar Chart

Use transposed Cartesian coordinates:

```jsx
<Chart
  data={data}
  coord={{
    type: 'rect',
    transposed: true,  // Transpose axes
  }}
>
  <Interval x="genre" y="sold" color="genre" />
</Chart>
```

### Stacked Bar Chart

```jsx
<Chart
  data={data}
  coord={{
    type: 'rect',
    transposed: true,
  }}
  scale={{
    sold: {
      stack: true,  // Enable stacking
    },
  }}
>
  <Interval x="genre" y="sold" color="type" />
</Chart>
```

## Advanced Configuration

### Dynamic Coordinate System Switching

```jsx
class SwitchableChart extends Component {
  state = {
    coordType: 'rect',
  };

  handleSwitch = () => {
    this.setState({
      coordType: this.state.coordType === 'rect' ? 'polar' : 'rect',
    });
  };

  render() {
    const { coordType } = this.state;
    return (
      <Chart
        data={data}
        coord={{ type: coordType }}
      >
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    );
  }
}
```

### Custom Coordinate System

```jsx
<Chart
  coord={{
    type: 'polar',
    startAngle: -Math.PI,     // Start from 9 o'clock
    endAngle: 0,              // End at 3 o'clock
    innerRadius: 0.2,         // 20% inner radius
    radius: 0.9,              // 90% outer radius
  }}
>
  {/* ... */}
</Chart>
```

## Common Questions

### How to draw a semi-circle pie chart?

Adjust start and end angles:

```jsx
coord={{
  type: 'polar',
  startAngle: -Math.PI / 2,  // Start from top
  endAngle: Math.PI / 2,     // End at top
}}
```

### How to draw a donut chart?

Set the `innerRadius` attribute:

```jsx
coord={{
  type: 'polar',
  innerRadius: 0.5,  // 50% inner radius
}}
```

### How to draw a rose chart?

Use transposed mode of polar coordinates:

```jsx
coord={{
  type: 'polar',
  transposed: true,  // Transpose
}}
```

### How to swap x and y axes?

Use the `transposed` attribute:

```jsx
coord={{
  type: 'rect',
  transposed: true,  // Swap x and y axes
}}
```

## Related Documentation

- [Chart Grammar](/tutorial/grammar.en.md)
- [Scale](/tutorial/scale.en.md)
- [Core Concepts](/tutorial/understanding.en.md)
