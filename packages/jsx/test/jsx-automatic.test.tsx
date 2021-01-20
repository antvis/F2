/** @jsxRuntime automatic */
/** @jsxImportSource ../src */

import { render } from '../src';

describe('jsx automatic 模式', () => {
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
