const expect = require('chai').expect;
const Global = require('../../src/global');
const pkg = require('../../package.json');

describe('Global', () => {
  it('version sync', () => {
    expect(Global.version).equal(pkg.version);
  });
});
