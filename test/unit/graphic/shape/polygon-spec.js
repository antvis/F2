const expect = require('chai').expect;
const Polygon = require('../../../../src/graphic/shape/polygon');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-polygon';
document.body.appendChild(dom);

describe('Polygon', function() {
  const canvas = new Canvas({
    domId: 'canvas-polygon',
    width: 200,
    height: 200
  });
  const polygon = new Polygon({
    attrs: {
      points: [
        [ 10, 10 ],
        [ 20, 45 ],
        [ 40, 80 ],
        [ 123, 70 ],
        [ 80, 32 ]
      ],
      lineWidth: 1,
      fill: 'red'
    }
  });

  it('init attr', function() {
    expect(polygon.get('canFill')).to.be.true;
    expect(polygon.attr('points').length).to.equal(5);
    expect(polygon.attr('fillStyle')).to.equal('red');
  });

  it('draw', function() {
    canvas.add(polygon);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('destroy', function() {
    polygon.destroy();
    expect(canvas.get('children').length).to.equal(0);
  });
});

