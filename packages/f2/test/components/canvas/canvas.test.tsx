import { jsx } from '../../../src/jsx';
import { createContext, delay } from '../../util';
import { Canvas, Component, Chart, Interval } from '../../../src';
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
  it('初始化', () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Test />
      </Canvas>
    );

    const canvas = new Canvas(props);
    const testComponent = canvas.props.children.type;

    expect(context.canvas.width).toBe(300);
    expect(context.canvas.height).toBe(300);

    expect(testComponent).toBe(Test);

    canvas.render();

    const rect = canvas.children.component.container._attrs.children[0];
    expect(rect._attrs.type).toBe('rect');
    expect(rect._attrs.attrs.fill).toBe('red');
  });

  it('chart update', async () => {
    const chartRef = { current: null };
    const context = createContext('基础条形图');
    const width = 300;
    const height = 300;
    const { type, props } = (
      <Canvas context={context} pixelRatio={1} animate={false} width={300} height={300}>
        <Chart ref={chartRef} data={data} coord={{ transposed: true }}>
          <Interval x="genre" y="sold" color="type" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    canvas.resize(200, 200);
    expect(context).toMatchImageSnapshot();
  });
});
