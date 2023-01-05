import { jsx, Fragment, Canvas, Component, Timeline } from '../../src';
import { createContext } from '../util';
const context = createContext();

class Test extends Component {
  render() {
    const { props } = this;
    const { index, top = 0, width = 0 } = props;
    return (
      <group>
        <rect
          attrs={{
            x: 0,
            y: top,
            fill: 'red',
            width,
            height: 10,
          }}
          animation={{
            appear: {
              easing: 'linear',
              duration: 300,
              property: ['width'],
              start: {
                width: 0,
              },
              end: {},
            },
            update: {
              easing: 'linear',
              duration: 300,
              property: ['width'],
            },
          }}
        />
      </group>
    );
  }
}

describe('Timeline', () => {
  it('timeline 播放', async () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Timeline delay={1000} start={0}>
          {[10, 100, 60, 200, 30].map((v, index) => {
            return (
              <>
                <Test index={index} width={v} />
                <Test top={20} width={v} />
              </>
            );
          })}
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
  });
});
