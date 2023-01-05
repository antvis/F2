import {
  jsx,
  Canvas,
  Chart,
  Timeline,
  Axis,
  Interval,
  Point,
  TextGuide,
  ImageGuide,
} from '../../src';
import { createContext } from '../util';
import data from './data/dynamic-bubble.json';

const context = createContext('动态排序-气泡图', {
  width: '350px',
  height: '400px',
});

function Year(props) {
  const { coord, year } = props;
  const { left, top, width, height } = coord;
  const x = left + width / 2;
  const y = top + height / 2;
  return (
    <group>
      <text
        attrs={{
          x,
          y,
          text: year,
          textAlign: 'center',
          textBaseline: 'middle',
          fontSize: '220px',
          fontWeight: 'bold',
          fill: '#ddd',
        }}
      />
    </group>
  );
}

const colorsMap = {
  'Europe & Central Asia': '#f49d37',
  'East Asia & Pacific': '#f03838',
  'South Asia': '#35d1d1',
  'Middle East & North Africa': '#5be56b',
  'Sub-Saharan Africa': '#4e7af0',
  America: '#ebcc21',
};

const countrys = [
  'Australia',
  'Canada',
  'China',
  'Cuba',
  'Finland',
  'France',
  'Germany',
  'Iceland',
  'India',
  'Japan',
  'North Korea',
  'South Korea',
  'New Zealand',
  'Norway',
  'Poland',
  'Russia',
  'Turkey',
  'United Kingdom',
  'United States',
];

describe('Chart', () => {
  it('Chart render', async () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        {/* <Timeline>
          {Object.keys(data).map((year) => {
            return (
              <Chart
                data={data[year]}
                scale={{
                  life: {
                    min: 0,
                    max: 100,
                  },
                  income: {
                    min: 0,
                    max: 80000,
                  },
                }}
              >
                <Year year={year} />
                <Axis field="income" animate={false} />
                <Axis field="life" animate={false} />
                <Point
                  x="income"
                  y="life"
                  color={{
                    field: 'country',
                    // callback: (type) => {
                    //   return '#f49d37';
                    // },
                  }}
                  size={{
                    field: 'population',
                    callback: (value) => {
                      return Math.sqrt(value) / 1000;
                    },
                  }}
                />
              </Chart>
            );
          })}
        </Timeline> */}
        <Timeline delay={50}>
          {Object.keys(data)
            .slice(100)
            .map((year) => {
              return (
                <Chart
                  data={data[year].filter((item) => countrys.indexOf(item.country) > -1)}
                  scale={{
                    population: {
                      type: 'pow',
                      exponent: 2,
                    },
                    life: {
                      min: 0,
                      max: 90,
                      tickInterval: 10,
                    },
                    income: {
                      type: 'log',
                      max: 150000,
                      min: 100,
                      alias: 'Income',
                    },
                    // country: {
                    //   values: ['China'],
                    // },
                    // continent: {
                    //   values: [
                    //     // 'East Asia & Pacific',
                    //     // 'South Asia',
                    //     // 'Sub-Saharan Africa',
                    //     // 'Middle East & North Africa',
                    //     // 'Europe & Central Asia',
                    //     'America',
                    //   ],
                    // },
                  }}
                >
                  <Year year={year} />
                  <Axis field="income" animate={false} />
                  <Axis field="life" animate={false} />
                  <Point
                    x="income"
                    y="life"
                    color={{
                      field: 'country',
                      // callback: (type) => {
                      //   return '#f49d37';
                      // },
                    }}
                    size={{
                      field: 'population',
                      callback: (value) => {
                        return Math.sqrt(value) / 1000;
                      },
                    }}
                  />
                </Chart>
              );
            })}
        </Timeline>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
  });
});
