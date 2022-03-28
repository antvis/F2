/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  {
    time: '周一',
    tem: 6.9,
    city: 'tokyo',
  },
  {
    time: '周二',
    tem: 9.5,
    city: 'tokyo',
  },
  {
    time: '周三',
    tem: 14.5,
    city: 'tokyo',
  },
  {
    time: '周四',
    tem: 18.2,
    city: 'tokyo',
  },
  {
    time: '周五',
    tem: 21.5,
    city: 'tokyo',
  },
  {
    time: '周六',
    tem: 25.2,
    city: 'tokyo',
  },
  {
    time: '周日',
    tem: 26.5,
    city: 'tokyo',
  },
  {
    time: '周一',
    tem: -10.8,
    city: 'newYork',
  },
  {
    time: '周二',
    tem: -5.7,
    city: 'newYork',
  },
  {
    time: '周三',
    tem: -11.3,
    city: 'newYork',
  },
  {
    time: '周四',
    tem: -17,
    city: 'newYork',
  },
  {
    time: '周五',
    tem: -22,
    city: 'newYork',
  },
  {
    time: '周六',
    tem: -24.8,
    city: 'newYork',
  },
  {
    time: '周日',
    tem: -24.1,
    city: 'newYork',
  },
  {
    time: '周一',
    tem: 2.6,
    city: 'berlin',
  },
  {
    time: '周二',
    tem: 3.5,
    city: 'berlin',
  },
  {
    time: '周三',
    tem: 8.4,
    city: 'berlin',
  },
  {
    time: '周四',
    tem: 13.5,
    city: 'berlin',
  },
  {
    time: '周五',
    tem: 17,
    city: 'berlin',
  },
  {
    time: '周六',
    tem: -18.6,
    city: 'berlin',
  },
  {
    time: '周日',
    tem: 17.9,
    city: 'berlin',
  },
];
const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        tem: {
          tickCount: 5,
        },
      }}
    >
      <Axis field="time" />
      <Axis field="tem" />
      <Interval
        x="time"
        y="tem"
        color="city"
        adjust="dodge"
        style={{
          field: 'tem',
          radius: (val) => {
            return val > 0 ? [4, 4, 0, 0] : [0, 0, 4, 4];
          },
        }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
