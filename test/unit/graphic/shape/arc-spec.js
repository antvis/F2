const expect = require('chai').expect;
const Arc = require('../../../../src/graphic/shape/arc');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-arc';
document.body.appendChild(dom);

describe('Arc', function() {
  const canvas = new Canvas({
    el: 'canvas-arc',
    width: 200,
    height: 200
  });
  const arc = new Arc({
    className: 'arc',
    attrs: {
      x: 20,
      y: 20,
      r: 50,
      startAngle: 0,
      endAngle: Math.PI / 2,
      lineWidth: 2,
      stroke: '#18901f'
    }
  });
  it('init attr', function() {
    expect(arc._attrs).not.to.be.undefined;
    expect(arc.get('className')).to.equal('arc');
    expect(arc.attr('x')).to.equal(20);
    expect(arc.attr('y')).to.equal(20);
    expect(arc.attr('r')).to.equal(50);
    expect(arc.attr('startAngle')).to.equal(0);
    expect(arc.attr('endAngle')).to.equal(Math.PI / 2);
    expect(arc.attr('clockwise')).to.be.false;
    expect(arc.attr('lineWidth')).to.equal(2);
    expect(arc.attr('stroke')).to.equal('#18901f');
  });

  it('draw', function() {
    canvas.add(arc);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('getBBox', function() {
    const bbox = arc.getBBox();
    expect(parseInt(bbox.x)).to.equal(20);
    expect(parseInt(bbox.y)).to.equal(20);
    expect(bbox.width).to.equal(50);
    expect(bbox.height).to.equal(50);
  });

  it('destroy', function() {
    arc.destroy();
    expect(canvas.get('children').length).to.equal(0);
    expect(arc.get('destroyed')).to.equal(true);
    canvas.clear();
    canvas.draw();
  });
});
