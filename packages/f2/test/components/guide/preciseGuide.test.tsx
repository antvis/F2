import { jsx, Canvas, Chart, Axis } from '../../../src';
import { TextGuide, Interval } from '../../../src/components';
import { createContext, delay } from '../../util';

describe('precise', () => {
  it('分组柱状图', async () => {
    const context = createContext();
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'Beijing', 月份: 'Jan.', 月均降雨量: -3.9 },
      { name: 'Beijing', 月份: 'Feb.', 月均降雨量: 5.8 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    ];

    const { props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="月份" />
          <Axis field="月均降雨量" />
          <Interval
            x="月份"
            y="月均降雨量"
            color={{
              field: 'name',
            }}
            adjust={{
              type: 'dodge',
              marginRatio: 0.05,
            }}
          />
          {data.map((item) => (
            <TextGuide
              records={[item]}
              precise
              content={`${item['月均降雨量']}`}
              style={{
                fill: '#000',
                fontSize: '24px',
                textAlign: 'center',
              }}
            />
          ))}
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    await chart.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });
});
