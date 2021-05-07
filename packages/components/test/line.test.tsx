import { jsx } from '@ali/f2-jsx';
import Canvas, { Chart, Line, Axis } from '../src';
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

const crossData = [
  { genre: 'Sports', sold: 275, type: 'a'},
  { genre: 'Sports', sold: 115, type: 'b'},
  { genre: 'Action', sold: 120, type: 'a'},
  { genre: 'Action', sold: 350, type: 'b'},
]

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
  
  it.skip('Line use order', () => {
    const { type, props } = (
      <Chart data={ crossData } context={ context }>
        <Line
          position="type*sold"
          order={['genre', ['Sports', 'Action']]}
          color={'genre'}
          size={20}
        />
        <Axis field="type"/>
        <Axis field="sold"/>
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();
    expect(chart.container._attrs.children[0]._attrs.children[0]._attrs.children[0]._attrs.attrs.strokeStyle).toBe("#2FC25B");
  })

});
