import { jsx } from '../../../src';
import { createContext, delay } from '../../util';
import { Canvas, Component, Chart, Interval, Legend } from '../../../src';

const context = createContext('', {
  width: '300px',
  height: '300px',
});

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
];

const data2 = [
  { type: '增额终身寿', genre: 'Sports', sold: 5 },
  { type: '增额终身寿', genre: 'Strategy', sold: 10 },
  { type: '增额终身寿', genre: 'Action', sold: 20 },
  { type: '增额终身寿', genre: 'Shooter', sold: 20 },
  { type: '增额终身寿', genre: 'Other', sold: 40 },
  { type: '增额终身寿2.0', genre: 'Sports', sold: 3 },
  { type: '增额终身寿2.0', genre: 'Strategy', sold: 7 },
  { type: '增额终身寿2.0', genre: 'Action', sold: 16 },
  { type: '增额终身寿2.0', genre: 'Shooter', sold: 18 },
  { type: '增额终身寿2.0', genre: 'Other', sold: 37 },
  { type: '鑫相守增额寿', genre: 'Sports', sold: 2 },
  { type: '鑫相守增额寿', genre: 'Strategy', sold: 6 },
  { type: '鑫相守增额寿', genre: 'Action', sold: 16 },
  { type: '鑫相守增额寿', genre: 'Shooter', sold: 18 },
  { type: '鑫相守增额寿', genre: 'Other', sold: 32 },
];

class Test extends Component {
  render() {
    return (
      <rect
        attrs={{
          x: 10,
          y: 10,
          width: 10,
          height: 10,
          fill: 'red',
        }}
      />
    );
  }
}

describe('Canvas', () => {
  it('初始化', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Test />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(0);

    const testComponent = canvas.props.children.type;

    expect(context.canvas.width).toBe(300);
    expect(context.canvas.height).toBe(300);

    expect(testComponent).toBe(Test);

    // @ts-ignore
    const rect = canvas.children.component.container.children[0];

    expect(rect.config.type).toBe('rect');
    expect(rect.getAttribute('fill')).toBe('red');
  });

  it('chart update', async () => {
    const chartRef = { current: null };
    const context = createContext('基础条形图');
    const width = 300;
    const height = 300;
    const { type, props } = (
      <Canvas context={context} pixelRatio={1} animate={false} width={width} height={height}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
          <Interval x="genre" y="sold" color="type" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    await canvas.resize(200, 200);
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('chart resize legend', async () => {
    const chartRef = { current: null };
    const context = createContext('chart resize legend');
    const width = 300;
    const height = 300;
    const { type, props } = (
      <Canvas context={context} pixelRatio={1} animate={false} width={width} height={height}>
        <Chart ref={chartRef} data={data2} coord={{ transposed: true }}>
          <Interval x="genre" y="sold" color="type" adjust="dodge" />
          <Legend></Legend>
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    await canvas.resize(200, 200);
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
