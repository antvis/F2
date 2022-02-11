import { jsx, Canvas, Chart, Timeline, Axis, Line, Interval, TextGuide } from '../../src';
import { createContext } from '../util';
import data from './data/line-race.json';

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

const chartData = data.filter((item) => {
  return countries.indexOf(item.country) >= 0;
});

const context = createContext('排名折线图', {
  width: '350px',
  height: '400px',
});

function EndView(props) {
  const { origin } = props;
  return (
    <group
      style={{
        paddingLeft: '10px',
      }}
    >
      <text
        attrs={{
          fill: '#808080',
          fontSize: '24px',
          text: `${origin.emoji}${origin.country}`,
          textBaseline: 'bottom',
        }}
      />
    </group>
  );
}

describe('Chart', () => {
  it('Chart render', () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
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

    const canvas = new Canvas(props);
    canvas.render();
  });
});
