import { jsx, Canvas, Fragment, Component } from '../../src';
import { createContext, delay } from '../util';
import { Smooth } from '@antv/f-engine';
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
          cx: '150px',
          cy: '50px',
          r: '50px',
          fill: 'red',
        }}
      />
      <polyline
        attrs={{
          points: [
            ['210px', '20px'],
            ['220px', '40px'],
            ['250px', '45px'],
            ['300px', '80px'],
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
    await canvas.render();

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
    await canvas.render();

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
    await canvas.render();

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
      await canvas.render();

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
      await canvas.render();

      await delay(500);
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
      await canvas.render();

      await delay(500);
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
      await canvas.render();

      await delay(500);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('clip', () => {
    it('custom clip', async () => {
      const context = createContext('custom clip');
      const points1 = [
        [10, 20],
        [20, 40],
        [50, 45],
        [100, 80],
        [200, 80],
      ] as [number, number][];

      const points2 = [
        [10, 40],
        [20, 60],
        [50, 20],
        [100, 90],
        [200, 70],
      ] as [number, number][];

      const clipPoints = [...points1];
      clipPoints.push([200, 0], [0, 0]);
      const constraint = [
        [0, 0],
        [1, 1],
      ];
      const topSps = Smooth.smooth(
        points1.map((d) => {
          return {
            x: d[0],
            y: d[1],
          };
        }),
        false,
        constraint
      );
      const bottomPoints = [...points2].reverse();
      const bottomSps = Smooth.smooth(
        bottomPoints.map((d) => {
          return {
            x: d[0],
            y: d[1],
          };
        }),
        false,
        constraint
      );
      const bezierTopPoints = [];
      for (const sp of topSps) {
        bezierTopPoints.push(['C', sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
      }
      const bezierBottomPoints = [];
      for (const sp of bottomSps) {
        bezierBottomPoints.push(['C', sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
      }

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
            <path
              attrs={{
                fill: 'red',
                fillOpacity: 0.5,
                path: [
                  ['M', points1[0][0], points1[0][1]],
                  ...bezierTopPoints,
                  ['L', bottomPoints[0][0], bottomPoints[0][1]],
                  ...bezierBottomPoints,
                ],
                clip: {
                  type: 'path',
                  style: {
                    path: [
                      ['M', points1[0][0], points1[0][1]],
                      ...bezierTopPoints,
                      ['L', 200, 0],
                      ['L', 0, 0],
                    ],
                  },
                },
              }}
            />
            {/* <path
              attrs={{
                fill: 'yellow',
                fillOpacity: 0.5,
                path: [
                  ['M', points1[0][0], points1[0][1]],
                  ...bezierTopPoints,
                  ['L', 200, 0],
                  ['L', 0, 0],
                ],
              }}
            /> */}
          </group>
        );
      };

      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Shape />
        </Canvas>
      );

      const canvas = new Canvas(props);
      await canvas.render();

      await delay(100);
      expect(context).toMatchImageSnapshot();
    });
  });
});
