import { Canvas, Chart, withInterval } from '../../../src';
import { jsx, Fragment } from '../../../src';
import { createContext, delay } from '../../util';

const data = [
  {
    name: '芳华',
    percent: 0.4,
    a: '1',
  },
  {
    name: '妖猫传',
    percent: 0.2,
    a: '1',
  },
  {
    name: '机器之血',
    percent: 0.18,
    a: '1',
  },
  {
    name: '心理罪',
    percent: 0.15,
    a: '1',
  },
  {
    name: '寻梦环游记',
    percent: 0.05,
    a: '1',
  },
  {
    name: '其他',
    percent: 0.02,
    a: '1',
  },
];

const Interval = withInterval((props, context) => {
  const { records } = props;
  const { px2hd } = context;
  return (
    <Fragment>
      <group>
        {records.map((record) => {
          const { key, children } = record;
          return (
            <group key={key}>
              {children.map((item) => {
                const { key, xMin, xMax, yMin, yMax, color, shape, origin } = item;
                if (isNaN(xMin) || isNaN(xMax) || isNaN(yMin) || isNaN(yMax)) {
                  return null;
                }
                return (
                  <group>
                    <rect
                      key={key}
                      attrs={{
                        x: xMin,
                        y: yMin,
                        width: xMax - xMin,
                        height: yMax - yMin,
                        fill: color,
                        ...shape,
                      }}
                    />
                    <text
                      attrs={{
                        x: xMin + (xMax - xMin) / 2,
                        y: yMin + (yMax - yMin) / 2,
                        fill: '#fff',
                        text: origin.percent * 100 + '%',
                        textAlign: 'center',
                        textBaseline: 'middle',
                      }}
                    />
                  </group>
                );
              })}
            </group>
          );
        })}
      </group>
      <group
        style={{
          display: 'flex',
        }}
      >
        {records.map((record, index) => {
          const { children } = record;
          return (
            <group>
              {children.map((item) => {
                const { origin, xMin, xMax, yMin, yMax, color } = item;
                const yCenter = yMin + (yMax - yMin) / 2;
                const xCenter = xMin + (xMax - xMin) / 2;
                return (
                  <group style={{ paddingBottom: '10px' }}>
                    <text
                      attrs={{
                        fill: color,
                        text: origin.name,
                        fontSize: '26px',
                        top: '160px',
                        left: '30px',
                      }}
                    />
                    {index === 0 ? (
                      <polyline
                        attrs={{
                          points: [
                            [xCenter, px2hd('170px') + px2hd('36px') * index],
                            [xCenter, '140px'],
                          ],
                          stroke: color,
                        }}
                      />
                    ) : (
                      <polyline
                        attrs={{
                          points: [
                            [px2hd('200px'), px2hd('176px')],
                            [xCenter, px2hd('176px')],
                            [xCenter, px2hd('140px') - px2hd('45px') * index],
                          ],
                          stroke: color,
                        }}
                      />
                    )}
                  </group>
                );
              })}
            </group>
          );
        })}
      </group>
    </Fragment>
  );
});

describe('图例', () => {
  it('饼图图例', async () => {
    const context = createContext('饼图图例');
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart
          data={data}
          coord={{
            transposed: true,
          }}
          style={{
            height: '160px',
          }}
        >
          <Interval x="a" y="percent" adjust="stack" color="name" sizeRatio={1} />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
