import { expect } from 'chai';
import Sector from '../../../../src/graphic/engine/shape/sector';
import Canvas from '../../../../src/graphic/engine/canvas';

const dom = document.createElement('canvas');
dom.id = 'canvas-sector';
document.body.appendChild(dom);

describe('Sector', function() {
  const canvas = new Canvas({
    el: 'canvas-sector',
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
    expect(sector.getType()).to.equal('sector');
    expect(sector.attr('lineWidth')).to.equal(0);
    expect(sector.attr('stroke')).to.be.undefined;
    expect(sector.attr('fill')).to.equal('#223273');
  });

  it('draw', function() {
    canvas.add(sector);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('getBBox', function() {
    const bbox = sector.getBBox();
    expect(bbox.x).to.equal(100);
    expect(bbox.y).to.equal(106.69872981077808);
    expect(bbox.width).to.equal(50);
    expect(bbox.height).to.equal(93.30127018922192);
  });

  it('destroy', function() {
    sector.destroy();
    expect(canvas.get('children').length).to.equal(0);
    document.body.removeChild(dom);
  });
});

