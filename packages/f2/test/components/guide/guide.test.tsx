import { jsx } from '../../../src/jsx';
import {
  Axis,
  Line,
  withGuide,
  ImageGuide,
  PointGuide,
  TextGuide,
  LineGuide,
} from '../../../src/components';
import { Canvas, Chart, Interval } from '../../../src';
import { createContext, delay } from '../../util';
import imageBianzu from './images/bianzu';

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

describe('Guide ', () => {
  it('image & text', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="genre" y="sold" color="type" />

          {data.map((item) => {
            const { sold } = item;
            return (
              <TextGuide
                records={[item]}
                onClick={(ev) => {
                  console.log('ev: ', ev.points);
                }}
                content={`${sold}`}
                attrs={{
                  fill: '#000',
                  fontSize: '24px',
                }}
                offsetY="-40px"
                offsetX="-30px"
              />
            );
          })}

          {/* 图片Guide */}
          {data.map((item, key) => {
            return (
              <ImageGuide
                records={[item]}
                onClick={(ev) => {
                  console.log('ev: ', ev.points);
                }}
                src={imageBianzu}
                attrs={{
                  height: 24,
                  width: 24,
                }}
                offsetX="0px"
                offsetY="-8px"
              />
            );
          })}
        </Chart>
      </Canvas>
    );
    const chart = new Canvas(props);
    chart.render();

    const container = chart.container;

    // 10个图例 和1条线
    expect(container._attrs.children[0]._attrs.children.length).toBe(11);

    await delay(250);
    expect(context).toMatchImageSnapshot();
  });

  it('point', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          {/* 折线 */}
          <Line x="genre" y="sold" color="type" />
          {data.map((item) => {
            return <PointGuide records={[item]} offsetX="0px" offsetY="0px" />;
          })}
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();

    const container = chart.container;
    expect(container._attrs.children[0]._attrs.children.length).toBe(6);

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });
  it('line', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          {/* 折线 */}
          <Line x="genre" y="sold" color="type" />
          {data.map((item) => {
            return (
              <LineGuide
                records={[
                  { genre: item.genre, sold: 'min' },
                  { genre: item.genre, sold: item.sold },
                ]}
                offsetY={['120px', 0]}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();

    const container = chart.container;
    expect(container._attrs.children[0]._attrs.children.length).toBe(6);

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });
  it('tag', () => {});

  it('使用min、max、median', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          {/* 折线 */}
          <Line x="genre" y="sold" color="type" />
          {data.map((item) => {
            return (
              <PointGuide
                records={[{ genre: item.genre, sold: 'min' }]}
                style={{ stroke: '#262626' }}
              />
            );
          })}
          {data.map((item) => {
            return (
              <PointGuide
                records={[{ genre: item.genre, sold: 'median' }]}
                style={{ stroke: '#FF6797' }}
              />
            );
          })}
          {data.map((item) => {
            return (
              <PointGuide
                records={[{ genre: item.genre, sold: 'max' }]}
                style={{ stroke: '#82DC95' }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });

  it('使用百分比字符串代表位置', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data} theme={{ padding: [0, 0, 0, 0] }}>
          {/* 折线 */}
          <Line x="genre" y="sold" color="type" />
          {data.map((item, index) => {
            return (
              <PointGuide
                records={[{ genre: item.genre, sold: '100%' }]}
                style={{ stroke: 'green' }}
              />
            );
          })}
          {data.map((item, index) => {
            return (
              <PointGuide
                records={[{ genre: item.genre, sold: '50%' }]}
                style={{ stroke: 'red' }}
              />
            );
          })}
          {data.map((item, index) => {
            return (
              <PointGuide
                records={[{ genre: item.genre, sold: '0%' }]}
                style={{ stroke: 'blue' }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });

  it('TextGuide 动画 - 支持callback配置', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            transposed: true,
          }}
        >
          <Interval
            x="genre"
            y="sold"
            color="type"
            animation={{
              appear: {
                duration: 1000,
                easing: 'quinticIn',
                property: ['width'],
              },
            }}
          />

          {data.map((item) => {
            const { sold } = item;
            return (
              <TextGuide
                records={[item]}
                onClick={(ev) => {
                  console.log('ev: ', ev.points);
                }}
                content={`${sold}`}
                attrs={{
                  fill: '#000',
                  fontSize: '24px',
                }}
                animation={(points, props) => {
                  return {
                    appear: {
                      easing: 'quinticIn',
                      duration: 1000,
                      property: ['x'],
                      start: {
                        x: props.coord.left,
                      },
                    },
                  };
                }}
              />
            );
          })}
        </Chart>
      </Canvas>
    );
    const chart = new Canvas(props);
    chart.render();

    await delay(1100);
    expect(context).toMatchImageSnapshot();
  });
});
