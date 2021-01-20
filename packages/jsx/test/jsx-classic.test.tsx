import { jsx, Fragment } from '../src';

describe('jsx classic 模式', () => {
  it('tagName', () => {
    const ref = {};
    const group = (
      <group a={1} ref={ ref }>
        <text />
      </group>
    );
    console.log(group);
    expect(group.type).toBe('group');
    expect(group.props.a).toBe(1);
    expect(group.children.length).toBe(1);
  })

  it('fragment', () => {
    const fragment = (
      <>
        <text />
      </>
    )
    console.log(fragment);
  });
});
