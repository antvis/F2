import { jsx, Canvas, Chart, Timeline, Axis, Interval, Line } from '../../src';
import { createContext } from '../util';

const context = createContext('动态排序', { width: '300px', height: '500px' });

const lineData = [
  { date: '2010-01-10', genre: 'Sports', sold: 50 },
  { date: '2010-02-10', genre: 'Sports', sold: 40 },
  { date: '2010-03-10', genre: 'Sports', sold: 60 },
  { date: '2010-04-10', genre: 'Sports', sold: 40 },
  { date: '2010-05-10', genre: 'Sports', sold: 60 },
  { date: '2010-06-10', genre: 'Sports', sold: 50 },

  { date: '2010-01-10', genre: 'Strategy', sold: 30 },
  { date: '2010-02-10', genre: 'Strategy', sold: 50 },
  { date: '2010-03-10', genre: 'Strategy', sold: 10 },
  { date: '2010-04-10', genre: 'Strategy', sold: 30 },
  { date: '2010-05-10', genre: 'Strategy', sold: 35 },
  { date: '2010-06-10', genre: 'Strategy', sold: 25 },

  { date: '2010-01-10', genre: 'Action', sold: 5 },
  { date: '2010-02-10', genre: 'Action', sold: 10 },
  { date: '2010-03-10', genre: 'Action', sold: 20 },
  { date: '2010-04-10', genre: 'Action', sold: 10 },
  { date: '2010-05-10', genre: 'Action', sold: 40 },
  { date: '2010-06-10', genre: 'Action', sold: 50 },

  { date: '2010-01-10', genre: 'Shooter', sold: 50 },
  { date: '2010-02-10', genre: 'Shooter', sold: 40 },
  { date: '2010-03-10', genre: 'Shooter', sold: 20 },
  { date: '2010-04-10', genre: 'Shooter', sold: 30 },
  { date: '2010-05-10', genre: 'Shooter', sold: 10 },
  { date: '2010-06-10', genre: 'Shooter', sold: 5 },

  { date: '2010-01-10', genre: 'Other', sold: 30 },
  { date: '2010-02-10', genre: 'Other', sold: 40 },
  { date: '2010-03-10', genre: 'Other', sold: 80 },
  { date: '2010-04-10', genre: 'Other', sold: 60 },
  { date: '2010-05-10', genre: 'Other', sold: 20 },
  { date: '2010-06-10', genre: 'Other', sold: 10 },
];
const data = [
  { type: 'a', genre: 'Sports', sold: 50 },
  { type: 'a', genre: 'Strategy', sold: 30 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
  // { type: 'b', genre: 'Sports', sold: 50 },
  // { type: 'b', genre: 'Strategy', sold: 5 },
  // { type: 'b', genre: 'Action', sold: 2 },
  // { type: 'b', genre: 'Shooter', sold: 40 },
  // { type: 'b', genre: 'Other', sold: 4 },
];

describe('Chart', () => {
  it('Chart render', () => {
    const treemapRef = {};
    const intervalRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Timeline delay={700}>
          <Chart data={lineData}>
            {/* <Axis field="genre" /> */}
            {/* <Axis field="sold" /> */}
            <Line
              x="date"
              y="sold"
              lineWidth="4px"
              color="genre"
              keys={['genre']}
              ref={intervalRef}
            />
          </Chart>
          <Chart data={data}>
            {/* <Axis field="genre" /> */}
            {/* <Axis field="sold" /> */}
            <Interval x="genre" y="sold" color="genre" transformFrom={intervalRef} />
          </Chart>
          {/* <Chart data={data}> */}
          {/* <Axis field="genre" /> */}
          {/* <Axis field="sold" /> */}
          {/* <Interval x="genre" y="sold" color="type" adjust="stack" /> */}
          {/* </Chart> */}
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
