/** @jsx jsx */
import { Canvas, Chart, Interval, jsx, Legend } from '@antv/f2';
const context = document.getElementById('container').getContext('2d');
const data = [
    {
      name: '长津湖',
      percent: 10,
      a: '1',
    },
    {
      name: '我和我的父辈',
      percent: 20,
      a: '1',
    },
    {
      name: '失控玩家',
      percent: 30,
      a: '1',
    },
    {
      name: '宝可梦',
      percent: 40,
      a: '1',
    },
    {
      name: '峰爆',
      percent: 50,
      a: '1',
    },
    {
      name: '其他',
      percent: 60,
      a: '1',
    },
  ];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        type: 'polar',
        transposed: true,
        innerRadius: 0.5,
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
        style={{
          radius: [10, 7, 4, 2],
        }}
      />
        <Legend/>
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
