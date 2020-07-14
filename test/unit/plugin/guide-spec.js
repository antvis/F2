import { expect } from 'chai';
import * as F2 from '../../../src/core';
import '../../../src/geom/';
import '../../../src/geom/adjust/';
import '../../../src/coord/polar'; // 极坐标系
import '../../../src/component/axis/circle'; // 极坐标系下的弧长坐标轴
import '../../../src/component/guide'; // 加载 guide 组件

F2.Global.guide = {
  line: {
    style: {
      lineDash: [ 2, 2 ]
    }
  }
};

const Guide = require('../../../src/plugin/guide');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'chart-guide';
document.body.appendChild(canvas);

describe('Guide Plugin', function() {
  let chart;
  let guideController;

  it('Register Guide on chart instance', function() {
    chart = new F2.Chart({
      id: 'chart-guide',
      pixelRatio: 2,
      plugins: Guide
    });

    guideController = chart.get('guideController');
    expect(guideController).not.to.be.empty;
    expect(F2.Global.guide).to.have.all.keys('line', 'text', 'rect', 'arc', 'html', 'tag', 'point');
    expect(F2.Global.guide.line).to.eql({
      style: {
        stroke: '#a3a3a3',
        lineWidth: 1,
        lineDash: [ 2, 2 ]
      },
      top: true
    });
  });

  it('draw guide', function() {
    const data = [
      { x: 'a', y: 10 },
      { x: 'b', y: 20 },
      { x: 'c', y: 34 },
      { x: 'd', y: 5 }
    ];
    chart.source(data);
    chart.coord('polar');
    chart.interval().position('x*y').style({
      fillOpacity: 0.5
    });
    chart.guide().line({
      start: [ 'a', 10 ],
      end: [ 'c', 34 ],
      style: {
        lineWidth: 4,
        stroke: 'red'
      }
    });
    chart.guide().text({
      position: [ 'median', 'median' ],
      content: '中心点'
    });
    chart.guide().arc({
      start: [ 'a', 10 ],
      end: [ '10%', '60%' ],
      style: {
        lineWidth: 4,
        stroke: 'pink'
      }
    });
    chart.guide().rect({
      start: [ 'b', 20 ],
      end: [ 'c', 0 ],
      style: {
        stroke: '#000',
        lineWidth: 1
      }
    });
    chart.guide().html({
      position(xScale, yScales) {
        const yScale = yScales[0];
        return [ xScale.values[xScale.values.length - 1], yScale.values[1] ]; // 位置信息
      },
      html: '<div style="width: 50px; height: 50px;text-align: center">你好</div>'
    });

    chart.guide().tag({
      position: [ 'c', 30 ],
      content: '换行\n啊换行\n阿哈哈哈',
      side: 10,
      background: {
        padding: 10,
        radius: 4
      },
      textStyle: {
        fontSize: 16
      }
    });
    chart.render();

    const guideController = chart.get('guideController');
    const frontPlot = chart.get('frontPlot');
    const backPlot = chart.get('backPlot');

    expect(frontPlot.get('children').length).to.equal(2);
    expect(backPlot.get('children').length).to.equal(2);

    const frontGuideContainer = guideController.frontPlot;
    const backGuideContainer = guideController.backPlot;

    expect(guideController.guides.length).to.equal(6);
    expect(frontGuideContainer.get('children').length).to.equal(4);
    expect(backGuideContainer.get('children').length).to.equal(1);
  });

  it('chart.guide().reset()', function() {
    chart.repaint();
    const guideController = chart.get('guideController');
    expect(guideController.guides.length).to.equal(6);

    const frontPlot = chart.get('frontPlot');
    const backPlot = chart.get('backPlot');

    expect(frontPlot.get('children').length).to.equal(2);
    expect(backPlot.get('children').length).to.equal(2);

    const frontGuideContainer = guideController.frontPlot;
    const backGuideContainer = guideController.backPlot;

    expect(frontGuideContainer.get('children').length).to.equal(4);
    expect(backGuideContainer.get('children').length).to.equal(1);
    const guideWrapper = document.getElementsByClassName('guideWapper');
    expect(guideWrapper.length).to.equal(1);
  });

  it('chart.guide().clear()', function() {
    chart.clear();
    const guideController = chart.get('guideController');
    expect(guideController.guides.length).to.equal(0);
    const frontPlot = chart.get('frontPlot');
    const backPlot = chart.get('backPlot');

    expect(frontPlot.get('children').length).to.equal(2);
    expect(backPlot.get('children').length).to.equal(2);

    const frontGuideContainer = guideController.frontPlot;
    const backGuideContainer = guideController.backPlot;

    expect(frontGuideContainer.get('children').length).to.equal(0);
    expect(backGuideContainer.get('children').length).to.equal(0);
    const guideWrapper = document.getElementsByClassName('guideWapper');
    expect(guideWrapper.length).to.equal(0);
    chart.destroy();
    // document.body.removeChild(canvas);
  });

  it('chart.guide().regionFilter()', () => {
    const source = [
      { time: '00:00', usage: 300 },
      { time: '01:15', usage: 280 },
      { time: '02:30', usage: 250 },
      { time: '03:45', usage: 260 },
      { time: '05:00', usage: 270 },
      { time: '06:15', usage: 300 },
      { time: '07:30', usage: 550 },
      { time: '08:45', usage: 500 },
      { time: '10:00', usage: 400 },
      { time: '11:15', usage: 390 },
      { time: '13:45', usage: 380 },
      { time: '15:00', usage: 390 },
      { time: '16:15', usage: 400 },
      { time: '17:30', usage: 500 },
      { time: '18:45', usage: 600 },
      { time: '20:00', usage: 750 },
      { time: '21:15', usage: 800 },
      { time: '22:30', usage: 700 },
      { time: '23:45', usage: 600 }
    ];

    chart = new F2.Chart({
      id: 'chart-guide',
      pixelRatio: 2,
      plugins: Guide
    });
    chart.source(source);
    const geom = chart.line().position('time*usage');
    chart.guide().regionFilter({
      end: [ 'max', 400 ],
      start: [ 'min', 550 ],
      color: 'red'
    });

    chart.guide().regionFilter({
      end: [ 'max', 900 ],
      start: [ 'min', 700 ],
      color: 'yellow'
    });
    chart.render();

    const guideController = chart.get('guideController');
    const { frontPlot, backPlot } = guideController;
    // const frontPlot = chart.get('frontPlot');
    // const backPlot = chart.get('backPlot');

    expect(frontPlot.get('children').length).to.equal(0);
    expect(backPlot.get('children').length).to.equal(0);

    const geomContainer = geom.get('container');
    expect(geomContainer.get('children').length).to.equal(3);

    chart.guide().clear(); // 清除 guide
    expect(geomContainer.get('children').length).to.equal(1);
  });

  it('guide.repaint()', done => {
    const data = [
      { month: 'Jan.', value: 20 },
      { month: 'Feb.', value: 5 },
      { month: 'Mar.', value: 10 },
      { month: 'Apr.', value: 15 }
    ];
    chart = new F2.Chart({
      id: 'chart-guide',
      plugins: Guide,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    chart.area().position('month*value');
    const text = chart.guide().text({
      position: [ 'Feb.', 5 ],
      content: '5'
    });

    chart.render();

    const oldShape = text.element;
    expect(oldShape.attr('text')).to.equal('5');
    const lastX = oldShape.attr('x');
    const lastY = oldShape.attr('y');

    setTimeout(() => {
      text.content = 15;
      text.repaint();

      const newShape = text.element;
      expect(newShape.attr('text')).to.equal(15);
      expect(newShape.attr('x')).to.equal(lastX);
      expect(newShape.attr('y')).to.equal(lastY);
      chart.destroy();
      document.body.removeChild(canvas);
      done();
    }, 1000);
  });
});
