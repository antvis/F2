import { jsx } from '@ali/f2-jsx';
import Chart, { Interval, Coord, Tooltip } from '../src';
import { createContext } from './util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' }
];

describe('Interval', () => {
  it('render', () => {
    const ref = {};
    const { type, props } = (
      <Chart data={ data } context={ context } pixelRatio={ window.devicePixelRatio }>
        {/* <Coord type="polar" transposed={ false } /> */}
        <Interval
          ref={ ref }
          position="genre*sold"
          color="genre"
          onPress={ (ev) => {
            const { points, geometry } = ev || {};
            const point = points[0];
            const records = geometry.getSnapRecords(point);
            console.log(records);
          } }
        />
        <Tooltip geometryRef={ ref } records={ [{ x: 179.5, y: 280 }] } />
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();
  })
});
