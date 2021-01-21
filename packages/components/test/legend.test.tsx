// @ts-nocheck
import { jsx, Fragment } from '@ali/f2-jsx';
import Chart from '../src/chart';
import { Line, Legend } from '../src';
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
    const fragment = (
      <>
        <Line position="genre*sold"/>
        <Legend />
      </>
    );

    const chart = new Chart({
      context,
      data,
      ...fragment.props,
    });
    chart.render();

    // const container = chart.container;
    // console.log(container);

    // expect(container.get('children').length).toBe(2);



    
  })
});
