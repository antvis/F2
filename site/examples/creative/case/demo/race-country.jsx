/** @jsx jsx */
import { jsx, Canvas, Chart, Timeline, Axis, Interval, TextGuide } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

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
        style={{
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

fetch('https://gw.alipayobjects.com/os/antfincdn/XaPUX1Tqp0/race-country.json')
  .then((res) => res.json())
  .then((data) => {
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
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
                <Axis
                  field="income"
                  style={{
                    label: {
                      align: 'between',
                    },
                  }}
                />
                <Interval
                  x="country"
                  y="income"
                  color="country"
                  animation={{
                    appear: {
                      easing: 'linear',
                      duration: 300,
                      property: ['width'],
                      start: {
                        width: 0,
                      },
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
