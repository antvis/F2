import { jsx } from '../../../../src';
import { Polar, Rect } from '../../../../src/coord';
import { Canvas, Chart } from '../../../../src';
import { Interval, Axis, Legend, Tooltip, ArcGuide, TextGuide } from '../../../../src/components';
import { createContext, delay, gestureSimulator } from '../../../util';

describe('环形图', () => {
  it('基础环形图', async () => {
    const data = [
      {
        name: '股票类',
        percent: 83.59,
        a: '1',
      },
      {
        name: '债券类',
        percent: 2.17,
        a: '1',
      },
      {
        name: '现金类',
        percent: 14.24,
        a: '1',
      },
    ];

    const map = {};
    data.forEach(function(obj) {
      map[obj.name] = obj.percent + '%';
    });

    const context = createContext('基础环形图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
            innerRadius: 0.7,
            radius: 0.85,
          }}
          scale={{}}
        >
          <Interval
            x="a"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: ['#FE5D4D', '#3BA4FF', '#737DDE'],
            }}
          />
          <Legend
            position="right"
            itemFormatter={(value, name) => {
              return map[name];
            }}
            valuePrefix="      "
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('嵌套环形图', async () => {
    const data = [
      {
        a: '1',
        b: 0.2,
        c: '1',
      },
      {
        a: '2',
        b: 0.5,
        c: '1',
      },
      {
        a: '3',
        b: 0.4,
        c: '1',
      },
      {
        a: '1',
        b: 0.8,
        c: '2',
      },
      {
        a: '2',
        b: 0.5,
        c: '2',
      },
      {
        a: '3',
        b: 0.6,
        c: '2',
      },
    ];
    const context = createContext('嵌套环形图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
            innerRadius: 0.5,
          }}
          scale={{}}
        >
          <Interval x="a" y="b" color="c" adjust="stack" />
          <Legend position="top" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('环形进度条', async () => {
    const data = [
      {
        x: '1',
        y: 85,
      },
    ];
    const context = createContext('环形进度条');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
            innerRadius: 0.8,
          }}
          scale={{
            y: {
              max: 100,
              min: 0,
            },
          }}
        >
          <ArcGuide
            records={[
              {
                x: 0,
                y: 0,
              },
              {
                x: 1,
                y: 99.98,
              },
            ]}
            style={{
              lineWidth: 11,
              stroke: '#ccc',
            }}
          />
          <TextGuide
            records={[
              {
                x: '1',
                y: '25%',
              },
            ]}
            content={'85%'}
            style={{
              fill: '#1890FF',
            }}
          />
          <Interval x="x" y="y" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('基础环形图 - 数值的和刚好等于nice处理后的最后一个tick值', async () => {
    const data = [
      { type: 'fundType', name: '偏债型', percent: 3 },
      { type: 'fundType', name: '偏股型', percent: 97 },
    ];
    const context = createContext('基础环形图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
            innerRadius: 0.7,
            radius: 0.85,
          }}
        >
          <Interval
            x="type"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: ['#FE5D4D', '#3BA4FF', '#737DDE'],
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('玫瑰环形图', async () => {
    const data = [
      {
        name: '股票类',
        percent: 10,
        a: [0, 83],
      },
      {
        name: '债券类',
        percent: 40,
        a: [83, 110],
      },
      {
        name: '现金类',
        percent: 80,
        a: [110, 134],
      },
    ];

    const map = {};
    data.forEach(function(obj) {
      map[obj.name] = obj.percent + '%';
    });

    const context = createContext('基础环形图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: false,
            innerRadius: 0.7,
            radius: 1,
          }}
          scale={{
            a: {
              type: 'linear',
              nice: false,
            },
          }}
        >
          <Interval
            x="a"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: ['#FE5D4D', '#3BA4FF', '#737DDE'],
            }}
            selection={{
              selectedStyle: (value) => {
                return {
                  r: value.yMax * 1.4,
                };
              },
            }}
          />
          <Legend
            position="right"
            itemFormatter={(value, name) => {
              return map[name];
            }}
            valuePrefix="      "
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
    await delay(20);

    await gestureSimulator(context.canvas, 'click', { x: 133, y: 64 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });
});
