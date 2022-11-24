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
        radius: 0.8,
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
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
