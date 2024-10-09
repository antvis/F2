import { lttbDownSample, rateDownSample } from '../src/index';
import { createContext, delay } from '@antv/f-test-utils';
import { Canvas, Chart, Line, jsx } from '@antv/f2';

const url =
  'https://gw.alipayobjects.com/os/OasisHub/80ecf22b-6905-4f56-9b4e-96310fe86f74/data.json';

describe('sample', () => {
  it('origin data', async () => {
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.map((d) => {
      return {
        date: d.date,
        value: Number(d.value),
      };
    });
    const context = createContext('原数据', { width: '300px', height: '200px' });
    const chartRef = { current: null };

    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart ref={chartRef} data={data}>
          <Line x="date" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('lttb  sample', async () => {
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.map((d) => {
      return {
        date: d.date,
        value: Number(d.value),
      };
    });
    const context = createContext('lttb', { width: '300px', height: '200px' });
    const sampleData = lttbDownSample(data, {
      rate: 7,
      dimension: 'value',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={sampleData}>
          <Line x="date" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('rate 小于可抽个数', async () => {
    const res = await fetch(url);
    const result = [
      { value: { value: '0.516' }, updateTime: '2023-10-26T16:00:00.000Z', extInfo: null },
      { value: { value: '0.504' }, updateTime: '2023-10-27T16:00:00.000Z', extInfo: null },
      { value: { value: '0.488' }, updateTime: '2023-10-28T16:00:00.000Z', extInfo: null },
      { value: { value: '0.516' }, updateTime: '2023-10-29T16:00:00.000Z', extInfo: null },
      { value: { value: '0.472' }, updateTime: '2023-10-30T16:00:00.000Z', extInfo: null },
      { value: { value: '0.448' }, updateTime: '2023-10-31T16:00:00.000Z', extInfo: null },
      { value: { value: '0.478' }, updateTime: '2023-10-32T16:00:00.000Z', extInfo: null },
      { value: { value: '0.458' }, updateTime: '2023-10-33T16:00:00.000Z', extInfo: null },
      { value: { value: '0.455' }, updateTime: '2023-10-34T16:00:00.000Z', extInfo: null },
    ];
    const data = result.map((d) => {
      return {
        date: d.updateTime,
        value: Number(d.value.value),
      };
    });
    const context = createContext('lttb', { width: '300px', height: '200px' });
    const sampleData = lttbDownSample(data, {
      rate: 7,
      dimension: 'value',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={sampleData}>
          <Line x="date" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('nearest sample', async () => {
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.map((d) => {
      return {
        date: d.date,
        value: Number(d.value),
      };
    });
    const context = createContext('nearest', { width: '300px', height: '200px' });
    const sampleData = rateDownSample(data, {
      sampling: 'nearest',
      rate: 7,
      dimension: 'value',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={sampleData}>
          <Line x="date" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
