// @ts-nocheck
import { jsx, Fragment } from '@ali/f2-jsx';
import * as F2 from '@antv/f2';
import Chart, { Line, Interval, Area, Axis  } from '../src';
import ComboComponent from '../src/chart/comboComponent';
import Placeholder from '../src/chart/placeholderComponent';
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
    const A = () => {
      return <Area position="genre*sold"/>
    }
    const B = () => {
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
    const C = () => {
      return <>
        <B />
        <Axis
          position="right"
          field="sold"
        />
      </>
    }

    function createProps() {
      return (
        <Chart data={ data } context={ context }>
          <Line position="genre*sold" ref={ lineRef } f={ () =>{} }/>
          <text />
          <>
            <Interval position="genre*sold" />
          </>
          <A />
          <C />
        </Chart>
      );
    }
    const { type, props } = createProps();

    const chart: Chart = new type(props);

    expect(chart.chart).toBeInstanceOf(F2.Chart);
    chart.render();

    const container = chart.container;
    expect(container.get('children').length).toBe(5);

    // 断言ref
    expect(lineRef.current).toBeInstanceOf(Line);

    // 子组件
    expect(chart.component.components[0]).toBeInstanceOf(Line);
    // text 标签，忽略, 被处理成placeholder
    expect(chart.component.components[1]).toBeInstanceOf(Placeholder);

    // Fragment 处理成combo组件
    expect(chart.component.components[2]).toBeInstanceOf(ComboComponent);
    // Fragment 子组件
    expect(chart.component.components[2].components).toBeInstanceOf(Interval);


    // function component 按内部组件处理
    expect(chart.component.components[3]).toBeInstanceOf(Area);
    // 组件C
    expect(chart.component.components[4]).toBeInstanceOf(ComboComponent);

    // 内部组件嵌套， 
    expect(chart.component.components[4].components.length).toBe(2);
    // 组件B
    expect(chart.component.components[4].components[0]).toBeInstanceOf(ComboComponent);
    expect(chart.component.components[4].components[1]).toBeInstanceOf(Axis);

    // 组件B内部组件处理
    expect(chart.component.components[4].components[0].components.length).toBe(2);
    expect(chart.component.components[4].components[0].components[0]).toBeInstanceOf(Axis);
    expect(chart.component.components[4].components[0].components[1]).toBeInstanceOf(Axis);


    const { props: newProps } = createProps();
    chart.update(newProps);

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