import { jsx } from '../../src';
import { Canvas, Chart, Component } from '../../src';
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
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart>
          <StatedComponent />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(50);

    expect(mockCallback.mock.calls).toEqual([[undefined], [true]]);
  });
});
