import { jsx } from '../../src';
import { Canvas, Chart, Component } from '../../src';
import { createContext } from '../util';

describe('base/component', () => {
  it('子组件的 View props 更新后，则重新渲染', () => {
    const context = createContext('组件props更新后重绘');

    class StatedComponent extends Component {
      didMount() {
        this.setState({ active: true });
      }
      render() {
        const { state } = this;
        const { active } = state;
        return (
          <rect
            attrs={{
              fill: 'red',
              height: '100px',
              width: '100px',
              fillOpacity: active ? 0.1 : 1,
            }}
          />
        );
      }
    }

    const { type, props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart>
          <StatedComponent />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
});
