/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, LineGuide } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Interval x="genre" y="sold" />
      <LineGuide
        records={[
          { genre: 'min', sold: '50%' },
          { genre: 'max', sold: '50%' },
        ]}
        style={{ stroke: 'red' }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
