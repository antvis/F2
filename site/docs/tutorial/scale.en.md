---
title: Scale
order: 4
---

Scale is the conversion bridge between data space and graphic space, responsible for converting raw data to values in the [0, 1] range and vice versa. Different data types correspond to different scale types.

## Scale Types

Based on data types, F2 supports the following scale types:

| Type | Description | Use Cases |
|------|-------------|-----------|
| `identity` | Constant type, where a data field remains unchanged | Constant fields |
| `linear` | Continuous numbers, such as [1, 2, 3, 4, 5] | Continuous numerical data |
| `cat` | Categorical, such as ['Male', 'Female'] | Categorical data |
| `timeCat` | Time type | Time and date data |

## How to Set Scale

Define scales through the `scale` property of the `Chart` component:

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
      type: 'cat',      // Declare field a as categorical type
    },
    b: {
      min: 0,           // Manually specify minimum value
      max: 100,         // Manually specify maximum value
    },
  }}
>
  <Interval x="a" y="b" />
</Chart>
```

## Common Properties

Common properties supported by all scale types:

| Property | Type | Description |
|----------|------|-------------|
| `type` | `string` | Scale type: `identity`, `linear`, `cat`, `timeCat` |
| `formatter` | `Function` | Format tick point text, affects axis, legend, and tooltip display |
| `range` | `Array` | Output range in format `[min, max]`, defaults to `[0, 1]` |
| `alias` | `string` | Display alias for the field, used for converting English names to Chinese names |
| `tickCount` | `number` | Number of tick points on the axis |
| `ticks` | `Array` | Specify the text information for tick points |

## Linear Scale

For continuous numerical data.

### Configuration Properties

| Property | Type | Description |
|----------|------|-------------|
| `nice` | `boolean` | Optimize numeric range to make tick marks evenly distributed, defaults to `true` |
| `min` | `number` | Minimum value of numeric range |
| `max` | `number` | Maximum value of numeric range |
| `tickInterval` | `number` | Interval between tick points, mutually exclusive with tickCount |

### Configuration Examples

```jsx
// Basic configuration
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

// Using tickInterval
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

// Using nice to optimize range
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

// Using formatter for formatting
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

### Type Definition

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

## Cat Scale

For categorical data.

### Configuration Properties

| Property | Type | Description |
|----------|------|-------------|
| `values` | `Array` | Specify the order of categorical values |
| `isRounding` | `boolean` | Whether to allow rounding to satisfy even tick distribution, defaults to `false` |

### Configuration Examples

```jsx
// Basic configuration
<Chart
  scale={{
    genre: {
      type: 'cat',
    },
  }}
>
  <Interval x="genre" y="sold" />
</Chart>

// Specify category order
<Chart
  scale={{
    level: {
      type: 'cat',
      values: ['Minimum', 'Moderate', 'Maximum'],
    },
  }}
>
  <Interval x="level" y="value" />
</Chart>
```

### values Property Use Cases

**Scenario 1: Specify Category Order**

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
      values: ['min', 'mid', 'max'],  // Display in specified order
    },
  }}
>
  <Interval x="level" y="value" />
</Chart>
```

**Scenario 2: Numeric to Category Mapping (Index Mapping)**

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
      values: ['January', 'February', 'March'],  // month values serve as indices
    },
  }}
>
  <Line x="month" y="value" />
</Chart>
```

## TimeCat Scale

For time and date data, **sorts data by default**.

### Configuration Properties

| Property | Type | Description |
|----------|------|-------------|
| `nice` | `boolean` | Whether to optimize ticks for better readability |
| `mask` | `string` | Time format, defaults to `'YYYY-MM-DD'` |
| `sortable` | `boolean` | Whether to sort, defaults to `true`. Can be set to `false` for pre-sorted data to improve performance |
| `values` | `Array` | Specify the order of specific time values |

### Configuration Examples

