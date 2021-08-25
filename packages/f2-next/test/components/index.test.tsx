import { jsx } from '../../lib/jsx';
import Canvas, { Chart, Interval, Area, Line, Axis } from '../../lib/components';
import { createContext } from './util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

describe('Chart', () => {
  it('new Chart', () => {
    const { type, props } = (
      <Canvas context={ context }>
        <Chart data={ data } >
          <Line position="genre*sold" />
        </Chart>
      </Canvas>
    )

    // @ts-ignore
    const chart: Chart = new type(props);

    chart.render();
  })
});