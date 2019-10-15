const expect = require('chai').expect;
const F2 = require('../../src/core');
const { gestureSimulator } = require('../unit/test-util');

require('../../src/geom/interval');
const Legend = require('../../src/plugin/legend');
require('../../src/geom/adjust/stack');


describe('图例过滤未考虑数据中存在空数据的情况', () => {
  let canvas;
  let chart;
  before(() => {
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'legend-filter-null';
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    document.body.appendChild(canvas);
  });

  it('filter', () => {
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: null, 月份: 'test' }
    ];
    chart = new F2.Chart({
      id: 'legend-filter-null',
      pixelRatio: 2,
      plugins: [ Legend ]
    });
    chart.source(data, {
      月均降雨量: {
        tickCount: 5
      }
    });
    chart.legend({
      triggerOn: 'click'
    });
    chart.interval().position('月份*月均降雨量').color('name')
      .adjust('stack');
    chart.render();

    gestureSimulator(canvas, 'click', {
      clientX: 184,
      clientY: 22
    });

    expect(chart.get('filteredData').length).to.equal(2);
    console.log(chart.get('filteredData'));
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
