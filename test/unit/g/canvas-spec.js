const expect = require('chai').expect;
const Group = require('../../../src/g/group');
const Canvas = require('../../../src/g/canvas');

const dom = document.createElement('canvas');
dom.id = 'canvas';
document.body.appendChild(dom);

describe('Canvas', function() {

  it('init Canvas with domId', function() {
    const canvas = new Canvas({
      domId: 'canvas'
    });
    expect(canvas.get('canvas')).not.to.be.undefined;
    expect(canvas.get('context')).not.to.be.undefined;
    expect(canvas.get('width')).to.equal(300);
    expect(canvas.get('height')).to.equal(150);
    expect(canvas.get('el')).not.to.be.undefined;
    expect(canvas.get('el').style.width).to.equal('300px');
    expect(canvas.get('el').style.height).to.equal('150px');
    canvas.destroy();
  });

  it('init Canvas with domId, width, height, pixelRatio', function() {
    const canvas = new Canvas({
      domId: 'canvas',
      width: 300,
      height: 300,
      pixelRatio: 2
    });

    expect(canvas.getWidth()).to.equal(600);
    expect(canvas.getHeight()).to.equal(600);
    expect(canvas.get('el').style.width).to.equal('300px');
    expect(canvas.get('el').style.height).to.equal('300px');
    canvas.destroy();
  });

  it('init Canvas with context, width, height, pixelRatio', function() {
    const canvas = new Canvas({
      context: dom.getContext('2d'),
      width: 300,
      height: 300,
      pixelRatio: 1
    });
    expect(canvas.get('canvas')).not.to.be.undefined;
    expect(canvas.getWidth()).to.equal(300);
    expect(canvas.getHeight()).to.equal(300);
    expect(canvas.get('el').style.width).to.equal('300px');
    expect(canvas.get('el').style.height).to.equal('300px');
    canvas.destroy();
  });

  it('init Canvas with dom, width, height, pixelRatio', function() {
    const canvas = new Canvas({
      el: dom,
      width: 300,
      height: 300,
      pixelRatio: 1
    });
    expect(canvas.get('canvas')).not.to.be.undefined;
    expect(canvas.getWidth()).to.equal(300);
    expect(canvas.getHeight()).to.equal(300);
    expect(canvas.get('el').style.width).to.equal('300px');
    expect(canvas.get('el').style.height).to.equal('300px');
    canvas.destroy();
  });

  it('add Shape', function() {
    const canvas = new Canvas({
      domId: 'canvas',
      width: 500,
      height: 500
    });

    canvas.addShape('Circle', {
      attrs: {
        x: 100,
        y: 100,
        r: 5,
        fill: 'red'
      }
    });
    canvas.addShape('line', {
      attrs: {
        x1: 100,
        y1: 100,
        x2: 400,
        y2: 400,
        strokeStyle: 'red'
      }
    });
    canvas.draw();
    expect(canvas.get('children').length).to.equal(2);
    canvas.destroy();
  });

  it('changeSize', function() {
    const canvas = new Canvas({
      domId: 'canvas',
      width: 500,
      height: 500,
      pixelRatio: 1
    });
    canvas.changeSize(200, 200);
    expect(canvas.get('el').style.width).to.equal('200px');
    expect(canvas.get('el').style.height).to.equal('200px');
    canvas.destroy();
  });

  it('clear canvas', function() {
    const canvas = new Canvas({
      domId: 'canvas',
      width: 500,
      height: 500,
      pixelRatio: 1
    });
    canvas.add(new Group());
    expect(canvas.get('children').length).to.equal(1);

    canvas.clear();
    expect(canvas.get('children')).to.be.an('array').that.is.empty;
    canvas.destroy();
    expect(canvas.get('destroyed')).to.be.true;
  });
});

