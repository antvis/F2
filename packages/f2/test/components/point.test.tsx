import { jsx } from '../../src/jsx';
import { createContext } from '../util';
import { Canvas, Chart, Point } from '../../src';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

describe.skip('Point', () => {
  it('render', () => {
    const { type, props } = (
      <Chart data={data} context={context}>
        <Point position="genre*sold" />
      </Chart>
    );
    // @ts-ignore
    const chart = new type(props);
    chart.render();
  });
});
