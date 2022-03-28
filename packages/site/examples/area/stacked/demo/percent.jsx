/** @jsx jsx */
import { jsx, Canvas, Chart, Area, Line, Axis, Legend } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

function formatterPercent(value) {
  value = value || 0;
  value = value * 100;
  return parseInt(value) + '%';
}

const data = [
  {
    country: 'Asia',
    year: '1750',
    value: 502,
    percent: 0.6511024643320363,
  },
  {
    country: 'Africa',
    year: '1750',
    value: 106,
    percent: 0.13748378728923477,
  },
  {
    country: 'Europe',
    year: '1750',
    value: 163,
    percent: 0.21141374837872892,
  },
  {
    country: 'Asia',
    year: '1800',
    value: 635,
    percent: 0.671957671957672,
  },
  {
    country: 'Africa',
    year: '1800',
    value: 107,
    percent: 0.11322751322751323,
  },
  {
    country: 'Europe',
    year: '1800',
    value: 203,
    percent: 0.21481481481481482,
  },
  {
    country: 'Asia',
    year: '1850',
    value: 809,
    percent: 0.6764214046822743,
  },
  {
    country: 'Africa',
    year: '1850',
    value: 111,
    percent: 0.09280936454849498,
  },
  {
    country: 'Europe',
    year: '1850',
    value: 276,
    percent: 0.23076923076923078,
  },
  {
    country: 'Asia',
    year: '1900',
    value: 947,
    percent: 0.6364247311827957,
  },
  {
    country: 'Africa',
    year: '1900',
    value: 133,
    percent: 0.08938172043010753,
  },
  {
    country: 'Europe',
    year: '1900',
    value: 408,
    percent: 0.27419354838709675,
  },
  {
    country: 'Asia',
    year: '1950',
    value: 1402,
    percent: 0.6460829493087558,
  },
  {
    country: 'Africa',
    year: '1950',
    value: 221,
    percent: 0.10184331797235023,
  },
  {
    country: 'Europe',
    year: '1950',
    value: 547,
    percent: 0.252073732718894,
  },
  {
    country: 'Asia',
    year: '1999',
    value: 3634,
    percent: 0.7083820662768031,
  },
  {
    country: 'Africa',
    year: '1999',
    value: 767,
    percent: 0.14951267056530215,
  },
  {
    country: 'Europe',
    year: '1999',
    value: 729,
    percent: 0.14210526315789473,
  },
  {
    country: 'Asia',
    year: '2050',
    value: 5268,
    percent: 0.687548942834769,
  },
  {
    country: 'Africa',
    year: '2050',
    value: 1766,
    percent: 0.23048812320542938,
  },
  {
    country: 'Europe',
    year: '2050',
    value: 628,
    percent: 0.08196293395980161,
  },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        year: {
          range: [0, 1],
        },
        percent: {
          formatter: (val) => formatterPercent(val),
          alias: 'percent(%)',
        },
      }}
    >
      <Axis field="percent" />
      <Axis field="year" />
      <Area x="year" y="percent" color="country" adjust="stack" />
      <Line x="year" y="percent" color="country" adjust="stack" />
      <Legend style={{ justifyContent: 'space-around' }} />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
