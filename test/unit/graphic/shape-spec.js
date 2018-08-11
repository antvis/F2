const expect = require('chai').expect;
const Shape = require('../../../src/graphic/shape');

describe('Shape', function() {
  const s = new Shape({
    className: 'shape'
  });

  it('constructor', function() {
    expect(s.isShape()).to.be.true;
    expect(s.isVisible()).to.be.true;
  });

  it('calculateBox', function() {
    expect(s.calculateBox()).to.be.null;
  });

  it('getBBox', function() {
    expect(s.getBBox()).to.be.null;
  });
});
