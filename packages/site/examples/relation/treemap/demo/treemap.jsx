/** @jsx jsx */
import { jsx, Canvas, Treemap } from '@antv/f2';

const data = [
  {
    name: '贵州茅台',
    value: 0.16,
    rate: 0.1,
  },
  {
    name: '贵州茅台1',
    value: 0.1,
    rate: -0.1,
  },
  {
    name: '五粮液',
    value: 0.13,
    rate: -0.1,
  },
  {
    name: '五粮液',
    value: 0.12,
    rate: -0.01,
  },
  {
    name: '招商银行',
    value: 0.15,
    rate: 0,
  },
  {
    name: '招商银行',
    value: 0.08,
    rate: 0,
  },
  {
    name: '中国平安',
    value: 0.07,
    rate: 0.1,
  },
  {
    name: '中国平安',
    value: 0.06,
    rate: 0.1,
  },
  {
    name: '同花顺',
    value: 0.1,
    rate: 0,
  },
  {
    name: '同花顺',
    value: 0.03,
    rate: 0,
  },
];
const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Treemap
      data={data}
      color={{
        field: 'name',
      }}
      value="value"
      space={4}
    />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
