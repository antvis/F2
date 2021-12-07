import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Axis, Line } from '../../../src/components';
import { createContext, delay } from '../../util';

describe('Interaction 交互', () => {
  it('平移和缩放', async () => {
    const context = createContext('基础柱状图', {
      width: '350px',
      height: '300px',
    });
    const chartRef = { current: null };
    const res = await fetch('https://gw.alipayobjects.com/os/antfincdn/KbnoL5QgL0/index.json');
    const data = await res.json();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          interactions={[
            {
              type: 'pan', // 平移
              // ...cfg
            },
            // {
            //   type: 'pinch', // 缩放
            //   // ...cfg
            // },
            // {
            //   type: 'interval-select', // 直方图选择
            //   // ...cfg
            // },
            // {
            //   type: "ddd", // 自定义交互
            //   xxx: CustomInteraction,
            // }
          ]}
        >
          <Axis field="reportDateTimestamp" type="timeCat" mask="MM-DD" />
          <Axis field="rate" />
          <Line x="reportDateTimestamp" y="rate" color="codeType" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    const chart = chartRef.current;

    const interactionContext = chart.interaction.context;
    interactionContext.doZoom(0.5, 0.5, 1.5);

    await delay(100);
    interactionContext.start();
    interactionContext.doMove(-0.008);

    await delay(100);
    expect(chart.coord.top).toBe(15);
    // expect(chart.coord.left).toBeCloseTo(41.96);
    expect(chart.coord.bottom).toBeCloseTo(267.5);
  });
});
