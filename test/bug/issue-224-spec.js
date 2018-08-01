const expect = require('chai').expect;
const F2 = require('../../src/core');

describe('issue 224', () => {
  it('Global.setTheme({})', () => {
    F2.Global.setTheme({
      axis: {}
    });
    expect(Object.keys(F2.Global.axis).length).to.be.gt(0);
    expect(F2.Global.axis.bottom).to.be.an.instanceof(Object);
  });
});
