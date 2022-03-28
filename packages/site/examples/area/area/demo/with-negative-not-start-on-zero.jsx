/** @jsx jsx */
import { jsx, Canvas, Chart, Area, Line, Axis, Tooltip } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  {
    month: 'Jan.',
    value: 6.06,
  },
  {
    month: 'Feb.',
    value: 82.2,
  },
  {
    month: 'Mar.',
    value: -22.11,
  },
  {
    month: 'Apr.',
    value: 21.53,
  },
  {
    month: 'May.',
    value: -21.74,
  },
  {
    month: 'Jun.',
    value: 73.61,
  },
  {
    month: 'Jul.',
    value: 53.75,
  },
  {
    month: 'Aug.',
    value: 60.32,
  },
];
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        month: {
          range: [0, 1],
        },
        value: {
          tickCount: 5,
        },
      }}
    >
      <Axis field="month" />
      <Axis field="value" />
      <Area x="month" y="value" startOnZero={false} />
      <Line x="month" y="value" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
