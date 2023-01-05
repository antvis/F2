import { Axis, Canvas, Chart, Line, Tooltip, jsx } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';

describe('getSnapRecords', () => {
  it('x 时间转 linear', async () => {
    const data = [
      { Money: 1000, date: '2022-1-1', probability: '金额最低' },
      { Money: 4000, date: '2023-1-1', probability: '金额最低' },
      { Money: 9000, date: '2024-1-1', probability: '金额最低' },
      { Money: 16000, date: '2025-1-1', probability: '金额最低' },
      { Money: 25000, date: '2026-1-1', probability: '金额最低' },
      { Money: 36000, date: '2027-1-1', probability: '金额最低' },
      { Money: 2500, date: '2022-1-1', probability: '超额金额折线' },
      { Money: 3000, date: '2022-2-1', probability: '超额金额折线' },
      { Money: 5500, date: '2022-3-1', probability: '超额金额折线' },
      { Money: 6500, date: '2022-4-1', probability: '超额金额折线' },
      { Money: 12500, date: '2022-5-1', probability: '超额金额折线' },
      { Money: 15500, date: '2022-6-1', probability: '超额金额折线' },
      { Money: 17500, date: '2022-7-1', probability: '超额金额折线' },
      { Money: 13000, date: '2022-8-1', probability: '超额金额折线' },
      { Money: 15500, date: '2022-9-1', probability: '超额金额折线' },
      { Money: 16500, date: '2022-10-1', probability: '超额金额折线' },
      { Money: 12500, date: '2022-11-1', probability: '超额金额折线' },
      { Money: 19500, date: '2022-12-1', probability: '超额金额折线' },
    ];

    // 将日期字符串处理为 timestamp
    const formatData = data.map((item) => ({
      ...item,
      date: +new Date(item.date),
    }));
    // 获取年频数据的 date list
    const ticks = formatData
      .filter((item) => item.probability === '金额最低')
      .map((item) => item.date);

    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={formatData}
          scale={{
            date: {
              type: 'linear',
              ticks,
            },
          }}
        >
          <Axis field="date" formatter={(v) => new Date(v).getFullYear()} />
          <Axis field="Money" />
          <Line x="date" y="Money" color="probability" />
          <Tooltip />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 250, y: 100 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });
});
