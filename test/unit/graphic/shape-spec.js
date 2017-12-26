const expect = require('chai').expect;
const Shape = require('../../../src/graphic/shape');

describe('Shape', function() {
  it('constructor', function() {
    const s = new Shape({
      className: 'shape'
    });

    expect(s.get('isShape')).to.be.true;
    expect(s.get('visible')).to.be.true;
  });
});
