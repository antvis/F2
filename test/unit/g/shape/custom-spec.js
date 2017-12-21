const expect = require('chai').expect;
const Custom = require('../../../../src/g/shape/custom');
const Canvas = require('../../../../src/g/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas-custom';
document.body.appendChild(dom);

describe('Custom', function() {
  const canvas = new Canvas({
    domId: 'canvas-custom',
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

  it('destroy', function() {
    house.destroy();
    expect(canvas.get('children').length).to.equal(1);
  });
});

