import { jsx, Canvas, Chart } from '../../../src';
import {
  ImageGuide,
  Line,
  LineGuide,
  PointGuide,
  TextGuide,
  RectGuide,
  withGuide,
  LottieGuide,
  withLegend,
  Interval,
} from '../../../src/components';
import { createContext, delay } from '../../util';
import imageBianzu from './images/bianzu';

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

const Guide = withGuide((props) => {
  const { fill } = props;
  return (
    <group>
      <rect
        attrs={{
          x: '60px',
          y: '100px',
          width: '80px',
          height: '80px',
          fill,
        }}
      />
    </group>
  );
});

describe('Guide ', () => {
  it('自定义 guide & zIndex', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="genre" y="sold" />
          <Guide records={[data[2], data[3]]} zIndex={100} fill="red" />
          <Guide records={[data[3], data[4]]} fill="black" />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();

    await delay(50);
    expect(context).toMatchImageSnapshot();

    const newChartProps = (
      <Chart data={data}>
        <Line x="genre" y="sold" />
        <Guide records={[data[2], data[3]]} fill="red" />
        <Guide records={[data[3], data[4]]} fill="black" />
      </Chart>
    );
    chart.update({ children: newChartProps });
    await delay(50);
    expect(context).toMatchImageSnapshot();
  });

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
                style={{
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
                style={() => {
                  return {
                    height: 24,
                    width: 24,
                  };
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
    await chart.render();
    await delay(0);

    const container = chart.container;

    // 10个图例 和1条线
    expect(container.children[0].children[0].children.length).toBe(11);

    await delay(500);
    expect(context).toMatchImageSnapshot();
  });

  it('image guide支持px传入', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="genre" y="sold" color="type" />

          {data.map((item) => {
            const { sold } = item;
            return (
              <ImageGuide
                records={[item]}
                src={imageBianzu}
                style={() => {
                  return {
                    height: 24,
                    width: 24,
                  };
                }}
              />
            );
          })}

          {/* 图片Guide */}
          {data.map((item, key) => {
            return (
              <ImageGuide
                records={[item]}
                src={imageBianzu}
                style={() => {
                  return {
                    height: '24px',
                    width: '24px',
                  };
                }}
                offsetX="0px"
                offsetY="-24px"
              />
            );
          })}
        </Chart>
      </Canvas>
    );
    const chart = new Canvas(props);
    await chart.render();

    await delay(500);
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
    await delay(0);

    const container = chart.container;
    expect(container.children[0].children[0].children.length).toBe(6);

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
    await delay(0);

    const container = chart.container;
    expect(container.children[0].children[0].children.length).toBe(6);

    await delay(50);
    expect(context).toMatchImageSnapshot();
  });
  it('tag', () => {});

  it('rect guide', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="genre" y="sold" color="type" />
          <RectGuide
            records={[data[0], data[1]]}
            style={{ fill: 'yellow', fillOpacity: 0.5 }}
            offsetX="-24px"
            offsetY="24px"
          />
        </Chart>
      </Canvas>
    );
    const chart = new Canvas(props);
    chart.render();
    await delay(50);
    expect(context).toMatchImageSnapshot();
  });
  it('guide 超出范围', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="genre" y="sold" color="type" />
          <PointGuide
            records={[{ genre: 'test', sold: 450, type: 'a' }]}
            offsetX="0px"
            offsetY="0px"
          />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
    await delay(50);
    expect(context).toMatchImageSnapshot();
  });
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
                duration: 100,
                easing: 'quinticIn',
                property: ['width', 'y', 'height'],
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
                animation={(points, chart) => {
                  return {
                    appear: {
                      easing: 'quinticIn',
                      duration: 100,
                      property: ['x'],
                      start: {
                        x: chart.layout.left,
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
    await chart.render();

    await delay(1100);
    expect(context).toMatchImageSnapshot();
  });

  it('lottie guide', async () => {
    const context = createContext();
    const Legend = withLegend((props) => {
      const { items, itemWidth } = props;

      return (
        <group
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {items.map((item) => {
            const { color, name } = item;
            return (
              <group
                className="legend-item"
                style={{
                  width: itemWidth,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                data-item={item}
              >
                <text
                  attrs={{
                    fill: color,
                    text: name,
                  }}
                />
              </group>
            );
          })}
        </group>
      );
    });
    const url = await (
      await fetch(
        'https://gw.alipayobjects.com/os/OasisHub/3ccdf4d8-78e6-48c9-b06e-9e518057d144/data.json'
      )
    ).json();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Legend />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            animation={{
              appear: {
                duration: 500,
                easing: 'linear',
              },
            }}
          />
          {data.map((item) => {
            return (
              <LottieGuide
                offsetX="0px"
                offsetY="0px"
                records={[item]}
                lottieJson={url}
                style={{
                  height: 35,
                  width: 35,
                }}
                animation={(points, chart) => {
                  return {
                    appear: {
                      easing: 'linear',
                      duration: 500,
                      property: ['y'],
                      start: {
                        y: chart.layout.bottom,
                        height: 0,
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
    await chart.render();
  });
});
