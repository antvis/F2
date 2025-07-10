/** @jsx jsx */
import { Canvas, Chart, jsx } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

const { props } = (
  <Canvas context={context} pixelRatio={1} animate={false}>
    <Chart data={data}>
      <Line x="genre" y="sold" color="type" />
      <RectGuide
        records={[data[0], data[1]]}
        style={{ fill: 'yellow', fillOpacity: 0.5 }}
        offsetX="-24px"
        offsetY="24px"
      />
    </Chart>
  </Canvas>
);
const chart = new Canvas(props);
chart.render();
