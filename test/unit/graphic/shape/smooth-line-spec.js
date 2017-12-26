const expect = require('chai').expect;
const Line = require('../../../../src/graphic/shape/smooth-line');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-smooth';
document.body.appendChild(dom);

describe('Smooth Line', function() {
  const canvas = new Canvas({
    domId: 'canvas-smooth',
    width: 200,
    height: 200
  });
  const line = new Line({
    attrs: {
      points: [
        { x: 10, y: 100 },
        { x: 42, y: 98 },
        { x: 55, y: 103 },
        { x: 56, y: 110 },
        { x: 60, y: 89 },
        { x: 83, y: 99 },
        { x: 100, y: 120 }
      ],
      lineWidth: 4,
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
    expect(canvas.get('children').length).to.equal(1);
  });
});

