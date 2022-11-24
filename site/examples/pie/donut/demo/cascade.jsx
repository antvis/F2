/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  {
    a: '1',
    b: 0.2,
    c: '1',
  },
  {
    a: '2',
    b: 0.5,
    c: '1',
  },
  {
    a: '3',
    b: 0.4,
    c: '1',
  },
  {
    a: '1',
    b: 0.8,
    c: '2',
  },
  {
    a: '2',
    b: 0.5,
    c: '2',
  },
  {
    a: '3',
    b: 0.6,
    c: '2',
  },
];
const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} theme={{ padding: [20, 'auto'] }}>
    <Chart
      data={data}
      coord={{
        type: 'polar',
        transposed: true,
        innerRadius: 0.5,
      }}
      scale={{}}
    >
      <Interval x="a" y="b" color="c" adjust="stack" />
      <Legend position="top" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
