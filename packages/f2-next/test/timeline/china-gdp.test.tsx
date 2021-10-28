import { jsx, Canvas, Chart, Timeline, Axis, Interval } from '../../src';
import { createContext } from '../util';
import data from './data/china-gdp.json';

const context = createContext('动态排序-中国gdp变化', {
  width: '300px',
  height: '500px',
});

function sort(data) {
  return data.sort((a, b) => {
    return a.value - b.value;
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
                <Axis field="city" />
                <Axis field="value" />
                <Interval x="city" y="value" color="city" />
                <Year year={year} />
              </Chart>
            );
          })}
        </Timeline>
      </Canvas>
    );

    // @ts-ignored
    const canvas = new Canvas(props);
    canvas.render();
  });
});
