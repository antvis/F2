import * as F2 from '../../../src/core';
import '../../../src/geom/interval';
import '../../../src/geom/adjust/symmetric';
import * as IntervalLabel from '../../../src/plugin/interval-label';
import * as Legend from '../../../src/plugin/legend';
import { gestureSimulator } from '../test-util';

const canvas = document.createElement('canvas');
canvas.style.width = '350px';
canvas.style.height = '350px';
document.body.appendChild(canvas);

describe('IntervalLabel', () => {
  let chart;

  const data = [
    { action: '浏览网站', pv: 50000, percent: 1 },
    { action: '放入购物车', pv: 35000, percent: 0.7 },
    { action: '生成订单', pv: 25000, percent: 0.5 },
    { action: '支付订单', pv: 15000, percent: 0.3 },
    { action: '完成交易', pv: 8000, percent: 0.16 }
  ];

  it('Register IntervalLabel plugin', function() {
    chart = new F2.Chart({
      el: canvas,
      plugins: [ IntervalLabel, Legend ],
      pixelRatio: 2,
      padding: [ 60, 80, 15, 15 ]
    });

    expect(chart._plugins.descriptors.length).toBe(2);
    expect(chart.intervalLabel).toBeInstanceOf(Function);
  });

  it('interval label', function() {
    chart.source(data);
    chart.axis(false);
    chart.coord({
      transposed: true
    });

    chart.interval()
      .position('action*percent')
      .color('action', [ '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF' ])
      .adjust('symmetric')
      .shape('funnel')
      .style({
        lineWidth: 2,
        stroke: '#fff'
      });

    chart.intervalLabel({
      offsetX: 10,
      label: data => {
        return {
          text: data.action
        };
      },
      guide: data => {
        return {
          text: (data.percent * 100).toFixed(0) + '%',
          fill: '#fff'
        };
      }
    });
    chart.legend(true);
    chart.render();

    const pieLabelController = chart.get('intervalLabelController');
    const { container } = pieLabelController;
    const children = container.get('children');
    expect(children.length).toBe(10);

    const labelShape = children[0];
    expect(labelShape.get('attrs').text).toBe('浏览网站');

  });

  it('legend click', () => {
    gestureSimulator(canvas, 'touchstart', {
      x: 156.05078125,
      y: 22.40625
    });

    const pieLabelController = chart.get('intervalLabelController');
    const { container } = pieLabelController;
    const children = container.get('children');
    expect(children.length).toBe(8);

    const labelShape = children[0];
    expect(labelShape.get('attrs').text).toBe('浏览网站');
    expect(labelShape.get('attrs').x).toBeCloseTo(248.125, 3);
    expect(labelShape.get('attrs').y).toBeCloseTo(280, 3);
  });

  it('clear', () => {
    chart.clear();
    const labelController = chart.get('intervalLabelController');
    expect(labelController.container.get('children')).toEqual([]);

    chart.destroy();
    document.body.removeChild(canvas);
  });
});

