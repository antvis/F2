// @ts-nocheck
import { jsx } from '../../src';
import { Polar } from '../../src/coord';
import { Canvas, Chart, Component } from '../../src';
import { Interval, Legend } from '../../src/components';
import { createContext } from '../util';

describe.skip('base/container', () => {
  it('子组件的 View props 更新后，则重新渲染', () => {
    const context = createContext('组件props更新后重绘');

    class StatedComponent extends Component {
      willMount() {
        super.willMount();

        // chart组件内有state
        this.chart.state = {
          active: false
        };
      }

      mount() {
        super.mount();
        setTimeout(() => {
          // 其他的组件更新了state
          this.chart.setState({ active: true });
        }, 1500);
      }
      render() {
        // 子组件消费state
        const { active } = this.chart.state;
        return (
          <rect
            attrs={{
              fill: 'red',
              height: '100px',
              width: '100px',
              fillOpacity: active ? 0.1 : 1
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
