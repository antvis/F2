import { jsx } from '../../../src/jsx';
import { createContext } from '../../util';
import { Canvas, Chart, Interval } from '../../../src';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 190, type: 'a' },

  { genre: 'Sports', sold: 275, type: 'b' },
  { genre: 'Strategy', sold: 105, type: 'b' },
  { genre: 'Action', sold: 120, type: 'b' },
  { genre: 'Shooter', sold: 350, type: 'b' },
  { genre: 'Other', sold: -190, type: 'b' },
];

describe('adjust', () => {
  const intervalRef = { current: null };
  it('default', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Interval ref={intervalRef} x="genre" y="sold" color="type" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    const interval = intervalRef.current;

    expect(interval.records.length).toBe(2);
    expect(interval.records[0].children[0].x).toBeCloseTo(42);
    expect(interval.records[0].children[0].y).toBeCloseTo(94.22);
  });

  it('stack', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Interval ref={intervalRef} x="genre" y="sold" color="type" adjust="stack" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    const interval = intervalRef.current;

    expect(interval.records.length).toBe(2);
    expect(interval.records[0].children[0].x).toBeCloseTo(42);
    expect(interval.records[0].children[0].y).toBeInstanceOf(Array);
    expect(interval.records[0].children[0].y[0]).toBeCloseTo(161.25);
    expect(interval.records[0].children[0].y[1]).toBeCloseTo(105.39);
  });

  it('dodge', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Interval ref={intervalRef} x="genre" y="sold" color="type" adjust="dodge" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    const interval = intervalRef.current;

    expect(interval.records.length).toBe(2);
    expect(interval.records[0].children[0].x).toBeCloseTo(31.88);
    expect(interval.records[0].children[0].y).toBeCloseTo(94.22);
  });
});
