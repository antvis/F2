const expect = require('chai').expect;
const Core = require('../../src/core');

describe('Core', function() {
  it('Keys', function() {
    expect(Core).to.have.all.keys([
      'Global',
      'Chart',
      'Shape',
      'G',
      'Util',
      'track',
      'version'
    ]);
  });

  it('no more track', function() {
    expect(Core.Global.trackable).to.be.undefined; // default is open

    Core.track(false);
    expect(Core.Global.trackable).to.be.undefined;
  });
});
