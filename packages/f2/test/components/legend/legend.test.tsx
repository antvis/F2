import { clone, values } from '@antv/util';
import { jsx, Component, Canvas, Chart, Tooltip, Geometry, Interval } from '../../../src';
import { Line, Axis, Legend } from '../../../src/components';
import { createContext, delay, gestureSimulator } from '../../util';

const { offsetWidth } = document.body;
const height = offsetWidth * 0.75;

describe('图例', () => {
  describe('图例样式', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
    ];
    it('默认', async () => {
      const context = createContext('默认', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('自定义样式', async () => {
      const context = createContext('自定义样式', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend
              style={{
                justifyContent: 'flex-start',
              }}
            />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('多行', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: -110 },
        { genre: 'Other1', sold: -110 },
      ];
      const context = createContext('多行', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('marker=line', async () => {
      const context = createContext('marker=line', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend
              style={{
                justifyContent: 'flex-start',
              }}
              marker="line"
            />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('position = bottom', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('position = bottom', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend position="bottom" />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('position = left', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('position = left', {
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend position="left" />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('position = right', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('position = right', {
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend position="right" />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('设置 itemStyle', async () => {
      const data = [
        {
          date: '2010-01-10',
          type: '金属',
          value: 96.6,
        },
        {
          date: '2010-01-10',
          type: '农副产品',
          value: 96.2,
        },
        {
          date: '2010-02-10',
          type: '金属',
          value: 91.1,
        },
        {
          date: '2010-02-10',
          type: '农副产品',
          value: 93.4,
        },
      ];
      const context = createContext('设置 itemStyle', {
        height: '200px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Axis
              field="date"
              tickCount={3}
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line x="date" y="value" color="type" />
            <Legend
              position="bottom"
              marker="line"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              itemStyle={{
                justifyContent: 'center',
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

    it('设置 nameStyle', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('设置 nameStyle', {
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend
              position="left"
              nameStyle={{
                fontSize: '40px',
                fill: 'red',
              }}
            />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('自定义 items', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('自定义 items', {
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend
              items={[
                {
                  name: 'Sports',
                  value: 0.1,
                },
                {
                  name: 'Strategy',
                  value: 0.2,
                },
                {
                  name: 'Action',
                  value: 0.3,
                },
              ]}
              itemFormatter={(v) => {
                return (v * 100).toFixed(2) + '%';
              }}
              nameStyle={{
                fontSize: '40px',
                fill: 'red',
              }}
              valueStyle={{
                fontSize: '40px',
                fill: 'red',
              }}
            />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });


    it('自定义 items Marker', async () => {
      const context = createContext('自定义 items Marker', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend
              style={{
                justifyContent: 'flex-start',
              }}
              marker="line"
              items={[
                {
                  color: 'blue',
                  name: 'Sports',
                  value: 0.1,
                  marker: 'square'
                },
                {
                  color: 'red',
                  name: 'Strategy',
                  value: 0.2,
                },
                {
                  color: 'red',
                  name: 'Action',
                  value: 0.3,
                },
              ]}
            />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('点击交互', () => {
    const onClick = jest.fn();
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
    ];
    it('可点击', async () => {
      const context = createContext('可点击', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend onClick={onClick} />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();
      await delay(200);
      expect(context).toMatchImageSnapshot();

      await gestureSimulator(context.canvas, 'click', { x: 27, y: 20 });
      await delay(200);
      expect(context).toMatchImageSnapshot();
      expect(onClick.mock.calls.length).toBe(1);
      expect(onClick.mock.calls[0][0]).toMatchObject({
        field: 'genre',
        color: '#1890FF',
        name: 'Sports',
      });
    });

    it('不可点击', async () => {
      const context = createContext('不可点击', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend clickable={false} />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();
      await delay(200);
      expect(context).toMatchImageSnapshot();

      await gestureSimulator(context.canvas, 'click', { x: 27, y: 20 });
      await delay(200);
      expect(context).toMatchImageSnapshot();
    });
  });

  it('图例数据更新', async () => {
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
    const data1 = [
      {
        name: '妖猫传',
        percent: 0.4,
        a: '1',
      },
      {
        name: '芳华',
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
    const context = createContext('图例数据更新');

    const getProps = (data) => {
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            coord={{
              type: 'polar',
              transposed: true,
            }}
            scale={{}}
          >
            <Interval x="a" y="percent" adjust="stack" color="name" animate={false} />
            <Legend />
          </Chart>
        </Canvas>
      );
      return props;
    };

    const props = getProps(data);
    const canvas = new Canvas(props);
    await canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    const updateProps = getProps(data1);
    await canvas.update(updateProps);
    expect(context).toMatchImageSnapshot();
  });

  it('图例 传入 itemFormatter', async () => {
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

    const context = createContext('图例 传入 itemFormatter');
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
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('图例 传入 valuePrefix', async () => {
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

    const context = createContext('图例 传入 valuePrefix');
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
            valuePrefix="  占比："
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('图例 传入 自定义items', async () => {
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

    const context = createContext('图例 传入 自定义items');
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
            items={[
              ,
              {
                color: 'red',
                name: '第一组',
                value: '20',
              },
              {
                color: 'blue',
                name: '第二组',
                value: '42',
              },
            ]}
            itemFormatter={(value, name) => {
              return value + '%';
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
  it('图例 传入 自定义items + valuePrefix', async () => {
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

    const context = createContext('图例 传入 自定义items + valuePrefix');
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
            items={[
              ,
              {
                color: 'red',
                name: '第一组',
                value: '20',
              },
              {
                color: 'blue',
                name: '第二组',
                value: '42',
              },
            ]}
            itemFormatter={(value, name) => {
              return value + '%';
            }}
            valuePrefix="百分比是"
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  describe('图例 marker 颜色取实际渲染颜色', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
    ];
    it('默认', async () => {
      const context = createContext('默认', {
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Interval
              x="genre"
              y="sold"
              color={{
                field: 'genre',
                callback: (genre, record) => {
                  if (record?.genre === 'Sports') return 'red';
                },
              }}
            />
            <Legend />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });
});
