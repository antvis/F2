const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

require('../../../src/geom/index');

describe('Geom init', function() {

  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  document.body.appendChild(canvas);
  let chart;

  it('repetition Geom', function() {

    chart = new Chart({
      el: canvas
    });

    const data = [
      {
        date: '2020-05-10',
        dailyProfit: '0.00',
        profit: -15.69
      },
      {
        date: '2020-05-20',
        dailyProfit: '0.00',
        profit: 15.69
      },
      {
        date: '2020-06-10',
        dailyProfit: '0.00',
        profit: 115.69
      },
      {
        date: '2020-07-10',
        dailyProfit: '0.00',
        profit: 215.69
      }
    ];


    chart.source(data);
    chart.axis('date', {
      label: false
    });

    chart.line().position('date*profit');
    expect(chart.get('geoms')[0].get('isInit')).to.be.false;
    chart.render();
    expect(chart.get('geoms').length).equal(1);
    expect(chart.get('geoms')[0].get('isInit')).to.be.true;
    chart.line().position('date*profit');
    chart.render();

    expect(chart.get('geoms').length).equal(2);

  });

});
