/** @jsx jsx */
import { Axis, Canvas, Chart, Component, jsx, Line, Magnifier } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const getRecord = (offset = 0) => ({
  time: new Date().getTime() + offset * 1000,
  value: Math.random() + 10,
});

const data = [getRecord(-3), getRecord(-2), getRecord(-1)];

class DynamicLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
    };
  }

  didMount() {
    setInterval(() => {
      const { data } = this.state;
      const newData = [].concat(data);
      newData.push(getRecord());
      this.setState({ data: newData });
    }, 1000);
  }

  render() {
    const { data } = this.state;
    return (
      <Chart
        data={data}
        scale={{
          time: {
            type: 'timeCat',
          },
          value: {
            range: [0, 0.7],
          },
        }}
      >
        <Line x="time" y="value" color="#1890FF" />
        <Magnifier focusRange={[data.length - 9, data.length - 1]} />
        <Axis field="value" />
        <Axis field="time" />
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
