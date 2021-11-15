import { render, renderJSXElement, jsx, Fragment, compareRenderTree } from '../../src/jsx';

describe('jsx classic 模式', () => {
  it('tagName one children', () => {
    const ref = {};
    const group = (
      <group a={1} ref={ref}>
        <text />
      </group>
    );

    expect(group.type).toBe('group');
    expect(group.ref === ref).toBe(true);
    expect(group.props.a).toBe(1);
    expect(group.props.children.type).toBe('text');
  });

  it('one children map', () => {
    const group = (
      <group>
        {[1, 2].map((item) => {
          return <text />;
        })}
      </group>
    );

    expect(group.props.children.length).toBe(2);
    expect(group.props.children[0].type).toBe('text');
  });

  it('tagName multiple children', () => {
    const ref = {};
    const group = (
      <group a={1} ref={ref}>
        <text />
        <text />
        {true ? null : <text />}
        {[1, 2].map((item) => {
          return <text />;
        })}
      </group>
    );

    expect(group.type).toBe('group');
    expect(group.ref === ref).toBe(true);
    expect(group.props.a).toBe(1);
    expect(group.props.children.length).toBe(4);
    expect(group.props.children[2]).toBe(null);
    expect(group.props.children[3].length).toBe(2);
    expect(group.props.children[3][0].type).toBe('text');
  });

  it('fragment', () => {
    const fragment = (
      <>
        <text />
      </>
    );
    expect(typeof fragment.type).toBe('function');
    expect(fragment.props.children.type).toBe('text');
  });
});
