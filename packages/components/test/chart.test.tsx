// @ts-nocheck
import { jsx, Fragment } from '@ali/f2-jsx';
import * as F2 from '@antv/f2';
import Chart from '../src/chart';
import Line from '../src/line';
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
    const fragment = (
      <>
        <Line position="genre*sold" />
      </>
    );
    const children = fragment.props.children;

    const chart = new Chart({
      context,
      data,
      children,
      // padding
    });

    expect(chart.chart).toBeInstanceOf(F2.Chart);
    chart.render();
    const container = chart.container;
    expect(container.get('children').length).toBe(1);
  })

  // it('component ref', () => {
  //   const ref = {};
  //   const children = (
  //     <>
  //       <Line position="genre*sold" ref={ ref } />
  //     </>
  //   );

  //   const chart = new Chart({
  //     context,
  //     data,
  //     children,
  //     // padding
  //   });
  //   expect(ref.current).toBeInstanceOf(Line);

  // })
});