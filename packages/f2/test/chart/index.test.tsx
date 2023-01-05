import { jsx, Canvas, Chart, Axis, Interval, Line, Point, Geometry, Area } from '../../src';
import { createContext, delay } from '../util';
const context = createContext();

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
  { type: 'b', genre: 'Sports', sold: 5 },
  { type: 'b', genre: 'Strategy', sold: 10 },
  { type: 'b', genre: 'Action', sold: 20 },
  { type: 'b', genre: 'Shooter', sold: 20 },
  { type: 'b', genre: 'Other', sold: 40 },
];

type TRecord = typeof data[0];

describe('Chart', () => {
  it('Chart render', async () => {
    const chartRef = { current: null };
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart<TRecord>
          data={data}
          ref={chartRef}
          coord={{
            type: 'rect',
          }}
        >
          <Axis field="genre" />
          <Axis<TRecord> field="sold" />
          <Interval<TRecord> x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();

    canvas.update(
      (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            ref={chartRef}
            data={data}
            style={{
              left: 50,
              width: 100,
            }}
          >
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      ).props
    );

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
