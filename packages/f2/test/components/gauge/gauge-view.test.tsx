import { jsx } from '../../../src';
import { Canvas, withGauge } from '../../../src';
import { createContext, delay } from '../../util';
const context = createContext();

// 自定义显示 view
const Gauge = withGauge((props) => {
  const { center, startAngle, endAngle, r, r0, percent } = props;
  const { x, y } = center;
  const diff = (endAngle - startAngle) * percent;
  return (
    <group>
      <arc
        attrs={{
          cx: x,
          cy: y,
          r,
          startAngle,
          endAngle: startAngle,
          lineWidth: '40px',
          lineCap: 'round',
          stroke: '#0075ff',
        }}
        animation={{
          appear: {
            easing: 'linear',
            duration: 500,
            property: ['endAngle'],
            start: {
              endAngle: startAngle,
            },
            end: {
              endAngle: startAngle + diff,
            },
          },
        }}
      />
      <sector
        attrs={{
          cx: x,
          cy: y,
          r0,
          r,
          startAngle,
          endAngle: startAngle + diff,
          fill: 'red',
          fillOpacity: 0.5,
        }}
        animation={{
          appear: {
            easing: 'linear',
            duration: 500,
            onFrame(t) {
              // 自定义动画逻辑，在第 2 圈时才执行动画
              const offset = diff * t;
              if (offset <= Math.PI * 2) {
                return { endAngle: startAngle };
              }
              const end = offset - Math.PI * 2;
              return {
                endAngle: startAngle + end,
              };
            },
          },
        }}
      />
    </group>
  );
});

describe('Gauge', () => {
  it('render', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Gauge
          center={{ x: 100, y: 100 }}
          startAngle={-Math.PI / 2}
          endAngle={(Math.PI * 3) / 2}
          percent={1.5}
          r="150px"
          r0="100px"
          tickCount={6}
          tickOffset="-40px"
          tickLength="20px"
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
  });
});
