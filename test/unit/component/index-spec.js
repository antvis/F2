import { expect } from 'chai';
import * as Component from '../../../src/component';

describe('Component Entry', () => {
  it('Type of Component', () => {
    expect(Component).to.have.all.keys('Axis', 'Guide', 'Tooltip', 'List', '__esModule');
  });
});
