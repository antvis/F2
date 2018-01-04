const expect = require('chai').expect;
const Sector = require('../../../../src/graphic/shape/sector');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-sector';
document.body.appendChild(dom);

describe('Sector', function() {
  const canvas = new Canvas({
    domId: 'canvas-sector',
    width: 200,
    height: 200
  });
  const sector = new Sector({
    attrs: {
      x: 100,
      y: 150,
      r: 50,
      r0: 30,
      startAngle: -Math.PI / 3,
      endAngle: Math.PI / 2,
      lineWidth: 0,
      fill: '#223273'
    }
  });

  it('init attr', function() {
    expect(sector.attr('lineWidth')).to.equal(0);
    expect(sector.attr('stroke')).to.be.undefined;
    expect(sector.attr('fill')).to.equal('#223273');
  });

  it('draw', function() {
    canvas.add(sector);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('destroy', function() {
    sector.destroy();
    expect(canvas.get('children').length).to.equal(0);
  });
});

