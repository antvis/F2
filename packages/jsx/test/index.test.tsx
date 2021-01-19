/** @jsxImportSource .. */

// @ts-nocheck
describe('test', () => {
  it('test', () => {
    const group = (
      <group a={1}><text /></group>
    );
    expect(group.type).toBe('group');
    expect(group.props.a).toBe(1);
    expect(group.children.length).toBe(1);
  })
});
