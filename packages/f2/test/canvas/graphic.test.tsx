import { jsx, Canvas, Component } from '../../src';
import { createContext, delay } from '../util';
const context = createContext();

function View() {
  return (
    <group>
      <rect
        attrs={{
          x: '10px',
          y: '10px',
          width: '80px',
          height: '80px',
          fill: 'red',
        }}
      />
      <circle
        attrs={{
          x: '150px',
          y: '50px',
          r: '50px',
          fill: 'red',
        }}
      />
      <polyline
        attrs={{
          points: [
            { x: '210px', y: '20px' },
            { x: '220px', y: '40px' },
            { x: '250px', y: '45px' },
            { x: '300px', y: '80px' },
          ],
          lineWidth: '4px',
          stroke: 'red',
        }}
      />
    </group>
  );
}

describe('Canvas', () => {
  it('图形绘制', async () => {
    const ref = { current: null };
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <View />
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });
});
