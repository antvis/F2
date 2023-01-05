import { jsx } from '../../../../src';
import { Polar, Rect } from '../../../../src/coord';
import { Canvas, Chart } from '../../../../src';
import { Interval, Axis, Legend, Tooltip } from '../../../../src/components';
import { createContext, delay } from '../../../util';

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
  { type: 'b', genre: 'Sports', sold: 5 },
  { type: 'b', genre: 'Strategy', sold: 10 },
  { type: 'b', genre: 'Action', sold: 20 },
  { type: 'b', genre: 'Shooter', sold: 20 },
  { type: 'b', genre: 'Other', sold: 40 },
];

describe('条形图', () => {
  it('基础条形图', async () => {
    const chartRef = { current: null };
    const context = createContext('基础条形图');
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
          <Interval x="genre" y="sold" color="type" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('基础条形图-转置+设置固定size', async () => {
    const chartRef = { current: null };
    const context = createContext('基础条形图');
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
          <Interval x="genre" y="sold" color="type" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('分组条形图', async () => {
    const chartRef = { current: null };
    const context = createContext('分组条形图');
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
          <Interval x="genre" y="sold" color="type" adjust="dodge" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('堆叠条形图', async () => {
    const chartRef = { current: null };
    const context = createContext('堆叠条形图');
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
          <Interval x="genre" y="sold" color="type" adjust="stack" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('堆叠条形图 - type = stack', async () => {
    const chartRef = { current: null };
    const context = createContext('堆叠条形图');
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
          <Interval x="genre" y="sold" color="type" adjust={{ type: 'stack' }} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
