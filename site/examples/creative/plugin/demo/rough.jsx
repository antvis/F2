/** @jsx jsx */
import { Canvas, Chart, Interval, jsx, Axis, CanvasRenderer } from '@antv/f2';
import { Plugin as PluginRoughCanvasRenderer } from '@antv/g-plugin-rough-canvas-renderer';
const context = document.getElementById('container').getContext('2d');

const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
];

// create a renderer
const canvasRenderer = new CanvasRenderer();
canvasRenderer.registerPlugin(new PluginRoughCanvasRenderer());

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} renderer={canvasRenderer}>
    <Chart data={data}>
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre"/>
    </Chart>
  </Canvas>
);
const canvas = new Canvas(props);
canvas.render();