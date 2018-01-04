const expect = require('chai').expect;
const Line = require('../../../../src/graphic/shape/line');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-line';
document.body.appendChild(dom);

describe('Line', function() {
  const canvas = new Canvas({
    domId: 'canvas-line',
    width: 200,
    height: 200
  });
  const line = new Line({
    attrs: {
      x1: 0,
      y1: 0,
      x2: 200,
      y2: 200,
      lineWidth: 40,
      strokeStyle: '#223273',
      lineCap: 'round'
    }
  });

  it('init attr', function() {
    expect(line.attr('stroke')).to.be.undefined;
  });

  it('draw', function() {
    canvas.add(line);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('destroy', function() {
    line.destroy();
    expect(canvas.get('children').length).to.equal(0);
  });
});

