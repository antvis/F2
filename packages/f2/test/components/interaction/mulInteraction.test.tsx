import { jsx } from '../../../src';
import { Canvas, Chart, Interval, Axis, Line, ScrollBar, Tooltip } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';

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

describe('多交互', () => {
  const context = createContext('多交互', {
    width: '350px',
    height: '300px',
  });

  let canvas: Canvas;

  it('zoom & tooltip', async () => {
    const res = await fetch(
      'https://gw.alipayobjects.com/os/antfincdn/Jpuku6k%24q%24/linear-pan.json'
    );
    const data = await res.json();
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="release" tickCount={5} nice={false} />
          <Axis field="count" />
          <Line x="release" y="count" />
          <ScrollBar mode="x" range={[0.1, 0.3]} />
          {/* pan 和 press同时监听不触发 press */}
          <Tooltip triggerOn="click" />
        </Chart>
      </Canvas>
    );

    canvas = new Canvas(props);
    await canvas.render();

    await delay(20);
    await gestureSimulator(context.canvas, 'touchstart', { x: 210, y: 169 });
    await delay(20);

    await gestureSimulator(context.canvas, 'touchmove', { x: 100, y: 169 });
    await delay(20);
    await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 169 });
    await gestureSimulator(context.canvas, 'click', { x: 100, y: 169 });
    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it.skip('多图表 tooltip', async () => {
    const context = createContext('多图表交互tooltip', {
      width: '700px',
      height: '300px',
    });
    const { props } = (
      <Canvas
        context={context}
        pixelRatio={window.devicePixelRatio}
        theme={{ padding: [20, 'auto'] }}
      >
        <Chart
          scale={{
            percent: {
              formatter: function formatter(val) {
                return val + '%';
              },
            },
          }}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
            innerRadius: 0.7,
            radius: 0.85,
          }}
          style={{ width: 200 }}
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
          <Tooltip triggerOn="click" />
        </Chart>
        <Chart
          scale={{
            percent: {
              formatter: function formatter(val) {
                return val + '%';
              },
            },
          }}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
            innerRadius: 0.7,
            radius: 0.85,
          }}
          style={{ left: 200, width: 200 }}
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
          <Tooltip />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
});
