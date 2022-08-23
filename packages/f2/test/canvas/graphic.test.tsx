import { jsx, Canvas, Fragment, Component } from '../../src';
import { createContext, delay } from '../util';
import { Smooth, BBox } from '@antv/f2-graphic';
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

  describe('rect', () => {
    it('rect', async () => {
      const context = createContext();
      const { props } = (
        <Canvas context={context} animate={false} pixelRatio={1}>
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

      const canvas = new Canvas(props);
      canvas.render();

      await delay(100);
      expect(context).toMatchImageSnapshot();
    });
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

    it('image 绘制层级', async () => {
      const context = createContext();
      const { props } = (
        <Canvas context={context} animate={false} pixelRatio={1}>
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

      const canvas = new Canvas(props);
      canvas.render();

      await delay(500);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('clip', () => {
    it('custom clip', () => {
      const context = createContext('custom clip');
      const points1 = [
        { x: 10, y: 20 },
        { x: 20, y: 40 },
        { x: 50, y: 45 },
        { x: 100, y: 80 },
        { x: 200, y: 80 },
      ];

      const points2 = [
        { x: 10, y: 40 },
        { x: 20, y: 60 },
        { x: 50, y: 20 },
        { x: 100, y: 90 },
        { x: 200, y: 70 },
      ];

      const clipPoints = [...points1];
      clipPoints.push({ x: 200, y: 0 }, { x: 0, y: 0 });
      const constraint = [
        [0, 0],
        [1, 1],
      ];
      const topSps = Smooth.smooth(points1, false, constraint);
      const bottomPoints = [...points2].reverse();
      const bottomSps = Smooth.smooth(bottomPoints, false, constraint);

      const Shape = () => {
        return (
          <group>
            <polyline
              attrs={{
                points: points1,
                lineWidth: '4px',
                stroke: 'red',
                smooth: true,
              }}
            />
            <polyline
              attrs={{
                points: points2,
                lineWidth: '4px',
                stroke: 'blue',
                smooth: true,
              }}
            />
            <custom
              attrs={{
                // @ts-ignore
                points: [].concat(points1).concat([...points2].reverse()),
                fill: 'red',
                fillOpacity: 0.5,
                clip: {
                  type: 'custom',
                  attrs: {
                    points: clipPoints,
                  },
                  createPath: (context) => {
                    context.beginPath();
                    context.moveTo(points1[0].x, points1[0].y);
                    for (const sp of topSps) {
                      context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
                    }
                    context.lineTo(200, 0);
                    context.lineTo(0, 0);
                    context.closePath();
                  },
                  calculateBox: () => BBox.getBBoxFromPoints(clipPoints),
                },
              }}
              createPath={(context) => {
                context.beginPath();
                context.moveTo(points1[0].x, points1[0].y);
                for (const sp of topSps) {
                  context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
                }
                context.lineTo(bottomPoints[0].x, bottomPoints[0].y);
                for (const sp of bottomSps) {
                  context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
                }
                context.closePath();
              }}
            />
          </group>
        );
      };

      const { props } = (
        <Canvas context={context} pixelRatio={window.devicePixelRatio}>
          <Shape />
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();
    });
  });
});
