const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/interaction/pan');
require('../../src/geom/point');
const Legend = require('../../src/plugin/legend');
const data = require('../fixtures/cereal.json');

describe('Issue 467', () => {
  let canvas;
  let chart;
  before(() => {
    canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    canvas.id = 'issue467';
    document.body.appendChild(canvas);
  });

  it('Issue 467', () => {
    chart = new F2.Chart({
      id: 'issue467',
      pixelRatio: window.devicePixelRatio,
      plugins: Legend
    });

    chart.source(data);
    chart.legend({
      position: 'bottom',
      itemWidth: null,
      align: 'center',
      triggerOn: 'click'
    });
    chart.filter('Manufacturer', val => {
      return val === 'Kelloggs';
    });
    const point = chart.point().position('Calories*Potassium').color('Manufacturer')
      .style({
        fillOpacity: 0.6
      });
    chart.interaction('pan', {
      mode: 'xy'
    });
    chart.render();

    // 触发移动
    const interaction = chart._interactions.pan;
    interaction._doMove(-80, 50);

    const shapes = point.get('container').get('children');
    // 移动之后过滤应该依然生效
    shapes.forEach(shape => {
      expect(shape.attr('fill')).to.equal('#FACC14');
    });
  });

  after(() => {
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
