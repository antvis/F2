/** @jsx jsx */
import { jsx, Canvas, Chart, Line, Axis } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const countries = [
  'Finland',
  'France',
  'Germany',
  'Iceland',
  'Norway',
  'Poland',
  'Russia',
  // 'United Kingdom',
];

function EndView(props) {
  const { origin } = props;
  return (
    <group
      style={{
        paddingLeft: '10px',
      }}
    >
      <text
        style={{
          fill: '#808080',
          fontSize: '24px',
          text: `${origin.emoji}${origin.country}`,
          textBaseline: 'bottom',
        }}
      />
    </group>
  );
}

fetch('https://gw.alipayobjects.com/os/antfincdn/QAwcqeD6Fa/line-race.json')
  .then((res) => res.json())
  .then((data) => {
    const chartData = data.filter((item) => {
      return countries.includes(item.country);
    });
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          data={chartData}
          style={{
            padding: ['30px', '140px', '30px', '30px'],
          }}
        >
          <Axis field="year" tickCount={5} />
          <Axis field="income" />
          <Line
            x="year"
            y="income"
            color="country"
            animation={{
              appear: {
                duration: 5000,
              },
            }}
            endView={EndView}
          />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
