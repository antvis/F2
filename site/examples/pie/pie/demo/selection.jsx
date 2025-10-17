/** @jsx jsx */
import { Canvas, Chart, Interval, jsx, Legend, PieLabel } from '@antv/f2';

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
];

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        radius: 0.6,
        transposed: true,
        type: 'polar',
      }}
    >
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color="name"
        selection={{
          selectedStyle: (record) => {
            const { yMax, yMin } = record;
            return {
              // 半径放大 1.1 倍
              r: (yMax - yMin) * 1.1,
            };
          },
        }}
      />
      <PieLabel
        type="spider"
        label1={(data, record) => {
          return {
            text: data.name,
            fill: record.color,
          };
        }}
        label2=""
      />
      <Legend position="top" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
