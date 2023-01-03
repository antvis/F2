/** @jsx jsx */
import { Canvas, jsx, withGauge } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const Gauge = withGauge((props) => {
  const { center, startAngle, endAngle, r, percent, ticks } = props;
  const diff = endAngle - startAngle;
  const { x, y } = center;
  return (
    <group>
      <arc
        style={{
          cx:x,
          cy:y,
          r,
          startAngle: `${startAngle} rad`,
          endAngle: `${endAngle} rad`,
          lineWidth: '20px',
          lineCap: 'round',
          stroke: '#e7e7e7',
        }}
      />
      <arc
        style={{
          cx:x,
          cy:y,
          r,
          startAngle: `${startAngle} rad`,
          endAngle: `${startAngle} rad `,
          lineWidth: '60px',
          lineCap: 'round',
          stroke: '#0075ff',
        }}
        animation={{
          appear: {
            easing: 'linear',
            duration: 500,
            property: ['endAngle'],
            start: {
              endAngle: `${startAngle} rad`,
            },
            end: {
              endAngle: `${startAngle + diff * percent} rad `,
            },
          },
        }}
      />
      {ticks.map((tick) => {
        const { start, end } = tick;
        return (
          <line
            style={{
              x1: start.x,
              y1: start.y,
              x2: end.x,
              y2: end.y,
              lineWidth: '6px',
              lineCap: 'round',
              stroke: '#e7e7e7',
            }}
          />
        );
      })}
    </group>
  );
});

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
