// @ts-nocheck
import { jsx, Fragment } from '@ali/f2-jsx';
import Chart from '../src/chart';
import Line from '../src/line';
import { createContext } from './util';
const context = createContext();

const colorCallback = jest.fn();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' }
];

describe('Line', () => {
  it('Line color callback', () => {
    const children = (
      <>
        <Line position="genre*sold" color={[ 'type', (type) => {
          colorCallback();
          return 'red';
        } ]} />
      </>
    );
    const chart = new Chart({
      context,
      data,
      children,
      // padding
    });
    chart.render();

    expect(colorCallback.mock.calls.length).not.toBe(0);
  })
});
