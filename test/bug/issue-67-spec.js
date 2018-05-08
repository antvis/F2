const expect = require('chai').expect;
const { gestureSimulator } = require('../unit/test-util');

const F2 = require('../../src/core');
require('../../src/geom/interval');
require('../../src/coord/polar'); // 极坐标系
require('../../src/geom/adjust/stack');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'getSnapRecords';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('getSnapRecords', () => {
  let chart;

  it('自定义 color 的饼图', function(done) {
    const data = [
      { uKey: '1', percent: 0.2771, const: 'const' },
      { uKey: '2', percent: 0.18083, const: 'const' },
      { uKey: '3', percent: 0.14108, const: 'const' },
      { uKey: '4', percent: 0.13868, const: 'const' },
      { uKey: '5', percent: 0.05662, const: 'const' },
      { uKey: '6', percent: 0.05523, const: 'const' },
      { uKey: '7', percent: 0.03355, const: 'const' },
      { uKey: '8', percent: 0.03079, const: 'const' },
      { uKey: '9', percent: 0.02864, const: 'const' },
      { uKey: '10', percent: 0.01879, const: 'const' },
      { uKey: '11', percent: 0.03869, const: 'const' }
    ];
    chart = new F2.Chart({
      id: 'getSnapRecords',
      width: 400,
      height: 400 * 0.64,
      pixelRatio: 2
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      inner: 0.6
    });
    chart.axis(false);
    chart.interval().position('const*percent')
      .color('percent', v => {
        return `rgba( 255 ,0 ,0 , ${((v[1] - v[0]) * 3).toFixed(3)} )`;
      })
      .adjust('stack')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      });
    chart.render();

    let records;
    canvas.onclick = ev => {
      const point = F2.Util.getRelativePosition({ x: ev.clientX, y: ev.clientY }, chart.get('canvas'));
      records = chart.getSnapRecords(point);
    };

    gestureSimulator(canvas, 'click', {
      clientX: 218,
      clientY: 52
    });

    setTimeout(function() {
      expect(records.length).to.equal(1);
      expect(records[0]._origin.uKey).to.equal('1');
      expect(records[0]._origin.percent).to.equal(0.2771);
      done();
    }, 500);
  });

  it('嵌套饼图', function(done) {
    chart.destroy();
    const data = [
      { a: '1', b: 0.2, c: '1' },
      { a: '2', b: 0.5, c: '1' },
      { a: '3', b: 0.4, c: '1' },
      { a: '1', b: 0.8, c: '2' },
      { a: '2', b: 0.5, c: '2' },
      { a: '3', b: 0.6, c: '2' }
    ];
    chart = new F2.Chart({
      id: 'getSnapRecords',
      width: 400,
      height: 400 * 0.64,
      pixelRatio: 2
    });
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      inner: 0.6
    });
    chart.axis(false);
    chart.interval().position('a*b')
      .color('c')
      .adjust('stack');
    chart.render();

    let records;

    canvas.onclick = ev => {
      const point = chart.get('canvas').getPointByClient(ev.clientX, ev.clientY);
      records = chart.getSnapRecords(point);
    };

    gestureSimulator(canvas, 'click', {
      clientX: 277,
      clientY: 71
    });

    setTimeout(function() {
      expect(records.length).to.equal(2);
      expect(records[0]._origin.a).to.equal(records[1]._origin.a);
      expect(records[0]._origin.b).to.equal(0.4);
      expect(records[1]._origin.b).to.equal(0.6);
      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 500);
  });
});
