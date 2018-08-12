const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/area');
require('../../src/coord/polar');
require('../../src/component/axis/circle');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue180';
document.body.appendChild(canvas);

describe('issue 180', () => {
  it('雷达图空心问题', function() {
    const data = [
      { item: 'Design', user: '用户 A', score: 70 },
      { item: 'Development', user: '用户 A', score: 60 },
      { item: 'Marketing', user: '用户 A', score: 50 },
      { item: 'FKJKJG', user: '用户 A', score: 30 },
      { item: 'Design', user: '用户 B', score: 80 },
      { item: 'Development', user: '用户 B', score: 70 },
      { item: 'Marketing', user: '用户 B', score: 60 },
      { item: 'FKJKJG', user: '用户 B', score: 40 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio
    });

    chart.coord('polar');
    chart.source(data, {
      score: {
        min: -10,
        tickInterval: 40
      }
    });

    const geom = chart.area().position('item*score').color('user')
      .shape('smooth');
    chart.render();

    // TODO: 这里需要进行图像测试
    const geomContainer = geom.get('container');
    const areaShapeA = geomContainer.get('children')[0];
    const areaShapeB = geomContainer.get('children')[1];
    expect(areaShapeA.attr('points')).to.be.an.instanceof(Array);
    expect(areaShapeA.attr('points').length).to.equal(10);

    expect(areaShapeB.attr('points')).to.be.an.instanceof(Array);
    expect(areaShapeB.attr('points').length).to.equal(10);
  });
});
