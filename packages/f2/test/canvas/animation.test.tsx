import { jsx, Canvas } from '../../src';
import { createContext, delay } from '../util';

describe('Canvas', () => {
  it('clip function', async () => {
    const clipFn = jest.fn();
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <group>
          <rect
            attrs={{
              x: 0,
              y: 0,
              width: 50,
              height: 50,
              fill: 'red',
            }}
            animation={{
              appear: {
                easing: 'linear',
                clip: {
                  type: 'rect',
                  property: ['width'],
                  duration: 1000,
                  style: {
                    x: 0,
                    y: 0,
                    height: 50,
                  },
                  start: {
                    width: 0,
                  },
                  end: {
                    width: 50,
                  },
                },
              },
            }}
          />
          <rect
            attrs={{
              x: 60,
              y: 60,
              width: 50,
              height: 50,
              fill: 'red',
            }}
            animation={{
              appear: {
                easing: 'linear',
                clip: (attrs) => {
                  clipFn(attrs);
                  return {
                    type: 'rect',
                    property: ['width'],
                    duration: 1000,
                    style: {
                      x: 0,
                      y: 0,
                      // x: attrs.x,
                      // y: attrs.y,
                      height: attrs.height,
                    },
                    start: {
                      width: 0,
                    },
                    end: {
                      width: 50,
                    },
                  };
                },
              },
            }}
          />
        </group>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    expect(clipFn.mock.calls[0][0]).toMatchObject({
      x: 60,
      y: 60,
      width: 50,
      height: 50,
      fill: 'red',
    });
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
