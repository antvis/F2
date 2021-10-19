// @ts-nocheck
import { jsx } from '../../../src';
import { Rect } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Line, Point, Axis, Tooltip } from '../../../src/components';
import { createContext } from '../util';

const data = [{
  date: '2017-06-05',
  value: 116,
}, {
  date: '2017-06-06',
  value: 129,
}, {
  date: '2017-06-07',
  value: 135
}, {
  date: '2017-06-08',
  value: 86
}, {
  date: '2017-06-09',
  value: 73
}, {
  date: '2017-06-10',
  value: 85
}, {
  date: '2017-06-11',
  value: 73
}, {
  date: '2017-06-12',
  value: 68
}, {
  date: '2017-06-13',
  value: 92
}, {
  date: '2017-06-14',
  value: 130
}, {
  date: '2017-06-15',
  value: 245
}, {
  date: '2017-06-16',
  value: 139
}, {
  date: '2017-06-17',
  value: 115
}, {
  date: '2017-06-18',
  value: 111
}, {
  date: '2017-06-19',
  value: 309
}, {
  date: '2017-06-20',
  value: 206
}, {
  date: '2017-06-21',
  value: 137
}, {
  date: '2017-06-22',
  value: 128
}, {
  date: '2017-06-23',
  value: 85
}, {
  date: '2017-06-24',
  value: 94
}, {
  date: '2017-06-25',
  value: 71
}, {
  date: '2017-06-26',
  value: 106
}, {
  date: '2017-06-27',
  value: 84
}, {
  date: '2017-06-28',
  value: 93
}, {
  date: '2017-06-29',
  value: 85
}, {
  date: '2017-06-30',
  value: 73
}, {
  date: '2017-07-01',
  value: 83
}, {
  date: '2017-07-02',
  value: 125
}, {
  date: '2017-07-03',
  value: 107
}, {
  date: '2017-07-04',
  value: 82
}, {
  date: '2017-07-05',
  value: 44
}, {
  date: '2017-07-06',
  value: 72
}, {
  date: '2017-07-07',
  value: 106
}, {
  date: '2017-07-08',
  value: 107
}, {
  date: '2017-07-09',
  value: 66
}, {
  date: '2017-07-10',
  value: 91
}, {
  date: '2017-07-11',
  value: 92
}, {
  date: '2017-07-12',
  value: 113
}, {
  date: '2017-07-13',
  value: 107
}, {
  date: '2017-07-14',
  value: 131
}, {
  date: '2017-07-15',
  value: 111
}, {
  date: '2017-07-16',
  value: 64
}, {
  date: '2017-07-17',
  value: 69
}, {
  date: '2017-07-18',
  value: 88
}, {
  date: '2017-07-19',
  value: 77
}, {
  date: '2017-07-20',
  value: 83
}, {
  date: '2017-07-21',
  value: 111
}, {
  date: '2017-07-22',
  value: 57
}, {
  date: '2017-07-23',
  value: 55
}, {
  date: '2017-07-24',
  value: 60
}];

