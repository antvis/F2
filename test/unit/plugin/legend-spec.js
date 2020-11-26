import { expect } from 'chai';
import { gestureSimulator } from '../test-util';
import * as F2 from '../../../src/core';
import '../../../src/geom/interval';
import '../../../src/geom/line';
import '../../../src/geom/point';
import * as Legend from '../../../src/plugin/legend';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'chart-legend';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('Legend Plugin', function() {
  let chart;
  let legendController;

  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
  ];

  it('Register Legend plugin', function() {
    chart = new F2.Chart({
      id: 'chart-legend',
      width: 400,
      height: 300,
      plugins: Legend,
      pixelRatio: 2
    });
    legendController = chart.get('legendController');
    expect(legendController).not.to.be.empty;
  });

  it('chart.legend() config', function() {
    chart.source(data);
    chart.legend(false);
    chart.interval().position('genre*sold').color('genre');

    legendController = chart.get('legendController');
    expect(legendController.enable).to.be.false;
    expect(legendController.legendCfg).to.eql({});

    chart.legend({
      position: 'right'
    });
    legendController = chart.get('legendController');
    expect(legendController.enable).to.be.true;
    expect(legendController.legendCfg).to.eql({ position: 'right' });

    chart.legend('genre', {
      position: 'right',
      clickable: false
    });
    legendController = chart.get('legendController');
    expect(legendController.enable).to.be.true;
    expect(legendController.legendCfg.genre).to.eql({ position: 'right', clickable: false });

    chart.render();

    const backPlot = chart.get('backPlot');
    expect(backPlot.get('children').length).to.equal(2);

    const legends = legendController.legends;
    expect(legends.right.length).to.equal(1);

    const legendRange = chart.get('legendRange');
    // expect(legendRange.right).to.equal(72.10792541503906);
    expect(legendRange.top).to.equal(0);
    expect(legendRange.bottom).to.equal(0);
    expect(legendRange.left).to.equal(0);
  });

  it('chart.getLegendItems()', function() {
    const legengItems = chart.getLegendItems();
    expect(legengItems.genre.length).to.equal(5);
    chart.clear();
    expect(chart.get('legendRange')).to.be.null;

    legendController = chart.get('legendController');
    expect(chart.get('legendRange')).to.be.null;
  });

  it('close legend', function() {
    chart.source(data);
    chart.legend(false);
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    expect(chart.get('legendRange')).to.be.null;
    expect(chart.get('backPlot').get('children').length).to.equal(2);
  });

  it('legend with title', function() {
    chart.clear();
    chart.source(data);
    chart.legend({
      showTitle: true
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    legendController = chart.get('legendController');
    const legend = legendController.legends.top[0];
    expect(legend.title).to.equal('genre');
    expect(legend.container.get('x')).to.equal(15);
    expect(legend.container.get('y')).to.equal(15);
  });

  it('legend with custom marker', function() {
    chart.clear();
    chart.source(data);
    // 使用已提供的 shape
    chart.legend('genre', {
      marker: 'square',
      position: 'bottom',
      align: 'center'
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    legendController = chart.get('legendController');
    let legend = legendController.legends.bottom[0];
    expect(legend.items[0].marker).to.eql({ fill: '#1890FF', radius: 3, symbol: 'square', stroke: '#fff' });
    expect(parseInt(legend.container.get('x'))).to.equal(50);
    expect(legend.container.get('y')).to.equal(264);

    chart.clear();
    chart.source(data);
    // marker 是对象
    chart.legend({
      marker: {
        symbol: 'circle', // marker 的形状
        radius: 10// 半径大小
      },
      position: 'left',
      verticalAlign: 'top'
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();
    legendController = chart.get('legendController');
    legend = legendController.legends.left[0];
    expect(legend.items[0].marker).to.eql({ fill: '#1890FF', radius: 10, symbol: 'circle', stroke: '#fff' });
    expect(legend.container.get('x')).to.equal(15);
    expect(legend.container.get('y')).to.equal(30);

    // 自定义 marker
    chart.clear();
    chart.source(data);
    // marker 是对象
    chart.legend({
      position: 'right',
      verticalAlign: 'bottom',
      marker(x, y, r, ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.moveTo(x - r - 3, y);
        ctx.lineTo(x + r + 3, y);
        ctx.stroke();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.fill();
      }
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();
    legendController = chart.get('legendController');
    legend = legendController.legends.right[0];
    expect(legend.items[0].marker.symbol).to.be.an.instanceOf(Function);
    // expect(legend.container.get('x')).to.equal(327.89207458496094);
    expect(legend.container.get('y')).to.equal(159.5);

    chart.clear();
  });

  it('chart with filters', function() {
    chart.source(data);
    chart.filter('genre', val => {
      return val !== 'Strategy';
    });
    chart.legend('genre', {
      align: 'right',
      position: 'top'
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    const legendController = chart.get('legendController');
    const legend = legendController.legends.top[0];
    expect(legend.items.length).to.equal(5);
    expect(legend.items[1].checked).to.be.false;
    // expect(legend.container.get('x')).to.equal(85.44272867838538);
    expect(legend.container.get('y')).to.equal(21);
    chart.destroy();
  });

  it('custom legend', function(done) {
    let clickedItem;
    const data = [
      { time: '10:10', call: 4, waiting: 2, people: 2 },
      { time: '10:15', call: 2, waiting: 6, people: 3 },
      { time: '10:20', call: 13, waiting: 2, people: 5 },
      { time: '10:25', call: 9, waiting: 9, people: 1 },
      { time: '10:30', call: 5, waiting: 2, people: 3 },
      { time: '10:35', call: 8, waiting: 2, people: 1 },
      { time: '10:40', call: 13, waiting: 1, people: 2 }
    ];
    let chart = new F2.Chart({
      id: 'chart-legend',
      width: 400,
      height: 300,
      plugins: Legend,
      pixelRatio: 2
    });
    chart.source(data, {
      call: {
        min: 0
      },
      people: {
        min: 0
      },
      waiting: {
        min: 0
      }
    });
    chart.legend({
      custom: true,
      position: 'bottom',
      items: [
        { value: 'waiting', marker: { symbol: 'square', fill: '#3182bd', radius: 5 }, checked: false },
        { value: 'call', marker: 'circle', fill: '#99d8c9' },
        { value: 'people', marker: { symbol: 'circle', stroke: '#fdae6b', radius: 5, lineWidth: 3 } }
      ]
    });
    chart.axis('waiting', false);
    chart.axis('call', false);
    chart.axis('people', false);
    chart.interval().position('time*waiting').color('#3182bd');
    chart.line().position('time*call').color('#99d8c9')
      .size(3)
      .shape('smooth');
    chart.line().position('time*people').color('#fdae6b')
      .size(3)
      .shape('smooth');
    chart.point().position('time*people').color('#fdae6b')
      .size(3);
    chart.render();

    let legendController = chart.get('legendController');
    let legend = legendController.legends.bottom[0];
    expect(legend.items.length).to.equal(3);
    expect(legend.items[0].checked).to.be.false;
    expect(legend.items[1].checked).to.be.true;
    expect(legend.items[1].marker.radius).to.equal(3);

    chart.destroy();
    chart = new F2.Chart({
      id: 'chart-legend',
      width: 400,
      height: 300,
      plugins: Legend,
      pixelRatio: 2
    });
    chart.source([
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 }
    ]);
    chart.legend({
      triggerOn: 'click'
    });
    chart.legend('genre', {
      custom: true,
      itemWidth: 60,
      align: 'center',
      items: [
        { name: 'Sports', marker: 'square', fill: 'red' },
        { name: 'Strategy', marker: 'square', fill: 'yellow' }
      ],
      onClick(ev) {
        clickedItem = ev.clickedItem;
      }
    });
    chart.interval().position('genre*sold').color('genre', [ 'red', 'yellow' ]);
    chart.render();
    legendController = chart.get('legendController');
    legend = legendController.legends.top[0];

    gestureSimulator(canvas, 'click', {
      clientX: 244,
      clientY: 23
    });

    setTimeout(function() {
      expect(legend.items.length).to.equal(2);
      // expect(legend.getWidth()).to.equal(127.10792541503906);
      expect(clickedItem.get('name')).to.equal('Strategy');
      chart.destroy();
      done();
    }, 500);
  });

  it('multiple legend', function() {
    const source = [
      { genre: 'Sports', sold: 275, type: 'a' },
      { genre: 'Strategy', sold: 115, type: 'b' }
    ];
    chart = new F2.Chart({
      id: 'chart-legend',
      width: 400,
      height: 300,
      plugins: Legend,
      pixelRatio: 2
    });
    chart.source(source);
    chart.legend('genre', false);
    chart.interval().position('genre*sold').color('genre');
    chart.point().position('genre*sold').color('type');
    chart.render();

    let legendController = chart.get('legendController');
    expect(legendController.legends.top.length).to.equal(1);

    chart.clear();
    chart.source(source);
    chart.legend('genre', true);
    chart.legend('type', {
      itemWidth: 20
    });
    chart.interval().position('genre*sold').color('genre');
    chart.point().position('genre*sold').color('type');
    chart.render();
    legendController = chart.get('legendController');
    expect(legendController.legends.top.length).to.equal(2);
    chart.destroy();
  });

  it('handle event, selectedMode is multiple', function(done) {
    chart = new F2.Chart({
      id: 'chart-legend',
      width: 400,
      height: 300,
      plugins: Legend,
      pixelRatio: 2
    });
    chart.source(data);
    chart.legend({
      triggerOn: 'click'
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    gestureSimulator(canvas, 'click', {
      clientX: 39,
      clientY: 19
    });

    setTimeout(function() {
      const legendController = chart.get('legendController');
      const legend = legendController.legends.top[0];
      expect(legend.items[0].checked).to.be.false;
      chart.destroy();
      // document.body.removeChild(canvas);
      done();
    }, 1000);
  });

  it('handle event, selectedMode is single', function(done) {
    chart = new F2.Chart({
      id: 'chart-legend',
      width: 400,
      height: 300,
      plugins: Legend,
      pixelRatio: 2
    });
    chart.source(data);
    chart.legend({
      triggerOn: 'click',
      selectedMode: 'single'
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    gestureSimulator(canvas, 'click', {
      clientX: 39,
      clientY: 19
    });

    setTimeout(function() {
      const legendController = chart.get('legendController');
      const legend = legendController.legends.top[0];
      const legendItems = legend.items;
      expect(legendItems[0].checked).to.be.true;
      for (let i = 1; i < legendItems.length; i++) {
        expect(legendItems[1].checked).to.be.false;
      }
      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 1000);
  });
});
