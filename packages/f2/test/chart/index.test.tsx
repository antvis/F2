import { jsx, Canvas, Chart, Axis, Interval } from '../../src';
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

describe('Chart', () => {
  it('Chart render', async () => {
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data} ref={chartRef}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    const chart = chartRef.current;

    expect(chart.coord.left).toBeCloseTo(33.62);
    expect(chart.coord.width).toBeCloseTo(251.38);

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

    expect(chart.coord.left).toBeCloseTo(83.62);
    expect(chart.coord.width).toBeCloseTo(51.38);
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
