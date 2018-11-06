const expect = require('chai').expect;
const { gestureSimulator } = require('../test-util');

const F2 = require('../../../src/core');
require('../../../src/geom/interval');
require('../../../src/geom/line');
require('../../../src/geom/adjust');

const Tooltip = require('../../../src/plugin/tooltip');
const Legend = require('../../../src/plugin/legend');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'chart-tooltip';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.01;
}

describe('Tooltip Plugin', function() {
  let chart;
  let tooltipController;
  let tooltip;
  let data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
  ];

  it('Register Tooltip plugin', function() {
    chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 400,
      height: 300,
      plugins: Tooltip,
      pixelRatio: 2
    });

    tooltipController = chart.get('tooltipController');
    expect(tooltipController).not.to.be.empty;
  });

  it('chart.tooltip() config', function() {
    chart.tooltip(false);
    tooltipController = chart.get('tooltipController');
    expect(tooltipController.enable).to.be.false;
    expect(tooltipController.cfg).to.eql({});

    chart.tooltip(true, {
      triggerOn: 'mousemove',
      triggerOff: 'mouseleave'
    });
    expect(tooltipController.enable).to.be.true;
    expect(tooltipController.cfg).to.eql({
      triggerOn: 'mousemove',
      triggerOff: 'mouseleave'
    });

    chart.tooltip({
      triggerOn: 'mousemove',
      triggerOff: 'mouseleave',
      showTitle: true
    });
    expect(tooltipController.enable).to.be.true;
    expect(tooltipController.cfg).to.eql({
      triggerOn: 'mousemove',
      triggerOff: 'mouseleave',
      showTitle: true
    });
  });

  it('chart.showToolip(point)', function() {
    chart.source(data);
    chart.interval().position('genre*sold').color('genre');
    chart.render();

    tooltipController = chart.get('tooltipController');
    tooltip = tooltipController.tooltip;
    expect(tooltip.items).to.be.undefined;

    const point = {
      x: 163,
      y: 276
    };
    chart.showTooltip(point);

    expect(tooltip.items.length).to.equal(1);
    expect(tooltip.items[0].name).to.equal('Strategy');
    expect(tooltip.items[0].value).to.equal('115');
    expect(tooltip.markerGroup.get('visible')).to.be.true;
    expect(tooltip.container.titleShape.attr('text')).to.equal(tooltip.title);
  });

  it('chart.hideTooltip()', function() {
    chart.hideTooltip();
    expect(tooltip.markerGroup.get('visible')).to.be.false;
  });

  it('clear', function() {
    chart.clear();

    tooltipController = chart.get('tooltipController');
    tooltip = tooltipController.tooltip;
    const { prePoint, _lastActive } = tooltipController;
    expect(tooltip).to.be.null;
    expect(prePoint).to.be.null;
    expect(_lastActive).to.be.null;

    chart.destroy();
  });

  it('custom tooltip', function(done) {
    data = [
      { label: 'Mon.', type: 'series1', value: 2800 },
      { label: 'Mon.', type: 'series2', value: 2260 },
      { label: 'Tue.', type: 'series1', value: 1800 },
      { label: 'Tue.', type: 'series2', value: 1300 },
      { label: 'Wed.', type: 'series1', value: 950 },
      { label: 'Wed.', type: 'series2', value: 900 },
      { label: 'Thu.', type: 'series1', value: 500 },
      { label: 'Thu.', type: 'series2', value: 390 },
      { label: 'Fri.', type: 'series1', value: 170 },
      { label: 'Fri.', type: 'series2', value: 100 }
    ];
    chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 400,
      height: 300,
      plugins: [ Tooltip, Legend ],
      pixelRatio: 2
    });

    chart.source(data.reverse(), {
      value: {
        tickInterval: 750,
        formatter(val) {
          return val + '%';
        }
      }
    });
    chart.coord({
      transposed: true
    });

    let isShowCalled = false;
    let isChangeCalled = false;
    let isHideCalled = false;
    // let isCustomCalled = false;
    const tooltipValue = [];
    // 配置 tooltip
    chart.tooltip({
      triggerOn: 'touchmove',
      showTitle: true,
      onShow() {
        isShowCalled = true;
      },
      custom: true,
      onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = {};
        legendItems.map(item => {
          map[item.name] = F2.Util.mix({}, item);
          return item;
        });
        tooltipItems.map(item => {
          const { name, value } = item;
          if (map[name]) {
            map[name].value = (value);
          }
          tooltipValue.push(value);
          return item;
        });
        legend.setItems(Object.values(map));
        isChangeCalled = true;
      },
      onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
        isHideCalled = true;
      }
    });
    chart.axis('label', {
      line: F2.Global._defaultAxis.line,
      grid: null
    });
    chart.axis('value', {
      line: null,
      grid: F2.Global._defaultAxis.grid,
      label(text, index, total) {
        const textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        }
        if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.interval()
      .position('label*value')
      .color('type')
      .adjust({
        type: 'dodge',
        marginRatio: 1 / 32
      });
    chart.render();
    const legend = chart.get('legendController').legends.top[0];
    expect(legend.itemsGroup.get('children')[0].get('children').length).to.equal(2);

    gestureSimulator(canvas, 'touchmove', {
      clientX: 375,
      clientY: 174
    });
    expect(isShowCalled).to.be.true;
    expect(isChangeCalled).to.be.true;
    // expect(isCustomCalled).to.be.true;
    expect(legend.itemsGroup.get('children')[0].get('children').length).to.equal(3);
    expect(tooltipValue.length).to.equal(2);
    expect(tooltipValue[0]).to.equal('900%');
    expect(tooltipValue[1]).to.equal('950%');


    setTimeout(function() {
      gestureSimulator(canvas, 'touchmove', {
        clientX: 59,
        clientY: 295
      });

      expect(isHideCalled).to.be.true;
      // document.body.removeChild(canvas);
      done();
    }, 500);
  });

  it('get tooltip items when one geom is hide', function() {
    const data = [
      { name: 'Jon Nicoll', score: 282, avgScore: 94 },
      { name: 'Aaron Maxwell', score: 208, avgScore: 41.6 },
      { name: 'Warren Clunes', score: 186, avgScore: 46.5 },
      { name: 'David Bolton', score: 184, avgScore: 30.67 },
      { name: 'Joel Robindon', score: 177, avgScore: 44.25 },
      { name: 'Kyle Buckley', score: 150, avgScore: 50 },
      { name: 'Jordan Lawrence', score: 148, avgScore: 24.67 },
      { name: 'Jack Carey', score: 138, avgScore: 34.5 },
      { name: 'Kuldeep Pegu', score: 130, avgScore: 32.5 },
      { name: 'Max Hillier', score: 128, avgScore: 32 },
      { name: 'Angus Le Lievre', score: 127, avgScore: 62.5 }
    ];
    const chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 400,
      height: 300,
      plugins: Tooltip,
      pixelRatio: 2
    });

    chart.source(data);
    chart.interval().position('name*score');
    const line = chart.line().position('name*avgScore');
    chart.render();

    line.hide();

    const point = chart.getPosition({
      name: 'Jordan Lawrence',
      score: 148
    });

    chart.showTooltip(point);
    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    expect(tooltip.items.length).to.equal(1);
    expect(tooltip.items[0].name).to.equal('score');
    expect(tooltip.items[0].value).to.equal('148');
    chart.destroy();
  });
});

