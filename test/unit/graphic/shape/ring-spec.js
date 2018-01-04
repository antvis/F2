const expect = require('chai').expect;
const Ring = require('../../../../src/graphic/shape/ring');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-ring';
document.body.appendChild(dom);

describe('Sector', function() {
  const canvas = new Canvas({
    domId: 'canvas-ring',
    width: 200,
    height: 200
  });
  const ring = new Ring({
    attrs: {
      x: 100,
      y: 150,
      r: 50,
      r0: 30,
      lineWidth: 0,
      fill: '#223273'
    }
  });

  it('init attr', function() {
    expect(ring.attr('lineWidth')).to.equal(0);
    expect(ring.attr('stroke')).to.be.undefined;
    expect(ring.attr('fill')).to.equal('#223273');
  });

  it('draw', function() {
    canvas.add(ring);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('destroy', function() {
    ring.destroy();
    expect(canvas.get('children').length).to.equal(0);
  });
});

