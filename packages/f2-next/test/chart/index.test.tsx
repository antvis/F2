import { jsx, Canvas, Chart, Axis, Interval } from '../../src';
import { createContext } from '../util';
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
  it('Chart render', () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Chart
          data={data}
          coord={
            {
              // type: Polar,
              // transposed: true,
              // left: 100,
              // top: 100,
              // right: 100,
              // bottom: 100,
            }
          }
          scale={{}}
        >
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );

    // @ts-ignored
    const canvas = new Canvas(props);
    canvas.render();
  });
});
