import { Canvas, Chart, Interval, Axis, jsx } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';

const data = [
  { a: '1', genre: 'Sports', sold: 275 },
  { a: '1', genre: 'Strategy', sold: 115 },
  { a: '1', genre: 'Action', sold: 120 },
  { a: '1', genre: 'Shooter', sold: 350 },
  { a: '1', genre: 'Other', sold: 110 },
];

describe('数据选中', () => {
  it('柱图-单选', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              // type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: {
                fillOpacity: 1,
              },
              unSelectedStyle: {
                fillOpacity: 0.4,
              },
              cancelable: true,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选;
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('柱图-单选, 不可取消', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              // type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: {
                fillOpacity: 1,
              },
              unSelectedStyle: {
                fillOpacity: 0.4,
              },
              cancelable: false,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('柱图-style 为函数', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              // type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: (record) => {
                const { xMin, xMax } = record;
                const width = xMax - xMin;
                const offset = width * 0.1;
                return {
                  x: xMin - offset,
                  width: width + offset * 2,
                };
              },
              unSelectedStyle: () => {
                return {
                  fillOpacity: 0.4,
                };
              },
              cancelable: false,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('柱图-多选', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: {
                fillOpacity: 1,
              },
              unSelectedStyle: {
                fillOpacity: 0.4,
              },
              cancelable: true,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('press 事件', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            selection={{
              triggerOn: 'press',
              // type: 'multiple',
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: {
                fillOpacity: 1,
              },
              unSelectedStyle: {
                fillOpacity: 0.4,
              },
              cancelable: false,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await await canvas.render();
    await delay(200);

    // 模拟 press 事件
    gestureSimulator(context.canvas, 'touchstart', { x: 260, y: 170 });
    gestureSimulator(context.canvas, 'touchmove', { x: 213, y: 165 });
    gestureSimulator(context.canvas, 'touchend', { x: 213, y: 165 });
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('饼图', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart
          data={data}
          coord={{
            radius: 0.8,
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval
            x="a"
            y="sold"
            adjust="stack"
            color="genre"
            selection={{
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: (record) => {
                const { yMax, yMin } = record;
                return {
                  r: (yMax - yMin) * 1.1,
                };
              },
              unSelectedStyle: {},
              cancelable: true,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 选中
    await gestureSimulator(context.canvas, 'click', { x: 144, y: 68 });
    await delay(200);
    expect(context).toMatchImageSnapshot();

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 144, y: 68 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });

  it('饼图props.y特殊字段取值', async () => {
    // 'color' | 'normalized' | 'x' | 'y' | 'shapeName' | 'shape' | 'selected'
    const field = 'color';
    const newData = data.map(d => ({ a: d.a, genre: d.genre, [field]: d.sold }));
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart
          data={newData}
          coord={{
            radius: 0.8,
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval
            x="a"
            y={field}
            adjust="stack"
            color="genre"
            selection={{
              selectedStyle: (record) => {
                const { yMax, yMin } = record;
                return {
                  r: (yMax - yMin) * 1.1,
                };
              },
              unSelectedStyle: {},
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();
    await delay(200);

    // 选中
    await gestureSimulator(context.canvas, 'click', { x: 144, y: 68 });
    await delay(200);

    expect(context).toMatchImageSnapshot();
  });
});

describe('cancelable = false', () => {
  it('饼图空白区域点击', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart
          data={data}
          coord={{
            radius: 0.8,
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval
            x="a"
            y="sold"
            adjust="stack"
            color="genre"
            selection={{
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: (record) => {
                const { yMax } = record;
                return {
                  r: yMax * 1.1,
                };
              },
              cancelable: false,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(200);

    // 空白区域点击
    await gestureSimulator(context.canvas, 'click', { x: 0, y: 0 });
    await delay(200);
    expect(context).toMatchImageSnapshot();
  });
});

describe('改变默认值', () => {
  it('改变默认值', async () => {
    const context = createContext();

    const getProps = (data, defaultSelected) => {
      const { props } = (
        <Canvas context={context} pixelRatio={1} animate={false}>
          <Chart
            data={data}
            coord={{
              radius: 0.8,
              type: 'polar',
              transposed: true,
            }}
          >
            <Interval
              x="a"
              y="sold"
              adjust="stack"
              color="genre"
              selection={{
                defaultSelected,
                selectedStyle: (record) => {
                  const { yMax } = record;
                  return {
                    r: yMax * 1.1,
                  };
                },
                cancelable: false,
              }}
            />
          </Chart>
        </Canvas>
      );
      return props;
    };

    const props = getProps(data, [{ a: '1', genre: 'Sports', sold: 275 }]);
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(200);
    expect(context).toMatchImageSnapshot();

    const updateProps = getProps([].concat(data), [{ a: '1', genre: 'Strategy', sold: 115 }]);
    canvas.update(updateProps);

    await delay(200);
    expect(context).toMatchImageSnapshot();
  });
});

describe('select onChange', () => {
  it('select onChange', async () => {
    const context = createContext();
    const onChange = jest.fn();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart
          data={data}
          coord={{
            radius: 0.8,
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval
            x="a"
            y="sold"
            adjust="stack"
            color="genre"
            selection={{
              defaultSelected: [{ a: '1', genre: 'Strategy', sold: 115 }],
              selectedStyle: (record) => {
                const { yMax, yMin } = record;
                return {
                  r: (yMax - yMin) * 1.1,
                };
              },
              cancelable: true,
              onChange: onChange,
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(200);

    // 选中
    await gestureSimulator(context.canvas, 'click', { x: 144, y: 68 });
    await delay(200);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0].selected[0]).toEqual({ a: '1', genre: 'Other', sold: 110 });

    // 反选
    await gestureSimulator(context.canvas, 'click', { x: 213, y: 166 });
    await delay(200);
    expect(onChange.mock.calls.length).toBe(2);
  });
});
