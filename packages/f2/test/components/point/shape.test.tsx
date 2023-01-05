import { jsx } from '../../../src';
import { Canvas, Chart, Point, Axis } from '../../../src';
import { createContext, delay } from '../../util';

const data = [
  {
    day: '周一',
    value: 300,
  },
  {
    day: '周二',
    value: 400,
  },
  {
    day: '周三',
    value: 350,
  },
  {
    day: '周四',
    value: 500,
  },
  {
    day: '周五',
    value: 490,
  },
  {
    day: '周六',
    value: 600,
  },
  {
    day: '周日',
    value: 900,
  },
];

describe('shape 类型', () => {
  it('default', async () => {
    const context = createContext('default');
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Point x="day" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });
  it('hollowCircle', async () => {
    const context = createContext('hollowCircle');
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Point x="day" y="value" shape="hollowCircle" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });

  it('rect', async () => {
    const context = createContext('rect');
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Point x="day" y="value" shape="rect" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });
});
