import { jsx, Canvas, Fragment, Component } from '../../src';
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
    <>
      <rect
        attrs={{
          x: '10px',
          y: '10px',
          width: '80px',
          height: '80px',
          fill: 'red',
        }}
      />
    </>
  );
}

class FragComponent extends Component {
  render() {
    return (
      <>
        <rect
          attrs={{
            x: '10px',
            y: '10px',
            width: '80px',
            height: '80px',
            fill: 'red',
          }}
        />
      </>
    );
  }
}

describe('Canvas', () => {
  it('图形绘制', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <View />
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });

  it('Fragment Function', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <FragFunction />
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });

  it('Fragment Component', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} animate={false} pixelRatio={1}>
        <FragComponent />
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(100);
    expect(context).toMatchImageSnapshot();
  });

  describe('image', () => {
    it('image', async () => {
      const context = createContext();
      const { props } = (
        <Canvas context={context} animate={false} pixelRatio={1}>
          <image
            attrs={{
              src: imageBianzu,
              width: '200px',
              height: '200px',
            }}
          />
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      await delay(100);
      expect(context).toMatchImageSnapshot();
    });

    it('createImage', async () => {
      const createImageCallback = jest.fn();
      const context = createContext();
      const { props } = (
        <Canvas
          context={context}
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

      const canvas = new Canvas(props);
      canvas.render();

      await delay(100);
      expect(context).toMatchImageSnapshot();
      expect(createImageCallback.mock.calls.length).toBe(1);
    });
  });
});
