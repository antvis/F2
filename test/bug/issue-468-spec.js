const expect = require('chai').expect;
const Polyline = require('../../src/graphic/shape/polyline');
const Canvas = require('../../src/graphic/canvas');

describe('Issue 468', () => {
  let canvas;
  let dom;
  before(() => {
    dom = document.createElement('canvas');
    dom.id = 'issue468';
    document.body.appendChild(dom);

    canvas = new Canvas({
      el: 'issue468',
      width: 200,
      height: 200
    });
  });

  it('calculateBBox when points have NaN', () => {
    const polyline = new Polyline({
      attrs: {
        points: [
          { x: 10, y: 100 },
          { x: 42, y: 98 },
          { x: 55, y: 103 },
          { x: NaN, y: 110 },
          { x: NaN, y: 89 },
          { x: NaN, y: 99 },
          { x: NaN, y: 120 },
          { x: NaN, y: 120 },
          { x: NaN, y: 120 },
          { x: 55, y: 10 },
          { x: 42, y: 10 },
          { x: 10, y: 10 }
        ],
        lineWidth: 4,
        strokeStyle: '#223273'
      }
    });

    canvas.add(polyline);
    canvas.draw();

    const bbox = polyline.calculateBox();
    expect(bbox).to.eql({
      minX: 8,
      minY: 8,
      maxX: 57,
      maxY: 105
    });
  });

  after(() => {
    canvas.destroy();
    document.body.removeChild(dom);
  });
});
