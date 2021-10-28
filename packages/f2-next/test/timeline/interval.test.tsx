import { jsx, Canvas, Chart, Timeline, Axis, Interval } from '../../src';
import { createContext } from '../util';

const context = createContext('动态排序', { width: '300px', height: '500px' });

function sort(data) {
  return data.sort((a, b) => {
    return a.sold - b.sold;
  });
}

const data = [
  [
    { genre: 'Sports', sold: 5 },
    { genre: 'Strategy', sold: 10 },
    { genre: 'Action', sold: 20 },
    { genre: 'Shooter', sold: 20 },
    { genre: 'Other', sold: 40 },
  ],
  [
    { genre: 'Sports', sold: 50 },
    { genre: 'Strategy', sold: 5 },
    { genre: 'Action', sold: 2 },
    { genre: 'Shooter', sold: 40 },
    { genre: 'Other', sold: 4 },
  ],
  [
    { genre: 'Sports', sold: 5 },
    { genre: 'Strategy', sold: 20 },
    { genre: 'Action', sold: 30 },
    { genre: 'Shooter', sold: 10 },
    { genre: 'Other', sold: 25 },
  ],
];

describe('Chart', () => {
  it('Chart render', () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        {/* <Chart
          data={sort(data[1])}
          coord={{
            transposed: true,
          }}
        >
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
        </Chart> */}
        <Timeline delay={300}>
          {data.map((item) => {
            return (
              <Chart
                data={sort(item)}
                coord={{
                  transposed: true,
                }}
              >
                <Axis field="genre" />
                <Axis field="sold" />
                <Interval x="genre" y="sold" color="genre" />
              </Chart>
            );
          })}
        </Timeline>
      </Canvas>
    );

    // @ts-ignored
    const canvas = new Canvas(props);
    canvas.render();
  });
});
