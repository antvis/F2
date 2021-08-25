import { jsx } from '../../lib/jsx';
import Canvas, { Chart, Interval, Area, Line, Axis, Point, Tooltip } from '../../lib/components';
import { createContext } from './util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' }
];

describe.skip('Tooltip', () => {
  it('render', () => {
    const { type, props } = (
      <Chart data={ data } context={ context }>
        <Line
          position="genre*sold"
          // onPress={ (ev) => {
          //   console.log(ev.records);
          // }}
        />
        <Tooltip
          visible={ true }
          records={ [{ x: 179.5, y: 340 }] }
        />
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();

    // const container = chart.container;
    // console.log(container);

    // expect(container.get('children').length).toBe(2);
  })
});
