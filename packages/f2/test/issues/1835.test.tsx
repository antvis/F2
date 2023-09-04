import { jsx, Canvas, Chart, Line, Axis, Area } from '../../src';
import { createContext, delay } from '../util';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Action', sold: 120 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

describe('曲线 smooth', () => {
  it('曲线 smooth', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Area x="genre" y="sold" shape="smooth" size={3} />
          <Line x="genre" y="sold" shape="smooth" size={3} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);

    expect(context).toMatchImageSnapshot();
  });
});
