const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/line');
require('../../src/coord/polar');
require('../../src/component/axis/circle');

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 260;
canvas.id = 'issue331';
document.body.appendChild(canvas);

describe('Issue 331', () => {
  it('Issue 331', () => {
    const recentOneMonth = [
      { name: '超大盘能力', value: 6.5 },
      { name: '抗跌能力', value: 9.5 },
      { name: '稳定能力', value: 9 },
      { name: '绝对收益能力', value: 10 },
      { name: '选证择时能力', value: 4 },
      { name: '风险回报能力', value: 8 }
    ];
    const chart = new F2.Chart({
      id: 'issue331',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(recentOneMonth, {
      value: {
        min: 0,
        max: 10,
        tickCount: 10
      }
    });
    chart.coord('polar');
    chart.axis('value', {
      grid: () => {
        return {
          lineWidth: 1,
          type: 'arc',
          lineDash: null
        };
      },
      label: null,
      line: null
    });
    chart.axis('name', {
      grid: {
        lineDash: null
      },
      label: {
        opacity: 0.4,
        stroke: 'white'
      }
    });

    chart
      .line()
      .position('name*value')
      .color('#FE5C5B')
      .size(2)
      .shape('smooth');

    chart.render();

    const axisController = chart.get('axisController');
    const axes = axisController.axes;
    const radiusAxis = axes.radius;
    const coord = chart.get('coord');
    expect(radiusAxis.grid).to.be.an.instanceof(Function);
    expect(radiusAxis.center).to.eql(coord.center);
    expect(radiusAxis.startAngle).to.eql(coord.startAngle);
    expect(radiusAxis.endAngle).to.eql(coord.endAngle);
  });
});
