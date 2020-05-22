import { expect } from 'chai';
import Global from '../../src/global';

const pkg = require('../../package.json');

describe('Global', () => {
  it('version sync', () => {
    expect(Global.version).equal(pkg.version);
  });
});