```jsx
// Basic configuration
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

// Custom time format
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

// Performance optimization: data already sorted
<Chart
  data={sortedData}
  scale={{
    date: {
      type: 'timeCat',
      sortable: false,  // Skip sorting, improve performance
    },
  }}
>
  <Line x="date" y="value" />
</Chart>

// Specify time order
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

### Type Definition

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

## Common Configuration Scenarios

### Set Axis Range

```jsx
<Chart
  scale={{
    value: {
      min: 0,       // Set minimum value
      max: 100,     // Set maximum value
      tickCount: 5, // 5 tick points
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

### Format Tick Labels

```jsx
<Chart
  scale={{
    value: {
      formatter: (val) => `${val}K`,
    },
    date: {
      formatter: (val) => {
        const date = new Date(val);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      },
    },
  }}
>
  <Line x="date" y="value" />
  <Axis field="value" />
  <Axis field="date" />
</Chart>
```

### Set Tick Interval

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

### Custom Tick Values

```jsx
<Chart
  scale={{
    value: {
      ticks: [0, 25, 50, 75, 100],  // Custom tick values
    },
  }}
>
  <Line x="date" y="value" />
</Chart>
```

### Multiple Scale Configurations

```jsx
<Chart
  scale={{
    // x-axis: categorical scale
    genre: {
      type: 'cat',
      values: ['Sports', 'Strategy', 'Action', 'Shooter', 'Other'],
    },
    // y-axis: linear scale
    sold: {
      type: 'linear',
      min: 0,
      nice: true,
    },
    // color: categorical scale
    color: {
      type: 'cat',
    },
  }}
>
  <Interval x="genre" y="sold" color="genre" />
</Chart>
```

## Advanced Configuration

### Range Control

Control the position where data maps to graphics:

```jsx
<Chart
  scale={{
    value: {
      min: 0,
      max: 100,
      range: [0, 0.8],  // Leave 20% space at the top
    },
  }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

### Alias Setting

Used to convert English field names to Chinese names:

```jsx
<Chart
  scale={{
    genre: {
      alias: 'Type',  // Display alias in legend, tooltip, etc.
    },
    sold: {
      alias: 'Sales',
    },
  }}
>
  <Interval x="genre" y="sold" />
  <Legend />
  <Tooltip />
</Chart>
```

### Dynamic Scale Configuration

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

## Type Definitions

### Complete ScaleConfig Type

```typescript
interface ScaleConfig {
  type?: 'linear' | 'cat' | 'timeCat' | 'identity';

  // Common properties
  range?: [number, number];
  alias?: string;
  formatter?: (value: any) => string;
  tickCount?: number;
  ticks?: any[];

  // linear specific
  min?: number;
  max?: number;
  nice?: boolean;
  tickInterval?: number;

  // cat specific
  values?: any[];
  isRounding?: boolean;

  // timeCat specific
  mask?: string;
  sortable?: boolean;
}

interface ChartScaleConfig {
  [fieldName: string]: ScaleConfig;
}
```

## Common Questions

### How to set axis to start from 0?

```jsx
scale={{
  value: {
    min: 0,  // Set minimum value to 0
  },
}}
```

### How to set tick interval?

Use the `tickInterval` property:

```jsx
scale={{
  value: {
    tickInterval: 20,
  },
}}
```

### How to customize tick labels?

Use `formatter` or `ticks`:

```jsx
// Method 1: formatter
scale={{
  value: {
    formatter: (val) => `${val}K`,
  },
}}

// Method 2: ticks
scale={{
  value: {
    ticks: [0, 25, 50, 75, 100],
  },
}}
```

### How to optimize performance for sorted time data?

Set `sortable: false` to skip sorting:

```jsx
scale={{
  date: {
    type: 'timeCat',
    sortable: false,
  },
}}
```

### Can mask and formatter be used together?

**No**. If both are set, `formatter` takes precedence and `mask` will not take effect.

## Related Documentation

- [Coordinate System](/tutorial/coordinate.en.md)
- [Chart Grammar](/tutorial/grammar.en.md)
- [Core Concepts](/tutorial/understanding.en.md)
