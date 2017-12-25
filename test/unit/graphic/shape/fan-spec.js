const expect = require('chai').expect;
const Fan = require('../../../../src/graphic/shape/fan');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-fan';
document.body.appendChild(dom);

describe('Fan', function() {
  const canvas = new Canvas({
    domId: 'canvas-fan',
    width: 200,
    height: 200
  });
  const fan = new Fan({
    attrs: {
      cx: 100,
      cy: 150,
      points: [
        { x: 80, y: 100 },
        { x: 50, y: 40 },
        { x: 150, y: 40 },
        { x: 120, y: 100 }
      ],
      lineWidth: 0,
      fill: '#223273'
    }
  });

  it('init attr', function() {
    expect(fan.attr('lineWidth')).to.equal(0);
    expect(fan.attr('stroke')).to.be.undefined;
    expect(fan.attr('fill')).to.equal('#223273');
  });

  it('draw', function() {
    canvas.add(fan);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('destroy', function() {
    fan.destroy();
    expect(canvas.get('children').length).to.equal(1);
  });
});

