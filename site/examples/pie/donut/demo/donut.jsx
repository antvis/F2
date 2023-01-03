/** @jsx jsx */
import { Canvas, Chart, Interval, jsx, Legend } from '@antv/f2';

const data = [
  {
    name: '股票类',
    percent: 83.59,
    a: '1',
  },
  {
    name: '债券类',
    percent: 2.17,
    a: '1',
  },
  {
    name: '现金类',
    percent: 14.24,
    a: '1',
  },
];

const context = document.getElementById('container').getContext('2d');
const map = {};
data.forEach(function (obj) {
  map[obj.name] = obj.percent + '%';
});

const Text = (props, context) => {
  const { coord } = props;
  const { center } = coord;
  return (
    <group
      style={{
        display: 'flex',
        left: center.x,
        top: center.y - context.px2hd('30px'),
        width: '100px',
      }}
    >
      <text
        style={{
          text: '总资产',
          fill: '#000',
          textAlign: 'center',
        }}
      />
      <text
        style={{
          marginTop: '10px',
          text: '100.33亿元',
          fill: '#000',
          textAlign: 'center',
        }}
      />
    </group>
  );
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio} theme={{ padding: [20, 'auto'] }}>
    <Chart
      scale={{
        percent: {
          formatter: function formatter(val) {
            return val + '%';
          },
        },
      }}
      data={data}
      coord={{
        type: 'polar',
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85,
      }}
    >
      <Interval
        x="a"
        y="percent"
        adjust="stack"
        color={{
          field: 'name',
          range: ['#FE5D4D', '#3BA4FF', '#737DDE'],
        }}
      />
      <Legend
        position="right"
        itemFormatter={(val, name) => {
          return map[name];
        }}
      />
      <Text />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
