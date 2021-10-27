import { Rect } from '../../../src/coord';
import { jsx } from '../../../src/jsx';
import { Canvas, Chart, Area, Line, Axis } from '../../../src';
import { createContext } from '../../util';

const { offsetWidth } = document.body;
const height = offsetWidth * 0.75;

const data = [
  {
    time: 'Jan.',
    tem: 1000,
  },
  {
    time: 'Feb.',
    tem: 2200,
  },
  {
    time: 'Mar.',
    tem: 2000,
  },
  {
    time: 'Apr.',
    tem: 2600,
  },
  {
    time: 'May.',
    tem: 2000,
  },
  {
    time: 'Jun.',
    tem: 2600,
  },
  {
    time: 'Jul.',
    tem: 2800,
  },
  {
    time: 'Aug.',
    tem: 2000,
  },
];

describe('面积图', () => {
  describe('基础面积图', () => {
    it('基础面积图', () => {
      const context = createContext('基础面积图');
      const { type, props } = (
        <Canvas
          context={context}
          width={offsetWidth}
          height={height}
          coord={{
            type: Rect,
          }}
          pixelRatio={window.devicePixelRatio}
        >
          <Chart
            data={data}
            scale={{
              tem: {
                min: 0,
                tickCount: 5,
              },
              time: {
                range: [0, 1],
              },
            }}
          >
            <Axis field="time" />
            <Axis field="tem" />
            <Area x="time" y="tem" />
            <Line x="time" y="tem" />
          </Chart>
        </Canvas>
      );
      // @ts-ignore
      const chart = new type(props);
      chart.render();
    });

    it('带负值面积图', () => {
      const context = createContext('带负值面积图');
      const data = [{
        month: 'Jan.',
        value: 6.06
      }, {
        month: 'Feb.',
        value: 82.2
      }, {
        month: 'Mar.',
        value: -22.11
      }, {
        month: 'Apr.',
        value: 21.53
      }, {
        month: 'May.',
        value: -21.74
      }, {
        month: 'Jun.',
        value: 73.61
      }, {
        month: 'Jul.',
        value: 53.75
      }, {
        month: 'Aug.',
        value: 60.32
      }];
      const { type, props } = (
        <Canvas
          context={context}
          width={offsetWidth}
          height={height}
          coord={{
            type: Rect,
          }}
          pixelRatio={window.devicePixelRatio}
        >
          <Chart
            data={data}
            scale={{
              month: {
                range: [ 0, 1 ]
              },
              value: {
                nice: false,
                min: -100,
                max: 100,
                tickCount: 5,
              }
            }}
          >
            <Axis field="month" />
            <Axis field="value" />
            <Area x="month" y="value" />
            <Line x="month" y="value" />
          </Chart>
        </Canvas>
      );
      // @ts-ignore
      const chart = new type(props);
      chart.render();
    });

    it('带负值面积图(x基线不为0)', () => {
      const context = createContext('带负值面积图(x基线不为0)');
      const data = [{
        month: 'Jan.',
        value: 6.06
      }, {
        month: 'Feb.',
        value: 82.2
      }, {
        month: 'Mar.',
        value: -22.11
      }, {
        month: 'Apr.',
        value: 21.53
      }, {
        month: 'May.',
        value: -21.74
      }, {
        month: 'Jun.',
        value: 73.61
      }, {
        month: 'Jul.',
        value: 53.75
      }, {
        month: 'Aug.',
        value: 60.32
      }];
      const { type, props } = (
        <Canvas
          context={context}
          width={offsetWidth}
          height={height}
          coord={{
            type: Rect,
          }}
          pixelRatio={window.devicePixelRatio}
        >
          <Chart
            data={data}
            scale={{
              month: {
                range: [ 0, 1 ]
              },
              value: {
                tickCount: 5,
              }
            }}
          >
            <Axis field="month" />
            <Axis field="value" />
            <Area x="month" y="value" startOnZero={true} />
            <Line x="month" y="value" />
          </Chart>
        </Canvas>
      );
      // @ts-ignore
      const chart = new type(props);
      chart.render();
    });

    it('渐变填充面积图', () => {
      const context = createContext('渐变填充面积图');
      const data = [{
        time: '2016-08-08 00:00:00',
        tem: 10
      }, {
        time: '2016-08-08 00:10:00',
        tem: 22
      }, {
        time: '2016-08-08 00:30:00',
        tem: 16
      }, {
        time: '2016-08-09 00:35:00',
        tem: 26
      }, {
        time: '2016-08-09 01:00:00',
        tem: 12
      }, {
        time: '2016-08-09 01:20:00',
        tem: 26
      }, {
        time: '2016-08-10 01:40:00',
        tem: 18
      }, {
        time: '2016-08-10 02:00:00',
        tem: 26
      }, {
        time: '2016-08-10 02:20:00',
        tem: 12
      }];
      const { type, props } = (
        <Canvas
          context={context}
          width={offsetWidth}
          height={height}
          coord={{
            type: Rect,
          }}
          pixelRatio={window.devicePixelRatio}
        >
          <Chart
            data={data}
            scale={{
              time: {
                type: 'timeCat',
                tickCount: 3,
              },
              tem: {
                min: 0,
              }
            }}
          >
            <Axis field="time" />
            <Axis field="tem" />
            <Area x="time" y="tem" color="l(90) 0:#1890FF 1:#f7f7f7" />
            <Line x="time" y="tem" color="l(90) 0:#1890FF 1:#f7f7f7" />
          </Chart>
        </Canvas>
      );
      // @ts-ignore
      const chart = new type(props);
      chart.render();
    });

    // TODO(@buli): 曲线面积图
  });

  describe('层叠面积图', () => {
    it('层叠面积图', () => {
      const context = createContext('层叠面积图');
      const data = [{
        value: 63.4,
        city: 'New York',
        date: '2011-10-01'
      }, {
        value: 62.7,
        city: 'Alaska',
        date: '2011-10-01'
      }, {
        value: 72.2,
        city: 'Austin',
        date: '2011-10-01'
      }, {
        value: 58,
        city: 'New York',
        date: '2011-10-02'
      }, {
        value: 59.9,
        city: 'Alaska',
        date: '2011-10-02'
      }, {
        value: 67.7,
        city: 'Austin',
        date: '2011-10-02'
      }, {
        value: 53.3,
        city: 'New York',
        date: '2011-10-03'
      }, {
        value: 59.1,
        city: 'Alaska',
        date: '2011-10-03'
      }, {
        value: 69.4,
        city: 'Austin',
        date: '2011-10-03'
      }, {
        value: 55.7,
        city: 'New York',
        date: '2011-10-04'
      }, {
        value: 58.8,
        city: 'Alaska',
        date: '2011-10-04'
      }, {
        value: 68,
        city: 'Austin',
        date: '2011-10-04'
      }, {
        value: 64.2,
        city: 'New York',
        date: '2011-10-05'
      }, {
        value: 58.7,
        city: 'Alaska',
        date: '2011-10-05'
      }, {
        value: 72.4,
        city: 'Austin',
        date: '2011-10-05'
      }, {
        value: 58.8,
        city: 'New York',
        date: '2011-10-06'
      }, {
        value: 57,
        city: 'Alaska',
        date: '2011-10-06'
      }, {
        value: 77,
        city: 'Austin',
        date: '2011-10-06'
      }, {
        value: 57.9,
        city: 'New York',
        date: '2011-10-07'
      }, {
        value: 56.7,
        city: 'Alaska',
        date: '2011-10-07'
      }, {
        value: 82.3,
        city: 'Austin',
        date: '2011-10-07'
      }, {
        value: 61.8,
        city: 'New York',
        date: '2011-10-08'
      }, {
        value: 56.8,
        city: 'Alaska',
        date: '2011-10-08'
      }, {
        value: 78.9,
        city: 'Austin',
        date: '2011-10-08'
      }, {
        value: 69.3,
        city: 'New York',
        date: '2011-10-09'
      }, {
        value: 56.7,
        city: 'Alaska',
        date: '2011-10-09'
      }, {
        value: 68.8,
        city: 'Austin',
        date: '2011-10-09'
      }, {
        value: 71.2,
        city: 'New York',
        date: '2011-10-10'
      }, {
        value: 60.1,
        city: 'Alaska',
        date: '2011-10-10'
      }, {
        value: 68.7,
        city: 'Austin',
        date: '2011-10-10'
      }, {
        value: 68.7,
        city: 'New York',
        date: '2011-10-11'
      }, {
        value: 61.1,
        city: 'Alaska',
        date: '2011-10-11'
      }, {
        value: 70.3,
        city: 'Austin',
        date: '2011-10-11'
      }, {
        value: 61.8,
        city: 'New York',
        date: '2011-10-12'
      }, {
        value: 61.5,
        city: 'Alaska',
        date: '2011-10-12'
      }, {
        value: 75.3,
        city: 'Austin',
        date: '2011-10-12'
      }, {
        value: 63,
        city: 'New York',
        date: '2011-10-13'
      }, {
        value: 64.3,
        city: 'Alaska',
        date: '2011-10-13'
      }, {
        value: 76.6,
        city: 'Austin',
        date: '2011-10-13'
      }, {
        value: 66.9,
        city: 'New York',
        date: '2011-10-14'
      }, {
        value: 67.1,
        city: 'Alaska',
        date: '2011-10-14'
      }, {
        value: 66.6,
        city: 'Austin',
        date: '2011-10-14'
      }, {
        value: 61.7,
        city: 'New York',
        date: '2011-10-15'
      }, {
        value: 64.6,
        city: 'Alaska',
        date: '2011-10-15'
      }, {
        value: 68,
        city: 'Austin',
        date: '2011-10-15'
      }, {
        value: 61.8,
        city: 'New York',
        date: '2011-10-16'
      }, {
        value: 61.6,
        city: 'Alaska',
        date: '2011-10-16'
      }, {
        value: 70.6,
        city: 'Austin',
        date: '2011-10-16'
      }, {
        value: 62.8,
        city: 'New York',
        date: '2011-10-17'
      }, {
        value: 61.1,
        city: 'Alaska',
        date: '2011-10-17'
      }, {
        value: 71.1,
        city: 'Austin',
        date: '2011-10-17'
      }, {
        value: 60.8,
        city: 'New York',
        date: '2011-10-18'
      }, {
        value: 59.2,
        city: 'Alaska',
        date: '2011-10-18'
      }, {
        value: 70,
        city: 'Austin',
        date: '2011-10-18'
      }, {
        value: 62.1,
        city: 'New York',
        date: '2011-10-19'
      }, {
        value: 58.9,
        city: 'Alaska',
        date: '2011-10-19'
      }, {
        value: 61.6,
        city: 'Austin',
        date: '2011-10-19'
      }, {
        value: 65.1,
        city: 'New York',
        date: '2011-10-20'
      }, {
        value: 57.2,
        city: 'Alaska',
        date: '2011-10-20'
      }, {
        value: 57.4,
        city: 'Austin',
        date: '2011-10-20'
      }, {
        value: 55.6,
        city: 'New York',
        date: '2011-10-21'
      }, {
        value: 56.4,
        city: 'Alaska',
        date: '2011-10-21'
      }, {
        value: 64.3,
        city: 'Austin',
        date: '2011-10-21'
      }, {
        value: 54.4,
        city: 'New York',
        date: '2011-10-22'
      }, {
        value: 60.7,
        city: 'Alaska',
        date: '2011-10-22'
      }, {
        value: 72.4,
        city: 'Austin',
        date: '2011-10-22'
      }, {
        value: 54.4,
        city: 'New York',
        date: '2011-10-23'
      }, {
        value: 65.1,
        city: 'Alaska',
        date: '2011-10-23'
      }, {
        value: 72.4,
        city: 'Austin',
        date: '2011-10-23'
      }, {
        value: 54.8,
        city: 'New York',
        date: '2011-10-24'
      }, {
        value: 60.9,
        city: 'Alaska',
        date: '2011-10-24'
      }, {
        value: 72.5,
        city: 'Austin',
        date: '2011-10-24'
      }, {
        value: 57.9,
        city: 'New York',
        date: '2011-10-25'
      }, {
        value: 56.1,
        city: 'Alaska',
        date: '2011-10-25'
      }, {
        value: 72.7,
        city: 'Austin',
        date: '2011-10-25'
      }, {
        value: 54.6,
        city: 'New York',
        date: '2011-10-26'
      }, {
        value: 54.6,
        city: 'Alaska',
        date: '2011-10-26'
      }, {
        value: 73.4,
        city: 'Austin',
        date: '2011-10-26'
      }, {
        value: 54.4,
        city: 'New York',
        date: '2011-10-27'
      }, {
        value: 56.1,
        city: 'Alaska',
        date: '2011-10-27'
      }, {
        value: 70.7,
        city: 'Austin',
        date: '2011-10-27'
      }, {
        value: 42.5,
        city: 'New York',
        date: '2011-10-28'
      }, {
        value: 58.1,
        city: 'Alaska',
        date: '2011-10-28'
      }, {
        value: 56.8,
        city: 'Austin',
        date: '2011-10-28'
      }, {
        value: 40.9,
        city: 'New York',
        date: '2011-10-29'
      }, {
        value: 57.5,
        city: 'Alaska',
        date: '2011-10-29'
      }, {
        value: 51,
        city: 'Austin',
        date: '2011-10-29'
      }, {
        value: 38.6,
        city: 'New York',
        date: '2011-10-30'
      }, {
        value: 57.7,
        city: 'Alaska',
        date: '2011-10-30'
      }, {
        value: 54.9,
        city: 'Austin',
        date: '2011-10-30'
      }, {
        value: 44.2,
        city: 'New York',
        date: '2011-10-31'
      }, {
        value: 55.1,
        city: 'Alaska',
        date: '2011-10-31'
      }, {
        value: 58.8,
        city: 'Austin',
        date: '2011-10-31'
      }, {
        value: 49.6,
        city: 'New York',
        date: '2011-11-01'
      }, {
        value: 57.9,
        city: 'Alaska',
        date: '2011-11-01'
      }, {
        value: 62.6,
        city: 'Austin',
        date: '2011-11-01'
      }, {
        value: 47.2,
        city: 'New York',
        date: '2011-11-02'
      }, {
        value: 64.6,
        city: 'Alaska',
        date: '2011-11-02'
      }, {
        value: 71,
        city: 'Austin',
        date: '2011-11-02'
      }];
      const { type, props } = (
        <Canvas
          context={context}
          width={offsetWidth}
          height={height}
          pixelRatio={window.devicePixelRatio}
        >
        <Chart
          data={data}
          scale={{
            date: {
              range: [ 0, 1 ],
              type: 'timeCat',
              mask: 'MM-DD'
            },
            value: {
              max: 300,
              tickCount: 4
            }
          }}
        >
          <Axis field="value" />
          <Axis field="date" />
          <Area x="date" y="value" color="city" />
        </Chart>
      </Canvas>
      );
      // @ts-ignore
      const canvas = new type(props);
      canvas.render();
    });
  });
});
