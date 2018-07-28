const expect = require('chai').expect;
const { Canvas } = require('../../../src/graphic/index');
const Coord = require('../../../src/coord/index');
const { Point } = require('../../../src/component/guide/index');
const Scale = require('../../../src/scale/index');

const canvas1 = document.createElement('canvas');
canvas1.id = 'guidePoint';
canvas1.style.position = 'fixed';
canvas1.style.top = 0;
canvas1.style.left = 0;
document.body.appendChild(canvas1);

describe('Guide.Point', function() {
  const coord = new Coord.Rect({
    start: { x: 60, y: 400 },
    end: { x: 460, y: 60 }
  });

  const canvas = new Canvas({
    el: 'guidePoint',
    width: 500,
    height: 500,
    pixelRatio: 2
  });

  const group = canvas.addGroup();

  const xScale = new Scale.Cat({
    values: [ '一月', '二月', '三月', '四月', '五月' ]
  });

  const yScale = new Scale.Linear({
    min: 0,
    max: 1200
  });

  it('guide point', function() {
    const point = new Point({
      xScale,
      yScales: [ yScale ],
      position: [ 0, 'min' ]
    });
    point.render(coord, group);
    canvas.draw();
    const circle = group.get('children')[0].get('children')[0];
    expect(circle.attr('x')).to.equal(60);
    expect(circle.attr('y')).to.equal(400);
    canvas.destroy();
    document.body.removeChild(canvas1);

  });
});
