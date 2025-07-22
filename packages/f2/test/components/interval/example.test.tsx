import { Canvas, Chart, jsx } from '../../../src';
import { Axis, Interval } from '../../../src/components';
import { createContext, delay } from '../../util';

describe('柱图示例', () => {
  // 基础
  it('基础柱状图', async () => {
    const context = createContext('基础柱状图');
    const data = [
      {
        year: '1951',
        sales: 38,
      },
      {
        year: '1952',
        sales: 52,
      },
      {
        year: '1956',
        sales: 61,
      },
      {
        year: '1957',
        sales: 145,
      },
      {
        year: '1958',
        sales: 48,
      },
      {
        year: '1959',
        sales: 38,
      },
      {
        year: '1960',
        sales: 38,
      },
      {
        year: '1962',
        sales: 38,
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Interval x="year" y="sales" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('区间柱状图', async () => {
    const context = createContext('区间柱状图');
    const data = [
      {
        x: 'cat1',
        y: [76, 100],
      },
      {
        x: 'cat2',
        y: [56, 108],
      },
      {
        x: 'cat3',
        y: [38, 129],
      },
      {
        x: 'cat4',
        y: [58, 155],
      },
      {
        x: 'cat5',
        y: [45, 120],
      },
      {
        x: 'cat6',
        y: [23, 99],
      },
      {
        x: 'cat7',
        y: [18, 56],
      },
      {
        x: 'cat8',
        y: [18, 34],
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="x" />
          <Axis field="y" />
          <Interval x="x" y="y" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('渐变色柱状图', async () => {
    const context = createContext('区间柱状图');
    const data = [
      {
        year: '2014',
        sales: 145,
        name: '1',
      },
      {
        year: '2015',
        sales: 121,
        name: '1',
      },
      {
        year: '2016',
        sales: 100,
        name: '1',
      },
      {
        year: '2017',
        sales: 97,
        name: '1',
      },
      {
        year: '2018',
        sales: 85,
        name: '1',
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Interval x="year" y="sales" color="l(90) 0:#1890ff 1:#70cdd0" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('纹理柱状图', async () => {
    const context = createContext('纹理柱状图');
    const data = [
      {
        year: '1951',
        sales: 38,
      },
      {
        year: '1952',
        sales: 52,
      },
      {
        year: '1956',
        sales: 61,
      },
      {
        year: '1957',
        sales: 145,
      },
      {
        year: '1958',
        sales: 48,
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="sales" />
          <Interval
            x="year"
            y="sales"
            color={{
              range: [
                {
                  // image: 'https://gw.alipayobjects.com/zos/rmsportal/cNOctfQVgZmwaXeBITuD.jpg',
                  image: (await import('./images/pattern')).default,
                  repetition: 'repeat',
                },
              ],
            }}
            animate={false}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('堆叠分组柱状图', async () => {
    const context = createContext('堆叠分组柱状图');
    const data = [
      { 分类: 'A', 小类: 'a1', 年份: '2019', 销量: 30 },
      { 分类: 'A', 小类: 'a2', 年份: '2019', 销量: [20, 30] },
      { 分类: 'B', 小类: 'b', 年份: '2019', 销量: 18 },
      { 分类: 'A', 小类: 'a1', 年份: '2020', 销量: 40 },
      { 分类: 'A', 小类: 'a2', 年份: '2020', 销量: [25, 40] },
      { 分类: 'B', 小类: 'b', 年份: '2020', 销量: 30 },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="年份" />
          <Axis field="销量" />
          <Interval
            x="年份"
            y="销量"
            color="小类"
            adjust={{
              type: 'dodge',
              dodgeBy: '分类',
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
});
