import { jsx, Canvas, createRef, Chart, Axis, Line } from '../../../src';
import { createContext, delay } from '../../util';
const data = [
  {
    time: '12-01',
    value: 168386,
    name: '同行同层平均',
    crcText: '百分比',
    crcValue: 0.3455666,
  },
  {
    time: '12-02',
    value: 75662,
    name: '同行同层平均',
    crcText: '百分比',
    crcValue: 0.3455666,
  },
  {
    time: '12-03',
    value: 60054,
    name: '同行同层平均',
    crcText: '百分比',
    crcValue: 0.3455666,
  },
];

describe('空数据', () => {
  it('空数组', async () => {
    const context = createContext('空数组');
    const ref = createRef();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={[]}>
          <Line ref={ref} x="x" y="y" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(100);

    expect(ref.current.container.children[0].children[0].children[0].children.length).toBe(0);
  });

  it('数据更新为空数组', async () => {
    const context = createContext('数据更新为空数组');
    const ref = createRef();
    const { props: canvasProps } = (
      <Canvas context={context} pixelRatio={1} animate={false}></Canvas>
    );
    let chartProps = (
      <Chart data={data}>
        <Axis field="value" tickCount={5} />
        <Line ref={ref} x="time" y="value" color={['name', ['#0b7ff7']]} />
      </Chart>
    );
    canvasProps.children = chartProps;
    const canvas = new Canvas(canvasProps);
    await delay(100);
    await canvas.render();
    const newChartProps = (
      <Chart data={[]}>
        <Axis field="value" tickCount={5} />;
        <Line x="time" y="value" color={['name', ['#0b7ff7']]} />
      </Chart>
    );
    newChartProps.props.children = chartProps.props.children;
    await delay(100);
    await canvas.update({ children: newChartProps });
    expect(ref.current.container.children[0].children[0].children[0].children.length).toBe(0);
  });
});
