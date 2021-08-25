// @ts-nocheck
import { jsx } from '../../../src';
import { Polar } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval } from '../../../src/components';
import { createContext } from '../util';
const context = createContext();

const data = [
  { a: '1', genre: 'Sports', sold: 5 },
  { a: '1', genre: 'Strategy', sold: 10 },
  { a: '1', genre: 'Action', sold: 20 },
  { a: '1', genre: 'Shooter', sold: 20 },
  { a: '1', genre: 'Other', sold: 40 }
];

describe('Chart', () => {
  it('new Chart', () => {
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={ context } pixelRatio={ window.devicePixelRatio }>
        <Chart
          ref={ chartRef }
          data={ data }
          coord={{
            type: Polar,
            transposed: true,
            // left: 100,
            // top: 100,
            // right: 100,
            // bottom: 100,
          }}
          scale={{
            // genre: {},
            // sold: {},
          }}
        >
          <Interval
            x="a"
            y="sold"
            color="genre"
            adjust="stack"
          />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  })
});
