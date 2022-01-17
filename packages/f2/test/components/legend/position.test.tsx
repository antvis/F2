import { jsx } from '../../../src';
import { Polar } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval, Legend } from '../../../src/components';
import { createContext } from '../../util';

const data = [
  {
    name: '芳华',
    percent: 0.4,
    a: '1',
  },
  {
    name: '妖猫传',
    percent: 0.2,
    a: '1',
  },
  {
    name: '机器之血',
    percent: 0.18,
    a: '1',
  },
  {
    name: '心理罪',
    percent: 0.15,
    a: '1',
  },
  {
    name: '寻梦环游记',
    percent: 0.05,
    a: '1',
  },
  {
    name: '其他',
    percent: 0.02,
    a: '1',
  },
];

describe('图例 - position', () => {
  it('饼图图例 - top', () => {
    const context = createContext('饼图图例 - top');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
          }}
          scale={{}}
        >
          <Interval x="a" y="percent" adjust="stack" color="name" />
          <Legend position="top" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('饼图图例 - bottom', () => {
    const context = createContext('饼图图例 - bottom');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
          }}
        >
          <Interval x="a" y="percent" adjust="stack" color="name" />
          <Legend position="bottom" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('饼图图例 - left', () => {
    const context = createContext('饼图图例 - left');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
          }}
        >
          <Interval x="a" y="percent" adjust="stack" color="name" />
          <Legend position="left" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('饼图图例 - right', () => {
    const context = createContext('饼图图例 - right');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
          }}
        >
          <Interval x="a" y="percent" adjust="stack" color="name" />
          <Legend position="right" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
