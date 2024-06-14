import { jsx } from '../../../../src';
import { Polar, Rect } from '../../../../src/coord';
import { Canvas, Chart } from '../../../../src';
import { Interval, Axis, Legend, Tooltip } from '../../../../src/components';
import { createContext, delay } from '../../../util';

describe('柱状图示例', () => {
  // 基础
  it('基础柱状图', async () => {
    const context = createContext('基础柱状图', {
      height: '300px',
      width: '400px',
    });
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
    const { type, props } = (
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
    const context = createContext('区间柱状图', {
      height: '300px',
      width: '400px',
    });
    const data = [
      {
        x: '分类一',
        y: [76, 100],
      },
      {
        x: '分类二',
        y: [56, 108],
      },
      {
        x: '分类三',
        y: [38, 129],
      },
      {
        x: '分类四',
        y: [58, 155],
      },
      {
        x: '分类五',
        y: [45, 120],
      },
      {
        x: '分类六',
        y: [23, 99],
      },
      {
        x: '分类七',
        y: [18, 56],
      },
      {
        x: '分类八',
        y: [18, 34],
      },
    ];
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
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
    const context = createContext('渐变色柱状图', {
      height: '300px',
      width: '400px',
    });
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
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
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

  it('分组柱图', async () => {
    const context = createContext('分组柱图', {
      height: '300px',
      width: '400px',
    });
    const data = [
      {
        name: 'London',
        月份: 'Jan.',
        月均降雨量: 18.9,
      },
      {
        name: 'London',
        月份: 'Feb.',
        月均降雨量: 28.8,
      },
      {
        name: 'London',
        月份: 'Mar.',
        月均降雨量: 39.3,
      },
      {
        name: 'London',
        月份: 'Apr.',
        月均降雨量: 81.4,
      },
      {
        name: 'London',
        月份: 'May.',
        月均降雨量: 47,
      },
      {
        name: 'London',
        月份: 'Jun.',
        月均降雨量: 20.3,
      },
      {
        name: 'London',
        月份: 'Jul.',
        月均降雨量: 24,
      },
      {
        name: 'London',
        月份: 'Aug.',
        月均降雨量: 35.6,
      },
      {
        name: 'Berlin',
        月份: 'Jan.',
        月均降雨量: 12.4,
      },
      {
        name: 'Berlin',
        月份: 'Feb.',
        月均降雨量: 23.2,
      },
      {
        name: 'Berlin',
        月份: 'Mar.',
        月均降雨量: 34.5,
      },
      {
        name: 'Berlin',
        月份: 'Apr.',
        月均降雨量: 99.7,
      },
      {
        name: 'Berlin',
        月份: 'May.',
        月均降雨量: 52.6,
      },
      {
        name: 'Berlin',
        月份: 'Jun.',
        月均降雨量: 35.5,
      },
      {
        name: 'Berlin',
        月份: 'Jul.',
        月均降雨量: 37.4,
      },
      {
        name: 'Berlin',
        月份: 'Aug.',
        月均降雨量: 42.4,
      },
    ];
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="月份" />
          <Axis field="月均降雨量" />
          <Interval
            x="月份"
            y="月均降雨量"
            color="name"
            adjust={{
              type: 'dodge',
              marginRatio: 0.05, // 设置分组间柱子的间距
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
  it('带负值的分组分组柱图', async () => {
    const context = createContext('带负值的分组分组柱图');
    const data = [
      {
        time: '周四',
        tem: 18.2,
        city: 'tokyo',
      },
      {
        time: '周五',
        tem: 21.5,
        city: 'tokyo',
      },
      {
        time: '周六',
        tem: 25.2,
        city: 'tokyo',
      },
      {
        time: '周日',
        tem: 26.5,
        city: 'tokyo',
      },
      {
        time: '周四',
        tem: -17,
        city: 'newYork',
      },
      {
        time: '周五',
        tem: -22,
        city: 'newYork',
      },
      {
        time: '周六',
        tem: -24.8,
        city: 'newYork',
      },
      {
        time: '周日',
        tem: -24.1,
        city: 'newYork',
      },
    ];
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Interval
            x="time"
            y="tem"
            color="city"
            adjust="dodge"
            style={{
              field: 'tem',
              radius: (val) => {
                return val > 0 ? [10, 10, 0, 0] : [0, 0, 10, 10];
              },
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

  it('层叠柱图', async () => {
    const context = createContext('层叠柱图', {
      height: '300px',
      width: '400px',
    });
    const data = [
      {
        name: 'London',
        月份: 'Jan.',
        月均降雨量: 18.9,
      },
      {
        name: 'London',
        月份: 'Feb.',
        月均降雨量: 28.8,
      },
      {
        name: 'London',
        月份: 'Mar.',
        月均降雨量: 39.3,
      },
      {
        name: 'London',
        月份: 'Apr.',
        月均降雨量: 81.4,
      },
      {
        name: 'London',
        月份: 'May.',
        月均降雨量: 47,
      },
      {
        name: 'London',
        月份: 'Jun.',
        月均降雨量: 20.3,
      },
      {
        name: 'London',
        月份: 'Jul.',
        月均降雨量: 24,
      },
      {
        name: 'London',
        月份: 'Aug.',
        月均降雨量: 35.6,
      },
      {
        name: 'Berlin',
        月份: 'Jan.',
        月均降雨量: 12.4,
      },
      {
        name: 'Berlin',
        月份: 'Feb.',
        月均降雨量: 23.2,
      },
      {
        name: 'Berlin',
        月份: 'Mar.',
        月均降雨量: 34.5,
      },
      {
        name: 'Berlin',
        月份: 'Apr.',
        月均降雨量: 99.7,
      },
      {
        name: 'Berlin',
        月份: 'May.',
        月均降雨量: 52.6,
      },
      {
        name: 'Berlin',
        月份: 'Jun.',
        月均降雨量: 35.5,
      },
      {
        name: 'Berlin',
        月份: 'Jul.',
        月均降雨量: 37.4,
      },
      {
        name: 'Berlin',
        月份: 'Aug.',
        月均降雨量: 42.4,
      },
    ];
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="月份" />
          <Axis field="月均降雨量" />
          <Interval x="月份" y="月均降雨量" color="name" adjust="stack" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('堆叠柱图-max', async () => {
    const context = createContext('层叠柱图', {
      height: '300px',
      width: '400px',
    });
    const data = [
      {
        name: 'London',
        月份: 'Jan.',
        月均降雨量: 18.9,
      },
      {
        name: 'London',
        月份: 'Feb.',
        月均降雨量: 28.8,
      },
      {
        name: 'London',
        月份: 'Mar.',
        月均降雨量: 39.3,
      },
      {
        name: 'London',
        月份: 'Apr.',
        月均降雨量: 81.4,
      },
      {
        name: 'London',
        月份: 'May.',
        月均降雨量: 47,
      },
      {
        name: 'London',
        月份: 'Jun.',
        月均降雨量: 20.3,
      },
      {
        name: 'London',
        月份: 'Jul.',
        月均降雨量: 24,
      },
      {
        name: 'London',
        月份: 'Aug.',
        月均降雨量: 35.6,
      },
      {
        name: 'Berlin',
        月份: 'Jan.',
        月均降雨量: 12.4,
      },
      {
        name: 'Berlin',
        月份: 'Feb.',
        月均降雨量: 23.2,
      },
      {
        name: 'Berlin',
        月份: 'Mar.',
        月均降雨量: 34.5,
      },
      {
        name: 'Berlin',
        月份: 'Apr.',
        月均降雨量: 99.7,
      },
      {
        name: 'Berlin',
        月份: 'May.',
        月均降雨量: 52.6,
      },
      {
        name: 'Berlin',
        月份: 'Jun.',
        月均降雨量: 35.5,
      },
      {
        name: 'Berlin',
        月份: 'Jul.',
        月均降雨量: 37.4,
      },
      {
        name: 'Berlin',
        月份: 'Aug.',
        月均降雨量: 42.4,
      },
    ];
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          scale={{
            月均降雨量: {
              max: 100,
            },
          }}
        >
          <Axis field="月份" />
          <Axis field="月均降雨量" />
          <Interval x="月份" y="月均降雨量" color="name" adjust="stack" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('百分比层叠柱图', async () => {
    const context = createContext('百分比层叠柱图', {
      height: '300px',
      width: '400px',
    });
    const data = [
      {
        country: 'Europe',
        year: '1750',
        value: 163,
        percent: 0.24511278195488723,
      },
      {
        country: 'Asia',
        year: '1750',
        value: 502,
        percent: 0.7548872180451128,
      },
      {
        country: 'Europe',
        year: '1800',
        value: 203,
        percent: 0.24224343675417662,
      },
      {
        country: 'Asia',
        year: '1800',
        value: 635,
        percent: 0.7577565632458234,
      },
      {
        country: 'Europe',
        year: '1850',
        value: 276,
        percent: 0.2543778801843318,
      },
      {
        country: 'Asia',
        year: '1850',
        value: 809,
        percent: 0.7456221198156682,
      },
      {
        country: 'Europe',
        year: '1900',
        value: 408,
        percent: 0.3011070110701107,
      },
      {
        country: 'Asia',
        year: '1900',
        value: 947,
        percent: 0.6988929889298893,
      },
      {
        country: 'Europe',
        year: '1950',
        value: 547,
        percent: 0.2806567470497691,
      },
      {
        country: 'Asia',
        year: '1950',
        value: 1402,
        percent: 0.7193432529502309,
      },
      {
        country: 'Europe',
        year: '1999',
        value: 729,
        percent: 0.16708686683474674,
      },
      {
        country: 'Asia',
        year: '1999',
        value: 3634,
        percent: 0.8329131331652533,
      },
      {
        country: 'Europe',
        year: '2050',
        value: 628,
        percent: 0.10651289009497965,
      },
      {
        country: 'Asia',
        year: '2050',
        value: 5268,
        percent: 0.8934871099050203,
      },
      {
        country: 'Europe',
        year: '2100',
        value: 828,
        percent: 0.10227272727272728,
      },
      {
        country: 'Asia',
        year: '2100',
        value: 7268,
        percent: 0.8977272727272727,
      },
    ];
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="percent" />
          <Interval x="year" y="percent" color="country" adjust="stack" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('南丁格尔玫瑰图', async () => {
    const data = [
      {
        year: '2001',
        population: 41.8,
      },
      {
        year: '2002',
        population: 25.8,
      },
      {
        year: '2003',
        population: 31.7,
      },
      {
        year: '2004',
        population: 46,
      },
      {
        year: '2005',
        population: 28,
      },
    ];
    const context = createContext('南丁格尔玫瑰图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
          }}
          scale={{
            population: {
              min: 0,
            },
          }}
        >
          <Interval x="year" y="population" color="year" />
          <Legend position="right" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('花瓣图', async () => {
    const data = [
      {
        year: '2001',
        population: 25,
      },
      {
        year: '2002',
        population: 25,
      },
      {
        year: '2003',
        population: 25,
      },
      {
        year: '2004',
        population: 25,
      },
      {
        year: '2005',
        population: 25,
      },
      {
        year: '2006',
        population: 25,
      },
    ];
    const context = createContext('南丁格尔玫瑰图');
    const chartRef = { current: null };
    const ref = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          ref={chartRef}
          coord={{
            type: 'polar',
          }}
          scale={{
            population: {
              min: 0,
            },
          }}
        >
          <Interval
            x="year"
            y="population"
            color="year"
            style={{
              radius: 30,
            }}
            ref={ref}
          />
          <Legend position="right" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
  });
});
