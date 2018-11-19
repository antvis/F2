const expect = require('chai').expect;
const Line = require('../../../../src/graphic/shape/line');
const Rect = require('../../../../src/graphic/shape/rect');
const Arc = require('../../../../src/graphic/shape/arc');
const Canvas = require('../../../../src/graphic/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-line';
document.body.appendChild(dom);

describe('Line', function() {
  const canvas = new Canvas({
    el: 'canvas-line',
    width: 200,
    height: 200
  });
  const line = new Line({
    attrs: {
      x1: 50,
      y1: 50,
      x2: 100,
      y2: 100,
      lineWidth: 2,
      strokeStyle: '#223273',
      lineCap: 'round',
      matrix: [ 1, 0, 0, 1, 5, 5 ]
    }
  });
  canvas.add(line);

  it('init attr', function() {
    expect(line.getType()).to.equal('line');
    expect(line.attr('stroke')).to.be.undefined;
    expect(line.attr('matrix')).to.eql([ 1, 0, 0, 1, 5, 5 ]);
  });

  it('getParent', function() {
    expect(line.getParent()).to.eql(canvas);
  });

  it('set clip', function() {
    const arc = new Arc({
      attrs: {
        x: 20,
        y: 20,
        r: 50,
        startAngle: 0,
        endAngle: Math.PI / 2,
        lineWidth: 2,
        stroke: '#18901f'
      }
    });
    line.attr('clip', arc); // Arc 不能作为剪切图形
    expect(line.attr('clip')).to.be.null;

    const rect = new Rect({
      attrs: {
        x: 75,
        y: 75,
        width: 25,
        height: 25
      }
    });
    line.attr('clip', rect);
    const clip = line.attr('clip');
    expect(clip.get('parent')).to.eql(line.get('parent'));
    expect(clip.get('context')).to.eql(line.get('context'));
  });

  it('draw', function() {
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('getBBox', function() {
    const bbox = line.getBBox();
    expect(bbox.x).to.equal(49);
    expect(bbox.y).to.equal(49);
    expect(bbox.width).to.equal(52);
    expect(bbox.height).to.equal(52);
  });

  it('destroy', function() {
    line.destroy();
    expect(canvas.get('children').length).to.equal(0);
    document.body.removeChild(dom);
  });
});

