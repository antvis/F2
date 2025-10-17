/** @jsx jsx */
import { Axis, Canvas, Chart, Interval, jsx } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = Array.from({ length: 100 }, (_, i) => ({
  category: `Cat${i + 1}`,
  value: ((i % 10) + 1) * 10,
}));

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="category" labelAutoHide={true} />
      <Axis field="value" />
      <Interval x="category" y="value" color="#722ED1" />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
