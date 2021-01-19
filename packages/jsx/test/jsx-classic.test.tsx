/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '../src';

describe('jsx classic 模式', () => {
  it('tagName', () => {
    const group = (
      <group a={1}>
        <text />
      </group>
    );
    expect(group.type).toBe('group');
    expect(group.props.a).toBe(1);
    expect(group.children.length).toBe(1);
  })
});
