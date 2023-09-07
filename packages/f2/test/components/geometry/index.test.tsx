import { jsx, Line } from '../../../src';
import Geometry from '../../../src/components/geometry';
import { createContext, delay, gestureSimulator } from '../../util';
import { Canvas, Chart, Interval, Axis } from '../../../src';
const context = createContext();

const data = [{ genre: 'Sports', sold: 275, type: 'a' }];

const data1 = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
];

class GeometryTest extends Geometry {
  render() {
    const records = this.mapping();
    return (
      <group>
        {records.map((record) => {
          const { children } = record;
          return children.map((item) => {
            const { x, y } = item;
            return (
              <circle
                attrs={{
                  // @ts-ignore
                  cx: x,
                  cy: y,
                  r: '20px',
                  fill: '#000',
                }}
              />
            );
          });
        })}
      </group>
    );
  }
}

describe('geometry', () => {
  let canvas;
  const chartRef = { current: null };
  const componentRef = { current: null };

  it('geometry render', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart ref={chartRef} data={data}>
          <GeometryTest ref={componentRef} x="genre" y="sold" />
        </Chart>
      </Canvas>
    );
    canvas = new Canvas(props);
    await canvas.render();
    await delay(0);

    expect(chartRef.current.scale.scales.genre.values).toEqual(['Sports']);

    const container = componentRef.current.container;
    const group = container.children[0];
    expect(group.children.length).toBe(1);
    expect(group.children[0].config.type).toBe('circle');
  });

  it('geometry update', async () => {
    const newChart = (
      <Chart data={data1}>
        <GeometryTest ref={componentRef} x="genre" y="sold" />
      </Chart>
    );

    await delay(50);
    expect(context).toMatchImageSnapshot();

    canvas.update({
      children: newChart,
    });
    await delay(0);

    expect(chartRef.current.scale.scales.genre.values).toEqual(['Sports', 'Strategy']);

    const container = componentRef.current.container;
    const group = container.children[0];
    expect(group.children.length).toBe(2);

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });

  it('原始数据中有绘图属性', async () => {
    const data = [
      { type: 'FULFILLMENT', y: 171, x: '守约记录' },
      { type: 'BEHAVIOR', y: 180, x: '行为积累' },
      { type: 'CHARACTERISTICS', y: 179, x: '身份证明' },
      { type: 'CAPITAL', y: 160, x: '资产证明' },
      { type: 'RELATIONSHIP', y: 146, x: '人脉关系' },
    ];
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="x" y="y" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    const newChart = (
      <Chart data={data}>
        <Line x="x" y="y" />
        <circle
          style={{
            cx: 100,
            cy: 100,
            r: 20,
            fill: 'red',
          }}
        />
      </Chart>
    );

    await canvas.update({
      children: newChart,
    });

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });

  it('geometry event', async () => {
    const onPress = jest.fn();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart ref={chartRef} data={data}>
          <GeometryTest ref={componentRef} x="genre" y="sold" onPress={onPress} />
        </Chart>
      </Canvas>
    );
    canvas = new Canvas(props);
    await canvas.render();
    await delay(100);

    gestureSimulator(context.canvas, 'touchstart', { x: 60, y: 70 });
    gestureSimulator(context.canvas, 'touchmove', { x: 93, y: 35 });
    expect(onPress.mock.calls.length).toBe(1);
  });
});
