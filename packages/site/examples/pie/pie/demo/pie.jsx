/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Legend } from '@antv/f2';

const data = [
  {
    name: '长津湖',
    percent: 0.4,
    a: '1',
  },
  {
    name: '我和我的父辈',
    percent: 0.2,
    a: '1',
  },
  {
    name: '失控玩家',
    percent: 0.18,
    a: '1',
  },
  {
    name: '宝可梦',
    percent: 0.15,
    a: '1',
  },
  {
    name: '峰爆',
    percent: 0.05,
    a: '1',
  },
  {
    name: '其他',
    percent: 0.02,
    a: '1',
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
      }}
    >
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color={{
          field: 'name',
          range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
        }}
      />
      <Legend position="right" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
