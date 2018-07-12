const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue186';
document.body.appendChild(canvas);

describe('issue 186', () => {
  it('chart.changeSize() 触发后，padding 计算出错。', done => {
    const data = [
      { month: 0, tem: 7000, city: 'Tokyo', cat: 1 },
      { month: 1, tem: 6900, city: 'Tokyo', cat: 1 },
      { month: 2, tem: 980, city: 'Tokyo', cat: 1 },
      { month: 3, tem: 7000, city: 'Tokyo', cat: 1 },
      { month: 4, tem: 6900, city: 'Tokyo', cat: 1 },
      { month: 5, tem: 980, city: 'Tokyo', cat: 1 },
      { month: 6, tem: 3, city: 'Tokyo', cat: 1 },
      { month: 7, tem: 182, city: 'Tokyo', cat: 1 },
      { month: 8, tem: 21100, city: 'Tokyo', cat: 2 }
    ];
    const defs = {
      month: {
        type: 'cat',
        values: [ '十月', '十一月', '十二月', '一月', '二月', '三月', '四月', '五月', '六月' ] // 这时候 month 的原始值是索引值
      }
    };
    const chart = new F2.Chart({
      id: 'issue186',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, defs);
    chart.axis('tem', {
      line: null,
      label: null
    });

    chart.interval().position('month*tem').color('cat', [ '#47ce85', '#219d7d' ]);
    chart.render();

    const padding = chart.get('_padding');

    setTimeout(() => {
      chart.changeSize(600);
      expect(chart.get('_padding')).to.eql(padding);

      chart.destroy();
      document.body.removeChild(canvas);

      done();
    }, 250);
  });
});