describe('Tooltip crosshairs', function() {
  const data = [
    { date: '2018-04-21', steps: 59 },
    { date: '2018-04-22', steps: 2515 },
    { date: '2018-04-23', steps: 6524 },
    { date: '2018-04-24', steps: 26044 },
    { date: '2018-04-25', steps: 29763 },
    { date: '2018-04-26', steps: 10586 },
    { date: '2018-04-27', steps: 14758 },
    { date: '2018-04-29', steps: 549 },
    { date: '2018-04-30', steps: 21 }
  ];
  const chart = new F2.Chart({
    id: 'chart-tooltip',
    width: 400,
    height: 300,
    plugins: Tooltip,
    pixelRatio: 2
  });
  chart.source(data, {
    date: {
      tickCount: 3
    }
  });
  chart.line().position('date*steps');

  it('chart.tooltip() with xy crosshairs.', () => {
    chart.tooltip({
      crosshairsType: 'xy',
      crosshairsStyle: {
        lineDash: [ 2 ],
        stroke: '#1890ff'
      }
    });

    chart.render();
    const point = chart.getPosition({ date: '2018-04-26', steps: 10586 });
    chart.showTooltip(point);

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const { crosshairsShapeX, crosshairsShapeY } = tooltip;

    expect(crosshairsShapeX).not.to.be.undefined;
    expect(crosshairsShapeY).not.to.be.undefined;
    expect(snapEqual(crosshairsShapeY.get('x'), 254.83888414171008)).to.be.true;
    expect(snapEqual(crosshairsShapeX.get('y'), 183.69416666666666)).to.be.true;
  });

  it('show xTip and yTip', () => {
    chart.tooltip({
      showXTip: true,
      showYTip: true,
      crosshairsType: 'xy',
      yTip(val) {
        return {
          text: Math.round(val)
        };
      }
    });
    chart.repaint();
    const point = chart.getPosition({ date: '2018-04-22', steps: 2515 });
    chart.showTooltip(point);

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const { xTipBox: xTip, yTipBox: yTip } = tooltip;

    expect(xTip).not.to.be.undefined;
    expect(yTip).not.to.be.undefined;
    expect(xTip.content).to.equal('2018-04-22');
    expect(yTip.content).to.equal(2515);
    expect(snapEqual(xTip.x, 106.08332316080728)).to.be.true;
    expect(xTip.y).to.equal(276.5);
    expect(snapEqual(yTip.x, 31.95233154296875)).to.be.true;
    expect(snapEqual(yTip.y, 247.58958333333334)).to.be.true;
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
