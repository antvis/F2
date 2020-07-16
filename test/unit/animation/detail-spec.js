const expect = require('chai').expect;
const F2 = require('../../../src/core');
require('../../../src/geom/interval');

const Animation = require('../../../src/animation/detail');
const Chart = F2.Chart;

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'detail-animation';
document.body.appendChild(canvas);

describe('Group animation', function() {
  Chart.plugins.register(Animation);

  it('chart animate false', function() {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new F2.Chart({
      id: 'detail-animation',
      width: 500,
      height: 300,
      pixelRatio: 2,
      animate: false
    });

    chart.source(data);
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    expect(chart.get('canvas').get('caches')).to.be.undefined;
    chart.destroy();
  });

  it('chart animate', function(done) {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new F2.Chart({
      id: 'detail-animation',
      width: 500,
      height: 300,
      pixelRatio: 2
    });

    chart.source(data);
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    setTimeout(function() {
      expect(Object.keys(chart.get('canvas').get('caches')).length).to.equal(20);
      expect(chart.get('isUpdate')).to.be.undefined;

      chart.scale('sold', {
        tickCount: 5
      });
      chart.changeData([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Other', sold: 150 }
      ]);

      setTimeout(function() {
        expect(Object.keys(chart.get('canvas').get('caches')).length).to.equal(16);
        expect(chart.get('isUpdate')).to.be.true;
        Chart.plugins.unregister(Animation);
        document.body.removeChild(canvas);
        done();
      }, 500);
    }, 500);
  });
});
