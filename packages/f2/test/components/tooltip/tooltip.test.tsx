import { Axis, Canvas, Chart, Interval, jsx, Legend, Line, Tooltip, createRef } from '../../../src';
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
    await canvas.render();
    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 170, y: 100 });
    await delay(100);
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
    await canvas.render();

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
    await canvas.render();

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
    await canvas.render();
    await delay(200);

    const newChart = (
      <Chart data={data}>
        <Axis field="genre" />
        <Axis field="sold" />
        <Legend />
        <Interval x="genre" y="sold" color="genre" />
        <Tooltip alwaysShow={true} defaultItem={data[1]} showCrosshairs />
      </Chart>
    );

    await canvas.update({ children: newChart });
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
    await canvas.render();
    await delay(1000);
    const newChart = (
      <Chart data={data}>
        <Interval x="genre" y="sold" color="genre" />
        <Tooltip alwaysShow={true} defaultItem={data[0]} showCrosshairs />
        <Axis field="sold" />
        <Axis field="genre" />
      </Chart>
    );
    await canvas.update({ children: newChart });
    await delay(1000);
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
    await canvas.render();
    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 0, y: 21 }); // 超出 coord 边界

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip 右边届', async () => {
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
          <Line x="genre" y="sold" />
          <Tooltip alwaysShow={true} defaultItem={data[4]} showCrosshairs />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(500);

    expect(context).toMatchImageSnapshot();
  });

  it('分组柱状图-tooltip', async () => {
    const context = createContext('分组柱图');

    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
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
    await canvas.render();

    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 160, y: 21 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('分组柱状图-tooltip-transposed', async () => {
    const context = createContext('分组柱图');

    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
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
    await canvas.render();

    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 160, y: 21 });
    await delay(200);

    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip 自定义文本内容', async () => {
    const context = createContext('Tooltip 自定义文本内容');
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip
            alwaysShow={true}
            showTooltipMarker={true}
            defaultItem={data[0]}
            customText={(record) => {
              const { origin } = record;
              return (
                <text
                  attrs={{
                    fill: '#fff',
                    text: `名称：${origin.genre}`,
                  }}
                />
              );
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip-xTip-yTip相关配置', async () => {
    const xTipFn = jest.fn();
    const yTipFn = jest.fn();
    const context = createContext('Tooltip xTip yTip相关配置');
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip
            alwaysShow={true}
            showCrosshairs
            crosshairsType="xy"
            snap
            showXTip
            showYTip
            showTooltipMarker={true}
            crosshairsStyle={{
              lineDash: [2, 2],
              stroke: '#326BFB',
            }}
            xTipTextStyle={{
              fill: 'red',
            }}
            xTipBackground={{
              radius: '4px',
              fill: '#326BFB',
            }}
            yTipTextStyle={{
              fill: 'red',
              fontSize: '24px',
            }}
            yTipBackground={{
              radius: '4px',
              fill: '#326BFB',
            }}
            nameStyle={{
              fontSize: '24px',
              fill: 'red',
              textAlign: 'start',
              textBaseline: 'middle',
              text: '',
            }}
            valueStyle={{
              fill: 'red',
              text: '',
            }}
            xTip={(text, record) => {
              xTipFn(text, record);
              return text;
            }}
            yTip={(text, record) => {
              yTipFn(text, record);
              return text;
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(500);
    await gestureSimulator(context.canvas, 'press', { x: 170, y: 100 });

    await delay(100);
    expect(context).toMatchImageSnapshot();
    expect(xTipFn.mock.calls.length).toBe(1);
    expect(yTipFn.mock.calls.length).toBe(1);
    expect(xTipFn.mock.calls[0][1]).toBeDefined();
    expect(yTipFn.mock.calls[0][1]).toBeDefined();
  });

  it('Tooltip 自动换行', async () => {
    const context = createContext('Tooltip 自动换行');
    const data = [
      {
        date: '2017-06-05',
        type: '测试a',
        value: 100,
      },
      {
        date: '2017-06-05',
        type: '测试b',
        value: 116,
      },
      {
        date: '2017-06-05',
        type: '测试c',
        value: 156,
      },
      {
        date: '2017-06-05',
        type: '测试d',
        value: 126,
      },
      {
        date: '2017-06-05',
        type: '测试e',
        value: 196,
      },
      {
        date: '2017-06-05',
        type: '测试f',
        value: 26,
      },
      {
        date: '2017-06-06',
        type: '测试a',
        value: 110,
      },
      {
        date: '2017-06-06',
        type: '测试b',
        value: 129,
      },
      {
        date: '2017-06-06',
        type: '测试c',
        value: 156,
      },
      {
        date: '2017-06-06',
        type: '测试d',
        value: 126,
      },
      {
        date: '2017-06-07',
        type: '测试a',
        value: 123,
      },
      {
        date: '2017-06-07',
        type: '测试b',
        value: 135,
      },
      {
        date: '2017-06-07',
        type: '测试c',
        value: 156,
      },
      {
        date: '2017-06-07',
        type: '测试d',
        value: 126,
      },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="date" />
          <Axis field="value" />
          <Interval x="date" y="value" color="type" />
          <Tooltip alwaysShow={true} showTooltipMarker={true} defaultItem={data[0]} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(800);
    expect(context).toMatchImageSnapshot();

    const { props: updateProps } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="date" />
          <Axis field="value" />
          <Interval x="date" y="value" color="type" />
          <Tooltip
            alwaysShow={true}
            showTooltipMarker={true}
            defaultItem={data[0]}
            itemWidth={200}
          />
        </Chart>
      </Canvas>
    );

    await canvas.update(updateProps);
    await delay(800);
    expect(context).toMatchImageSnapshot();
  });

  it('Tooltip onShow与onHide钩子触发且每次展示消失仅触发一次', async () => {
    const context = createContext('Tooltip onShow与onHide钩子触发且每次展示消失仅触发一次');
    const onShowCb = jest.fn();
    const onHideCb = jest.fn();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip snap showCrosshairs onShow={onShowCb} onHide={onHideCb} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(1000);
    await gestureSimulator(context.canvas, 'touchstart', { x: 30, y: 30 });
    await delay(1000);
    await gestureSimulator(context.canvas, 'touchmove', { x: 31, y: 31 });
    await delay(1000);
    await gestureSimulator(context.canvas, 'touchend', { x: 32, y: 32 });

    expect(onShowCb.mock.calls.length).toBe(1);
    expect(onHideCb.mock.calls.length).toBe(1);
  });
});
