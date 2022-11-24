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
    value: 350,
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
    <Chart data={data}>
      <Axis
        field="day"
        tickCount={3}
        style={{
          label: { align: 'between' },
        }}
      />
      <Axis field="value" tickCount={5} />
      <Line x="day" y="value" />
      <Point x="day" y="value" />
      <Tooltip />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
