/** @jsx jsx */
import { jsx, Component, Canvas, Chart, Line, Axis } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  {
    time: new Date().getTime(),
    value: 12,
  },
];

// 添加数据，模拟数据，可以指定当前时间的偏移的秒
function getRecord() {
  return {
    time: new Date().getTime(),
    value: Math.random() * 2 + 10,
  };
}

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
          value: {
            min: 0,
          },
        }}
      >
        <Axis field="value" />
        <Axis field="time" type="timeCat" tickCount={5} mask="mm:ss" />
        <Line x="time" y="value" />
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
