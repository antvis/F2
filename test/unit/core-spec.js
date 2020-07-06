import { expect } from 'chai';
import * as Core from '../../src/core';

describe('Core', function() {
  it('Keys', function() {
    expect(Core).to.have.all.keys([
      'Global',
      'Chart',
      'Shape',
      'G',
      'Util',
      'Helper',
      'track',
      'version',
      '__esModule'
    ]);
  });

  it('no more track', function() {
    expect(Core.Global.trackable).to.be.undefined; // default is open

    Core.track(false);
    expect(Core.Global.trackable).to.be.undefined;
  });
});
