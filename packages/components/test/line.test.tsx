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
  { genre: 'Shooter', sold: 350, type: 'b' },
  { genre: 'Other', sold: 150, type: 'b' }
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
          smooth={ true }
          lineDash={ [4, 4] }
        />
      </Chart>
    );

    const chart = new type(props);
    chart.render();

    expect(colorCallback.mock.calls.length).not.toBe(0);
  })
  
  it('Line use order', () => {
    const { type, props } = (
      <Chart data={ data } context={ context }>
        <Line
          position="genre*sold"
          order={['type', ['b', 'a']]}
          color={[ 'type', () => {
              colorCallback();
              return 'red';
            }
          ]}
          smooth={ true }
          lineDash={ [4, 4] }
        />
      </Chart>
    );

    const chart = new type(props);
    chart.render();
    expect(chart.container._attrs.children[0]._attrs.children[0]._attrs.children[0]._attrs.attrs.strokeStyle).toBe("#2FC25B");
  })

});
