import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  { action: '浏览网站', pv: 50000, percent: 1 },
  { action: '放入购物车', pv: 35000, percent: 0.7 },
  { action: '生成订单', pv: 25000, percent: 0.5 },
  { action: '支付订单', pv: 15000, percent: 0.3 },
  { action: '完成交易', pv: 8000, percent: 0.16 }
];


const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        transposed: true,
      }}
      scale={{
        percent: {
          min: 0,
        },
        action: {
          range: [0, 1],
        },
      }}
    >
      <Interval
        x="action"
        y="percent"
        adjust="symmetric"
        shape="pyramid"
        color={{
          field: 'action',
          range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
        }}
        // add lineStroke to polygon
        style={{
          stroke: '#fff',
          lineWidth: 2,
        }}
      />
      <Legend />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
