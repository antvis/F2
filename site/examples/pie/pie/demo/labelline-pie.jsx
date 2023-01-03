/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, PieLabel } from '@antv/f2';

const data = [
  {
    name: '其他消费',
    y: 6371664,
    const: 'const',
  },
  {
    name: '生活用品',
    y: 7216301,
    const: 'const',
  },
  {
    name: '通讯物流',
    y: 1500621,
    const: 'const',
  },
  {
    name: '交通出行',
    y: 586622,
    const: 'const',
  },
  {
    name: '饮食',
    y: 900000,
    const: 'const',
  },
];

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        transposed: true,
        type: 'polar',
        radius: 0.75,
      }}
    >
      <Interval
        x="const"
        y="y"
        adjust="stack"
        color={{
          field: 'name',
          range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864'],
        }}
      />
      <PieLabel
        sidePadding={40}
        label1={(data, record) => {
          return {
            text: data.name,
            fill: record.color,
          };
        }}
        label2={(data) => {
          return {
            fill: '#000000',
            text:
              '￥' + String(Math.floor(data.y * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            fontWeight: 500,
            fontSize: 10,
          };
        }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
