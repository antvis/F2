import { jsx, Fragment, Canvas, Component, Chart, Interval } from '../../src';
import { createContext, delay } from '../util';
const context = createContext();

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
];

describe('Fragment', () => {
  it('Fragment', async () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Fragment>
          <Chart data={data}>
            <Interval x="genre" y="sold" color="genre" />
          </Chart>
        </Fragment>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });
});
