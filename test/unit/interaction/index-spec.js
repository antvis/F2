import { expect } from 'chai';
import * as Interaction from '../../../src/interaction/';

describe('Current Interactions', () => {
  it('Type of Interactions', () => {
    expect(Interaction).to.have.all.keys('Interaction', 'PieSelect', 'IntervalSelect', 'Pan', 'Pinch', 'Swipe', '__esModule');
  });
});
