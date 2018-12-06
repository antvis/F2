const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/line');

const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 300;
canvas.id = 'issue438';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('Issue 438', () => {
  it('Issue 438', done => {
    const chart = new F2.Chart({
      id: 'issue438',
      pixelRatio: window.devicePixelRatio
    });

    chart.source([], {
      name: {
        type: 'cat'
      },
      value: {
        type: 'linear',
        min: 0,
        max: 5,
        tickInterval: 1
      }
    });
    chart.axis('value', {
      label: {
        textAlign: 'center',
        fill: '#777777',
        fontSize: 36
      },
      grid: null
    });
    chart.axis('name', {
      label: {
        textAlign: 'center',
        fill: '#777777',
        fontSize: 36
      },
      line: null
    });
    chart.line().color('#FF790C').position('name*value');
    chart.render();

    const axisController = chart.get('axisController');
    const labels = axisController.backPlot.get('children');
    labels.forEach(label => {
      expect(label.attr('fontSize')).to.equal(36);
    });


    setTimeout(() => {
      chart.changeData([
        { name: 'a', value: '1' },
        { name: 'b', value: '1' },
        { name: 'c', value: '1' },
        { name: 'd', value: '1' },
        { name: 'e', value: '1' }
      ]);
      const axisController = chart.get('axisController');
      const labels = axisController.backPlot.get('children');
      labels.forEach(label => {
        expect(label.attr('fontSize')).to.equal(36);
      });

      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 300);
  });
});
