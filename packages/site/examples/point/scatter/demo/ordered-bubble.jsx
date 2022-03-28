/** @jsx jsx */
import { jsx, Canvas, Chart, Point } from '@antv/f2';

const data = [
  {
    name: 'Stripe',
    volumes: 1.5,
    x: 0.8,
    y: 50,
  },
  {
    name: 'Swipely',
    volumes: 2,
    x: 2.5,
    y: 50,
  },
  {
    name: 'Square',
    volumes: 30,
    x: 4.2,
    y: 50,
  },
  {
    name: 'Alipay',
    volumes: 150,
    x: 6.7,
    y: 50,
  },
  {
    name: 'Paypal',
    volumes: 180,
    x: 10.5,
    y: 50,
  },
];

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{}}
      scale={{
        y: {
          min: 0,
          max: 100,
        },
        x: {
          max: 12,
        },
      }}
    >
      <Point
        x="x"
        y="y"
        color={{
          field: 'volumes',
          range: ['#BAE7FF', '#1890FF', '#0050B3'],
        }}
        size={{
          field: 'volumes',
          range: [10, 50],
        }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
