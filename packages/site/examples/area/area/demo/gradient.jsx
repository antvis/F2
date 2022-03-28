/** @jsx jsx */
import { jsx, Canvas, Chart, Area, Line, Axis, Tooltip } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  {
    time: '2016-08-08 00:00:00',
    tem: 10,
  },
  {
    time: '2016-08-08 00:10:00',
    tem: 22,
  },
  {
    time: '2016-08-08 00:30:00',
    tem: 16,
  },
  {
    time: '2016-08-09 00:35:00',
    tem: 26,
  },
  {
    time: '2016-08-09 01:00:00',
    tem: 12,
  },
  {
    time: '2016-08-09 01:20:00',
    tem: 26,
  },
  {
    time: '2016-08-10 01:40:00',
    tem: 18,
  },
  {
    time: '2016-08-10 02:00:00',
    tem: 26,
  },
  {
    time: '2016-08-10 02:20:00',
    tem: 12,
  },
];
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        time: {
          type: 'timeCat',
          tickCount: 3,
        },
        tem: {
          min: 0,
        },
      }}
    >
      <Axis
        field="time"
        style={{
          label: { align: 'between' },
        }}
      />
      <Axis field="tem" />
      <Area x="time" y="tem" color="l(90) 0:#1890FF 1:#f7f7f7" shape="smooth" />
      <Line x="time" y="tem" color="l(90) 0:#1890FF 1:#f7f7f7" shape="smooth" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
