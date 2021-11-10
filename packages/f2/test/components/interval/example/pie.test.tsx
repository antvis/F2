// @ts-nocheck
import { jsx } from '../../../../src';
import { Polar, Rect } from '../../../../src/coord';
import { Canvas, Chart } from '../../../../src';
import { Interval, Legend,  } from '../../../../src/components';
import { createContext } from '../../../util';

const data = [
  {
    name: '长津湖',
    percent: 0.4,
    a: '1',
  },
  {
    name: '我和我的父辈',
    percent: 0.2,
    a: '1',
  },
  {
    name: '失控玩家',
    percent: 0.18,
    a: '1',
  },
  {
    name: '宝可梦',
    percent: 0.15,
    a: '1',
  },
  {
    name: '峰爆',
    percent: 0.05,
    a: '1',
  },
  {
    name: '其他',
    percent: 0.02,
    a: '1',
  },
];

describe('饼图', () => {
  it('基础饼图', () => {
    const context = createContext('基础饼图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
          }}
          scale={{}}
        >
          <Interval
            x="a"
            y="percent"
            adjust="stack"
            color={{
              field: 'name',
              range: [
                '#1890FF',
                '#13C2C2',
                '#2FC25B',
                '#FACC14',
                '#F04864',
                '#8543E0',
              ],
            }}
          />
          <Legend position="right" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });

});
