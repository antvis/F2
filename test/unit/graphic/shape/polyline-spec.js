import { expect } from 'chai';
import Polyline from '../../../../src/graphic/engine/shape/polyline';
import Canvas from '../../../../src/graphic/engine/canvas';

const dom = document.createElement('canvas');
dom.id = 'canvas-polyline';
document.body.appendChild(dom);

const canvas = new Canvas({
  el: 'canvas-polyline',
  width: 200,
  height: 200
});

function snapEqual(v1, v2) {
  return Math.abs(v1 - v2) < 0.01;
}

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
    expect(polyline.getType()).to.equal('polyline');
    expect(polyline.get('canStroke')).to.be.true;
    expect(polyline.attr('points').length).to.equal(5);
    expect(polyline.attr('strokeStyle')).to.equal('red');
  });

  it('draw', function() {
    canvas.add(polyline);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('getBBox', function() {
    const bbox = polyline.getBBox();
    expect(bbox.x).to.equal(9.5);
    expect(bbox.y).to.equal(9.5);
    expect(bbox.width).to.equal(114);
    expect(bbox.height).to.equal(71);
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

  it('getBBox', function() {
    const bbox = line.getBBox();
    expect(bbox.x).to.equal(8);
    expect(snapEqual(bbox.y, 86.49273479496628)).to.be.true;
    expect(snapEqual(bbox.width, 93.99739841364499)).to.be.true;
    expect(snapEqual(bbox.height, 35.502917125608604)).to.be.true;
  });

  it('destroy', function() {
    line.destroy();
    expect(canvas.get('children').length).to.equal(0);
    document.body.removeChild(dom);
  });
});

