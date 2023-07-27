/** @jsx jsx */
import { Axis, Candlestick, Canvas, Chart, jsx, Tooltip } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  {
    time: '2017-10-24',
    // 格式为：[open, close, lowest, highest]
    value: [20, 34, 10, 38],
  },
  {
    time: '2017-10-25',
    value: [40, 35, 30, 50],
  },
  {
    time: '2017-10-26',
    value: [31, 38, 33, 44],
  },
  {
    time: '2017-10-27',
    value: [38, 15, 5, 42],
  },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Axis field="time" type="timeCat" />
      <Axis field="value" formatter={(v) => Number(v).toFixed(0)} />
      <Candlestick x="time" y="value" />
      <Tooltip showCrosshairs={true} yPositionType="coord" crosshairsType="xy" showXTip showYTip />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
