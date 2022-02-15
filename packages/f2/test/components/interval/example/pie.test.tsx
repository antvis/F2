import { jsx } from '../../../../src';
import { Polar, Rect } from '../../../../src/coord';
import { Canvas, Chart } from '../../../../src';
import { Interval, Legend } from '../../../../src/components';
import { createContext, delay } from '../../../util';

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
            type: Polar,
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
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
