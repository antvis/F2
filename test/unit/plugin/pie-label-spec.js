import { expect } from 'chai';
import { gestureSimulator } from '../test-util';
import * as F2 from '../../../src/core';

import '../../../src/geom/interval';
import '../../../src/coord/polar';
import '../../../src/geom/adjust/stack';
import * as PieLabel from '../../../src/plugin/pie-label';
import * as Legend from '../../../src/plugin/legend';

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.01;
}

const canvas = document.createElement('canvas');
canvas.width = 350;
canvas.height = 350;
canvas.id = 'chart-pie-label';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('PieLabel', () => {
  let chart;
  let clickData;

  const data = [
    { amount: 2, ratio: 0.01, memo: '学习', namekey: 'namekey' },
    { amount: 2, ratio: 0.01, memo: '睡觉', namekey: 'namekey' },
    { amount: 2, ratio: 0.01, memo: '吃饭', namekey: 'namekey' },
    { amount: 2, ratio: 0.01, memo: '讲礼貌', namekey: 'namekey' },
    { amount: 2, ratio: 0.01, memo: '其他', namekey: 'namekey' },
    { amount: 2, ratio: 0.01, memo: '运动', namekey: 'namekey' },
    { amount: 188, ratio: 0.94, memo: '暂无备注', namekey: 'namekey' }
  ];

  it('Register PieLabel plugin', function() {
    chart = new F2.Chart({
      id: 'chart-pie-label',
      plugins: [ PieLabel, Legend ],
      pixelRatio: 2
    });

    expect(chart._plugins.descriptors.length).to.equal(2);
    expect(chart.pieLabel).to.be.an.instanceof(Function);
  });

  it('pieLabel, skip overlap labels', function() {
    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 0.65
    });
    chart.axis(false);
    chart.legend({
      triggerOn: 'click'
    });
    chart.pieLabel({
      skipOverlapLabels: true,
      label1OffsetY: 0,
      label2OffsetY: 0,
      label1(data, color) {
        return {
          text: data.memo,
          fill: color
        };
      },
      label2(data) {
        return {
          text: data.amount,
          fill: '#808080',
          fontWeight: 'bold'
        };
      }
    });


    chart.interval()
      .position('namekey*ratio')
      .color('memo')
      .adjust('stack');
    chart.render();

    const pieLabelController = chart.get('pieLabelController');
    const { labelGroup, drawnLabels } = pieLabelController;

    expect(labelGroup.get('children').length).to.equal(6); // 包含文本、连接线、锚点
    expect(drawnLabels.length).to.equal(2);
    expect(drawnLabels[0].get('data')).to.eql({ amount: 2, ratio: 0.01, memo: '学习', namekey: 'namekey' });
    expect(drawnLabels[1].get('data')).to.eql({ amount: 188, ratio: 0.94, memo: '暂无备注', namekey: 'namekey' });
  });

  it('pieLabel, adjust overlap labels', function() {
    chart.pieLabel({
      triggerOn: 'click',
      label1OffsetY: 0,
      onClick(ev) {
        clickData = ev.data;
      },
      label1(data, color) {
        return {
          text: data.memo,
          fill: color
        };
      }
    });
    chart.repaint();

    const pieLabelController = chart.get('pieLabelController');
    const { labelGroup, drawnLabels, pieLabelCfg } = pieLabelController;

    expect(pieLabelCfg.skipOverlapLabels).to.be.false;
    expect(labelGroup.get('children').length).to.equal(21);
    expect(drawnLabels.length).to.equal(7);
    const label1 = drawnLabels[1];
    expect(snapEqual(label1.get('children')[0].attr('y'), 114.25)).to.be.true;
    const label6 = drawnLabels[6];
    expect(snapEqual(label6.get('children')[0].attr('y'), 274.25)).to.be.true;
    expect(label6.get('children')[0].attr('text')).to.equal('运动');
  });

  it('event trigger', function() {
    gestureSimulator(canvas, 'click', {
      clientX: 312,
      clientY: 204
    });
    expect(clickData).to.eql({ amount: 2, ratio: 0.01, memo: '讲礼貌', namekey: 'namekey' });
  });

  it('event trigger and active the selected shape', function() {
    chart.pieLabel({
      triggerOn: 'click',
      label1OffsetY: 0,
      label1(data, color) {
        return {
          text: data.memo,
          fill: color
        };
      },
      activeShape: true,
      activeStyle: {
        offset: 3,
        appendRadius: 4,
        fillOpacity: 1
      }
    });
    chart.repaint();
    gestureSimulator(canvas, 'click', {
      clientX: 312,
      clientY: 204
    });

    expect(clickData).to.eql({ amount: 2, ratio: 0.01, memo: '讲礼貌', namekey: 'namekey' });

    const pieLabelController = chart.get('pieLabelController');
    const halo = pieLabelController.halo;
    const selectedShape = pieLabelController._getSelectedShapeByData(clickData);
    expect(halo).not.to.be.empty;
    expect(halo.attr('x')).to.equal(selectedShape.attr('x'));
    expect(halo.attr('y')).to.equal(selectedShape.attr('y'));
    expect(halo.attr('startAngle')).to.equal(selectedShape.attr('startAngle'));
    expect(halo.attr('endAngle')).to.equal(selectedShape.attr('endAngle'));
    expect(halo.attr('r')).to.equal(selectedShape.attr('r') + 7);
    expect(halo.attr('r0')).to.equal(selectedShape.attr('r') + 3);
  });

  it('legend filter', function() {
    gestureSimulator(canvas, 'click', {
      clientX: 38,
      clientY: 66
    });
    const pieLabelController = chart.get('pieLabelController');
    const { labelGroup, drawnLabels } = pieLabelController;

    expect(labelGroup.get('children').length).to.equal(18);
    expect(drawnLabels.length).to.equal(6);
    expect(drawnLabels[0].get('data').memo).to.equal('运动');
    expect(snapEqual(drawnLabels[0].get('children')[0].attr('y'), 142.27423410824753)).to.be.true;
    expect(drawnLabels[1].get('data').memo).to.equal('其他');
    expect(snapEqual(drawnLabels[1].get('children')[0].attr('y'), 220.00000000000006)).to.be.true;
    expect(drawnLabels[2].get('data').memo).to.equal('讲礼貌');
    expect(snapEqual(drawnLabels[2].get('children')[0].attr('y'), 297.72577998965335)).to.be.true;
    expect(drawnLabels[3].get('data').memo).to.equal('学习');
    expect(snapEqual(drawnLabels[3].get('children')[0].attr('y'), 142.27422001034665)).to.be.true;
    expect(drawnLabels[4].get('data').memo).to.equal('睡觉');
    expect(snapEqual(drawnLabels[4].get('children')[0].attr('y'), 220.00000000000003)).to.be.true;
    expect(drawnLabels[5].get('data').memo).to.equal('吃饭');
    expect(snapEqual(drawnLabels[5].get('children')[0].attr('y'), 297.72577998965335)).to.be.true;
  });

  it('clear', () => {
    chart.clear();
    const pieLabelController = chart.get('pieLabelController');
    expect(pieLabelController.labelGroup.get('children')).to.be.empty;
    expect(pieLabelController.drawnLabels).to.be.empty;

    chart.destroy();
    document.body.removeChild(canvas);
  });
});

