/** @jsx jsx */
import { Axis, Canvas, Chart, Interval, jsx } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { category: 'Category1', value: 10 },
  { category: 'Category2', value: 15 },
  { category: 'Category3', value: 20 },
  { category: 'Category4', value: 25 },
  { category: 'Category5', value: 30 },
  { category: 'Category6', value: 35 },
  { category: 'Category7', value: 40 },
  { category: 'Category8', value: 45 },
  { category: 'Category9', value: 50 },
  { category: 'Category10', value: 55 },
  { category: 'Category11', value: 60 },
  { category: 'Category12', value: 65 },
  { category: 'Category13', value: 70 },
  { category: 'Category14', value: 75 },
  { category: 'Category15', value: 80 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="category" labelAutoRotate={true} />
      <Axis field="value" />
      <Interval x="category" y="value" color="#2FC25B" />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
