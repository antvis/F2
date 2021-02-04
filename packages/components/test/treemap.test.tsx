import { jsx } from '@ali/f2-jsx';
import Chart, { Treemap } from '../src';
import { createContext } from './util';
const context = createContext();

const data = [{
  name: '贵州茅台',
  value: 0.16,
  rate: 0.1
}, {
  name: '贵州茅台1',
  value: 0.1,
  rate: -0.1
}, {
  name: '五粮液',
  value: 0.13,
  rate: -0.1
}, {
  name: '五粮液',
  value: 0.12,
  rate: -0.01
}, {
  name: '招商银行',
  value: 0.15,
  rate: 0
}, {
  name: '招商银行',
  value: 0.08,
  rate: 0
}, {
  name: '中国平安',
  value: 0.07,
  rate: 0.1
}, {
  name: '中国平安',
  value: 0.06,
  rate: 0.1
}, {
  name: '同花顺',
  value: 0.1,
  rate: 0
}, {
  name: '同花顺',
  value: 0.03,
  rate: 0
}];

describe('Treemap', () => {
  it('render', () => {
    const { type, props } = (
      <Chart data={ data } context={ context }>
        <Treemap xField="name" yField="value" space={ 4 }/>
      </Chart>
    );

    // @ts-ignore
    const chart = new type(props);
    chart.render();
  })
});
