const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/interval');
require('../../src/geom/area');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue179';
document.body.appendChild(canvas);

describe('issue 179', () => {

  let chart;
  it('柱状图，未进行列定义设置，默认从 0 开始生长', function() {
    const data = [
      { value: -139255.5, season: '第四季' },
      { value: -51926.5, season: '第三季' },
      { value: -49959.4, season: '第二季' },
      { value: -37099.9, season: '第一季' }
    ];
    chart = new F2.Chart({
      id: 'issue179',
      pixelRatio: window.devicePixelRatio,
      padding: [ 45, 'auto', 'auto' ]
    });
    chart.source(data);
    const geom = chart.interval().position('season*value');
    chart.render();

    const yScale = chart.getYScales()[0];
    expect(yScale.max).to.equal(0);

    // 测试柱状图并未超出画布
    const coord = chart.get('coord');
    const yMin = coord.end.y;
    const container = geom.get('container');
    const shapes = container.get('children');
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      expect(shape.attr('y')).to.equal(yMin);
    }
  });

  it('柱状图，进行列定义设置', function() {
    chart.scale('value', {
      max: 100000
    });
    chart.repaint();
    const yScale = chart.getYScales()[0];
    expect(yScale.max).to.equal(100000);

    const zeroPosition = chart.getPosition({
      season: '第一季',
      value: 0
    });
    const geom = chart.get('geoms')[0];
    const container = geom.get('container');
    const shapes = container.get('children');
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      expect(shape.attr('y')).to.equal(zeroPosition.y);
    }
  });

  it('负区间区域图', function() {
    chart.clear();
    chart.scale('value', {});
    chart.area().position('season*value');
    chart.render();

    const geom = chart.get('geoms')[0];
    const dataArray = geom.get('dataArray')[0];
    // 区域图不超过坐标系区域
    for (let i = 0; i < dataArray.length; i++) {
      const item = dataArray[i];
      expect(item.points[0].y).to.equal(1);
    }

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
