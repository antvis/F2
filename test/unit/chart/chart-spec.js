const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');
const Tooltip = require('../../../src/plugin/tooltip');
require('../../../src/geom/index');
require('../../../src/geom/shape/index');
require('../../../src/geom/adjust/index');
require('../../../src/component/axis/line');
require('../../../src/component/axis/circle');
require('../../../src/coord/polar');

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
      const isAutoPadding = chart._isAutoPadding();
      expect(isAutoPadding).to.be.false;
      expect(chart.get('scaleController')).not.equal(undefined);
      // expect(chart.get('guideController')).not.equal(undefined);
      expect(chart.get('axisController')).not.equal(undefined);
    });

    it('test plugin', function() {
      Chart.plugins.register(Tooltip); // 注册 guide 插件
      expect(Chart.plugins.count()).to.equal(1);
      // 重复注册 guide 插件
      Chart.plugins.register(Tooltip);
      expect(Chart.plugins.count()).to.equal(1);
      expect(Chart.plugins.getAll()).to.eql([ Tooltip ]);

      Chart.plugins.unregister(Tooltip);
      expect(Chart.plugins.count()).to.equal(0);

      Chart.plugins.clear();
      expect(Chart.plugins.count()).to.equal(0);
    });

    it('test plot', function() {
      const plot = chart.get('plot');
      expect(plot.bl).eqls({ x: 50, y: 550 });
    });

    it('test methods', function() {
      chart.axis('field', { test: true });
      expect(chart.get('axisController').axisCfg.field).eqls({ test: true });

      chart.axis(false);
      expect(chart.get('axisController').axisCfg).to.be.null;
    });
  });

  describe('render', function() {
    let chart;

    const data = [
     { a: '1', b: 2, c: '1' },
     { a: '1', b: 3, c: '2' },
     { a: '2', b: 1, c: '1' },
     { a: '2', b: 4, c: '2' },
     { a: '3', b: 5, c: '1' },
     { a: '3', b: 1, c: '2' }
    ];

    it('init', function() {
      chart = new Chart({
        el: canvas,
        width: 500,
        height: 500
      });
      chart.axis(false);

      expect(chart.get('canvas')).to.not.be.empty;
      expect(chart.get('canvas').get('children').length).to.equal(3);
      expect(chart.interval).not.to.be.undefined;
      expect(chart.point).not.to.be.undefined;
    });

    it('auto padding', function() {
      const isAutoPadding = chart._isAutoPadding();
      expect(isAutoPadding).to.be.true;
    });

    it('source with colDefs', function() {
      chart.source(data, {
        a: {
          min: 0,
          max: 4
        }
      });
      expect(chart.get('data')).equal(data);
      expect(chart.get('colDefs').a.min).equal(0);
    });

    it('scale', function() {
      chart.scale('a', {
        max: 10
      });
      chart.scale({
        b: {
          nice: false
        }
      });
      expect(chart.get('colDefs').a).eql({ max: 10 });
      expect(chart.get('colDefs').b).eql({ nice: false });
      expect(chart.get('scaleController').defs).eql({ a: { max: 10 }, b: { nice: false } });

      chart.scale({
        a: {
          min: 0,
          max: 4
        }
      });
      expect(chart.get('colDefs').a).eql({ min: 0, max: 4 });
      expect(chart.get('scaleController').defs).eql({ a: { min: 0, max: 4 }, b: { nice: false } });
    });

    it('coord', function() {
      chart.coord(); // 默认使用笛卡尔坐标系
      expect(chart.get('coordCfg')).to.eql({ type: 'cartesian' });

      chart.coord({
        transposed: true
      });
      expect(chart.get('coordCfg')).to.eql({ transposed: true });

      chart.coord('rect');
      expect(chart.get('coordCfg')).to.eql({
        type: 'rect'
      });
    });

    it('filter', function() {
      let filters = chart.get('filters');
      expect(filters).to.be.null;
      chart.filter('b', val => {
        return val !== 1;
      });
      filters = chart.get('filters');
      expect(filters.b).to.be.an.instanceof(Function);
    });

    it('geom methods', function() {
      expect(chart.point).not.equal(undefined);
      const geom = chart.point().position('a*b').color('c');
      expect(chart.get('geoms').length).equal(1);
      expect(geom.get('type')).equal('point');
      expect(geom.get('container')).not.to.be.empty;
      expect(chart.get('middlePlot').get('children').length).to.equal(1);
    });

    it('render', function() {
      chart.render();
      // 自动计算 padding
      // const padding = chart.get('padding');
      // expect(padding).to.eql([ 30, 15, 15, 15 ]); // TODO
      // filter data
      const filterData = chart.get('filteredData');
      expect(filterData.length).to.equal(4);

      const frontPlot = chart.get('frontPlot');
      const backPlot = chart.get('backPlot');
      expect(frontPlot.get('children').length).to.equal(1);
      expect(backPlot.get('children').length).to.equal(1);
    });

    it('getPosition', function() {
      const record = { a: '2', b: 4 };
      const position = chart.getPosition(record);
      expect(position).to.eql({
        x: 250,
        y: 181.66666666666669
      });
    });

    it('getRecord', function() {
      const point = { x: 250, y: 181.66666666666669 };
      const record = chart.getRecord(point);
      expect(record).to.eql({
        a: '2',
        b: 4
      });
    });

    it('getSnapRecords', function() {
      const point = { x: 250, y: 150 };
      const data = chart.getSnapRecords(point);
      expect(data.length).to.equal(1);
      expect(data[0]._origin).to.eql({ a: '2', b: 4, c: '2' });
    });

    it('clear', function() {
      chart.clear();
      const geoms = chart.get('geoms');
      expect(geoms).to.be.empty;
      const filters = chart.get('filters');
      expect(filters).to.be.null;
      expect(chart.get('scales')).to.eql({});
      const frontPlot = chart.get('frontPlot');
      const backPlot = chart.get('backPlot');
      expect(frontPlot.get('children').length).to.equal(1);
      expect(backPlot.get('children').length).to.equal(1);
    });

    it('change coord', function() {
      chart.coord('polar', {
        startAngle: -Math.PI,
        endAngle: 0,
        transposed: true
      });
      chart.interval().position('a*b')
        .color('c')
        .adjust('stack');
      chart.render();

      const coord = chart.get('coord');
      expect(coord.isPolar).to.be.true;
      expect(coord.transposed).to.be.true;

      const scales = chart.get('scales');
      expect(scales.a.range).to.eql([ 0.16666666666666666, 0.8333333333333334 ]);
    });

    it('repaint', function() {
      chart.repaint();
      expect(chart.get('isUpdate')).to.be.true;
    });

    it('changeSize', function(done) {
      const width = 399;
      chart.changeSize(width);

      setTimeout(function() {
        expect(chart.get('width')).to.eql(399);
        expect(chart.get('canvas').get('width')).to.eql(399);
        done();
      }, 200);
    });

    it('change data', function() {
      chart.coord('polar', {
        transposed: true
      });
      chart.axis(true);
      chart.axis('a', {
        label: {
          fontFamily: 'Arial'
        }
      });
      chart.changeData([
        { a: '1', b: 5 },
        { a: '1', b: 2 }
      ]);
      expect(chart.get('isUpdate')).to.be.true;
      expect(chart.get('filters')).to.be.null;
      expect(chart.get('scales').a.range).to.eql([ 0.5, 1 ]);
    });

    it('axis label fontFamily', function() {
      const backPlot = chart.get('backPlot');
      const axisGroup = backPlot.get('children')[0];
      expect(axisGroup.get('className')).to.equal('axisContainer');

      const children = axisGroup.get('children');
      let xAxisLabel;
      let yAxisLabel;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child._id === 'axis-x-1') {
          xAxisLabel = child;
        }

        if (child._id === 'axis-y0-0') {
          yAxisLabel = child;
        }
      }
      const xAxisfont = xAxisLabel.attr('font');
      const yAxisfont = yAxisLabel.attr('font');
      expect(xAxisfont).to.equal('normal normal normal 10px Arial'); // a 轴文本
      expect(yAxisfont).to.equal('normal normal normal 10px "Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif'); // b 轴文本
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
