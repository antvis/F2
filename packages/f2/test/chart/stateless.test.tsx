import { jsx, Canvas, Chart, Interval } from '../../src';
import { createContext, delay } from '../util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

function Test() {
  return (
    <group>
      <rect
        attrs={{
          x: 10,
          y: 10,
          fill: 'red',
          width: 100,
          height: 100,
        }}
      />
    </group>
  );
}

describe('stateless', () => {
  it('stateless component', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Interval x="genre" y="sold" color="genre" />
          <Test />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(200);

    expect(context).toMatchImageSnapshot();
  });
});
