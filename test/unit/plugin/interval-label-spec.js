import { expect } from 'chai';
import * as F2 from '../../../src/core';
import '../../../src/geom/interval';
import '../../../src/geom/adjust/symmetric';
import * as IntervalLabel from '../../../src/plugin/interval-label';

const canvas = document.createElement('canvas');
canvas.width = 350;
canvas.height = 350;
canvas.id = 'chart-interval-label';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
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
      id: 'chart-interval-label',
      plugins: [ IntervalLabel ],
      pixelRatio: 2
    });

    expect(chart._plugins.descriptors.length).to.equal(1);
    expect(chart.intervalLabel).to.be.an.instanceof(Function);
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
      .shape('funnel');
    chart.intervalLabel({
      label: data => {
        return {
          text: data.action
        };
      }
    });

    chart.render();

    const pieLabelController = chart.get('intervalLabelController');
    const { container } = pieLabelController;
    const children = container.get('children');
    expect(children.length).equal(5);

    const labelShape = children[0].get('children')[0];
    expect(labelShape.get('attrs').text).equal('浏览网站');

  });

  it('clear', () => {
    chart.clear();
    const labelController = chart.get('intervalLabelController');
    expect(labelController.container.get('children')).to.be.empty;

    chart.destroy();
    document.body.removeChild(canvas);
  });
});

