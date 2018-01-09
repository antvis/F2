const expect = require('chai').expect;
require('../../../src/geom/index');

const Chart = require('../../../src/chart/chart');
const { Guide } = require('../../../src/plugin/index');
require('../../../src/geom/shape/index');
require('../../../src/geom/adjust/index');

Chart.plugins.register(Guide);

describe('chart test', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 500;
  document.body.appendChild(canvas);

  describe('init', function() {
    let chart;
    it('init without width, height', function() {
      chart = new Chart({
        el: canvas
      });
      expect(chart.get('width')).equal(500);
      expect(chart.get('height')).equal(500);
      expect(canvas.width).equal(500);
      expect(canvas.style.width).equal('500px');
      expect(canvas.style.height).equal('500px');
    });

    it('destroy', function() {
      chart.destroy();
      expect(chart.destroyed).equal(true);
      expect(chart._attrs).eqls({});
      expect(chart.get('width')).equal(undefined);
    });

    it('init without width, height, but pixelRatio > 1', function() {
      chart = new Chart({
        el: canvas,
        pixelRatio: 3
      });
      expect(chart.get('width')).equal(500);
      expect(chart.get('height')).equal(500);
      expect(canvas.width).equal(1500);
      expect(canvas.height).equal(1500);
      expect(canvas.style.width).equal('500px');
      expect(canvas.style.height).equal('500px');
      chart.destroy();
    });

    it('init width width and height', function() {
      chart = new Chart({
        el: canvas,
        width: 400,
        pixelRatio: 2,
        height: 600
      });

      expect(chart.get('width')).equal(400);
      expect(chart.get('height')).equal(600);
      expect(canvas.width).equal(800);
      expect(canvas.style.width).equal('400px');
      chart.destroy();
    });

    it('init with context', function() {
      // canvas width 400, canvas height 600
      chart = new Chart({
        context: canvas.getContext('2d')
      });

      expect(chart.get('width')).equal(400);
      expect(chart.get('height')).equal(600);
      expect(canvas.width).equal(400);
      expect(canvas.style.width).equal('400px');
      chart.destroy();
    });

    it('init with context, and with pixelRatio > 1', function() {
      // canvas width 400, canvas height 600
      chart = new Chart({
        context: canvas.getContext('2d'),
        pixelRatio: 4
      });

      expect(chart.get('width')).equal(400);
      expect(chart.get('height')).equal(600);
      expect(canvas.width).equal(1600);
      expect(canvas.height).equal(2400);
      expect(canvas.style.width).equal('400px');
      chart.destroy();
    });


    it('test controller', function() {
      chart = new Chart({
        el: canvas,
        width: 400,
        height: 600,
        padding: 50
      });
      expect(chart.get('scaleController')).not.equal(undefined);
      expect(chart.get('guideController')).not.equal(undefined);
      expect(chart.get('axisController')).not.equal(undefined);
      // expect(chart.get('animateController')).not.equal(undefined);
    });

    it('test coord', function() {
      const plot = chart.get('plot');
      expect(plot.bl).eqls({ x: 50, y: 550 });
    });

    it('test methods', function() {
      chart.axis('field', { test: true });
      expect(chart.get('axisController').axisCfg.field).eqls({ test: true });
    });
  });

  describe('render', function() {
    let chart;

    const data = [{
      a: 1,
      b: 2,
      c: '1'
    }, {
      a: 1,
      b: 3,
      c: '2'
    },
    {
      a: 2,
      b: 1,
      c: '1'
    }, {
      a: 2,
      b: 4,
      c: '2'
    },
    {
      a: 3,
      b: 5,
      c: '1'
    }, {
      a: 3,
      b: 1,
      c: '2'
    }];

    it('init', function() {
      chart = new Chart({
        el: canvas,
        width: 500,
        height: 500
      });
    });


    it('source', function() {
      chart.source(data, {
        a: {
          min: 0,
          max: 4
        }
      });
      expect(chart.get('data')).equal(data);
      expect(chart.get('colDefs').a.min).equal(0);
    });

    it('guide', function() {
      expect(chart.guide().text).not.equal(undefined);
      chart.guide().text({
        position: [ 2.5, 3 ],
        content: 'test'
      });
      expect(chart.get('guideController').guides.length).equal(1);
    });

    it('geom methods', function() {
      expect(chart.point).not.equal(undefined);
      const geom = chart.point().position('a*b').color('c');
      expect(chart.get('geoms').length).equal(1);
      expect(geom.get('type')).equal('point');

    });

    it('render', function() {
      chart.render();
    });

    it('clear', function() {
      chart.clear();
    });

    it('change coord', function() {
      chart.coord('polar');
      chart.interval().position('a*b')
        .color('c')
        .adjust('stack');
      chart.render();
    });

    xit('animate', function() {
      chart.clear();
      const data = [
        { a: '1', b: 2 },
        { a: '2', b: 5 }
      ];
      chart.coord('rect');
      chart.source(data);
      chart.animate({
        type: 'scaley'
      });

      chart.interval().position('a*b');
        // .color('c');
      chart.render();

      const xScale = chart.get('scales').a;
      expect(xScale.range).eqls([ 0.25, 0.75 ]);
    });

    it('repaint', function() {
      chart.guide().text({
        position: [ '1', 3 ],
        content: '这是测试文本'
      });
      chart.repaint();
    });

    it('change data', function() {
      chart.changeData([
        { a: '1', b: 5 },
        { a: '2', b: 2 }
      ]);
    });

    it('destroy', function(done) {
      setTimeout(function() {
        chart.destroy();
        expect(chart.destroyed).equal(true);
        done();
      }, 1500);
    });
  });

});
