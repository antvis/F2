import { jsx } from '@ali/f2-jsx';
import Chart, { WeaverLine } from '../src';
import { createContext } from './util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' }
];

describe('WeaverLine', () => {
  it('render', () => {
    const { type, props } = (
      <Chart data={ data } context={ context } pixelRatio={ window.devicePixelRatio }>
        <WeaverLine
          position="genre*sold"
          growth="rise"
        />
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();
  });
});
