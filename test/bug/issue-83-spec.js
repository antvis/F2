const expect = require('chai').expect;
const { gestureSimulator } = require('../unit/test-util');

const F2 = require('../../src/core');
require('../../src/geom/line');
require('../../src/coord/polar'); // 极坐标系
require('../../src/component/axis/circle'); // 极坐标系
require('../../src/geom/adjust/stack');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'radar';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 83', () => {
  let chart;

  it('radar', function(done) {
    const data = [
      { item: 'Design', user: '用户 A', score: 70 },
      { item: 'Design', user: '用户 B', score: 30 },
      { item: 'Development', user: '用户 A', score: 60 },
      { item: 'Development', user: '用户 B', score: 70 },
      { item: 'Marketing', user: '用户 A', score: 50 },
      { item: 'Marketing', user: '用户 B', score: 60 },
      { item: 'Users', user: '用户 A', score: 40 },
      { item: 'Users', user: '用户 B', score: 50 },
      { item: 'Test', user: '用户 A', score: 60 },
      { item: 'Test', user: '用户 B', score: 70 },
      { item: 'Language', user: '用户 A', score: 70 },
      { item: 'Language', user: '用户 B', score: 50 },
      { item: 'Technology', user: '用户 A', score: 70 },
      { item: 'Technology', user: '用户 B', score: 40 },
      { item: 'Support', user: '用户 A', score: 60 },
      { item: 'Support', user: '用户 B', score: 40 }
    ];
    chart = new F2.Chart({
      id: 'radar',
      width: 300,
      height: 300,
      pixelRatio: 2
    });

    chart.coord('polar');
    chart.source(data, {
      score: {
        min: 0,
        max: 120,
        nice: false,
        tickCount: 4
      }
    });
    chart.axis('score', {
      label(text, index, total) {
        if (index === total - 1) {
          return null;
        }
        return {
          top: true
        };
      },
      grid(text) {
        if (text === '120') {
          return {
            lineDash: null
          };
        }
      },
      line: {
        top: false
      }
    });
    chart.line().position('item*score').color('user');
    chart.render();

    let records;
    canvas.onclick = ev => {
      records = chart.getSnapRecords({
        x: ev.clientX,
        y: ev.clientY
      });
    };

    gestureSimulator(canvas, 'click', {
      clientX: 135,
      clientY: 99
    });

    setTimeout(function() {
      expect(records.length).to.equal(2);
      expect(records[0]._origin.item).to.equal('Design');
      expect(records[1]._origin.item).to.equal('Design');
      done();
    }, 500);
  });

  it('radar, set startAngle and endAngle', function(done) {
    chart.destroy();
    const data = [
      { item: 'Design', user: '用户 A', score: 70 },
      { item: 'Design', user: '用户 B', score: 30 },
      { item: 'Development', user: '用户 A', score: 60 },
      { item: 'Development', user: '用户 B', score: 70 },
      { item: 'Marketing', user: '用户 A', score: 50 },
      { item: 'Marketing', user: '用户 B', score: 60 },
      { item: 'Users', user: '用户 A', score: 40 },
      { item: 'Users', user: '用户 B', score: 50 },
      { item: 'Test', user: '用户 A', score: 60 },
      { item: 'Test', user: '用户 B', score: 70 },
      { item: 'Language', user: '用户 A', score: 70 },
      { item: 'Language', user: '用户 B', score: 50 },
      { item: 'Technology', user: '用户 A', score: 70 },
      { item: 'Technology', user: '用户 B', score: 40 },
      { item: 'Support', user: '用户 A', score: 60 },
      { item: 'Support', user: '用户 B', score: 40 }
    ];
    chart = new F2.Chart({
      id: 'radar',
      width: 300,
      height: 300,
      pixelRatio: 2
    });

    chart.coord('polar', {
      startAngle: 3 * Math.PI / 2,
      endAngle: -Math.PI / 2
    });
    chart.source(data, {
      score: {
        min: 0,
        max: 120,
        nice: false,
        tickCount: 4
      }
    });
    chart.axis('score', {
      label(text, index, total) {
        if (index === total - 1) {
          return null;
        }
        return {
          top: true
        };
      },
      grid(text) {
        if (text === '120') {
          return {
            lineDash: null
          };
        }
      },
      line: {
        top: false
      }
    });
    chart.line().position('item*score').color('user');
    chart.render();

    let records;
    canvas.onclick = ev => {
      records = chart.getSnapRecords({
        x: ev.clientX,
        y: ev.clientY
      });
    };

    gestureSimulator(canvas, 'click', {
      clientX: 192,
      clientY: 132
    });
    setTimeout(function() {
      expect(records.length).to.equal(2);
      expect(records[0]._origin.item).to.equal('Technology');
      expect(records[1]._origin.item).to.equal('Technology');
      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 500);

  });
});
