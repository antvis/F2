// @ts-nocheck
import { jsx, Fragment } from '@ali/f2-jsx';
import Chart from '../src/chart';
import { Axis, Line} from '../src';
import { createContext } from './util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' }
];

describe('Line', () => {
  it('Line color callback', () => {
    const fragment = (
      <>
        <Axis
          position="left"
          field="sold"
        />
        <Line position="genre*sold"/>
      </>
    );

    const chart = new Chart({
      context,
      data,
      ...fragment.props,
    });
    chart.render();

    const container = chart.container;
    
    expect(container.get('children').length).toBe(2);
    expect(container.get('children')[0].get('children').length).toBe(6);
  })
});
