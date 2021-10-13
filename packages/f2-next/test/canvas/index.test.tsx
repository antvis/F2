import { jsx, Canvas, Component } from '../../src';
import { createContext } from '../util';
const context = createContext();

class Test extends Component {
  render() {
    return (
      <group
        style={{
          width: '100px',
          height: '40px',
        }}
        attrs={{
          fill: '#1677FF',
          radius: '8px',
        }}
      >
        <text
          attrs={{
            text: '按钮',
            fill: '#fff',
            textAlign: 'center',
            fontSize: '20px',
            // x: 10,
            // y: 10,
            // width: 10,
            // height: 10,
            // fill: 'red',
          }}
        />
      </group>
    );
  }
}

describe('Canvas', () => {
  it('初始化', () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Test />
      </Canvas>
    );

    // @ts-ignored
    const canvas = new Canvas(props);
    canvas.render();
    // const testComponent = canvas.component.components;

    // expect(context.canvas.width).toBe(359);
    // expect(context.canvas.height).toBe(400);

    // expect(testComponent).toBeInstanceOf(Test);

    // canvas.render();

    // // @ts-ignore
    // const rect = testComponent.container._attrs.children[0];
    // expect(rect._attrs.type).toBe('rect');
    // expect(rect._attrs.attrs.fill).toBe('red');
  });
});
