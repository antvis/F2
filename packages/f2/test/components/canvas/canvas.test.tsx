import { jsx } from '../../../src/jsx';
import { createContext } from '../../util';
import { Canvas, Component } from '../../../src';
const context = createContext('', {
  width: '300px',
  height: '300px',
});

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

describe('Canvas', () => {
  it('初始化', () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Test />
      </Canvas>
    );

    const canvas = new Canvas(props);
    const testComponent = canvas.props.children.type;

    expect(context.canvas.width).toBe(300);
    expect(context.canvas.height).toBe(300);

    expect(testComponent).toBe(Test);

    canvas.render();

    const rect = canvas.children.component.container._attrs.children[0];
    expect(rect._attrs.type).toBe('rect');
    expect(rect._attrs.attrs.fill).toBe('red');
  });
});
