/** @jsx jsx */
import { jsx, Canvas, Timeline, Chart, Interval, Axis, Tooltip } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

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

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Timeline loop delay={500}>
      <Chart
        data={data}
        coord={{
          type: 'polar',
          transposed: true,
        }}
      >
        <Interval x="a" y="percent" adjust="stack" color="name" />
      </Chart>
      <Chart
        data={data}
        coord={{
          type: 'polar',
        }}
      >
        <Interval x="name" y="percent" color="name" />
      </Chart>
    </Timeline>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
