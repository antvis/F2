/** @jsx jsx */
import { jsx, Canvas } from '@antv/f2';

const canvasEl = document.createElement('canvas');
document.getElementById('container').appendChild(canvasEl);
const context = canvasEl.getContext('2d');

const Shape = () => {
  return (
    <group>
      <rect
        attrs={{
          x: 10,
          y: 10,
          width: 40,
          height: 40,
          lineWidth: '2px',
          stroke: '#000',
          fill: 'red',
        }}
      />
      <circle attrs={{ x: 80, y: 30, r: 20, lineWidth: '2px', stroke: '#000', fill: 'red' }} />
      <text
        attrs={{
          x: 120,
          y: 30,
          text: '文本',
          fontSize: 20,
          fill: '#000',
        }}
      />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Shape />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
