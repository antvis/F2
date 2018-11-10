const expect = require('chai').expect;
const Easing = require('../../../src/graphic/animate/easing');

describe('Easing', function() {
  it('linear', () => {
    expect(Easing.linear(1)).to.equal(1);
  });
  it('quadraticIn', () => {
    expect(Easing.quadraticIn(1)).to.equal(1);
  });
  it('quadraticOut', () => {
    expect(Easing.quadraticOut(1)).to.equal(1);
  });
  it('quadraticInOut', () => {
    expect(Easing.quadraticInOut(1)).to.equal(1);
  });
  it('cubicIn', () => {
    expect(Easing.cubicIn(1)).to.equal(1);
  });
  it('cubicOut', () => {
    expect(Easing.cubicOut(1)).to.equal(1);
  });
  it('cubicInOut', () => {
    expect(Easing.cubicInOut(1)).to.equal(1);
  });
  it('elasticIn', () => {
    expect(Easing.elasticIn(1)).to.equal(1);
  });
  it('elasticOut', () => {
    expect(Easing.elasticOut(1)).to.equal(1);
  });
  it('elasticInOut', () => {
    expect(Easing.elasticInOut(1)).to.equal(1);
  });
  it('backIn', () => {
    expect(Easing.backIn(0)).to.equal(-0);
  });
  it('backOut', () => {
    expect(Easing.backOut(1)).to.equal(1);
  });
  it('backInOut', () => {
    expect(Easing.backInOut(1)).to.equal(1);
  });
  it('bounceIn', () => {
    expect(Easing.bounceIn(1)).to.equal(1);
  });
  it('bounceOut', () => {
    expect(Easing.bounceOut(1)).to.equal(1);
  });
  it('bounceInOut', () => {
    expect(Easing.bounceInOut(1)).to.equal(1);
  });
});
