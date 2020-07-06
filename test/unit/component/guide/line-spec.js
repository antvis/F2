import { expect } from 'chai';
import { Canvas, Shape } from '../../../../src/graphic/index';
import Coord from '../../../../src/coord/index';
import { Line } from '../../../../src/component/guide/index';
import Scale from '../../../../src/scale/index';

describe('Guide.Line', function() {

  const canvas1 = document.createElement('canvas');
  canvas1.id = 'guideLine';
  document.body.appendChild(canvas1);

  const coord = new Coord.Rect({
    start: { x: 60, y: 460 },
    end: { x: 460, y: 60 }
  });

  const canvas = new Canvas({
    el: 'guideLine',
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

  it('Basic Line', function() {
    const line = new Line({
      xScale,
      yScales: [ yScale ],
      start: [ '一月', 200 ],
      end: [ '五月', 200 ],
      style: {
        stroke: '#999',
        lineWidth: 2,
        lineDash: [ 2, 2 ]
      }
    });
    line.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0]).to.an.instanceof(Shape);
    expect(children[0].get('className')).to.equal('guide-line');
  });

  it('guide line with text, the position is our keyword', function() {
    group.clear();

    const line = new Line({
      xScale,
      yScales: [ yScale ],
      start: [ 'min', 'median' ],
      end: [ 'median', 'max' ],
      style: {
        stroke: '#999',
        lineWidth: 1
      }
    });
    line.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    const textShape = children[0];
    expect(textShape.attr('x2') - textShape.attr('x1')).to.equal(200);

    line.changeVisible(false);
    expect(line.element.get('visible')).to.be.false;

    document.body.removeChild(canvas1);
  });
});
