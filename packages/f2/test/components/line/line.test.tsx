// @ts-nocheck
/* @jsx React.createElement */
import { Rect } from '../../../src/coord';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCanvas from '../../../../react/src/index';
import { jsx, Component, Canvas, Chart, Timeline } from '../../../src';
import { Line, Point, Axis, Tooltip, Legend } from '../../../src/components';
import { createContext } from '../../util';

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

const { offsetWidth } = document.body;
const height = offsetWidth * 0.75;

describe('折线图', () => {
  describe('基础折线图', () => {
    it('基础折线图', () => {
      const BASE = '基础折线图';
      const context = createContext(BASE);
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { offsetWidth } = document.body;
      const height = offsetWidth * 0.75;
      const { type, props } = (
        <Canvas
          context={context}
          pixelRatio={window.devicePixelRatio}
          width={offsetWidth}
          height={height}
        >
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: Rect,
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

      const canvas = new type(props);
      canvas.render();
    });

    it('开启无障碍', () => {
      const ARIA = '开启无障碍';
      const context = createContext(ARIA);
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { offsetWidth } = document.body;
      const height = offsetWidth * 0.75;
      const { type, props } = (
        <Canvas
          context={context}
          pixelRatio={window.devicePixelRatio}
          width={offsetWidth}
          height={height}
          padding="8px"
        >
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: Rect,
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
            <Line
              ref={lineRef}
              x="date"
              y="value"
              style={{ stroke: '#2FC25B' }}
            />
          </Chart>
        </Canvas>
      );

      const canvas = new type(props);
      canvas.render();

    });

    it('带点', () => {
      const WITH_POINT = '带点';
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
      const context = createContext(WITH_POINT);
      const chartRef = { current: null };
      const lineRef = { current: null };
      const pointRef = { current: null };
      const { offsetWidth } = document.body;
      const height = offsetWidth * 0.75;
      const { type, props } = (
        <Canvas
          context={context}
          pixelRatio={window.devicePixelRatio}
          width={offsetWidth}
          height={height}
          theme={{ sizes: [8] }}
        >
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: Rect,
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

      const canvas = new type(props);
      canvas.render();
    });

    it('曲线', () => {
      const SMOOTH = '曲线';
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
      const context = createContext(SMOOTH);
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { offsetWidth } = document.body;
      const height = offsetWidth * 0.75;
      const { type, props } = (
        <Canvas
          context={context}
          pixelRatio={window.devicePixelRatio}
          width={offsetWidth}
          height={height}
          // 方式一：通过 theme 设置全局 line style
          // theme={{
          //   shapes: {
          //     line: ['smooth'],
          //   },
          // }}
        >
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: Rect,
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
            {/* 方式二：通过 props style 传入 */}
            <Line x="time" y="tem" ref={lineRef} style={{ smooth: true }} />
            <Tooltip />
          </Chart>
        </Canvas>
      );

      const canvas = new type(props);
      canvas.render();

    });

    // TODO(@buli): 折线图平移

    // TODO(@buli): 曲线平移
  });

  describe('对比折线图', () => {
    it('走势对比', () => {
      const MULTIPLE_SERIES = '走势对比';
      const context = createContext(MULTIPLE_SERIES);
      const chartRef = { current: null };
      const lineRef = { current: null };
      fetch(
        'https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json'
      )
        .then((res) => res.json())
        .then((data) => {
          const { type, props } = (
            <Canvas
              context={context}
              pixelRatio={window.devicePixelRatio}
              width={offsetWidth}
              height={height}
            >
              <Chart
                ref={chartRef}
                data={data}
                coord={{
                  type: Rect,
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
                  lineWidth="4px"
                  color="type"
                  shape="type"
                />
                {/* TODO(@buli): 动态 legend value */}
                <Legend position="top" />
              </Chart>
            </Canvas>
          );

          const canvas = new type(props);
          canvas.render();

        });
    });

    it('style支持传入函数', () => {
      const MULTIPLE_SERIES = 'style支持传入函数';
      const context = createContext(MULTIPLE_SERIES);
      const chartRef = { current: null };
      const lineRef = { current: null };
      fetch(
        'https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json'
      )
        .then((res) => res.json())
        .then((data) => {
          const { type, props } = (
            <Canvas
              context={context}
              pixelRatio={window.devicePixelRatio}
              width={offsetWidth}
              height={height}
            >
              <Chart
                ref={chartRef}
                data={data}
                coord={{
                  type: Rect,
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
                  lineWidth="4px"
                  color={{
                    field: 'type',
                    callback: (type) => {
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
                {/* TODO(@buli): 动态 legend value */}
                <Legend position="top" />
              </Chart>
            </Canvas>
          );

          const canvas = new type(props);
          canvas.render();

        });
    });

    it('虚实线对比', () => {
      const MULTIPLE_SHAPE = '虚实线对比';
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
      const context = createContext(MULTIPLE_SHAPE);
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { offsetWidth } = document.body;
      const height = offsetWidth * 0.75;
      const { type, props } = (
        <Canvas
          context={context}
          pixelRatio={window.devicePixelRatio}
          width={offsetWidth}
          height={height}
        >
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: Rect,
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
              lineWidth="4px"
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
            <Legend position="top" />
          </Chart>
        </Canvas>
      );

      const canvas = new type(props);
      canvas.render();

    });

    it('折线锚点', () => {
      const ANCHOR_POINT = '折线锚点';
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
      const context = createContext(ANCHOR_POINT);
      const chartRef = { current: null };
      const lineRef = { current: null };
      const { offsetWidth } = document.body;
      const height = offsetWidth * 0.75;
      const { type, props } = (
        <Canvas
          context={context}
          pixelRatio={window.devicePixelRatio}
          width={offsetWidth}
          height={height}
        >
          <Chart
            ref={chartRef}
            data={data}
            coord={{
              type: Rect,
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
            <Line ref={lineRef} x="date" y="value" lineWidth="4px" />
            <Point
              x="date"
              y="value"
              size={{
                field: 'tag',
                map: (val) => (val ? 6 : 0),
              }}
              color={{
                field: 'tag',
                map: (val) => (val === 2 ? '#518DFE' : '#F35833'),
              }}
            />
            <Legend
              position="top"
              items={[
                {
                  name: '买入点',
                  marker: 'circle',
                  color: '#F35833',
                },
                {
                  name: '卖出点',
                  marker: 'circle',
                  color: '#518DFE',
                },
              ]}
            />
          </Chart>
        </Canvas>
      );

      const canvas = new type(props);
      canvas.render();

    });
  });

  it.skip('动态折线图', () => {
    const data = [];
    const { offsetWidth } = document.body;
    const height = offsetWidth * 0.75;

    class TestComponent extends Component {
      constructor(props) {
        super(props)
      }
    }

    // 添加数据，模拟数据，可以指定当前时间的偏移的秒
    function getRecord(offset) {
      offset = offset || 0;
      return {
        time: new Date().getTime() + offset * 1000,
        value: Math.random() + 10,
      };
    }

    data.push(getRecord(-2));
    data.push(getRecord(-1));
    data.push(getRecord());

    class ChartComponent extends React.Component<any, any> {
      constructor(props) {
        super(props);
        this.state = {
          data,
        };
      }

      componentDidMount() {
        // 更新数据
        for(let i=40; i>0; i--) {
          setTimeout( ()=> {
            const { data } = this.state;
            this.setState({ data: [].concat(data, getRecord()) });
          }, i * 1000);
        }
      }

      render() {
        const { data } = this.state;
        return (
          <div className="">
            <ReactCanvas width={offsetWidth} height={height}>
              <Chart
                data={data}
                scale={{
                  time: {
                    type: 'timeCat',
                  },
                  value: {
                    min: 0
                  }
                }}
              >
                <Line x="time" y="value" />
                <Axis field="value"/>
                <Axis field="time"/>
                <TestComponent/>
              </Chart>
            </ReactCanvas>
          </div>
        );
      }
    }

    const appDOM = document.createElement('div');
    appDOM.id = 'app';
    document.body.appendChild(appDOM);

    const Element = <ChartComponent />;

    // For debug
    ReactDOM.render(Element, document.getElementById('app'));
  });

  describe('其他折线图', () => {
    it('存在空值', () => {
      const { offsetWidth } = document.body;
      const height = offsetWidth * 0.75;
      fetch(
        'https://gw.alipayobjects.com/os/antfincdn/2TgqDdsXzK/usa-medals-won.json'
      )
        .then((res) => res.json())
        .then((data) => {
          const NULL_VALUE = '存在空值';
          const context = createContext(NULL_VALUE);
          const lineRef = { current: null };
          const { type, props } = (
            <Canvas
              context={context}
              pixelRatio={window.devicePixelRatio}
              width={offsetWidth}
              height={height}
            >
              <Chart
                data={data}
                coord={{
                  type: Rect,
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
                    textAlign: 'start',
                    textBaseline: 'middle',
                    rotate: Math.PI / 2,
                  }}
                />
                <Axis field="count" />
                <Line
                  ref={lineRef}
                  x="year"
                  y="count"
                  color={{
                    field: 'medalType',
                    map: (val) => {
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

          const canvas = new type(props);
          canvas.render();
        });
    });

    it('连接空值数据', () => {
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
          value: null,
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
      const CONNECT_NULL = '连接空值数据';
      const context = createContext(CONNECT_NULL);
      const lineRef = { current: null };
      const { offsetWidth } = document.body;
      const height = offsetWidth * 0.75;
      const { type, props } = (
        <Canvas
          context={context}
          width={offsetWidth}
          height={height}
          pixelRatio={window.devicePixelRatio}
        >
          <Chart data={data}>
            <Axis field="day" />
            <Axis field="value" />
            <Line ref={lineRef} x="day" y="value" connectNulls />
          </Chart>
        </Canvas>
      );

      const canvas = new type(props);
      canvas.render();
    });
  });
});
