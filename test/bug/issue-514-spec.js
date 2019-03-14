const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');
require('../../src/coord/polar');
require('../../src/geom/adjust/stack');

describe('Issue 514', () => {
  let canvas;
  let chart;
  before(() => {
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'issue514';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    document.body.appendChild(canvas);
  });

  it('Issue 514', () => {
    const data = [
      { amount: 10000000000, title: '货币基金', amountDesc: '10000000000.00元' },
      { amount: 100999999, title: '定期', amountDesc: '100999999.00元' },
      { amount: 100, title: '短期理财', amountDesc: '100.00元' },
      { amount: 100, title: '余额宝', amountDesc: '100.00元' }
    ];
    chart = new F2.Chart({
      id: 'issue514',
      width: 300,
      height: 300,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.axis(false);
    chart.coord('polar', { // 极坐标
      transposed: true,
      innerRadius: 0.5,
      radius: 0.85
    });

    chart.interval()
      .position('a*amount')
      .color('title')
      .adjust('stack'); // 层叠

    chart.render();

    // 通过判断像素点的颜色进行测试
    const pixelData = canvas.getContext('2d').getImageData(248, 171, 1, 1).data;

    expect(pixelData[0]).to.equal(24); // r
    expect(pixelData[1]).to.equal(144); // g
    expect(pixelData[2]).to.equal(255); // b
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
