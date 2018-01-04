const expect = require('chai').expect;
const Circle = require('../../../../src/graphic/shape/circle');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-circle';
document.body.appendChild(dom);

describe('Circle', function() {
  const canvas = new Canvas({
    domId: 'canvas-circle',
    width: 200,
    height: 200
  });
  const circle = new Circle({
    attrs: {
      x: 0,
      y: 0,
      r: 0
    }
  });

  it('init attr', function() {
    expect(circle.attr('lineWidth')).to.equal(1);
    expect(circle.attr('stroke')).to.be.undefined;
    expect(circle.attr('fill')).to.be.undefined;
  });

  it('set attrs', function() {
    circle.attr({
      x: 100,
      y: 100,
      r: 25,
      lineWidth: 2,
      stroke: '#f80',
      strokeOpacity: 0.4
    });

    expect(circle.attr('x')).to.equal(100);
    expect(circle.attr('y')).to.equal(100);
    expect(circle.attr('r')).to.equal(25);
    expect(circle.attr('lineWidth')).to.equal(2);
    expect(circle.attr('strokeOpacity')).to.equal(0.4);
    expect(circle.attr('stroke')).to.equal('#f80');
  });


  it('draw', function() {
    canvas.add(circle);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('destroy', function() {
    circle.destroy();
    expect(canvas.get('children').length).to.equal(0);
  });
});

