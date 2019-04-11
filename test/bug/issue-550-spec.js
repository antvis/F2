const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/line');


describe('Issue 550', () => {
  let canvas;
  let chart;
  before(() => {
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'issue550';
    document.body.appendChild(canvas);
  });

  it('Issue 550', () => {
    const data = [
      {
        type: 'park',
        date: '2019-04-01',
        val: 282,
        rate: 94
      },
      {
        type: 'park',
        date: '2019-04-02',
        val: 208,
        rate: 41.6
      },
      {
        type: 'park',
        date: '2019-04-03',
        val: 186,
        rate: 46.5
      },
      {
        type: 'park',
        date: '2019-04-04',
        val: 184,
        rate: 30.67
      },
      {
        type: 'park',
        date: '2019-04-05',
        val: 177,
        rate: 44.25
      },
      {
        type: 'park',
        date: '2019-04-06',
        val: 150,
        rate: 50
      },
      {
        type: 'park',
        date: '2019-04-09',
        val: 110,
        rate: 94
      },
      {
        type: 'park',
        date: '2019-04-10',
        val: 120,
        rate: 41.6
      },
      {
        type: 'park',
        date: '2019-04-11',
        val: 130,
        rate: 46.5
      },
      {
        type: 'park',
        date: '2019-04-12',
        val: 140,
        rate: 30.67
      },
      {
        type: 'park',
        date: '2019-04-13',
        val: 170,
        rate: 44.25
      },
      {
        type: 'park',
        date: '2019-04-14',
        val: 155,
        rate: 50
      },
      {
        type: 'combo',
        date: '2019-04-01',
        val: 270,
        rate: 94
      },
      {
        type: 'combo',
        date: '2019-04-02',
        val: 228,
        rate: 41.6
      },
      {
        type: 'combo',
        date: '2019-04-03',
        val: 156,
        rate: 46.5
      },
      {
        type: 'combo',
        date: '2019-04-04',
        val: 188,
        rate: 30.67
      },
      {
        type: 'combo',
        date: '2019-04-05',
        val: 165,
        rate: 44.25
      },
      {
        type: 'combo',
        date: '2019-04-06',
        val: 159,
        rate: 50
      },
      {
        type: 'combo',
        date: '2019-04-09',
        val: 110,
        rate: 94
      },
      {
        type: 'combo',
        date: '2019-04-10',
        val: 120,
        rate: 41.6
      },
      {
        type: 'combo',
        date: '2019-04-11',
        val: 130,
        rate: 46.5
      },
      {
        type: 'combo',
        date: '2019-04-12',
        val: 140,
        rate: 30.67
      },
      {
        type: 'combo',
        date: '2019-04-13',
        val: 170,
        rate: 44.25
      },
      {
        type: 'combo',
        date: '2019-04-14',
        val: 155,
        rate: 50
      }
    ];

    const originDates = [];
    data.forEach(obj => {
      if (obj.date >= '2019-04-06') {
        originDates.push(obj.date);
      }
    });

    chart = new F2.Chart({
      id: 'issue550',
      pixelRatio: 2
    });

    chart.source(data, {
      date: {
        type: 'timeCat',
        tickCount: 6,
        values: originDates,
        mask: 'MM-DD'
      },
      val: {
        tickInterval: 50
      }
    });

    chart.axis('date', {
      tickLine: {
        length: 4
      },
      line: {
        top: true
      }
    });

    chart
      .interval()
      .position('date*val')
      .color('type', [ '#52CE51', '#1886FF' ])
    ;
    chart.render();

    const geom = chart.get('geoms')[0];
    const dataArray = geom.get('dataArray')[0];
    const points = dataArray[dataArray.length - 1].points;
    expect(points[0].x).to.equal(0.8571428571428572);
    expect(points[2].x).to.equal(0.9285714285714286);
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
