import { render, renderJSXElement, jsx, Fragment, compareRenderTree } from '../../src/jsx';
import { createUpdater } from '../../src/base/updater';

const ViewA = () => {
  return <text />;
};

const ViewNull = () => {
  return null;
};

const ViewB = () => {
  return (
    <group>
      <ViewA />
      <text />
    </group>
  );
};

describe('renderJSXElement', () => {
  it('renderJSXElement', () => {
    const updater = createUpdater({});
    const view = renderJSXElement(<ViewB />, { a: 1 }, updater);
    expect(view.type).toBe('group');
    expect(view.props.children.length).toBe(2);
    expect(view.props.children[0].type).toBe('text');
    expect(view.props.children[1].type).toBe('text');
  });

  it('renderJSXElement return null', () => {
    const updater = createUpdater({});
    const empty = renderJSXElement(null, { a: 1 }, updater);
    expect(empty).toBeNull();

    const viewNull = renderJSXElement(<ViewNull />, { a: 1 }, updater);
    expect(viewNull).toBeNull();
  });
});
