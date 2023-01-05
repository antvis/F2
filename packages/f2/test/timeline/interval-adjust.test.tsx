import { jsx, Canvas, Chart, Timeline, Axis, Interval, Line } from '../../src';
import { createContext } from '../util';

const context = createContext('', { width: '300px', height: '500px' });

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
  { type: 'b', genre: 'Sports', sold: 50 },
  { type: 'b', genre: 'Strategy', sold: 5 },
  { type: 'b', genre: 'Action', sold: 2 },
  { type: 'b', genre: 'Shooter', sold: 40 },
  { type: 'b', genre: 'Other', sold: 4 },
];

describe('Interval', () => {
  it('adjust change', async () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Timeline delay={200}>
          <Chart data={data}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval x="genre" y="sold" color="type" adjust="dodge" />
          </Chart>
          <Chart data={data}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval x="genre" y="sold" color="type" adjust="stack" />
          </Chart>
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
  });
});
