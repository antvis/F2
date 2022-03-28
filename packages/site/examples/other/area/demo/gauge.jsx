/** @jsx jsx */
import { jsx, Canvas, Gauge } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Gauge
      center={{ x: 150, y: 150 }}
      startAngle={Math.PI}
      endAngle={Math.PI * 2}
      percent={0.5}
      r="200px"
      tickCount={6}
      tickOffset="-40px"
      tickLength="20px"
    />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
