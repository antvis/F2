/** @jsx jsx */
import { jsx, Canvas, Chart, Area, Line, Axis, Tooltip } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  {
    time: 'Jan.',
    tem: 1000,
  },
  {
    time: 'Feb.',
    tem: 2200,
  },
  {
    time: 'Mar.',
    tem: 2000,
  },
  {
    time: 'Apr.',
    tem: 2600,
  },
  {
    time: 'May.',
    tem: 2000,
  },
  {
    time: 'Jun.',
    tem: 2600,
  },
  {
    time: 'Jul.',
    tem: 2800,
  },
  {
    time: 'Aug.',
    tem: 2000,
  },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        tem: {
          min: 0,
          tickCount: 5,
        },
        time: {
          range: [0, 1],
        },
      }}
    >
      <Axis field="time" />
      <Axis field="tem" />
      <Area x="time" y="tem" />
      <Line x="time" y="tem" />
      <Tooltip />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