describe('折线图', () => {
  it('基础折线图', () => {
    const BASE = '基础折线图';
    const context = createContext(BASE);
    const chartRef = { current: null };
    const lineRef = { current: null };
    const { offsetWidth } = document.body;
    const height = offsetWidth * 0.75;
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio} width={offsetWidth} height={height}>
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
          scale={{
            // date: {},
            // value: {},
          }}
        >
          <Axis
            field="date"
            tickCount={3}
            style={{
              label: {
                // align 默认值为 center，可能会导致首尾 tick label 超出画布范围
                align: 'between'
              }
            }}
          />
          <Axis field="value" tickCount={5} />
          <Line
            ref={lineRef}
            x="date"
            y="value"
            lineWidth="4px"
          />
        </Chart>
      </Canvas>
    );

    const canvas = new type(props);
    canvas.render();

    console.log(BASE, lineRef.current.getSnapRecords({ x: 100, y: 100 }));
  });

  it('开启无障碍', () => {
    const ARIA = '开启无障碍';
    const context = createContext(ARIA);
    const chartRef = { current: null };
    const lineRef = { current: null };
    const { offsetWidth } = document.body;
    const height = offsetWidth * 0.75;
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio} width={offsetWidth} height={height}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Rect,
          }}
          theme={{
            colors: ['#2FC25B'],
          }}
        >
          <Axis
            field="date"
            tickCount={3}
            style={{
              label: {
                // align 默认值为 center，可能会导致首尾 tick label 超出画布范围
                align: 'between'
              }
            }}
          />
          <Axis field="value" tickCount={5} />
          <Line
            ref={lineRef}
            x="date"
            y="value"
          />
        </Chart>
      </Canvas>
    );

    const canvas = new type(props);
    canvas.render();

    console.log(ARIA, lineRef.current.getSnapRecords({ x: 100, y: 100 }));
  });

  it('带点', () => {
    const WITH_POINT = '带点';
    const data = [{
      day: '周一',
      value: 300
    }, {
      day: '周二',
      value: 400
    }, {
      day: '周三',
      value: 350
    }, {
      day: '周四',
      value: 500
    }, {
      day: '周五',
      value: 490
    }, {
      day: '周六',
      value: 600
    }, {
      day: '周日',
      value: 900
    }];
    const context = createContext(WITH_POINT);
    const chartRef = { current: null };
    const lineRef = { current: null };
    const pointRef = { current: null };
    const { offsetWidth } = document.body;
    const height = offsetWidth * 0.75;
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio} width={offsetWidth} height={height}>
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
              label: { align: 'between' }
            }}
          />
          <Axis field="value" tickCount={5} />
          <Line x="day" y="value" ref={lineRef} />
          <Point
            x="day"
            y="value"
            ref={pointRef}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new type(props);
    canvas.render();

    console.log(WITH_POINT, lineRef.current.getSnapRecords({ x: 100, y: 100 }), pointRef.current.getSnapRecords({ x: 100, y: 100 }));
  });

  it('曲线', () => {
    const SMOOTH = '曲线';
    const data = [{
      time: '2016-08-08 00:00:00',
      tem: 10,
      type: 1,
    }, {
      time: '2016-08-08 00:10:00',
      tem: 22,
      type: 1,
    }, {
      time: '2016-08-08 00:30:00',
      tem: 20,
      type: 1,
    }, {
      time: '2016-08-09 00:35:00',
      tem: 26,
      type: 1,
    }, {
      time: '2016-08-09 01:00:00',
      tem: 20,
      type: 1,
    }, {
      time: '2016-08-09 01:20:00',
      tem: 26,
      type: 1,
    }, {
      time: '2016-08-10 01:40:00',
      tem: 28,
      type: 1,
    }, {
      time: '2016-08-10 02:00:00',
      tem: 20,
      type: 1,
    }, {
      time: '2016-08-10 02:20:00',
      tem: 18,
      type: 1,
    }];
    const context = createContext(SMOOTH);
    const chartRef = { current: null };
    const lineRef = { current: null };
    const pointRef = { current: null };
    const { offsetWidth } = document.body;
    const height = offsetWidth * 0.75;
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio} width={offsetWidth} height={height}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Rect,
          }}
          scale={{
            time: {
              type: 'timeCat',
            },
          }}
        >
          <Axis
            field="time"
            tickCount={3}
            style={{
              label: { align: 'between' }
            }}
          />
          <Axis field="tem" tickCount={5} />
          <Line
            x="time"
            y="tem"
            ref={lineRef}
            smooth
          />
          <Tooltip />
        </Chart>
      </Canvas>
    );

    const canvas = new type(props);
    canvas.render();

    console.log(SMOOTH, lineRef.current.getSnapRecords({ x: 100, y: 100 }));
  });
});
