import { jsx, Component, Canvas, Chart, Line, Point, Axis, Legend } from '../../../src';
import { createContext, delay } from '../../util';
const data1 = [
  {
    date: '2017-06-05',
    value: 0.8,
  },
  {
    date: '2017-06-06',
    value: -1.1,
  },
];

const data = [
  {
    date: '2017-06-05',
    value: 116,
  },
  {
    date: '2017-06-06',
    value: 129,
  },
  {
    date: '2017-06-07',
    value: 135,
  },
  {
    date: '2017-06-08',
    value: 86,
  },
  {
    date: '2017-06-09',
    value: 73,
  },
  {
    date: '2017-06-10',
    value: 85,
  },
  {
    date: '2017-06-11',
    value: 73,
  },
  {
    date: '2017-06-12',
    value: 68,
  },
  {
    date: '2017-06-13',
    value: 92,
  },
  {
    date: '2017-06-14',
    value: 130,
  },
  {
    date: '2017-06-15',
    value: 245,
  },
  {
    date: '2017-06-16',
    value: 139,
  },
  {
    date: '2017-06-17',
    value: 115,
  },
  {
    date: '2017-06-18',
    value: 111,
  },
  {
    date: '2017-06-19',
    value: 309,
  },
  {
    date: '2017-06-20',
    value: 206,
  },
  {
    date: '2017-06-21',
    value: 137,
  },
  {
    date: '2017-06-22',
    value: 128,
  },
  {
    date: '2017-06-23',
    value: 85,
  },
  {
    date: '2017-06-24',
    value: 94,
  },
  {
    date: '2017-06-25',
    value: 71,
  },
  {
    date: '2017-06-26',
    value: 106,
  },
  {
    date: '2017-06-27',
    value: 84,
  },
  {
    date: '2017-06-28',
    value: 93,
  },
  {
    date: '2017-06-29',
    value: 85,
  },
  {
    date: '2017-06-30',
    value: 73,
  },
  {
    date: '2017-07-01',
    value: 83,
  },
  {
    date: '2017-07-02',
    value: 125,
  },
  {
    date: '2017-07-03',
    value: 107,
  },
  {
    date: '2017-07-04',
    value: 82,
  },
  {
    date: '2017-07-05',
    value: 44,
  },
  {
    date: '2017-07-06',
    value: 72,
  },
  {
    date: '2017-07-07',
    value: 106,
  },
  {
    date: '2017-07-08',
    value: 107,
  },
  {
    date: '2017-07-09',
    value: 66,
  },
  {
    date: '2017-07-10',
    value: 91,
  },
  {
    date: '2017-07-11',
    value: 92,
  },
  {
    date: '2017-07-12',
    value: 113,
  },
  {
    date: '2017-07-13',
    value: 107,
  },
  {
    date: '2017-07-14',
    value: 131,
  },
  {
    date: '2017-07-15',
    value: 111,
  },
  {
    date: '2017-07-16',
    value: 64,
  },
  {
    date: '2017-07-17',
    value: 69,
  },
  {
    date: '2017-07-18',
    value: 88,
  },
  {
    date: '2017-07-19',
    value: 77,
  },
  {
    date: '2017-07-20',
    value: 83,
  },
  {
    date: '2017-07-21',
    value: 111,
  },
  {
    date: '2017-07-22',
    value: 57,
  },
  {
    date: '2017-07-23',
    value: 55,
  },
  {
    date: '2017-07-24',
    value: 60,
  },
];

