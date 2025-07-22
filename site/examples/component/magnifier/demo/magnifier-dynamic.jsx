/** @jsx jsx */
import { Axis, Canvas, Chart, Component, jsx, Legend, Line, Magnifier } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  {
    date: '2017-06-05',
    value: 0.04,
  },
  {
    date: '2017-06-06',
    value: 0.04,
  },
  {
    date: '2017-06-07',
    value: 0.05,
  },
  {
    date: '2017-06-08',
    value: 0.03,
  },
  {
    date: '2017-06-09',
    value: 0.02,
  },
  {
    date: '2017-06-10',
    value: 0.03,
  },
  {
    date: '2017-06-11',
    value: 0.02,
  },
  {
    date: '2017-06-12',
    value: 0.02,
  },
  {
    date: '2017-06-13',
    value: 0.03,
  },
  {
    date: '2017-06-14',
    value: 0.04,
  },
  {
    date: '2017-06-15',
    value: 0.08,
  },
  {
    date: '2017-06-16',
    value: 0.05,
  },
  {
    date: '2017-06-17',
    value: 0.04,
  },
  {
    date: '2017-06-18',
    value: 0.04,
  },
  {
    date: '2017-06-19',
    value: 0.1,
  },
  {
    date: '2017-06-20',
    value: 0.07,
  },
  {
    date: '2017-06-21',
    value: 0.05,
  },
  {
    date: '2017-06-22',
    value: 0.04,
  },
  {
    date: '2017-06-23',
    value: 0.03,
  },
  {
    date: '2017-06-24',
    value: 0.03,
  },
  {
    date: '2017-06-25',
    value: 0.02,
  },
  {
    date: '2017-06-26',
    value: 0.04,
  },
  {
    date: '2017-06-27',
    value: 0.03,
  },
  {
    date: '2017-06-28',
    value: 0.03,
  },
  {
    date: '2017-06-29',
    value: 0.03,
  },
  {
    date: '2017-06-30',
    value: 0.02,
  },
  {
    date: '2017-07-01',
    value: 0.03,
  },
  {
    date: '2017-07-02',
    value: 0.04,
  },
  {
    date: '2017-07-03',
    value: 0.04,
  },
  {
    date: '2017-07-04',
    value: 0.03,
  },
  {
    date: '2017-07-05',
    value: 0.01,
  },
  {
    date: '2017-07-06',
    value: 0.02,
  },
  {
    date: '2017-07-07',
    value: 0.04,
  },
  {
    date: '2017-07-08',
    value: 0.04,
  },
  {
    date: '2017-07-09',
    value: 0.02,
  },
  {
    date: '2017-07-10',
    value: 0.03,
  },
  {
    date: '2017-07-11',
    value: 0.03,
  },
  {
    date: '2017-07-12',
    value: 0.04,
  },
  {
    date: '2017-07-13',
    value: 0.04,
  },
  {
    date: '2017-07-14',
    value: 0.04,
  },
  {
    date: '2017-07-15',
    value: 0.04,
  },
  {
    date: '2017-07-16',
    value: 0.02,
  },
  {
    date: '2017-07-17',
    value: 0.02,
  },
  {
    date: '2017-07-18',
    value: 0.03,
  },
  {
    date: '2017-07-19',
    value: 0.03,
  },
  {
    date: '2017-07-20',
    value: 0.03,
  },
  {
    date: '2017-07-21',
    value: 0.04,
  },
  {
    date: '2017-07-22',
    value: 0.02,
  },
  {
    date: '2017-07-23',
    value: 0.02,
  },
  {
    date: '2017-07-24',
    value: 0.02,
  },
];
class DynamicLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
    };
  }

  didMount() {
    setInterval(() => {
      this.setState((prevState) => {
        const prevData = prevState.data;
        const last = prevData[prevData.length - 1];
        const nextDate = new Date(last.date);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextX = nextDate.toISOString().slice(0, 10);
        const nextY = Math.max(0, last.value + (Math.random() - 0.5) * 0.005);
        return {
          data: [...prevData, { date: nextX, value: nextY }],
        };
      });
    }, 1000);
  }

  render() {
    const { data } = this.state;
    return (
      <Chart data={data}>
        <Axis field="value" />
        <Axis
          field="date"
          tickCount={2}
          style={{
            label: {
              align: 'between',
            },
          }}
        />
        <Line x="date" y="value" color="#D6BB91" />
        <Magnifier focusRange={[data.length - 9, data.length - 1]} />
        <Legend />
      </Chart>
    );
  }
}

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <DynamicLine />
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
