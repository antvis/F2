import { expect } from 'chai';
import { gestureSimulator, delay } from '../test-util';
import * as F2 from '../../../src/core';
import '../../../src/geom/interval';
import '../../../src/geom/line';
import '../../../src/geom/adjust';
import * as Tooltip from '../../../src/plugin/tooltip';
import * as Legend from '../../../src/plugin/legend';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'chart-tooltip';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 10;
document.body.appendChild(canvas);

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.01;
}

describe('Tooltip Plugin', function() {
  let chart;
  let tooltipController;
  let tooltip;
  let data = [
    { day: '周一', value: 300 },
    { day: '周二', value: 400 },
    { day: '周三', value: 350 },
    { day: '周四', value: 500 },
    { day: '周五', value: 490 },
    { day: '周六', value: 600 },
    { day: '周日', value: 900 }
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
    chart.source(data, {
      day: {
        range: [ 0, 1 ]
      }
    });
    chart.line().position('day*value');
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
    expect(tooltip.items[0].name).to.equal('value');
    expect(tooltip.items[0].value).to.equal('350');
    expect(tooltip.items[0].title).to.equal('周三');
    expect(tooltip.markerGroup.get('visible')).to.be.true;
    expect(tooltip.container.titleShape.attr('text')).to.equal(tooltip.title);

    const firstPoint = chart.getPosition({ day: '周一', value: 300 });
    chart.showTooltip(firstPoint);
    expect(tooltip.items[0].name).to.equal('value');
    expect(tooltip.items[0].value).to.equal('300');
    expect(tooltip.items[0].title).to.equal('周一');
    expect(snapEqual(tooltip.container.x, 44.17999267578125)).to.be.true;
    expect(snapEqual(tooltip.container.y, 3)).to.be.true;

    const lastPoint = chart.getPosition({ day: '周日', value: 300 });
    chart.showTooltip(lastPoint);
    expect(tooltip.items[0].name).to.equal('value');
    expect(tooltip.items[0].value).to.equal('900');
    expect(tooltip.items[0].title).to.equal('周日');
    // expect(snapEqual(tooltip.container.x, 313.0880584716797)).to.be.true;
    expect(snapEqual(tooltip.container.y, 3)).to.be.true;
  });

  it('chart.hideTooltip()', function() {
    chart.hideTooltip();
    expect(tooltip.markerGroup.get('visible')).to.be.false;
  });

  it('clear', function() {
    chart.clear();

    tooltipController = chart.get('tooltipController');
    tooltip = tooltipController.tooltip;
    const { _lastActive } = tooltipController;
    expect(tooltip).to.be.null;
    expect(_lastActive).to.be.null;

    chart.destroy();
  });

  it('dodge column chart', function() {
    data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 }
    ];
    chart = new F2.Chart({
      id: 'chart-tooltip',
      plugins: Tooltip,
      pixelRatio: 2
    });
    chart.source(data);
    chart.interval().position('月份*月均降雨量')
      .color('name')
      .adjust({
        type: 'dodge',
        marginRatio: 0.05 // 设置分组间柱子的间距
      });
    chart.render();
    tooltipController = chart.get('tooltipController');
    tooltip = tooltipController.tooltip;

    chart.showTooltip({
      x: 163,
      y: 276
    });
    expect(tooltip.items.length).to.equal(2);
    expect(tooltip.items[0].name).to.equal('London');
    expect(tooltip.items[1].name).to.equal('Berlin');
    expect(tooltip.items[0].value).to.equal('28.8');
    expect(tooltip.items[1].value).to.equal('23.2');
    expect(tooltip.items[0].title).to.equal('Feb.');
    expect(tooltip.items[1].title).to.equal('Feb.');
    expect(tooltip.markerGroup.get('visible')).to.be.true;
    // expect(snapEqual(tooltip.container.x, 126.502067565918)).to.be.true;
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
  let chart = new F2.Chart({
    id: 'chart-tooltip',
    width: 400,
    height: 300,
    plugins: Tooltip,
    padding: [ 'auto', 'auto', 0, 0 ],
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
      showYTip: true,
      showXTip: true,
      yTipTextStyle: {
        fontFamily: 'Arial'
      },
      yTip(val) {
        return parseInt(val);
      },
      xTip(val) {
        return 'date:' + val;
      },
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
    expect(snapEqual(crosshairsShapeY.get('x'), 235.2777777777778)).to.be.true;

    expect(snapEqual(crosshairsShapeX.get('y'), 204.726)).to.be.true;

    expect(tooltip.xTipBox.y).to.equal(291);
    expect(tooltip.xTipBox.content).to.equal('date:2018-04-26');
    expect(snapEqual(tooltip.yTipBox.x, 21.6845703125)).to.be.true;
    expect(tooltip.yTipBox.content).to.equal(10586);

    chart.showTooltip({
      x: point.x,
      y: point.y + 20
    });

    expect(snapEqual(tooltipController.tooltip.crosshairsShapeX.get('y'), 224.726)).to.be.true;
    expect(snapEqual(tooltip.yTipBox.x, 18.34765625)).to.be.true;
    expect(tooltip.yTipBox.content).to.equal(8363);
  });

  it('show xTip and yTip, snap = false', () => {
    chart.destroy();
    chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 400,
      height: 300,
      plugins: Tooltip,
      pixelRatio: 2
    });
    chart.source(data, {
      date: {
        tickCount: 3,
        range: [ 0, 1 ]
      }
    });
    chart.line().position('date*steps');
    chart.tooltip({
      showXTip: true,
      showYTip: true,
      xTipTextStyle: {
        fontFamily: 'Arial'
      },
      yTipTextStyle: {
        fontFamily: 'Arial'
      },
      showTooltipMarker: false,
      crosshairsType: 'xy',
      yTip(val) {
        return {
          text: Math.round(val)
        };
      }
    });
    chart.render();
    const point = chart.getPosition({ date: '2018-04-21', steps: 59 });
    chart.showTooltip({
      x: point.x,
      y: point.y - 230
    });

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const { xTipBox: xTip, yTipBox: yTip } = tooltip;

    expect(xTip).not.to.be.undefined;
    expect(yTip).not.to.be.undefined;
    expect(xTip.content).to.equal('2018-04-21');
    expect(yTip.content).to.equal(29112);
    expect(snapEqual(xTip.x, 85.99139404296875)).to.be.true;
    expect(xTip.y).to.equal(276.5);
    // expect(snapEqual(yTip.x, 29.06072998046875)).to.be.true;
    expect(yTip.y).to.equal(39);
    chart.showTooltip(chart.getPosition({ date: '2018-04-30', steps: 21 }));
    expect(tooltip.xTipBox.content).to.equal('2018-04-30');
    expect(tooltip.yTipBox.content).to.equal(21);
    expect(snapEqual(tooltip.xTipBox.x, 349.30859375)).to.be.true;
    expect(tooltip.xTipBox.y).to.equal(276.5);
    expect(snapEqual(tooltip.yTipBox.x, 38.62615966796875)).to.be.true;
    expect(tooltip.yTipBox.y).to.equal(258.5);

    chart.hideTooltip();
    expect(tooltip.xTipBox.container.get('visible')).to.be.false;
    expect(tooltip.yTipBox.container.get('visible')).to.be.false;
  });

  it('show xTip and yTip, snap = true', () => {
    chart.destroy();
    chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 400,
      height: 300,
      plugins: Tooltip,
      pixelRatio: 2
    });
    chart.source(data, {
      date: {
        tickCount: 3,
        range: [ 0, 1 ]
      }
    });
    chart.line().position('date*steps');
    chart.tooltip({
      showXTip: true,
      showYTip: true,
      showTooltipMarker: false,
      snap: true,
      crosshairsType: 'xy',
      yTip(val) {
        return {
          text: Math.round(val)
        };
      }
    });
    chart.render();
    const point = chart.getPosition({ date: '2018-04-21', steps: 59 });
    chart.showTooltip({
      x: point.x,
      y: point.y - 230
    });

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const { xTipBox: xTip, yTipBox: yTip, crosshairsShapeX } = tooltip;

    expect(xTip).not.to.be.undefined;
    expect(yTip).not.to.be.undefined;
    expect(xTip.content).to.equal('2018-04-21');
    expect(yTip.content).to.equal(59);
    expect(crosshairsShapeX.get('y')).to.equal(point.y);
  });

  it('show yTip in transposed coordinate', () => {
    chart.destroy();
    chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 400,
      height: 300,
      plugins: Tooltip,
      pixelRatio: 2
    });
    chart.source(data);
    chart.coord({
      transposed: true
    });
    chart.interval().position('date*steps');
    chart.tooltip({
      showYTip: true
    });
    chart.render();
    const point = chart.getPosition({ date: '2018-04-22', steps: 2515 });
    chart.showTooltip(point);

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const { xTipBox: xTip, yTipBox: yTip } = tooltip;

    expect(xTip).be.undefined;
    expect(yTip).not.to.be.undefined;
    expect(yTip.content).to.equal('2018-04-22');
    // expect(snapEqual(yTip.x, 39.068572998046875)).to.be.true;
    expect(snapEqual(yTip.y, 227.91666666666669)).to.be.true;
  });

  it('show xTip, yTip in transposed coordinate, snap = false', () => {
    chart.destroy();
    chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 400,
      height: 300,
      plugins: Tooltip,
      pixelRatio: 2
    });
    chart.source(data);
    chart.coord({
      transposed: true
    });
    chart.interval().position('date*steps');
    chart.tooltip({
      showYTip: true,
      showXTip: true,
      xTip(val) {
        return parseInt(val);
      }
    });
    chart.render();
    const point = chart.getPosition({ date: '2018-04-22', steps: 2515 });
    chart.showTooltip(point);

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const { xTipBox: xTip, yTipBox: yTip } = tooltip;

    expect(yTip).not.to.be.undefined;
    expect(yTip.content).to.equal('2018-04-22');
    expect(snapEqual(yTip.y, 227.91666666666669)).to.be.true;
    expect(xTip.content).to.equal(4999);
  });

  it('alwaysshow true', async () => {
    chart.destroy();
    const data = [
      { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
      { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
      { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
      { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
      { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
      { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 }
    ];
    chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 300,
      height: 300,
      plugins: [ Tooltip, Legend ],
      pixelRatio: 2
    });
    chart.source(data);
    chart.line().position('月份*月均降雨量').color('name');
    chart.tooltip({
      alwaysShow: true
    });
    chart.render();
    const point = chart.getPosition({ name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 });
    chart.showTooltip(point);

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    expect(tooltip.items.length).to.equal(2);
    expect(tooltip.container.container.get('visible')).to.equal(true);

    await delay(100);
    chart.showTooltip({ x: 0, y: 0 });
    expect(tooltip.container.container.get('visible')).to.equal(true);

    await delay(100);
    await gestureSimulator(canvas, 'touchstart', { clientX: 170, clientY: 21 });
    expect(tooltipController.tooltip.container.container.get('visible')).to.equal(true);
    expect(tooltipController.tooltip.items.length).to.equal(1);

    await delay(100);
    await gestureSimulator(canvas, 'touchstart', { clientX: 38, clientY: 20 });
    expect(tooltipController.tooltip.items).to.equal(undefined);

    await delay(100);
    await gestureSimulator(canvas, 'touchstart', { clientX: 38, clientY: 20 });
    expect(tooltipController.tooltip.container.container.get('visible')).to.equal(true);
    expect(tooltipController.tooltip.items.length).to.equal(1);
  });

  it('show xTip in transposed coordinate, snap = true', () => {
    chart.destroy();
    chart = new F2.Chart({
      id: 'chart-tooltip',
      width: 400,
      height: 300,
      plugins: Tooltip,
      pixelRatio: 2
    });
    chart.source(data);
    chart.coord({
      transposed: true
    });
    chart.interval().position('date*steps');
    chart.tooltip({
      showXTip: true,
      snap: true
    });
    chart.render();
    const point = chart.getPosition({ date: '2018-04-22', steps: 2515 });
    chart.showTooltip(point);

    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    const { xTipBox: xTip } = tooltip;

    expect(xTip.content).to.equal('2515');

    chart.destroy();
    document.body.removeChild(canvas);
  });
});

describe('vertical', function() {
  const data = [
    { value: 63.4, city: 'New York', date: '2011-10-01' },
    { value: 62.7, city: 'Alaska', date: '2011-10-01' },
    { value: 72.2, city: 'Austin', date: '2011-10-01' },
    { value: 58, city: 'New York', date: '2011-10-02' },
    { value: 59.9, city: 'Alaska', date: '2011-10-02' },
    { value: 67.7, city: 'Austin', date: '2011-10-02' },
    { value: 53.3, city: 'New York', date: '2011-10-03' },
    { value: 59.1, city: 'Alaska', date: '2011-10-03' },
    { value: 69.4, city: 'Austin', date: '2011-10-03' }
  ];
  const chart = new F2.Chart({
    id: 'chart-tooltip',
    width: 300,
    height: 300,
    plugins: Tooltip,
    padding: [ 'auto', 'auto', 0, 0 ],
    pixelRatio: 2,
    animate: false
  });
  chart.source(data, {
    date: {
      range: [ 0, 1 ]
    }
  });
  chart.tooltip({
    snap: true,
    layout: 'vertical'
  });
  chart.line().position('date*value').color('city');
  chart.render();

  it('posY < 0', () => {
    const point = chart.getPosition({ value: 63.4, city: 'New York', date: '2011-10-01' });
    chart.showTooltip(point);
    const tooltipController = chart.get('tooltipController');
    const tooltip = tooltipController.tooltip;
    expect(tooltip.container.x).to.equal(5);
    expect(tooltip.container.y).to.equal(9);
  });
});
