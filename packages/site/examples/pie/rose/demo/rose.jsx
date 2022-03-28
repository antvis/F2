/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  {
    year: '2001',
    population: 41.8,
  },
  {
    year: '2002',
    population: 25.8,
  },
  {
    year: '2003',
    population: 31.7,
  },
  {
    year: '2004',
    population: 46,
  },
  {
    year: '2005',
    population: 28,
  },
];
const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        type: 'polar',
      }}
      scale={{
        population: {
          min: 0,
        },
      }}
    >
      <Interval x="year" y="population" color="year" />
      <Legend position="right" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
