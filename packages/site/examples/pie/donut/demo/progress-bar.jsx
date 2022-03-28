/** @jsx jsx */
import { Canvas, Chart, Interval, TextGuide, ArcGuide } from '@antv/f2';

const data = [
  {
    x: '1',
    y: 85,
  },
];
const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord={{
        type: 'polar',
        transposed: true,
        innerRadius: 0.8,
      }}
      scale={{
        y: {
          max: 100,
          min: 0,
        },
      }}
    >
      <ArcGuide
        records={[
          {
            x: 0,
            y: 0,
          },
          {
            x: 1,
            y: 99.98,
          },
        ]}
        style={{
          lineWidth: 11,
          stroke: '#ccc',
        }}
      />
      <TextGuide
        records={[
          {
            x: '1',
            y: '25%',
          },
        ]}
        content={'85%'}
        style={{
          fill: '#1890FF',
        }}
      />
      <Interval x="x" y="y" />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
