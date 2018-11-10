const expect = require('chai').expect;
const Component = require('../../../src/component');

describe('Component Entry', () => {
  it('Type of Component', () => {
    expect(Component).to.have.all.keys('Axis', 'Guide', 'Tooltip', 'List');
  });
});
