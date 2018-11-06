const expect = require('chai').expect;
const Interaction = require('../../../src/interaction/');

describe('Current Interactions', () => {
  it('Type of Interactions', () => {
    expect(Interaction).to.have.all.keys('Interaction', 'PieSelect', 'IntervalSelect', 'Pan', 'Pinch', 'Swipe');
  });
});
