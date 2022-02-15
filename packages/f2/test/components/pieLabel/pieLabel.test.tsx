import { jsx } from '../../../src';
import { Polar, Rect } from '../../../src/coord';
import { Canvas, Chart } from '../../../src';
import { Interval, Legend, PieLabel } from '../../../src/components';
import { createContext } from '../../util';

const data = [
  {
    amount: 20,
    ratio: 0.1,
    memo: '学习',
    const: 'const',
  },
  {
    amount: 100,
    ratio: 0.5,
    memo: '睡觉',
    const: 'const',
  },
  {
    amount: 10,
    ratio: 0.05,
    memo: '吃饭',
    const: 'const',
  },
  {
    amount: 30,
    ratio: 0.15,
    memo: '讲礼貌',
    const: 'const',
  },
  {
    amount: 10,
    ratio: 0.05,
    memo: '其他',
    const: 'const',
  },
  {
    amount: 20,
    ratio: 0.1,
    memo: '运动',
    const: 'const',
  },
  {
    amount: 10,
    ratio: 0.05,
    memo: '暂无备注',
    const: 'const',
  },
];

describe('PieLabel', () => {
  it('带图例文本的饼图', () => {
    const context = createContext('带图例文本的饼图');
    const chartRef = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          ref={chartRef}
          data={data}
          coord={{
            type: Polar,
            transposed: true,
            innerRadius: 0.3,
            radius: 0.6,
          }}
          scale={{}}
        >
          <Interval
            x="const"
            y="ratio"
            adjust="stack"
            color={{
              field: 'memo',
              range: [
                '#1890FF',
                '#13C2C2',
                '#2FC25B',
                '#FACC14',
                '#F04864',
                '#8543E0',
                '#3436C7',
                '#223273',
              ],
            }}
          />
          {/* <Legend position="top" /> */}
          <PieLabel
            label1={(data) => {
              return {
                text: data.memo,
                fill: '#808080',
              };
            }}
            label2={(data) => {
              return {
                fill: '#000000',
                text: '$' + data.amount.toFixed(2),
                fontWeight: 500,
                fontSize: 10,
              };
            }}
            onClick={(data) => {
              console.log(data);
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
