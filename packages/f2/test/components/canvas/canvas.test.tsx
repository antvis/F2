import { jsx } from '../../../src/jsx';
import { createContext } from '../../util';
import { Canvas, Component } from '../../../src';
const context = createContext();

class Test extends Component {
  render() {
    return (
      <rect
        attrs={{
          x: 10,
          y: 10,
          width: 10,
          height: 10,
          fill: 'red',
        }}
      />
    );
  }
}

describe.skip('Canvas', () => {
  it('初始化', () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Test />
      </Canvas>
    );

    // @ts-ignore
    const canvas: Canvas = new type(props);
    const testComponent = canvas.props.children.type;

    expect(context.canvas.width).toBe(200);
    expect(context.canvas.height).toBe(150);

    expect(testComponent).toBe(Test);

    canvas.render();

    // @ts-ignore
    const rect = canvas.children.component.container._attrs.children[0];
    expect(rect._attrs.type).toBe('rect');
    expect(rect._attrs.attrs.fill).toBe('red');
  });
});
