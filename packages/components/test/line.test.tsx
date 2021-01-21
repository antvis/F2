// @ts-nocheck
import { jsx } from '@ali/f2-jsx';
import Chart, { Line } from '../src';
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
    const { type, props } = (
      <Chart data={ data } context={ context }>
        <Line
          position="genre*sold"
          color={[ 'type', () => {
              colorCallback();
              return 'red';
            }
          ]}
        />
      </Chart>
    );

    const chart = new type(props);
    chart.render();

    expect(colorCallback.mock.calls.length).not.toBe(0);
  })
});
