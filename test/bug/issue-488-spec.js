const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');
require('../../src/geom/adjust/dodge');

describe('Issue 488', () => {
  let canvas;
  let chart;
  before(() => {
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'issue488';
    document.body.appendChild(canvas);
  });

  it('Issue 488', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 }
    ];
    chart = new F2.Chart({
      id: 'issue488',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data);
    const interval = chart.interval()
      .position('月份*月均降雨量')
      .color('name')
      .adjust({
        type: 'dodge',
        marginRatio: 0
      });
    chart.render();

    const dataArray = interval.get('dataArray');
    expect(dataArray[0][0].points[0].x).to.equal(0.25);
    expect(dataArray[1][0].points[0].x).to.equal(0.5);
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
