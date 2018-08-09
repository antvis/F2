const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/line');
require('../../src/geom/interval');
require('../../src/coord/polar');
require('../../src/geom/adjust/stack');
// const Legend = require('../../src/plugin/legend');

const canvas = document.createElement('canvas');
canvas.width = 360;
canvas.height = 360;
canvas.id = 'issue228';
document.body.appendChild(canvas);

function snapEqual(a, b) {
  return Math.abs(a - b) < 0.01;
}

describe('issue 228', () => {
  it('When chart.clear() be calles, recalculate the padding.', done => {
    const data = [
      { day: '周一', value: 300 },
      { day: '周二', value: 400 },
      { day: '周三', value: 350 },
      { day: '周四', value: 500 },
      { day: '周五', value: 490 },
      { day: '周六', value: 600 },
      { day: '周日', value: 900 }
    ];
    const chart = new F2.Chart({
      id: 'issue228',
      // plugins: Legend,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.line().position('day*value');
    chart.render();

    const padding = chart.get('_padding');
    expect(padding[0]).to.eql(30);
    expect(padding[1]).to.eql(15);
    expect(padding[2]).to.eql(32.5);
    expect(snapEqual(padding[3], 39.18)).to.be.true;

    setTimeout(() => {
      chart.clear();
      // draw a pie chart, the padding should be recalculated.
      chart.source([
        { day: '周一', value: 300, const: 'x' },
        { day: '周二', value: 400, const: 'x' },
        { day: '周三', value: 350, const: 'x' },
        { day: '周四', value: 500, const: 'x' },
        { day: '周五', value: 490, const: 'x' },
        { day: '周六', value: 600, const: 'x' },
        { day: '周日', value: 900, const: 'x' }
      ]);

      chart.coord('polar', {
        transposed: true
      });
      chart.axis(false);
      // chart.legend({
      //   position: 'right'
      // });
      chart.interval()
        .position('const*value')
        .color('day')
        .adjust('stack');
      chart.render();

      const rePadding = chart.get('_padding');
      expect(rePadding).to.eql([ 30, 15, 15, 15 ]);

      chart.destroy();
      document.body.removeChild(canvas);

      done();
    }, 1000);
  });
});
