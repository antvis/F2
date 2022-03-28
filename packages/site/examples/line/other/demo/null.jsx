/** @jsx jsx */
import { jsx, Canvas, Chart, Line, Point, Axis, Tooltip, Legend } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

fetch('https://gw.alipayobjects.com/os/antfincdn/2TgqDdsXzK/usa-medals-won.json')
  .then((res) => res.json())
  .then((data) => {
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          data={data}
          scale={{
            count: {
              min: 0,
              max: 100,
            },
          }}
        >
          <Axis
            field="year"
            style={{
              label: {
                align: 'center',
                textAlign: 'start',
                textBaseline: 'middle',
                rotate: Math.PI / 2,
              },
            }}
          />
          <Axis field="count" />
          <Line
            x="year"
            y="count"
            color={{
              field: 'medalType',
              callback: (val) => {
                if (val === 'Gold Medals') {
                  return '#f3ac32';
                } else if (val === 'Silver Medals') {
                  return '#b8b8b8';
                } else if (val === 'Bronze Medals') {
                  return '#bb6e36';
                }
              },
            }}
          />
          <Point
            x="year"
            y="count"
            style={{
              field: 'medalType',
              fill: '#fff',
              lineWidth: 1,
              stroke: (val) => {
                if (val === 'Gold Medals') {
                  return '#f3ac32';
                } else if (val === 'Silver Medals') {
                  return '#b8b8b8';
                } else if (val === 'Bronze Medals') {
                  return '#bb6e36';
                }
              },
            }}
          />
          <Tooltip showCrosshairs />
          <Legend position="top" style={{ justifyContent: 'space-between' }} />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
