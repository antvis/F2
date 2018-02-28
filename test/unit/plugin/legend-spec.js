const expect = require('chai').expect;
const F2 = require('../../../src/core');
require('../../../src/geom/interval');
const Legend = require('../../../src/plugin/legend');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'chart-legend';
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
    expect(legendRange).to.eql({ top: 0, right: 72.10792541503906, bottom: 0, left: 0 });
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
    expect(chart.get('backPlot').get('children').length).to.equal(1);
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
  });

  it('legend with custom marker', function() {
    chart.clear();
    chart.source(data);
    // 使用已提供的 shape
    chart.legend({
      marker: 'square',
      position: 'bottom'
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    legendController = chart.get('legendController');
    let legend = legendController.legends.bottom[0];
    expect(legend.items[0].marker).to.eql({ fill: '#1890FF', radius: 3, symbol: 'square', stroke: '#fff' });

    chart.clear();
    chart.source(data);
    // marker 是对象
    chart.legend({
      marker: {
        symbol: 'circle', // marker 的形状
        radius: 10// 半径大小
      },
      position: 'left'
    });
    chart.interval().position('genre*sold').color('genre');
    chart.render();
    legendController = chart.get('legendController');
    legend = legendController.legends.left[0];
    expect(legend.items[0].marker).to.eql({ fill: '#1890FF', radius: 10, symbol: 'circle', stroke: '#fff' });

    // 自定义 marker
    chart.clear();
    chart.source(data);
    // marker 是对象
    chart.legend({
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
    legend = legendController.legends.top[0];
    expect(legend.items[0].marker.symbol).to.be.an.instanceOf(Function);
  });
});
