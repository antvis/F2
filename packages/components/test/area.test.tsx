// @ts-nocheck
import { jsx, Fragment } from '@ali/f2-jsx';
import Chart, { Area } from '../src';
import { createContext } from './util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' }
];

describe('Area', () => {
  it('render', () => {
    const children = (
      <>
        <Area position="genre*sold" />
      </>
    );
    const chart = new Chart({
      context,
      data,
      children,
      // padding
    });
    chart.render();
  })
});
