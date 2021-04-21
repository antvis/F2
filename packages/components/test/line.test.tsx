import { jsx } from '@ali/f2-jsx';
import Canvas, { Chart, Line } from '../src';
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
      <Canvas context={ context }>
        <Chart
          data={ data }
          scale={{
            sold: { min: 0 }
          }}
          coord={{
            type: 'rect'
          }}
        >
          <Line
            position="genre*sold"
            color={[ 'type', () => {
                colorCallback();
                return 'red';
              }
            ]}
            smooth={ true }
            // shape="line"
            lineDash={ [4, 4] }
          />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();

    expect(colorCallback.mock.calls.length).not.toBe(0);
  })
});
