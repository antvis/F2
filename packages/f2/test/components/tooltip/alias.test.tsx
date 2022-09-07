import { jsx, Canvas, Chart, Axis, Line, Interval, Tooltip, Legend } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
];

describe('alias', () => {
  it('别名', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart
          data={data}
          scale={{
            sold: {
              alias: '销量',
            },
          }}
        >
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip defaultItem={data[0]} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });
});
