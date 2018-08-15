const expect = require('chai').expect;
const Polygon = require('../../../../src/graphic/shape/polygon');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-polygon';
document.body.appendChild(dom);

describe('Polygon', function() {
  const canvas = new Canvas({
    el: 'canvas-polygon',
    width: 200,
    height: 200
  });
  const polygon = new Polygon({
    attrs: {
      points: [
        { x: 10, y: 10 },
        { x: 20, y: 45 },
        { x: 40, y: 80 },
        { x: 123, y: 70 },
        { x: 80, y: 32 }
      ],
      lineWidth: 1,
      fill: 'red'
    }
  });

  it('init attr', function() {
    expect(polygon.getType()).to.equal('polygon');
    expect(polygon.get('canFill')).to.be.true;
    expect(polygon.attr('points').length).to.equal(5);
    expect(polygon.attr('fillStyle')).to.equal('red');
  });

  it('draw', function() {
    canvas.add(polygon);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('getBBox', function() {
    const bbox = polygon.getBBox();
    expect(bbox.x).to.equal(10);
    expect(bbox.y).to.equal(10);
    expect(bbox.width).to.equal(113);
    expect(bbox.height).to.equal(70);
  });

  it('destroy', function() {
    polygon.destroy();
    expect(canvas.get('children').length).to.equal(0);
    document.body.removeChild(dom);
  });
});

