import { jsx } from '../../../../src';
import { Polar, Rect } from '../../../../src/coord';
import { isArray } from '@antv/util';
import { Canvas, Chart, Component } from '../../../../src';
import { Gesture } from '@antv/f-engine';
import { Interval } from '../../../../src/components';
import { createContext, delay, gestureSimulator } from '../../../util';

// @ts-ignore
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: null,
    };
  }
  didMount() {
    super.didMount();
    this._initEvent();
  }

  _handleEvent = (ev) => {
    const { chart } = this.props;
    const { x, y } = ev;
    const pieData = chart.getSnapRecords({ x, y });
    if (isArray(pieData) && pieData.length > 0) {
      this.setState({ record: pieData[0] });
    }
  };

  _initEvent() {
    const { context } = this;
    const { canvas } = context;
    const hammer = new Gesture(canvas);
    hammer.on('click', this._handleEvent);
  }

  render() {
    if (!this.state.record) {
      return null;
    }
    const { record } = this.state;
    const { coord } = this.props;
    const { x, y } = coord?.center;
    const { radius } = coord;

    const { xMax, xMin } = record;
    return (
      <text
        attrs={{
          text: record.origin.name,
          x: x + radius * Math.cos(xMin + (xMax - xMin) / 2),
          y: y + radius * Math.sin(xMin + (xMax - xMin) / 2),
          fill: '#000',
          fontSize: '22px',
        }}
      />
    );
  }
}

const data = [
  {
    name: '长津湖',
    percent: 10,
    a: '1',
  },
  {
    name: '我和我的父辈',
    percent: 20,
    a: '1',
  },
  {
    name: '失控玩家',
    percent: 30,
    a: '1',
  },
  {
    name: '宝可梦',
    percent: 40,
    a: '1',
  },
  {
    name: '峰爆',
    percent: 50,
    a: '1',
  },
  {
    name: '其他',
    percent: 60,
    a: '1',
  },
];

describe('饼图', () => {
  it('基础饼图', async () => {
    const context = createContext('基础饼图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval
            x="a"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await delay(1000);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('圆角圆环图', async () => {
    const context = createContext('圆角圆环图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
            innerRadius: 0.5,
          }}
        >
          <Interval
            x="a"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
            }}
            style={{
              radius: [10, 7, 4, 2],
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await delay(500);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('饼图-交互式label', async () => {
    const context = createContext('饼图-交互式label');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval
            x="a"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
            }}
          />
          <Test />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(200);
    await gestureSimulator(context.canvas, 'click', { x: 205, y: 76 });
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
