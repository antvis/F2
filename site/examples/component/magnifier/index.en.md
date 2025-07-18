---
title: Dynamic Line Chart with Magnifier
order: 10
---

Dynamic line chart combined with the Magnifier component can display real-time data changes and allow users to focus on the latest data details.

## Code Demo

- [Dynamic Line Chart with Magnifier](./demo/magnifier-dynamic.jsx): A dynamic line chart with magnifier functionality for detailed view of the latest data changes.

```jsx
import { jsx, Canvas, Chart, Line, Axis, Magnifier } from '@antv/f2';

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Line x="time" y="value" color="#1890FF" />
      <Magnifier
        focusRange={[data.length - 9, data.length - 1]}
        frameStyle={{
          background: '#fff',
          boxShadow: '0 2px 8px rgba(24,144,255,0.15)',
        }}
      />
      <Axis field="value" />
      <Axis field="time" />
    </Chart>
  </Canvas>
);
```

## Use Cases

- Real-time data monitoring and display
- Scenarios requiring focus on the latest data
- Visualization of streaming data such as stocks or sensors
