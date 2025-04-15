import { jsx, Canvas, Chart, Axis } from '../../../src';
import { TextGuide, Interval } from '../../../src/components';
import { createContext, delay } from '../../util';

describe('TextGuide', () => {
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
      <Canvas context={context} pixelRatio={window.devicePixelRatio} animate={false}>
        <Chart data={data}>
          <Axis field="月份" />
          <Axis field="月均降雨量" />
          {data.map((item) => (
            <TextGuide
              records={[item]}
              content={`${item['月均降雨量']}`}
              placement={item['月均降雨量'] > 0 ? 'tc' : 'bc'}
              style={{
                fill: '#000',
                fontSize: '24px',
              }}
            />
          ))}
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
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    await chart.render();

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });

  it('非分组柱状图', async () => {
    const context = createContext();
    const data = [
      { genre: 'Sports', sold: 175, desc:'Sports', type: 'a' },
      { genre: 'Strategy', sold: 115, desc:'Strategy', type: 'a' },
      { genre: 'Action', sold: 200, desc:'Action', type: 'a' },
      { genre: 'Shooter', sold: 300, desc:'Shooter', type: 'a' },
      { genre: 'Other', sold: 150, desc:'Other', type: 'a' },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" />
          {data.map((item) => (
            <TextGuide
              records={[item]}
              content={`${item.desc}`}
              placement={item.sold > 0 ? 'tc' : 'bc'}
              style={{
                fill: '#000',
                fontSize: '18px',
              }}
            />
          ))}
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    await chart.render();

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });
});
