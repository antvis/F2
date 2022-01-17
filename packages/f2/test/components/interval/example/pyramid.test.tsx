import { jsx } from '../../../../src';
import { Polar, Rect } from '../../../../src/coord';
import { Canvas, Chart } from '../../../../src';
import { Interval, Axis, Legend, Tooltip } from '../../../../src/components';
import { createContext } from '../../../util';

describe('金字塔图', () => {
  it('基础金字塔图', () => {
    const context = createContext('基础金字塔图', {
      height: '300px',
      width: '400px',
    });
    const data = [
      { action: '浏览网站', pv: 50000, percent: 1 },
      { action: '放入购物车', pv: 35000, percent: 0.7 },
      { action: '生成订单', pv: 25000, percent: 0.5 },
      { action: '支付订单', pv: 15000, percent: 0.3 },
      { action: '完成交易', pv: 8000, percent: 0.16 },
    ];
    const { type, props } = (
      <Canvas context={context}>
        <Chart
          data={data}
          coord={{
            transposed: true,
          }}
          scale={{
            percent: {
              min: 0,
            },
            action: {
              range: [0, 1],
            },
          }}
        >
          <Interval
            x="action"
            y="percent"
            adjust="symmetric"
            shape="pyramid"
            color={{
              field: 'action',
              range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
            }}
            showLabel
            labelCfg={{
              offsetX: 10,
              label: (data, color) => {
                return {
                  text: data.action,
                  fill: color,
                };
              },
              guide: (data) => {
                return {
                  text: (data.percent * 100).toFixed(0) + '%',
                  fill: '#fff',
                };
              },
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    canvas.render();
  });

  it('倒置金字塔', () => {
    const context = createContext('倒置金字塔', {
      height: '300px',
      width: '400px',
    });
    const data = [
      { action: '浏览网站', pv: 50000, percent: 1 },
      { action: '放入购物车', pv: 35000, percent: 0.7 },
      { action: '生成订单', pv: 25000, percent: 0.5 },
      { action: '支付订单', pv: 15000, percent: 0.3 },
      { action: '完成交易', pv: 8000, percent: 0.16 },
    ];
    const { type, props } = (
      <Canvas context={context}>
        <Chart
          data={data}
          coord={{
            transposed: true,
          }}
          scale={{
            percent: {
              min: 0,
            },
            action: {
              range: [1, 0],
            },
          }}
        >
          <Interval
            x="action"
            y="percent"
            adjust="symmetric"
            shape="pyramid"
            color={{
              field: 'action',
              range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
            }}
            showLabel
            labelCfg={{
              offsetX: 10,
              label: (data, color) => {
                return {
                  text: data.action,
                  fill: color,
                };
              },
              guide: (data) => {
                return {
                  text: (data.percent * 100).toFixed(0) + '%',
                  fill: '#fff',
                };
              },
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    canvas.render();
  });
});
