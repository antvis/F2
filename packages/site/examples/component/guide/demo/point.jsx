/** @jsx jsx */
import { jsx, Canvas, Chart, Line, PointGuide } from '@antv/f2';

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
      <Line x="genre" y="sold" />
      {data.map((item) => {
        const { sold } = item;
        return <PointGuide records={[item]} />;
      })}
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
