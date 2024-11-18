/** @jsx jsx */
import { Axis, Canvas, Chart, jsx, Line, Pictorial, Point } from '@antv/f2';

const data = [
  {
    year: '5月',
    sales: 38,
    rate: -0.16,
  },
  {
    year: '6月',
    sales: 52,
    rate: -0.14,
  },
  {
    year: '7月',
    sales: 61,
    rate: -0.21,
  },
  {
    year: '8月',
    sales: 85,
    rate: 0.36,
  },
  {
    year: '9月',
    sales: 48,
    rate: 0.16,
  },
  {
    year: '10月',
    sales: 38,
    rate: -0.2,
  },
  {
    year: '11月',
    sales: 38,
    rate: -0.36,
  },
  {
    year: '12月',
    sales: 38,
    rate: 0.16,
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
          min: 0,
        },
        rate: {
          max: 1,
          // min: 0,
        },
      }}
    >
      <Axis field="year" />
      <Axis field="sales" />
      <Axis field="rate" position="right" />
      <Pictorial
        x="year"
        y="rate"
        symbol={({ xMin, xMax, yMin, yMax, rate }) => {
          return (
            <image
              style={{
                x: xMin,
                y: yMin,
                width: xMax - xMin,
                height: yMax - yMin,
                src:
                  rate > 0
                    ? 'https://mdn.alipayobjects.com/fin_xbff/afts/img/A*mlaNSpbXMwkAAAAAAAAAAAAADRx5AQ/original'
                    : 'https://mdn.alipayobjects.com/fin_xbff/afts/img/A*xBADRJZ4TtoAAAAAAAAAAAAADRx5AQ/original',
              }}
            />
          );
        }}
      />
      <Line x="year" y="sales" shape="smooth" color="rgb(200,135,145)" />
      <Point
        x="year"
        y="sales"
        style={{
          fill: 'white',
          stroke: 'rgb(200,135,145)',
          strokeWidth: '3px',
        }}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
