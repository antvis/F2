import { jsx } from '../../../src/jsx';
import { createContext } from '../../util';
import { Canvas, Component } from '../../../src';
const context = createContext();

const onFrame = jest.fn();
const onEnd = jest.fn();

class Test extends Component {
  render() {
    return (
      <rect
        attrs={{
          x: 10,
          y: 10,
          width: 0,
          height: 10,
          fill: 'red',
        }}
        animation={{
          appear: {
            easing: 'linear',
            duration: 10,
            property: ['width'],
            start: {
              width: 10,
            },
            end: {
              width: 100,
            },
            onFrame,
            onEnd,
          },
        }}
      />
    );
  }
}

describe('Canvas', () => {
  it('测试动画', (done) => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Test />
      </Canvas>
    );

    const canvas = new Canvas(props);
    const testComponent = canvas.children;

    canvas.render();
    const rect = canvas.children.component.container._attrs.children[0];

    expect(rect._attrs.attrs.width).toBe(10);

    // 动画结束后
    setTimeout(() => {
      expect(rect._attrs.attrs.width).toBe(100);
      expect(onFrame.mock.calls.length > 1).toBe(true);
      expect(onEnd.mock.calls.length).toBe(1);
      done();
    }, 100);
  });
});
