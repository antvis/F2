const expect = require('chai').expect;
const Rect = require('../../../../src/g/shape/rect');
const Canvas = require('../../../../src/g/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-rect';
document.body.appendChild(dom);

describe('Rect', function() {
  const canvas = new Canvas({
    domId: 'canvas-rect',
    width: 200,
    height: 200
  });
  const rect = new Rect({
    attrs: {
      x: 50,
      y: 50,
      height: 20,
      width: 80,
      lineWidth: 1,
      fill: '#1890FF',
      strokeStyle: '#000'
    }
  });

  it('init attr', function() {
    expect(rect.get('canStroke')).to.be.true;
    expect(rect.get('canFill')).to.be.true;
    expect(rect.attr('x')).to.equal(50);
    expect(rect.attr('y')).to.equal(50);
    expect(rect.attr('strokeStyle')).to.equal('#000');
    expect(rect.attr('fillStyle')).to.equal('#1890FF');
    expect(rect.attr('fill')).to.equal('#1890FF');
  });

  it('draw', function() {
    canvas.add(rect);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('destroy', function() {
    rect.destroy();
    expect(canvas.get('children').length).to.equal(1);
  });
});

