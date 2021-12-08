import { jsx, Canvas, Chart, Timeline, Axis, Interval, TextGuide } from '../../src';
import { createContext, delay } from '../util';

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
  it('Chart render', async () => {
    const intervalRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
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
        <Timeline delay={0}>
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
                <Interval ref={intervalRef} x="genre" y="sold" color="genre" />
                {item.map((record) => {
                  return (
                    <TextGuide
                      key={record.genre}
                      records={[record]}
                      content={record.sold}
                      offsetX={10}
                      style={{
                        fill: '#666',
                        fontSize: '30px',
                        textAlign: 'start',
                        textBaseline: 'middle',
                      }}
                    />
                  );
                })}
              </Chart>
            );
          })}
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    const interval = intervalRef.current;
    expect(interval.records.length).toBe(5);
    expect(interval.records[0].children[0].x).toBeCloseTo(88.2);
    expect(interval.records[0].children[0].y).toBeCloseTo(422.25);

    await delay(2000);
    expect(interval.records.length).toBe(5);
    expect(interval.records[0].children[0].x).toBeCloseTo(97.57);
    expect(interval.records[0].children[0].y).toBeCloseTo(422.25);
  });
});
