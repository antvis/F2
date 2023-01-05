import { jsx, Canvas, Component, Timeline } from '../../src';
import { createContext } from '../util';
const context = createContext();

class Test extends Component {
  render() {
    const { props } = this;
    const { index, width = 0 } = props;
    return (
      <group>
        <rect
          attrs={{
            x: 0,
            y: 0,
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
        <text
          attrs={{
            x: 0,
            y: 30,
            text: `${index}`,
            fill: '#000',
            fontSize: '30px',
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
            return <Test index={index} width={v} />;
          })}
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
  });
});
