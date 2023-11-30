import { jsx } from '../../../src';
import { Canvas, Chart, Axis, ScrollBar, Legend, Interval, Tooltip } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';
const context = createContext();

const data = [
  {
    name: '今日数据',
    time: '0:00',
    value: 18900,
  },
  {
    name: '昨日数据',
    time: '0:00',
    value: 2890,
  },
  {
    name: '今日数据',
    time: '01:00',
    value: 18900,
  },
  {
    name: '昨日数据',
    time: '01:00',
    value: 2890,
  },
  {
    name: '今日数据',
    time: '02:00',
    value: 18900,
  },
  {
    name: '昨日数据',
    time: '02:00',
    value: 2890,
  },
  {
    name: '今日数据',
    time: '03:00',
    value: 18900,
  },
  {
    name: '昨日数据',
    time: '03:00',
    value: 2890,
  },
  {
    name: '今日数据',
    time: '04:00',
    value: 18900,
  },

  {
    name: '昨日数据',
    time: '04:00',
    value: 28910,
  },
  {
    name: '昨日数据',
    time: '05:00',
    value: 28910,
  },
  {
    name: '今日数据',
    time: '05:00',
    value: 18900,
  },
  {
    name: '今日数据',
    time: '06:00',
    value: 1900,
  },

  {
    name: '昨日数据',
    time: '06:00',
    value: 280,
  },
  {
    name: '昨日数据',
    time: '07:00',
    value: 280,
  },
  {
    name: '今日数据',
    time: '07:00',
    value: 1900,
  },
  {
    name: '今日数据',
    time: '08:00',
    value: 10900,
  },
  {
    name: '昨日数据',
    time: '08:00',
    value: 22890,
  },
  {
    name: '今日数据',
    time: '09:00',
    value: 10900,
  },
  {
    name: '昨日数据',
    time: '09:00',
    value: 22890,
  },
  {
    name: '今日数据',
    time: '10:00',
    value: 10900,
  },
  {
    name: '昨日数据',
    time: '10:00',
    value: 22890,
  },
];

describe('dodge pan', () => {
  it('init', async () => {
    const { props } = (
      <Canvas pixelRatio={1} context={context}>
        <Chart
          data={data}
          coord={{
            type: 'rect',
            transposed: false,
          }}
        >
          <Axis
            field="time"
            style={{
              grid: { lineWidth: 0 },
            }}
          />
          <Axis
            field="value"
            style={{
              grid: { lineWidth: 0 },
            }}
          />
          <Legend
            position="bottom"
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          />
          <Interval
            x="time"
            y="value"
            adjust={{
              type: 'dodge',
              // marginRatio: 0, // 设置分组间柱子的间距
            }}
            color={['name', ['#FFE60F', '#726600']]}
          />
          <Tooltip
            background={{
              width: '220px',
            }}
            showCrosshairs
            crosshairsType="x"
          />
          <ScrollBar
            pan
            pinch={false}
            mode="x"
            range={[0.5, 1]}
            visible
            style={{
              marginTop: '10px',
            }}
            background={{
              stroke: '#000',
            }}
            barStyle={{
              stroke: 'red',
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

  it('pan', async () => {
    await delay(20);
    await gestureSimulator(context.canvas, 'touchstart', { x: 10, y: 169 });
    await delay(20);
    await gestureSimulator(context.canvas, 'touchmove', { x: 100, y: 169 });
    await delay(20);
    await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 169 });
    await delay(600);
    expect(context).toMatchImageSnapshot();
  });
});
