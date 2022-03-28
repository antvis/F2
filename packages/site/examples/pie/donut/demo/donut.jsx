/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  {
    name: '股票类',
    percent: 83.59,
    a: '1',
  },
  {
    name: '债券类',
    percent: 2.17,
    a: '1',
  },
  {
    name: '现金类',
    percent: 14.24,
    a: '1',
  },
];

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} theme={{ padding: [20, 'auto'] }}>
    <Chart
      scale={{
        percent: {
          formatter: function formatter(val) {
            return val + '%';
          },
        },
      }}
      data={data}
      coord={{
        type: 'polar',
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85,
      }}
    >
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color={{
          field: 'name',
          range: ['#FE5D4D', '#3BA4FF', '#737DDE'],
        }}
      />
      <Legend
        position="right"
        itemFormatter={(val) => {
          return val + '    ' + map[val];
        }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
