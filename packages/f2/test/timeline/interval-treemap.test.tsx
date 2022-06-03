import {
  jsx,
  Canvas,
  Chart,
  Timeline,
  Axis,
  Interval,
  TextGuide,
  Treemap,
  Point,
  Line,
} from '../../src';
import { createContext, delay } from '../util';

const data = [
  { key: 'Sports', type: 'a', genre: 'Sports', sold: 5 },
  { key: 'Strategy', type: 'a', genre: 'Strategy', sold: 10 },
  { key: 'Action', type: 'a', genre: 'Action', sold: 20 },
  { key: 'Shooter', type: 'a', genre: 'Shooter', sold: 20 },
  { key: 'Other', type: 'a', genre: 'Other', sold: 40 },
];

const data2 = [
  { key: 'Sports', type: 'a', genre: 'Sports', sold: 5 },
  { key: 'Strategy', type: 'a', genre: 'Strategy', sold: 10 },
  { key: 'Action', type: 'a', genre: 'Action', sold: 20 },
  { key: 'Shooter', type: 'a', genre: 'Shooter', sold: 20 },
  { key: 'Sports', type: 'b', genre: 'Sports', sold: 5 },
  { key: 'Strategy', type: 'b', genre: 'Strategy', sold: 10 },
  { key: 'Action', type: 'b', genre: 'Action', sold: 20 },
  { key: 'Shooter', type: 'b', genre: 'Shooter', sold: 20 },
  { key: 'Other', type: 'b', genre: 'Other', sold: 40 },
];

describe('Chart', () => {
  it.only('图形变化', () => {
    const context = createContext('柱图-treemap 转换');
    const intervalRef = { current: null };
    const treemapRef = {};
    const pointRef = {};
    const lineRef = {};
    const pieRef = { name: 'pieRef' };
    const roseRef = {};
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Timeline delay={200} loop>
          <Chart data={data}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval
              ref={intervalRef}
              transformFrom={roseRef}
              x="genre"
              y="sold"
              color="genre"
              style={{
                radius: 10,
                lineWidth: '4px',
                stroke: '#fff',
              }}
            />
          </Chart>
          <Chart data={data}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Point
              ref={pointRef}
              transformFrom={intervalRef}
              x="genre"
              y="sold"
              color="genre"
              size="sold"
            />
          </Chart>
          <Treemap
            transformFrom={pointRef}
            ref={treemapRef}
            data={data}
            color={{
              field: 'genre',
            }}
            value="sold"
            space={4}
          />
          {/* <Chart data={data2}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Line
              ref={lineRef}
              transformFrom={treemapRef}
              x="genre"
              y="sold"
              color="genre"
              size="sold"
            />
          </Chart> */}
          <Chart
            data={data}
            coord={{
              type: 'polar',
              transposed: true,
            }}
          >
            <Interval
              ref={pieRef}
              transformFrom={treemapRef}
              x="type"
              y="sold"
              adjust="stack"
              color="genre"
              style={{
                radius: 10,
                lineWidth: '4px',
                stroke: '#fff',
              }}
            />
          </Chart>
          <Chart
            data={data}
            coord={{
              type: 'polar',
            }}
          >
            <Interval
              ref={roseRef}
              transformFrom={pieRef}
              x="genre"
              y="sold"
              color="genre"
              style={{
                radius: 10,
                lineWidth: '4px',
                stroke: '#fff',
              }}
            />
          </Chart>
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('图形变化', () => {
    const context = createContext('柱图-treemap 转换');
    const intervalRef = { current: null };
    const treemapRef = {};
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Timeline delay={200}>
          <Treemap
            transformFrom={intervalRef}
            ref={treemapRef}
            data={data}
            color={{
              field: 'genre',
            }}
            value="sold"
            space={4}
          />
          <Chart data={data}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval
              transformFrom={treemapRef}
              ref={intervalRef}
              x="genre"
              y="sold"
              color="genre"
            />
          </Chart>
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('图形变化', async () => {
    const context = createContext('柱图-treemap 转换');
    const intervalRef = { current: null };
    const treemapRef = {};
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Timeline delay={200}>
          <Chart data={data}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval
              transformFrom={treemapRef}
              ref={intervalRef}
              x="genre"
              y="sold"
              // color="genre"
            />
          </Chart>
          <Treemap
            transformFrom={intervalRef}
            ref={treemapRef}
            data={data}
            color={{
              field: 'genre',
            }}
            value="sold"
            space={4}
          />
        </Timeline>
      </Canvas>
    );

    await delay(1000);

    const canvas = new Canvas(props);
    canvas.render();
  });
});
