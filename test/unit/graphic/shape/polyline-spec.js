const expect = require('chai').expect;
const Polyline = require('../../../../src/graphic/shape/polyline');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-polyline';
document.body.appendChild(dom);

const canvas = new Canvas({
  domId: 'canvas-polyline',
  width: 200,
  height: 200
});

describe('Polyline', function() {
  const polyline = new Polyline({
    attrs: {
      points: [
        { x: 10, y: 10 },
        { x: 20, y: 45 },
        { x: 40, y: 80 },
        { x: 123, y: 70 },
        { x: 80, y: 32 }
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
    expect(canvas.get('children').length).to.equal(0);
  });
});

describe('Smooth Polyline', function() {
  const line = new Polyline({
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
      lineCap: 'round',
      smooth: true
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