describe('折线图', () => {
  describe('基础折线图', () => {
    it('基础折线图', async () => {
      const context = createContext('基础折线图');
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: 'rect',
              // transposed: true,
              // left: 10,
              // top: 10,
              // right: 100,
              // bottom: 100,
            }}
            scale={
              {
                // date: {},
                // value: {},
              }
            }
          >
            <Axis
              field="date"
              tickCount={3}
              style={{
                label: {
                  // align 默认值为 center，可能会导致首尾 tick label 超出画布范围
                  align: 'between',
                },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line ref={lineRef} x="date" y="value" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('特殊数据折线图', async () => {
      const context = createContext('基础折线图');
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart ref={chartRef} data={data1}>
            <Axis field="date" tickCount={3} />
            <Axis field="value" tickCount={2} />
            <Line ref={lineRef} x="date" y="value" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('开启无障碍', async () => {
      const context = createContext('开启无障碍');
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { type, props } = (
        <Canvas context={context} pixelRatio={1} padding="8px">
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: 'rect',
            }}
          >
            <Axis
              field="date"
              tickCount={3}
              style={{
                label: {
                  // align 默认值为 center，可能会导致首尾 tick label 超出画布范围
                  align: 'between',
                },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line ref={lineRef} x="date" y="value" style={{ stroke: '#2FC25B' }} />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();
    });

    it('带点', async () => {
      const data = [
        {
          day: 'Mon',
          value: 300,
        },
        {
          day: 'Tue',
          value: 400,
        },
        {
          day: 'Wed',
          value: 350,
        },
        {
          day: 'Thu',
          value: 500,
        },
        {
          day: 'Fri',
          value: 490,
        },
        {
          day: 'Sat',
          value: 600,
        },
        {
          day: 'Sun',
          value: 900,
        },
      ];
      const context = createContext('带点');
      const chartRef = { current: null };
      const lineRef = { current: null };
      const pointRef = { current: null };
      const { props } = (
        <Canvas context={context} pixelRatio={1} theme={{ sizes: [8] }}>
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: 'rect',
            }}
          >
            <Axis
              field="day"
              tickCount={3}
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line x="day" y="value" ref={lineRef} />
            <Point x="day" y="value" ref={pointRef} />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('曲线', async () => {
      const data = [
        {
          time: '2016-08-08 00:00:00',
          tem: 10,
        },
        {
          time: '2016-08-08 00:10:00',
          tem: 22,
        },
        {
          time: '2016-08-08 00:30:00',
          tem: 20,
        },
        {
          time: '2016-08-09 00:35:00',
          tem: 26,
        },
        {
          time: '2016-08-09 01:00:00',
          tem: 20,
        },
        {
          time: '2016-08-09 01:20:00',
          tem: 26,
        },
        {
          time: '2016-08-10 01:40:00',
          tem: 28,
        },
        {
          time: '2016-08-10 02:00:00',
          tem: 20,
        },
        {
          time: '2016-08-10 02:20:00',
          tem: 18,
        },
      ];
      const context = createContext('曲线');
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: 'rect',
            }}
            scale={{
              time: {
                type: 'timeCat',
                tickCount: 3,
              },
              tem: {
                tickCount: 5,
              },
            }}
          >
            <Axis
              field="time"
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="tem" />
            <Line x="time" y="tem" ref={lineRef} shape="smooth" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('阶梯图', async () => {
      const context = createContext('阶梯图', {
        width: '380px',
      });
      const data = [];
      [
        {
          time: '2016-08-01',
          tem: 15,
          type: 'start',
        },
        {
          time: '2016-08-02',
          tem: 22,
          type: 'start',
        },
        {
          time: '2016-08-03',
          tem: 15,
          type: 'start',
        },
        {
          time: '2016-08-04',
          tem: 26,
          type: 'start',
        },
        {
          time: '2016-08-05',
          tem: 20,
          type: 'start',
        },
        {
          time: '2016-08-06',
          tem: 26,
          type: 'start',
        },
      ].map((d) => {
        data.push(d);
        data.push({ ...d, tem: d.tem + 15, type: 'middle' });
        data.push({ ...d, tem: d.tem + 30, type: 'end' });
      });

      const { type, props } = (
        <Canvas context={context}>
          <Chart data={data}>
            <Axis
              field="time"
              tickCount={2}
              style={{
                label: {
                  align: 'between',
                },
              }}
            />
            <Axis field="tem" tickCount={5} max={60} />
            <Line
              x="time"
              y="tem"
              color="type"
              shape={{
                field: 'type',
                range: ['step-start', 'step-middle', 'step-end'],
              }}
            />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();
      await delay(500);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('对比折线图', () => {
    it('走势对比', async () => {
      const context = createContext('走势对比');
      const chartRef = { current: null };
      const lineRef = { current: null };
      const res = await fetch(
        'https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json'
      );
      const data = await res.json();
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: 'rect',
            }}
            scale={{
              type: {
                type: 'cat',
                values: ['金属', '农副产品', '能源'],
              },
            }}
          >
            <Axis
              field="date"
              tickCount={3}
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line ref={lineRef} x="date" y="value" color="type" shape="type" />
            <Legend position="top" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();
      await delay(0);
      const line = lineRef.current;
      expect(line.attrs.color.scale.values).toEqual(['金属', '农副产品', '能源']);
    });

    it('style支持传入函数', async () => {
      const context = createContext('style支持传入函数');
      const colorCallback = jest.fn();
      const chartRef = { current: null };
      const lineRef = { current: null };
      const res = await fetch(
        'https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json'
      );
      const data = await res.json();
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: 'rect',
            }}
            scale={{}}
          >
            <Axis
              field="date"
              tickCount={3}
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line
              ref={lineRef}
              x="date"
              y="value"
              color={{
                field: 'type',
                callback: (type, origin) => {
                  colorCallback(origin);
                  if (type === '金属') {
                    return '#666';
                  }
                  return 'red';
                },
              }}
              style={{
                field: 'type', // 可选指定field
                smooth: true, // 传入非函数的值
                stroke: (type) => {
                  // 传入函数
                  if (type === '金属') {
                    return '#666';
                  }
                  return 'red';
                },
                lineWidth: (type) => {
                  if (type === '金属') {
                    return 2;
                  }
                  return 1;
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

      expect(colorCallback.mock.calls.length).toBe(3);
      expect(colorCallback.mock.calls[0][0]).toEqual(data[0]);
    });

    it('虚实线对比', async () => {
      const data = [
        {
          time: '2016-08-08 00:00:00',
          value: 10,
          type: '预期收益率',
        },
        {
          time: '2016-08-08 00:10:00',
          value: 22,
          type: '预期收益率',
        },
        {
          time: '2016-08-08 00:30:00',
          value: 16,
          type: '预期收益率',
        },
        {
          time: '2016-08-09 00:35:00',
          value: 26,
          type: '预期收益率',
        },
        {
          time: '2016-08-09 01:00:00',
          value: 12,
          type: '预期收益率',
        },
        {
          time: '2016-08-09 01:20:00',
          value: 26,
          type: '预期收益率',
        },
        {
          time: '2016-08-10 01:40:00',
          value: 18,
          type: '预期收益率',
        },
        {
          time: '2016-08-10 02:00:00',
          value: 26,
          type: '预期收益率',
        },
        {
          time: '2016-08-10 02:20:00',
          value: 12,
          type: '预期收益率',
        },
        {
          time: '2016-08-08 00:00:00',
          value: 4,
          type: '实际收益率',
        },
        {
          time: '2016-08-08 00:10:00',
          value: 3,
          type: '实际收益率',
        },
        {
          time: '2016-08-08 00:30:00',
          value: 6,
          type: '实际收益率',
        },
        {
          time: '2016-08-09 00:35:00',
          value: -12,
          type: '实际收益率',
        },
        {
          time: '2016-08-09 01:00:00',
          value: 1,
          type: '实际收益率',
        },
        {
          time: '2016-08-09 01:20:00',
          value: 9,
          type: '实际收益率',
        },
        {
          time: '2016-08-10 01:40:00',
          value: 13,
          type: '实际收益率',
        },
        {
          time: '2016-08-10 02:00:00',
          value: -3,
          type: '实际收益率',
        },
        {
          time: '2016-08-10 02:20:00',
          value: 11,
          type: '实际收益率',
        },
      ];
      const context = createContext('虚实线对比');
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: 'rect',
            }}
            scale={{
              time: {
                type: 'timeCat',
                mask: 'hh:mm',
                range: [0, 1],
              },
              value: {
                formatter: (value) => `${value}%`,
              },
            }}
          >
            <Axis
              field="time"
              tickCount={3}
              style={{
                label: {
                  // align 默认值为 center，可能会导致首尾 tick label 超出画布范围
                  align: 'between',
                },
              }}
            />
            <Axis field="value" tickCount={3} />
            <Line
              ref={lineRef}
              x="time"
              y="value"
              shape={{
                field: 'type',
                callback: (type) => {
                  if (type === '预期收益率') {
                    return 'line';
                  }
                  if (type === '实际收益率') {
                    return 'dash';
                  }
                },
              }}
              color="type"
            />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('折线锚点', async () => {
      const data = [
        {
          date: '2017-06-05',
          value: 11.6,
          tag: 0,
        },
        {
          date: '2017-06-06',
          value: 12.9,
          tag: 0,
        },
        {
          date: '2017-06-07',
          value: 13.5,
          tag: 0,
        },
        {
          date: '2017-06-08',
          value: 8.6,
          tag: 2,
        },
        {
          date: '2017-06-09',
          value: 7.3,
          tag: 2,
        },
        {
          date: '2017-06-10',
          value: 8.5,
          tag: 0,
        },
        {
          date: '2017-06-11',
          value: 7.3,
          tag: 0,
        },
        {
          date: '2017-06-12',
          value: 6.8,
          tag: 0,
        },
        {
          date: '2017-06-13',
          value: 9.2,
          tag: 0,
        },
        {
          date: '2017-06-14',
          value: 13.0,
          tag: 1,
        },
        {
          date: '2017-06-15',
          value: 24.5,
          tag: 0,
        },
        {
          date: '2017-06-16',
          value: 13,
          tag: 0,
        },
        {
          date: '2017-06-17',
          value: 11.5,
          tag: 1,
        },
        {
          date: '2017-06-18',
          value: 11.1,
          tag: 0,
        },
        {
          date: '2017-06-19',
          value: 30.9,
          tag: 0,
        },
        {
          date: '2017-06-20',
          value: 20.6,
          tag: 1,
        },
        {
          date: '2017-06-21',
          value: 13.7,
          tag: 1,
        },
        {
          date: '2017-06-22',
          value: 12.8,
          tag: 1,
        },
        {
          date: '2017-06-23',
          value: 8.5,
          tag: 0,
        },
        {
          date: '2017-06-24',
          value: 9.4,
          tag: 1,
        },
        {
          date: '2017-06-25',
          value: 7.1,
          tag: 0,
        },
        {
          date: '2017-06-26',
          value: 10.6,
          tag: 0,
        },
        {
          date: '2017-06-27',
          value: 8.4,
          tag: 0,
        },
        {
          date: '2017-06-28',
          value: 9.3,
          tag: 0,
        },
        {
          date: '2017-06-29',
          value: 8.5,
          tag: 0,
        },
        {
          date: '2017-06-30',
          value: 7.3,
          tag: 0,
        },
      ];
      const context = createContext('折线锚点');
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: 'rect',
            }}
            scale={{
              date: {
                type: 'timeCat',
                tickCount: 3,
              },
              value: {
                tickCount: 5,
                min: 0,
                formatter: (val) => `${val.toFixed(2)}%`,
              },
              tag: {
                type: 'cat',
              },
            }}
          >
            <Axis
              field="date"
              style={{
                label: { align: 'between' },
              }}
            />
            <Axis field="value" />
            <Line ref={lineRef} x="date" y="value" />
            <Point
              x="date"
              y="value"
              size={{
                field: 'tag',
                callback: (val) => (val ? 3 : 0),
              }}
              color={{
                field: 'tag',
                callback: (val) => (val === 2 ? '#518DFE' : '#F35833'),
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

  it('动态折线图', async () => {
    const context = createContext('动态折线图');
    const data = [];

    // 添加数据，模拟数据，可以指定当前时间的偏移的秒
    function getRecord(offset?) {
      offset = offset || 0;
      return {
        time: new Date().getTime() + offset * 1000,
        value: Math.random() + 10,
      };
    }
    data.push(getRecord(-3));
    data.push(getRecord(-2));
    data.push(getRecord(-1));

    const lineRef = { current: null };

    class DynamicLine extends Component {
      constructor(props) {
        super(props);
        this.state = {
          data,
        };
      }

      didMount() {
        setTimeout(() => {
          const { data } = this.state;
          let newData = [].concat(data);
          for (let i = 0; i <= 10; i++) {
            newData.push(getRecord(i));
          }
          this.setState({ data: newData });
        }, 20);
      }

      render() {
        const { data } = this.state;
        return (
          <Chart
            data={data}
            scale={{
              time: {
                type: 'timeCat',
              },
              value: {
                min: 0,
              },
            }}
          >
            <Line ref={lineRef} x="time" y="value" />
            <Axis field="value" />
            <Axis field="time" />
          </Chart>
        );
      }
    }
    const { props } = (
      <Canvas context={context} animate={false}>
        <DynamicLine />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    const container = lineRef.current.container;
    const polyline = container.children[0].children[0].children[0].children[0];

    expect(polyline.getAttribute('points').length).toBe(3);

    await delay(200);
    const newPolyline = container.children[0].children[0].children[0].children[0];

    expect(newPolyline.getAttribute('points').length > 3).toBe(true);
  });

  describe('其他折线图', () => {
    it('存在空值', async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/antfincdn/2TgqDdsXzK/usa-medals-won.json'
      );
      const data = await res.json();
      const context = createContext('存在空值');
      const lineRef = { current: null };
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart
            data={data}
            coord={{
              type: 'rect',
            }}
            scale={{
              count: {
                min: 0,
                max: 100,
              },
              year: {
                tickCount: 3,
              },
            }}
          >
            <Axis
              field="year"
              style={{
                label: {
                  align: 'start',
                  textBaseline: 'middle',
                  transform: 'rotate(90deg)',
                },
              }}
            />
            <Axis field="count" />
            <Line
              ref={lineRef}
              x="year"
              y="count"
              color={{
                field: 'medalType',
                callback: (val) => {
                  if (val === 'Gold Medals') {
                    return '#f3ac32';
                  } else if (val === 'Silver Medals') {
                    return '#b8b8b8';
                  } else if (val === 'Bronze Medals') {
                    return '#bb6e36';
                  }
                },
              }}
            />
            <Legend position="top" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();
      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('连接空值数据', async () => {
      const data = [
        {
          day: 'Mon',
          value: 300,
        },
        {
          day: 'Tue',
          value: 400,
        },
        {
          day: 'Wed',
          value: null,
        },
        {
          day: 'Thu',
          value: 500,
        },
        {
          day: 'Fri',
          value: 490,
        },
        {
          day: 'Sat',
          value: 600,
        },
        {
          day: 'Sun',
          value: 900,
        },
      ];
      const context = createContext('连接空值数据');
      const lineRef = { current: null };
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Axis field="day" />
            <Axis field="value" />
            <Line ref={lineRef} x="day" y="value" connectNulls />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('指定线宽', async () => {
      const BASE = '指定线宽';
      const context = createContext(BASE);
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Axis field="date" tickCount={3} />
            <Axis field="value" tickCount={5} />
            <Line size="6px" x="date" y="value" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();
      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('按条件判断隐藏 x 坐标轴', async () => {
      const BASE = '按条件判断隐藏 x 坐标轴';
      const context = createContext(BASE);
      const showXAxis = false; // 根据 showXAxis 值决定是否隐藏 x 坐标轴
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            {showXAxis && <Axis field="date" tickCount={3} />}
            <Axis field="value" tickCount={5} />
            <Line size="6px" x="date" y="value" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();
      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
    it('Y轴数据格式转换（刻度值较大的情形）', async () => {
      const BASE = 'Y轴数据格式转换（刻度值较大的情形）';
      const context = createContext(BASE);
      const data = [
        {
          time: '2016-08-01',
          tem: 3 * 10 ** 9,
        },
        {
          time: '2016-08-02',
          tem: 222,
        },
        {
          time: '2016-08-03',
          tem: 20,
        },
        {
          time: '2016-08-04',
          tem: 26,
        },
      ];
      const { type, props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Axis field="time" tickCount={2} />
            <Axis
              field="tem"
              tickCount={5}
              style={{
                label: (text, index, ticks) => {
                  const textConfig: any = {};
                  textConfig.text = ticks[index].tickValue / 10 ** 8 + '亿';
                  return textConfig;
                },
              }}
            />
            <Line size="6px" x="time" y="tem" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();
      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('y 是 array', () => {
    it('堆叠折线', async () => {
      const context = createContext('堆叠折线');
      const data = [
        {
          date: '2017-06-05',
          type: 'a',
          value: 100,
        },
        {
          date: '2017-06-05',
          type: 'b',
          value: 116,
        },
        {
          date: '2017-06-06',
          type: 'a',
          value: 110,
        },
        {
          date: '2017-06-06',
          type: 'b',
          value: 129,
        },
        {
          date: '2017-06-07',
          type: 'a',
          value: 123,
        },
        {
          date: '2017-06-07',
          type: 'b',
          value: 135,
        },
        {
          date: '2017-06-08',
          type: 'a',
          value: 70,
        },
        {
          date: '2017-06-08',
          type: 'b',
          value: 86,
        },
      ];
      const { props } = (
        <Canvas context={context} pixelRatio={1} animate={false}>
          <Chart data={data}>
            <Axis
              field="date"
              tickCount={3}
              range={[0, 1]}
              style={{
                label: {
                  // align 默认值为 center，可能会导致首尾 tick label 超出画布范围
                  align: 'between',
                },
              }}
            />
            <Axis field="value" tickCount={5} />
            <Line x="date" y="value" color="type" adjust="stack" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('y 轴为数组', async () => {
      const data = [
        {
          date: '2017-06-05',
          value: [100, 116],
        },
        {
          date: '2017-06-06',
          value: [110, 129],
        },
        {
          date: '2017-06-07',
          value: [123, 135],
        },
        {
          date: '2017-06-08',
          value: [70, 86],
        },
      ];
      const context = createContext('基础折线图');
      const { props } = (
        <Canvas context={context} pixelRatio={1} animate={false}>
          <Chart data={data}>
            <Axis
              field="date"
              tickCount={3}
              range={[0, 1]}
              style={{
                label: {
                  // align 默认值为 center，可能会导致首尾 tick label 超出画布范围
                  align: 'between',
                },
              }}
            />
            <Axis field="value" tickCount={5} />
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
});
