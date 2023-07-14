import { jsx } from '../../../src';
import { Canvas, Chart, Candlestick, Axis } from '../../../src';
import { createContext, delay } from '../../util';
const context = createContext();

const data = [
  {
    time: '2017-10-24',
    value: [20, 34, 10, 38], // [open, close, lowest, highest]
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
    value: [38, 38, 5, 42],
  },
  {
    time: '2017-10-28',
    value: [38, 15, 5, 42],
  },
];

describe('candlestick', () => {
  it('basic', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="time" type="timeCat" tickCount={3} />
          <Axis field="value" />
          <Candlestick x="time" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('color', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="time" type="timeCat" tickCount={3} />
          <Axis field="value" />
          <Candlestick x="time" y="value" color={{ range: ['red', 'green', 'gray'] }} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('size', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="time" type="timeCat" tickCount={3} />
          <Axis field="value" />
          <Candlestick x="time" y="value" size={10} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('sizeRatio', async () => {
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="time" type="timeCat" tickCount={3} />
          <Axis field="value" />
          <Candlestick x="time" y="value" sizeRatio={0.8} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
