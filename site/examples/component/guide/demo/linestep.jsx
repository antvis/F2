/** @jsx jsx */
import { Canvas, Chart, Interval, jsx, PolylineGuide } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

const goal = [
  { genre: 'min', sold: 225 },
  { genre: 'Sports', sold: 225 },
  { genre: 'Strategy', sold: 85 },
  { genre: 'Action', sold: 100 },
  { genre: 'Shooter', sold: 250 },
  { genre: 'Other', sold: 120 },
  { genre: 'max', sold: 120 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Interval x="genre" y="sold" color="#FA8416" />
      <PolylineGuide
        records={[
          { genre: 'min', sold: 0 },
          ...goal,
          {
            genre: 'max',
            sold: 0,
          },
        ]}
        style={{
          step: 'middle',
          fill: 'rgba(255,253,251,0.6)',
        }}
      />
      <PolylineGuide
        records={goal}
        style={{
          step: 'middle',
          fill: 'none',
          stroke: 'rgba(250,132,22,0.8)',
          lineDash: ['5px', '5px'],
          lineWidth: '2px',
        }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
