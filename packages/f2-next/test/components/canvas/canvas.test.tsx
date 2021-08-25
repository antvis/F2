import { jsx } from '../../../lib/jsx';
import Canvas, { Component } from '../../../lib/components';
import { createContext } from '../util';
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
          fill: 'red'
        }}
      />
    );
  }
}

describe('Canvas', () => {
  it('初始化', () => {
    const { type, props } = (
      <Canvas context={ context } pixelRatio={ 1 }>
        <Test />
      </Canvas>
    )

    // @ts-ignore
    const canvas: Canvas = new type(props);
    const testComponent = canvas.component.components;

    expect(context.canvas.width).toBe(359);
    expect(context.canvas.height).toBe(400);

    expect(testComponent).toBeInstanceOf(Test);

    canvas.render();

    // @ts-ignore
    const rect = testComponent.container._attrs.children[0];
    expect(rect._attrs.type).toBe('rect');
    expect(rect._attrs.attrs.fill).toBe('red');
  });
});