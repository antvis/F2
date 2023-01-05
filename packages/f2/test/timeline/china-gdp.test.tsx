import { jsx, Canvas, Chart, Timeline, Axis, Interval, TextGuide } from '../../src';
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
  it('Chart render', async () => {
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
                <Axis field="city" />
                <Axis field="value" />
                <Interval x="city" y="value" color="city" />
                {data[year].map((record) => {
                  return (
                    <TextGuide
                      key={record.city}
                      records={[record]}
                      content={Number(record.value).toFixed(2)}
                      offsetX={4}
                      attrs={{
                        fill: '#666',
                        fontSize: '30px',
                        textBaseline: 'middle',
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
    await canvas.render();
  });
});
