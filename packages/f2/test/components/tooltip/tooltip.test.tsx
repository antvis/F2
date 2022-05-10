import { jsx, Canvas, Chart, Axis, Line, Interval, Tooltip, Legend } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
  // { type: 'a', genre: 'Sports', sold: 5 },
  // { type: 'a', genre: 'Strategy', sold: 10 },
  // { type: 'a', genre: 'Action', sold: 20 },
  // { type: 'a', genre: 'Shooter', sold: 20 },
  // { type: 'a', genre: 'Other', sold: 40 },
  // { type: 'a', genre: 'Shooter', sold: 20 },
  // { type: 'a', genre: 'Other', sold: 40 },
];

const data1 = [
  {
    name: 'London',
    月份: 'Jan.',
    月均降雨量: 18.9,
  },
  {
    name: 'London',
    月份: 'Feb.',
    月均降雨量: 28.8,
  },
  {
    name: 'London',
    月份: 'Mar.',
    月均降雨量: 39.3,
  },
  {
    name: 'London',
    月份: 'Apr.',
    月均降雨量: 81.4,
  },
  {
    name: 'London',
    月份: 'May.',
    月均降雨量: 47,
  },
  {
    name: 'London',
    月份: 'Jun.',
    月均降雨量: 20.3,
  },
  {
    name: 'London',
    月份: 'Jul.',
    月均降雨量: 24,
  },
  {
    name: 'London',
    月份: 'Aug.',
    月均降雨量: 35.6,
  },
  {
    name: 'Berlin',
    月份: 'Jan.',
    月均降雨量: 12.4,
  },
  {
    name: 'Berlin',
    月份: 'Feb.',
    月均降雨量: 23.2,
  },
  {
    name: 'Berlin',
    月份: 'Mar.',
    月均降雨量: 34.5,
  },
  {
    name: 'Berlin',
    月份: 'Apr.',
    月均降雨量: 99.7,
  },
  {
    name: 'Berlin',
    月份: 'May.',
    月均降雨量: 52.6,
  },
  {
    name: 'Berlin',
    月份: 'Jun.',
    月均降雨量: 35.5,
  },
  {
    name: 'Berlin',
    月份: 'Jul.',
    月均降雨量: 37.4,
  },
  {
    name: 'Berlin',
    月份: 'Aug.',
    月均降雨量: 42.4,
  },
];

describe('tooltip', () => {
  it('Tooltip render', async () => {
    const context = createContext('Tooltip render');
    const onChangeMockCallback = jest.fn();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Legend />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip
            alwaysShow={true}
            // showTitle={true}
            // showItemMarker={true}
            showCrosshairs
            onChange={onChangeMockCallback}
            crosshairsType="xy"
            snap
            // custom
            showXTip
            showYTip
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 170, y: 21 });
    expect(onChangeMockCallback.mock.calls.length).toBe(1); // 验证 onChange 有被调用
    expect(onChangeMockCallback.mock.calls[0][0].length).toBe(1); // 验证 onChange 参数有效

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip 默认展示', async () => {
    const context = createContext('Tooltip 默认展示');
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          style={
            {
              // left: 50,
            }
          }
        >
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip alwaysShow={true} defaultItem={data[0]} snap showCrosshairs />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip 默认展示, tooltip 在 geometry 之前', async () => {
    const context = createContext('Tooltip 默认展示, tooltip 在 geometry 之前');
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Tooltip alwaysShow={true} defaultItem={data[0]} snap showCrosshairs />
          <Interval x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip 默认展示更新', async () => {
    const context = createContext('Tooltip 默认展示更新');
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={[...data]}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Legend />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip alwaysShow={true} defaultItem={data[0]} showCrosshairs />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    const newChart = (
      <Chart data={data}>
        <Axis field="genre" />
        <Axis field="sold" />
        <Legend />
        <Interval x="genre" y="sold" color="genre" />
        <Tooltip alwaysShow={true} defaultItem={data[1]} showCrosshairs />
      </Chart>
    );

    canvas.update({ children: newChart });
    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip 默认展示更新（新增图形元素导致的坐标变动）', async () => {
    const context = createContext('Tooltip 默认展示更新（新增图形元素导致的坐标变动）');
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={[...data]}>
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip alwaysShow={true} defaultItem={data[0]} showCrosshairs />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    const newChart = (
      <Chart data={data}>
        <Interval x="genre" y="sold" color="genre" />
        <Tooltip alwaysShow={true} defaultItem={data[0]} showCrosshairs />
        <Axis field="genre" />
        <Axis field="sold" />
      </Chart>
    );
    await delay(10);
    canvas.update({ children: newChart });
    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip 超出边界会展示边界值', async () => {
    const context = createContext('Tooltip 超出边界会展示边界值');
    const onChangeMockCallback = jest.fn();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          style={
            {
              // left: 50,
            }
          }
        >
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip alwaysShow={true} onChange={onChangeMockCallback} showCrosshairs />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: -10, y: 21 }); // 超出 coord 边界

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('分组柱状图-tooltip', async () => {
    const context = createContext('分组柱图');

    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data1}>
          <Axis field="月份" />
          <Axis field="月均降雨量" />
          <Tooltip showTooltipMarker={true} />
          <Interval
            x="月份"
            y="月均降雨量"
            color="name"
            adjust={{
              type: 'dodge',
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    canvas.render();

    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 160, y: 21 });

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('分组柱状图-tooltip', async () => {
    const context = createContext('分组柱图');

    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data1}
          coord={{
            transposed: true,
          }}
        >
          <Axis field="月份" />
          <Axis field="月均降雨量" />
          <Tooltip showTooltipMarker={true} />
          <Interval
            x="月份"
            y="月均降雨量"
            color="name"
            adjust={{
              type: 'dodge',
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    canvas.render();

    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 160, y: 21 });

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });
});
