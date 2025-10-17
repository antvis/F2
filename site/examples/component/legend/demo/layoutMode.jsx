/** @jsx jsx */
import { Canvas, Chart, Interval, jsx, Legend } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const multiLineData = [
  { genre: '债券基金', sold: 275, a: '1' },
  { genre: '申万宏源固守+基金指数', sold: 115, a: '1' },
  { genre: '基金指数', sold: 120, a: '1' },
  { genre: '股票基金', sold: 300, a: '1' },
  { genre: '混合基金', sold: 180, a: '1' },
  { genre: '货币基金', sold: 90, a: '1' },
  { genre: 'QDII基金', sold: 60, a: '1' },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={multiLineData}>
      <Legend layoutMode="adaptive" />
      <Interval x="genre" y="sold" color="genre" />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
