/** @jsx jsx */
import { Axis, Canvas, CanvasRenderer, Chart, Interval, jsx } from '@antv/f2';
import { Plugin as PluginRoughCanvasRenderer } from '@antv/g-plugin-rough-canvas-renderer';
const context = document.getElementById('container').getContext('2d');

const data = [
  { version: '5.0.21', rate: 1, type: 'iphone6' },
  { version: '5.0.21', rate: 13, type: '仿真' },
  { version: '5.0.21', type: 'iphone8', rate: 11 },
  { version: '5.0.21', type: 'iphone x', rate: 0 },

  { version: '5.0.29', rate: 1, type: 'iphone6' },
  { version: '5.0.29', rate: 14, type: '仿真' },
  { version: '5.0.29', type: 'iphone8', rate: 10 },
  { version: '5.0.29', type: 'iphone x', rate: 0 },

  { version: '5.0.30', rate: 1, type: 'iphone6' },
  { version: '5.0.30', rate: 15, type: '仿真' },
  { version: '5.0.30', type: 'iphone8', rate: 13 },
  { version: '5.0.30', type: 'iphone x', rate: 12 },

  { version: 'next', type: 'iphone x', rate: 24 },
];

// create a renderer
const canvasRenderer = new CanvasRenderer();
canvasRenderer.registerPlugin(new PluginRoughCanvasRenderer());

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} renderer={canvasRenderer}>
    <Chart data={data}>
      <Axis field="version" />
      <Axis field="rate" />
      <Interval x="version" y="rate" color="version" />
    </Chart>
  </Canvas>
);
const canvas = new Canvas(props);
canvas.render();
