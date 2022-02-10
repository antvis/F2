import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart, Point, Line } from '../../../src';
import { createContext, delay } from '../../util';

const url = 'https://gw.alipayobjects.com/os/antfincdn/6HodecuhvM/scatter.json';
const url2 = 'https://gw.alipayobjects.com/os/antfincdn/aN68ysvGFa/index.json';

describe('Point Chart', () => {
  it('基础点图', async () => {
    const res = await fetch(url);
    const data = await res.json();

    const context = createContext('基础点图');
    const chartRef = { current: null };
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Rect,
          }}
          scale={{}}
        >
          <Point x="height" y="weight" color="gender" size="weight" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('基础点图 - 极坐标', async () => {
    const res = await fetch(url);
    const data = await res.json();

    const context = createContext('基础点图 - 极坐标');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
          }}
          scale={{}}
        >
          <Point x="height" y="weight" color="gender" size="weight" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('气泡图 - 配置size入参', async () => {
    const res = await fetch(url2);
    const data = await res.json();
    const context = createContext('气泡图 - 配置size入参');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Rect,
          }}
          scale={{}}
        >
          <Point
            x="x"
            y="y"
            color="name"
            size={{
              field: 'z',
              range: [5, 10, 15, 20],
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('折线图带点', async () => {
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

    const context = createContext('折线图带点');

    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="day" y="value" />
          <Point x="day" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });
});
