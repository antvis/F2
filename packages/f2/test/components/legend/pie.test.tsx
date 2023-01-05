import { jsx } from '../../../src';
import { Polar } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval, Legend } from '../../../src/components';
import { createContext, delay, gestureSimulator } from '../../util';

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
  it('饼图图例 - top', async () => {
    const context = createContext('饼图图例 - top');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
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
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();

    // legend click
    await gestureSimulator(context.canvas, 'click', { x: 137, y: 44 });
    await delay(1000);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 137, y: 44 });
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('饼图图例 - bottom', async () => {
    const context = createContext('饼图图例 - bottom');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval x="a" y="percent" adjust="stack" color="name" />
          <Legend position="bottom" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('饼图图例 - left', async () => {
    const context = createContext('饼图图例 - left');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval x="a" y="percent" adjust="stack" color="name" />
          <Legend position="left" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('饼图图例 - right', async () => {
    const context = createContext('饼图图例 - right');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval x="a" y="percent" adjust="stack" color="name" />
          <Legend position="right" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
