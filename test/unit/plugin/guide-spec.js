const expect = require('chai').expect;

const F2 = require('../../../src/core');
require('../../../src/geom/');
require('../../../src/geom/adjust/');
require('../../../src/coord/polar'); // 极坐标系
require('../../../src/component/axis/circle'); // 极坐标系下的弧长坐标轴
require('../../../src/scale/time-cat'); // timeCat 类型的度量
require('../../../src/component/guide'); // 加载 guide 组件

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
    expect(F2.Global.guide).to.have.all.keys('line', 'text', 'rect', 'arc', 'html', 'tag');
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
    expect(guideController.guides.length).to.equal(6);
    expect(frontPlot.get('children').length).to.equal(5);
    expect(backPlot.get('children').length).to.equal(2);
  });

  it('chart.guide().reset()', function() {
    chart.repaint();
    const guideController = chart.get('guideController');
    expect(guideController.guides.length).to.equal(6);
    const frontPlot = chart.get('frontPlot');
    const backPlot = chart.get('backPlot');
    expect(frontPlot.get('children').length).to.equal(5);
    expect(backPlot.get('children').length).to.equal(2);
    const guideWrapper = document.getElementsByClassName('guideWapper');
    expect(guideWrapper.length).to.equal(1);
  });

  it('chart.guide().clear()', function() {
    chart.clear();
    const guideController = chart.get('guideController');
    expect(guideController.guides.length).to.equal(0);
    const frontPlot = chart.get('frontPlot');
    const backPlot = chart.get('backPlot');
    expect(frontPlot.get('children').length).to.equal(1);
    expect(backPlot.get('children').length).to.equal(1);
    const guideWrapper = document.getElementsByClassName('guideWapper');
    expect(guideWrapper.length).to.equal(0);
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
