/** @jsx jsx */
import { jsx, Canvas, Chart, Line, Point, Axis, Tooltip } from '@antv/f2';

const data = [
  {
    day: '周一',
    value: 300,
  },
  {
    day: '周二',
    value: 400,
  },
  {
    day: '周三',
    value: null,
  },
  {
    day: '周四',
    value: 500,
  },
  {
    day: '周五',
    value: 490,
  },
  {
    day: '周六',
    value: 600,
  },
  {
    day: '周日',
    value: 900,
  },
];
const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        value: {
          tickCount: 5,
          min: 0,
        },
        day: {
          range: [0, 1],
        },
      }}
    >
      <Axis field="day" />
      <Axis field="value" />
      <Line x="day" y="value" connectNulls />
      <Point x="day" y="value" />
      <Tooltip showCrosshairs />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
