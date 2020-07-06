import { expect } from 'chai';
import { Canvas } from '../../../../src/graphic/index';
import Coord from '../../../../src/coord/index';
import Point from '../../../../src/component/guide/point';
import Scale from '../../../../src/scale/index';

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
    // const circle = group.get('children')[0].get('children')[0];
    // expect(circle.attr('x')).to.equal(60);
    // expect(circle.attr('y')).to.equal(400);

    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0].get('className')).to.equal('guide-point');
    expect(children[0].attr('x')).to.equal(60);
    expect(children[0].attr('y')).to.equal(400);
    expect(children[0].attr('r')).to.equal(3);
  });

  it('guide point, limitInPlot', function() {
    group.clear();
    const point = new Point({
      xScale,
      yScales: [ yScale ],
      position: [ 0, -50 ], // 不在画布范围内
      limitInPlot: true
    });
    const result = point.render(coord, group);
    canvas.draw();

    expect(result).to.be.null;
    const children = group.get('children');
    expect(children.length).to.equal(0);

    canvas.destroy();
    document.body.removeChild(canvas1);
  });
});
