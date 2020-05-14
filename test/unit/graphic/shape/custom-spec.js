import { expect } from 'chai';
import Custom from '../../../../src/graphic/shape/custom';
import Canvas from '../../../../src/graphic/canvas';

const dom = document.createElement('canvas');
dom.id = 'canvas-custom';
document.body.appendChild(dom);

describe('Custom', function() {
  const canvas = new Canvas({
    el: 'canvas-custom',
    width: 200,
    height: 200
  });
  const house = new Custom({
    attrs: {
      lineWidth: 2,
      stroke: '#CCC',
      fill: '#2FC25B'
    }
  });

  it('init attr', function() {
    expect(house.getType()).to.equal('custom');
    expect(house.attr('lineWidth')).to.equal(2);
    expect(house.attr('strokeStyle')).to.equal('#CCC');
    expect(house.attr('fillStyle')).to.equal('#2FC25B');
  });

  it('define my shape and draw', function() {
    house.set('createPath', function(context) {
      context.beginPath();
      context.moveTo(20, 40);
      context.lineTo(100, 10);
      context.lineTo(180, 40);
      context.lineTo(180, 190);
      context.lineTo(20, 190);
      context.closePath();
    });
    canvas.add(house);
    canvas.draw();
    expect(canvas.get('children').length).to.equal(1);
  });

  it('calculateBBox', function() {
    house.set('calculateBox', function() {
      return {
        minX: 20,
        maxX: 180,
        minY: 10,
        maxY: 190
      };
    });

    const bbox = house.getBBox();
    expect(bbox).to.eql({
      height: 180,
      maxX: 180,
      maxY: 190,
      minX: 20,
      minY: 10,
      width: 160,
      x: 20,
      y: 10
    });
  });

  it('destroy', function() {
    house.destroy();
    expect(canvas.get('children').length).to.equal(0);
    document.body.removeChild(dom);
  });
});

