// @ts-nocheck
import { jsx } from '@ali/f2-jsx';
import Chart, { Line, Legend } from '../src';
import { createContext } from './util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' }
];

describe('Legend test', () => {
  it('render', () => {
    const { type, props } = (
      <Chart data={ data } context={ context } pixelRatio={ window.devicePixelRatio }>
        <Line position="genre*sold" />
        <Legend items={[
          { name: 'Sports' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
          { name: 'Strategy' },
        ]} />
      </Chart>
    );

    const chart = new type(props);
    chart.render();

    // const container = chart.container;
    // console.log(container);

    // expect(container.get('children').length).toBe(2);
  })
});
