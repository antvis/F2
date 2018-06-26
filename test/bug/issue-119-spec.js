const expect = require('chai').expect;
const F2 = require('../../src/core');
require('../../src/geom/point');
require('../../src/geom/adjust/stack');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'stack-point';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 119', () => {
  it('Stacked Point Chart', function() {
    const data = [
      { x: '1', y: 3, z: 'a' },
      { x: '1', y: 5, z: 'b' },
      { x: '2', y: 2, z: 'a' },
      { x: '2', y: 7, z: 'b' },
      { x: '3', y: 1, z: 'a' },
      { x: '3', y: 10, z: 'b' }
    ];
    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data);
    const point = chart.point()
      .position('x*y')
      .color('z')
      .adjust('stack');
    chart.render();

    const points = point.get('container').get('children');
    expect(points.length).to.equal(6);

    points.map(shape => {
      const y = shape.attr('y');
      const origin = shape.get('origin');

      expect(y).to.equal(origin.y[1]);
      return shape;
    });
    chart.destroy();
    document.body.removeChild(canvas);
  });
});
