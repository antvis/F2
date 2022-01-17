import { jsx, Canvas, Chart, Timeline, Axis, Interval, TextGuide, ImageGuide } from '../../src';
import { createContext } from '../util';
import data from './data/race-country.json';

const context = createContext('动态排序-收入排名变化', {
  width: '300px',
  height: '500px',
});

function sort(data) {
  return data.sort((a, b) => {
    return a.income - b.income;
  });
}

function Year(props) {
  const { coord, year } = props;
  const { bottom, right } = coord;
  return (
    <group>
      <text
        attrs={{
          x: right,
          y: bottom,
          text: year,
          textAlign: 'end',
          textBaseline: 'bottom',
          fontSize: '80px',
          // fontWeight: 'bold',
          fill: '#ddd',
        }}
      />
    </group>
  );
}

describe('Chart', () => {
  it('Chart render', () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Timeline delay={10}>
          {Object.keys(data).map((year) => {
            return (
              <Chart
                data={sort(data[year])}
                coord={{
                  transposed: true,
                }}
              >
                <Year year={year} />
                <Axis field="country" />
                <Axis field="income" />
                <Interval
                  x="country"
                  y="income"
                  color="country"
                  animation={{
                    appear: {
                      duration: 100,
                    },
                    update: {
                      duration: 1000,
                    },
                  }}
                />
                {data[year].map((record) => {
                  return (
                    <TextGuide
                      key={record.country}
                      records={[record]}
                      content={record.emoji}
                      offsetX={4}
                      style={{
                        fill: '#666',
                        fontSize: '40px',
                        textBaseline: 'middle',
                      }}
                      animation={{
                        appear: {
                          duration: 100,
                        },
                        update: {
                          duration: 1000,
                        },
                      }}
                    />
                  );
                })}
              </Chart>
            );
          })}
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
