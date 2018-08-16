const expect = require('chai').expect;
const Animate = require('../../../src/animation/animate');

describe('Animate', function() {
  it('Animate.registerAnimation', () => {
    Animate.registerAnimation('myAnimation', function() {
      return 'success';
    });

    expect(Animate.Action.myAnimation).to.be.an.instanceof(Function);
    expect(Animate.Action.myAnimation()).to.equal('success');
  });
});
