/** @jsx jsx */
import { jsx, Canvas, Chart, Line, Legend, Axis } from '@antv/f2';

const data = [
  {
    time: '2016-08-08 00:00:00',
    value: 10,
    type: '预期收益率',
  },
  {
    time: '2016-08-08 00:10:00',
    value: 22,
    type: '预期收益率',
  },
  {
    time: '2016-08-08 00:30:00',
    value: 16,
    type: '预期收益率',
  },
  {
    time: '2016-08-09 00:35:00',
    value: 26,
    type: '预期收益率',
  },
  {
    time: '2016-08-09 01:00:00',
    value: 12,
    type: '预期收益率',
  },
  {
    time: '2016-08-09 01:20:00',
    value: 26,
    type: '预期收益率',
  },
  {
    time: '2016-08-10 01:40:00',
    value: 18,
    type: '预期收益率',
  },
  {
    time: '2016-08-10 02:00:00',
    value: 26,
    type: '预期收益率',
  },
  {
    time: '2016-08-10 02:20:00',
    value: 12,
    type: '预期收益率',
  },
  {
    time: '2016-08-08 00:00:00',
    value: 4,
    type: '实际收益率',
  },
  {
    time: '2016-08-08 00:10:00',
    value: 3,
    type: '实际收益率',
  },
  {
    time: '2016-08-08 00:30:00',
    value: 6,
    type: '实际收益率',
  },
  {
    time: '2016-08-09 00:35:00',
    value: -12,
    type: '实际收益率',
  },
  {
    time: '2016-08-09 01:00:00',
    value: 1,
    type: '实际收益率',
  },
  {
    time: '2016-08-09 01:20:00',
    value: 9,
    type: '实际收益率',
  },
  {
    time: '2016-08-10 01:40:00',
    value: 13,
    type: '实际收益率',
  },
  {
    time: '2016-08-10 02:00:00',
    value: -3,
    type: '实际收益率',
  },
  {
    time: '2016-08-10 02:20:00',
    value: 11,
    type: '实际收益率',
  },
];

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        time: {
          type: 'timeCat',
          mask: 'hh:mm',
          range: [0, 1],
          tickCount: 3,
        },
        value: {
          formatter: (value) => `${value}%`,
          tickCount: 3,
        },
      }}
    >
      <Axis field="time" style={{ label: { align: 'between' } }} />
      <Axis field="value" />
      <Line
        x="time"
        y="value"
        shape={{
          field: 'type',
          callback: (type) => {
            if (type === '预期收益率') {
              return 'line';
            }
            if (type === '实际收益率') {
              return 'dash';
            }
          },
        }}
        color="type"
      />
      <Legend position="top" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
