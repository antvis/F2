import { jsx, Canvas, Chart, Line, Axis, Tooltip } from '@antv/f2';

const data = [{
  time: '2016-08-08 00:00:00',
  tem: 10
}, {
  time: '2016-08-08 00:10:00',
  tem: 22
}, {
  time: '2016-08-08 00:30:00',
  tem: 20
}, {
  time: '2016-08-09 00:35:00',
  tem: 26
}, {
  time: '2016-08-09 01:00:00',
  tem: 20
}, {
  time: '2016-08-09 01:20:00',
  tem: 26
}, {
  time: '2016-08-10 01:40:00',
  tem: 28
}, {
  time: '2016-08-10 02:00:00',
  tem: 20
}, {
  time: '2016-08-10 02:20:00',
  tem: 18
}];

const scale = {
  time: {
    type: 'timeCat',
    mask: 'MM/DD',
    tickCount: 3,
    range: [ 0, 1 ]
  },
  tem: {
    tickCount: 5,
    min: 0,
    alias: '日均温度'
  }
};
const context = document.getElementById('container').getContext('2d');
const LineChart = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={scale}
      // 方式一：通过 theme 设置全局 line style
      // theme={{
      //   shapes: {
      //     line: ['smooth'],
      //   },
      // }}
    >
      <Axis
        field="time"
        style={{
          label: { align: 'between' },
        }}
      />
      <Axis field="tem" />
      {/* 方式二：通过 props style 传入 */}
      <Line x="time" y="tem" style={{ smooth: true }} />
      <Tooltip />
    </Chart>
  </Canvas>
);

const chart = new Canvas(LineChart.props);
chart.render();
