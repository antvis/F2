const expect = require('chai').expect;
const { Canvas } = require('../../../../src/graphic/index');
const Coord = require('../../../../src/coord/index');
const { Tag } = require('../../../../src/component/guide/index');
const Scale = require('../../../../src/scale/index');

const canvas1 = document.createElement('canvas');
canvas1.id = 'guideTag';
canvas1.style.position = 'fixed';
canvas1.style.top = 0;
canvas1.style.left = 0;
document.body.appendChild(canvas1);

describe('Guide.Tag', function() {
  const coord = new Coord.Rect({
    start: { x: 60, y: 400 },
    end: { x: 460, y: 60 }
  });

  const canvas = new Canvas({
    el: 'guideTag',
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

  it('guide tag', function() {
    let tag = new Tag({
      xScale,
      yScales: [ yScale ],
      content: '三月：200',
      position: [ '三月', 'min' ]
    });
    tag.render(coord, group);
    canvas.draw();
    const children = group.get('children');
    expect(children.length).to.equal(1);
    expect(children[0]).eql(tag.element);
    expect(children[0].get('children').length).to.equal(2);
    expect(children[0].get('children')[1].get('children').length).to.equal(3);
    expect(tag.direct).to.equal('tl');

    tag.remove();

    tag = new Tag({
      xScale,
      yScales: [ yScale ],
      content: '三月：200',
      position: [ 2, 1400 ],
      direct: 'bl'
    });
    tag.render(coord, group);
    canvas.draw();
    expect(tag.direct).to.equal('bl');
    let circle = group.get('children')[0].get('children')[0];
    expect(circle.attr('x')).to.equal(260);
    expect(circle.attr('y')).to.equal(3.3333333333333144);

    tag.remove();

    tag = new Tag({
      xScale,
      yScales: [ yScale ],
      content: '三月：200',
      position: [ 0, 'min' ],
      direct: 'bc'
    });
    tag.render(coord, group);
    canvas.draw();
    expect(tag.direct).to.equal('bc');
    circle = group.get('children')[0].get('children')[0];
    expect(circle.attr('x')).to.equal(60);
    expect(circle.attr('y')).to.equal(400);
    canvas.destroy();
    document.body.removeChild(canvas1);

  });
});
