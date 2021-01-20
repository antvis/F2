
import { renderJSXElement, jsx, Fragment } from '../src';

const ViewA = () => {
  return <text />
}

const ViewB = () => {
  return <group>
    <ViewA />
    <>
      <text />
    </>
  </group>
}

describe('renderJSXElement', () => {
  it('renderJSXElement', () => {
    const view = renderJSXElement(<ViewB />, { a: 1 });
    expect(view.type).toBe('group');
    expect(view.props.children.length).toBe(2);
    expect(view.props.children[0].type).toBe('text');
    expect(view.props.children[1].type).toBe('text');
  })
});
