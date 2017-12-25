const expect = require('chai').expect;
const Polyline = require('../../../../src/g/shape/polyline');
const Canvas = require('../../../../src/g/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-polyline';
document.body.appendChild(dom);

describe('Polyline', function() {
  const canvas = new Canvas({
    domId: 'canvas-polyline',
    width: 200,
    height: 200
  });
  const polyline = new Polyline({
    attrs: {
      points: [
        [ 10, 10 ],
        [ 20, 45 ],
        [ 40, 80 ],
        [ 123, 70 ],
        [ 80, 32 ]
      ],
      lineWidth: 1,
      stroke: 'red'
    }
  });

  it('init attr', function() {
    expect(polyline.get('canStroke')).to.be.true;
    expect(polyline.attr('points').length).to.equal(5);
    expect(polyline.attr('strokeStyle')).to.equal('red');
  });

  it('draw', function() {
    canvas.add(polyline);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('destroy', function() {
    polyline.destroy();
    expect(canvas.get('children').length).to.equal(1);
  });
});

