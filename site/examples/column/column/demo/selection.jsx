/** @jsx jsx */
import { jsx, Canvas, Chart, Interval, Axis } from '@antv/f2';

const data = [
  {
    year: '1951 年',
    sales: 38,
  },
  {
    year: '1952 年',
    sales: 52,
  },
  {
    year: '1956 年',
    sales: 61,
  },
  {
    year: '1957 年',
    sales: 145,
  },
  {
    year: '1958 年',
    sales: 48,
  },
  {
    year: '1959 年',
    sales: 38,
  },
  {
    year: '1960 年',
    sales: 38,
  },
  {
    year: '1962 年',
    sales: 38,
  },
];

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
        animation={{
          update: {
            easing: 'linear',
            duration: 200,
            property: ['x', 'y', 'width', 'height'],
          },
        }}
        selection={{
          selectedStyle: (record) => {
            const { xMin, xMax } = record;
            const width = xMax - xMin;
            const offset = width * 0.2;
            return {
              x: xMin - offset,
              width: width + offset * 2,
              fillOpacity: 1,
            };
          },
          unSelectedStyle: {
            fillOpacity: 0.4,
          },
        }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
