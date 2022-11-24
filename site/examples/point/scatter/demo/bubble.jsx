/** @jsx jsx */
import { jsx, Canvas, Chart, Point, Axis } from '@antv/f2';

const data = [
  {
    x: 95,
    y: 95,
    z: 13.8,
    name: 'BE',
    country: 'Belgium',
  },
  {
    x: 86.5,
    y: 102.9,
    z: 14.7,
    name: 'DE',
    country: 'Germany',
  },
  {
    x: 80.8,
    y: 91.5,
    z: 15.8,
    name: 'FI',
    country: 'Finland',
  },
  {
    x: 80.4,
    y: 102.5,
    z: 12,
    name: 'NL',
    country: 'Netherlands',
  },
  {
    x: 80.3,
    y: 86.1,
    z: 11.8,
    name: 'SE',
    country: 'Sweden',
  },
  {
    x: 78.4,
    y: 70.1,
    z: 16.6,
    name: 'ES',
    country: 'Spain',
  },
  {
    x: 74.2,
    y: 68.5,
    z: 14.5,
    name: 'FR',
    country: 'France',
  },
  {
    x: 73.5,
    y: 83.1,
    z: 10,
    name: 'NO',
    country: 'Norway',
  },
  {
    x: 71,
    y: 93.2,
    z: 24.7,
    name: 'UK',
    country: 'United Kingdom',
  },
  {
    x: 69.2,
    y: 57.6,
    z: 10.4,
    name: 'IT',
    country: 'Italy',
  },
  {
    x: 68.6,
    y: 20,
    z: 16,
    name: 'RU',
    country: 'Russia',
  },
  {
    x: 65.5,
    y: 126.4,
    z: 35.3,
    name: 'US',
    country: 'United States',
  },
  {
    x: 65.4,
    y: 50.8,
    z: 28.5,
    name: 'HU',
    country: 'Hungary',
  },
  {
    x: 63.4,
    y: 51.8,
    z: 15.4,
    name: 'PT',
    country: 'Portugal',
  },
  {
    x: 64,
    y: 82.9,
    z: 31.3,
    name: 'NZ',
    country: 'New Zealand',
  },
];

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{}}
      scale={{
        x: {
          alias: 'Daily fat intake', // 定义别名
          tickInterval: 5, // 自定义刻度间距
          nice: false, // 不对最大最小值优化
          max: 96, // 自定义最大值
          min: 62, // 自定义最小是
        },
        y: {
          alias: 'Daily sugar intake',
          tickInterval: 50,
          nice: false,
          max: 165,
          min: 0,
        },
        z: {
          alias: 'Obesity(adults) %',
        },
      }}
    >
      <Axis field="x" />
      <Axis field="y" />
      <Point
        x="x"
        y="y"
        color="#1890ff"
        shape="circle"
        size={{
          field: 'z',
          range: [10, 40, 60, 80],
        }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
