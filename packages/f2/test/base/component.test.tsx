import { Canvas, Component, jsx } from '../../src';
import { createContext, delay } from '../util';

describe('base/component', () => {
  it('子组件的 View props 更新后，则重新渲染', async () => {
    const context = createContext('组件props更新后重绘');
    const mockCallback = jest.fn();

    class StatedComponent extends Component {
      didMount() {
        this.setState({ active: true });
      }
      render() {
        const { state } = this;
        const { active } = state;
        mockCallback(active);
        return (
          <rect
            attrs={{
              fill: active ? 'red' : 'green',
              height: '100px',
              width: '100px',
            }}
          />
        );
      }
    }

    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <StatedComponent />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(50);

    expect(mockCallback.mock.calls).toEqual([[undefined], [true]]);
  });

  it('destroy 组件不再更新', async () => {
    const context = createContext('组件销毁后不再更新');
    const mockCallback = jest.fn();

    class StatedComponent extends Component {
      didMount() {
        this.setState({ active: true }, mockCallback);
      }
      render() {
        const { state } = this;
        const { active } = state;
        return (
          <rect
            attrs={{
              fill: active ? 'red' : 'green',
              height: '100px',
              width: '100px',
            }}
          />
        );
      }
    }

    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <StatedComponent />
        <StatedComponent />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    const newChildren = <StatedComponent />;
    await canvas.update({ children: newChildren });

    await delay(500);
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
