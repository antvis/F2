const expect = require('chai').expect;
const Element = require('../../../src/g/element');

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
    expect(e.attr('width')).to.equal(20);
    expect(e.attr('height')).to.equal(30);
    expect(e.attr('stroke')).to.equal('#231');
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

  it('destroy', function() {
    e.destroy();
    expect(e.get('destroyed')).to.equal(true);
  });
});
