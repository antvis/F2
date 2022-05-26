import { jsx, Canvas, Chart, Timeline, Axis, Interval, TextGuide, Treemap } from '../../src';
import { createContext } from '../util';

const data = [
  { key: 'Sports', type: 'a', genre: 'Sports', sold: 5 },
  { key: 'Strategy', type: 'a', genre: 'Strategy', sold: 10 },
  { key: 'Action', type: 'a', genre: 'Action', sold: 20 },
  { key: 'Shooter', type: 'a', genre: 'Shooter', sold: 20 },
  { key: 'Other', type: 'a', genre: 'Other', sold: 40 },
];

describe('Chart', () => {
  it('图形变化', () => {
    const context = createContext('柱图-treemap 转换');
    const intervalRef = { current: null };
    const treemapRef = {};
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Timeline delay={200} loop>
          <Chart data={data}>
            <Axis field="genre" />
            <Axis field="sold" />
            <Interval
              ref={intervalRef}
              transformFrom={treemapRef}
              x="genre"
              y="sold"
              color="genre"
            />
          </Chart>
          <Treemap
            ref={treemapRef}
            transformFrom={intervalRef}
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

  it('图形变化', () => {
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

    const canvas = new Canvas(props);
    canvas.render();
  });
});
