// @ts-nocheck
import { jsx, Fragment } from '@ali/f2-jsx';
import * as F2 from '@antv/f2';
import Chart, { Line, Interval, Axis  } from '../src';
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
    const lineRef = {};
    const FragmentComponent = () => {
      return <>
        <Axis
          position="left"
          field="sold"
        />
        <Axis
          position="bottom"
          field="genre"
        />
      </>
    }

    const { type, props } = (
      <Chart data={ data } context={ context }>
        <Line position="genre*sold" ref={ lineRef } />
        <text />
        <>
          <Interval position="genre*sold" />
        </>
      </Chart>
    );

    const chart = new type(props);

    expect(chart.chart).toBeInstanceOf(F2.Chart);
    chart.render();

    const container = chart.container;
    expect(container.get('children').length).toBe(2);

    // 断言ref
    expect(lineRef.current).toBeInstanceOf(Line);

    // text 标签，忽略
    expect(chart.component.components[1]).toBeNull();
    // Fragment 处理成combo组件
    expect(chart.component.components[2].components).toBeInstanceOf(Interval);

    // console.log(chart.component)
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