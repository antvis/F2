import { jsx, Canvas, Fragment, Component } from '../../src';
import { createContext, delay } from '../util';

describe('Canvas Event', () => {
  it('afterdraw animate false', async () => {
    const context = createContext();
    const onAfterDraw = jest.fn();

    const { props } = (
      <Canvas
        context={context}
        animate={false}
        pixelRatio={1}
        onAfterDraw={() => {
          onAfterDraw();
          // 断言是否真实渲染完成
          expect(context).toMatchImageSnapshot();
        }}
      >
        <group>
          <rect
            attrs={{
              x: '10px',
              y: '10px',
              width: '40px',
              height: '40px',
              fill: 'red',
              radius: 4,
            }}
          />
        </group>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(300);
    expect(onAfterDraw.mock.calls.length).toBe(1);
  });

  it('afterdraw animate true', async () => {
    const context = createContext();
    const onAfterDraw = jest.fn();
    const { props } = (
      <Canvas
        context={context}
        animate={true}
        pixelRatio={1}
        onAfterDraw={() => {
          onAfterDraw();
        }}
      >
        <group>
          <rect
            attrs={{
              x: '10px',
              y: '10px',
              width: '40px',
              height: '40px',
              fill: 'red',
              radius: 4,
            }}
            animation={{
              appear: {
                easing: 'linear',
                duration: 300,
                delay: 0,
                property: ['x'],
              },
            }}
          />
        </group>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(300);
    expect(onAfterDraw.mock.calls.length > 1).toBe(true);
  });
});
