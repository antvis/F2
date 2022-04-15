/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  {
    year: '2014 年',
    sales: 145,
  },
  {
    year: '2015 年',
    sales: 121,
  },
  {
    year: '2016 年',
    sales: 100,
  },
  {
    year: '2017 年',
    sales: 97,
  },
  {
    year: '2018 年',
    sales: 85,
  },
];

const delayCfg = {
  data: data,
  field: 'year',
  delayUnit: 200,
};

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        sales: {
          tickCount: 5,
        },
      }}
    >
      <Axis field="year" />
      <Axis field="sales" />
      <Interval
        x="year"
        y="sales"
        color="l(90) 0:#1890ff 1:#70cdd0"
        animation={{ appear: { easing: 'elasticOut', duration: 3000 } }}
        delayCfg={delayCfg}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
