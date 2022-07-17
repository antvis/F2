/** @jsxImportSource @antv/f2 */
import { Component } from '@antv/f2';
import Canvas from '../../src';
import { createContext, delay } from '../util';
import imageBianzu from './images/bianzu';

function View() {
  return (
    <group>
      <rect
        attrs={{
          x: '10px',
          y: '10px',
          width: '80px',
          height: '80px',
          fill: 'red',
        }}
      />
      <circle
        attrs={{
          x: '150px',
          y: '50px',
          r: '50px',
          fill: 'red',
        }}
      />
      <polyline
        attrs={{
          points: [
            { x: '210px', y: '20px' },
            { x: '220px', y: '40px' },
            { x: '250px', y: '45px' },
            { x: '300px', y: '80px' },
          ],
          lineWidth: '4px',
          stroke: 'red',
        }}
      />
    </group>
  );
}

function FragFunction() {
  return (
    <rect
      attrs={{
        x: '10px',
        y: '10px',
        width: '80px',
        height: '80px',
        fill: 'red',
      }}
    />
  );
}

class FragComponent extends Component {
  render() {
    return (
      <rect
        attrs={{
          x: '10px',
          y: '10px',
          width: '80px',
          height: '80px',
          fill: 'red',
        }}
      />
    );
  }
}

describe('Canvas', () => {
  it('图形绘制', async () => {
    const App = (
      // @ts-ignore
      <Canvas animate={false} pixelRatio={1}>
        <View transformFrom={{}} />
      </Canvas>
    );
    const context = createContext(App);
    await delay(100);
    expect(context).toMatchImageSnapshot();
  });

  it('Fragment Function', async () => {
    const App = (
      // @ts-ignore
      <Canvas animate={false} pixelRatio={1}>
        <FragFunction transformFrom={{}} />
      </Canvas>
    );
    const context = createContext(App);
    await delay(100);
    expect(context).toMatchImageSnapshot();
  });

  it('Fragment Component', async () => {
    const App = (
      // @ts-ignore
      <Canvas animate={false} pixelRatio={1}>
        <FragComponent />
      </Canvas>
    );
    const context = createContext(App);
    await delay(100);
    expect(context).toMatchImageSnapshot();
  });

  describe('rect', () => {
    it('rect', async () => {
      const App = (
        // @ts-ignore
        <Canvas animate={false} pixelRatio={1}>
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
            <rect
              attrs={{
                x: '60px',
                y: '10px',
                width: '40px',
                height: '40px',
                fill: 'red',
                radius: '8px',
              }}
            />

            <rect
              attrs={{
                x: '10px',
                y: '60px',
                width: '40px',
                height: '40px',
                fill: 'red',
                radius: [4, 0],
              }}
            />
            <rect
              attrs={{
                x: '60px',
                y: '60px',
                width: '40px',
                height: '40px',
                fill: 'red',
                radius: ['8px', 0],
              }}
            />
            <rect
              attrs={{
                x: '110px',
                y: '60px',
                width: '40px',
                height: '40px',
                fill: 'red',
                radius: [0, '8px'],
              }}
            />
            <rect
              attrs={{
                x: '10px',
                y: '110px',
                width: '40px',
                height: '40px',
                fill: 'red',
                radius: ['8px', '8px', 0, 0],
              }}
            />
          </group>
        </Canvas>
      );
      const context = createContext(App);
      await delay(100);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('image', () => {
    it('image', async () => {
      const App = (
        // @ts-ignore
        <Canvas animate={false} pixelRatio={1}>
          <image
            attrs={{
              src: imageBianzu,
              width: '200px',
              height: '200px',
            }}
          />
        </Canvas>
      );
      const context = createContext(App);
      await delay(100);
      expect(context).toMatchImageSnapshot();
    });

    it('createImage', async () => {
      const createImageCallback = jest.fn();
      const App = (
        // @ts-ignore
        <Canvas
          animate={false}
          pixelRatio={1}
          createImage={() => {
            createImageCallback();
            return new Image();
          }}
        >
          <image
            attrs={{
              src: imageBianzu,
              width: '200px',
              height: '200px',
            }}
          />
        </Canvas>
      );
      const context = createContext(App);
      await delay(100);
      expect(context).toMatchImageSnapshot();
      expect(createImageCallback.mock.calls.length).toBe(1);
    });

    it('image 绘制层级', async () => {
      const App = (
        // @ts-ignore
        <Canvas animate={false} pixelRatio={1}>
          <group>
            <image
              attrs={{
                src:
                  'https://gw.alipayobjects.com/mdn/zhima_credit/afts/img/A*Ckg-R4Md9MgAAAAAAAAAAAAAARQnAQ',
                width: '200px',
                height: '200px',
              }}
            />
            <rect
              attrs={{
                x: '100px',
                y: '100px',
                width: '60px',
                height: '60px',
                fill: '#000',
              }}
            />
          </group>
        </Canvas>
      );
      const context = createContext(App);
      await delay(500);
      expect(context).toMatchImageSnapshot();
    });
  });
});
