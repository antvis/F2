import { expect } from 'chai';
import Element from '../../../src/graphic/element';

const dom = document.createElement('canvas');
dom.id = 'element';
document.body.appendChild(dom);
const context = dom.getContext('2d');

describe('Element', function() {
  let e;
  it('constructor', function() {
    e = new Element({
      className: 'aElement',
      attrs: {
        width: 20,
        height: 30,
        stroke: '#231'
      }
    });

    expect(e._attrs).not.to.be.undefined;
    expect(e.get('className')).to.equal('aElement');
    expect(e.isVisible()).to.be.true;
    expect(e.attr('width')).to.equal(20);
    expect(e.attr('height')).to.equal(30);
    expect(e.attr('stroke')).to.equal('#231');
    expect(e.attr('matrix')).to.eql([ 1, 0, 0, 1, 0, 0 ]);
  });

  it('set and get', function() {
    e.set('test', 1111);
    expect(e.get('test')).to.equal(1111);
  });

  it('attr(key, value), fill', function() {

    e.attr('fill', '#333333');
    expect(e.attr('fill')).to.equal('#333333');
    expect(e.get('attrs').fillStyle).to.equal('#333333');

    e.attr('fill', 'red');
    expect(e.attr('fill')).to.equal('red');
    expect(e.get('attrs').fillStyle).to.equal('red');
  });

  it('attr(key, value), stroke', function() {
    e.attr('stroke', 'black');
    expect(e.attr('stroke')).to.equal('black');
    expect(e.get('attrs').strokeStyle).to.equal('black');

    e.attr('stroke', '#999');
    expect(e.attr('stroke')).to.equal('#999');
    expect(e.get('attrs').strokeStyle).to.equal('#999');
  });

  it('attr(key, value), fill a radial gradient', function() {
    e.attr('fill', 'r(0,0,1) 0:#ffffff 0.5:#7ec2f3 1:#1890ff');
    const fill = e.attr('fillStyle');
    expect(fill).to.equal('r(0,0,1) 0:#ffffff 0.5:#7ec2f3 1:#1890ff');

    e.resetContext(context);
    expect(context.fillStyle).to.be.an.instanceof(CanvasGradient);

    e.attr('fill', 'r(0.5,0.5,0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff');
    e.resetContext(context);
    expect(context.fillStyle).to.equal('#1890ff');
  });

  it('attr(key, value), stroke a linear gradient', function() {
    e.attr('stroke', 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff');
    const stroke = e.attr('strokeStyle');
    expect(stroke).to.equal('l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff');

    e.resetContext(context);
    expect(context.strokeStyle).to.be.an.instanceof(CanvasGradient);
  });

  it('attr(key, value), opacity', function() {
    e.attr('opacity', 0.1);
    expect(e.attr('opacity')).to.equal(0.1);
    expect(e.get('attrs').globalAlpha).to.equal(0.1);

    e.attr('opacity', 0.3);
    expect(e.attr('opacity')).to.equal(0.3);
    expect(e.get('attrs').globalAlpha).to.equal(0.3);
  });

  it('attr()', function() {
    const e = new Element({
      attrs: {
        width: 100,
        opacity: 0.2,
        stroke: '#222',
        fill: '#444'
      }
    });
    const attrs = e.attr();
    expect(attrs.opacity).to.equal(0.2);
    expect(attrs.stroke).to.equal('#222');
    expect(attrs.fill).to.equal('#444');
    expect(attrs.width).to.equal(100);
    expect(attrs.fillStyle).to.equal('#444');
    expect(attrs.strokeStyle).to.equal('#222');
  });

  it('hide()', function() {
    e.hide();
    expect(e.isVisible()).to.be.false;
  });

  it('show()', function() {
    e.show();
    expect(e.isVisible()).to.be.true;
  });

  it('getBBox()', function() {
    const bbox = e.getBBox();
    expect(bbox).to.eql({
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      height: 0,
      width: 0
    });
  });

  it('getMatrix()', function() {
    const matrix = e.getMatrix();
    expect(matrix).to.eql([ 1, 0, 0, 1, 0, 0 ]);
  });

  it('setMatrix()', function() {
    const matrix = [ 1, 0, 0, 1, 100, 20 ];
    e.setMatrix(matrix);
    expect(e.getMatrix()).to.eql(matrix);
  });

  it('setTransform', function() {
    e.setTransform([]);
    expect(e.getMatrix()).to.eql([ 1, 0, 0, 1, 0, 0 ]);
  });

  it('transform', function() {
    e.transform([
      [ 's', 0.5, 0.5 ],
      [ 'r', Math.PI ]
    ]);
    expect(e.getMatrix()).to.eql([ -0.5, 6.123233995736766e-17, -6.123233995736766e-17, -0.5, 0, 0 ]);
  });

  it('translate', function() {
    e.translate(10, 10);
    expect(e.getMatrix()).to.eql([ -0.5, 6.123233995736766e-17, -6.123233995736766e-17, -0.5, -5.000000000000001, -4.999999999999999 ]);
  });

  it('rotate', function() {
    e.rotate(-Math.PI);
    expect(e.getMatrix()).to.eql([ 0.5, 0, 0, 0.5, -5.000000000000001, -4.999999999999999 ]);
  });

  it('scale', function() {
    e.scale(2, 2);
    expect(e.getMatrix()).to.eql([ 1, 0, 0, 1, -5.000000000000001, -4.999999999999999 ]);
  });

  it('moveTo', function() {
    const x = e.get('x');
    const y = e.get('y');
    expect(x).to.be.undefined;
    expect(y).to.be.undefined;
    e.moveTo(10, 10);
    expect(e.get('x')).to.equal(10);
    expect(e.get('y')).to.equal(10);
    expect(e.getMatrix()).to.eql([ 1, 0, 0, 1, 4.999999999999999, 5.000000000000001 ]);
  });

  it('apply', function() {
    const v = [ -10, -10 ];
    e.apply(v);
    expect(v).to.eql([ -5.000000000000001, -4.999999999999999 ]);
  });

  it('destroy()', function() {
    e.destroy();
    expect(e.isDestroyed()).to.equal(true);
    expect(e.attr()).to.be.null;
    expect(e.destroy()).to.be.null;
  });
});
