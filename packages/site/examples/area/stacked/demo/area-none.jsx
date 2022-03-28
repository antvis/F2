/** @jsx jsx */
import { jsx, Canvas, Chart, Area, Line, Axis } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

fetch('https://gw.alipayobjects.com/os/antfincdn/RJW3vmCf7v/area-none.json')
  .then((res) => res.json())
  .then((data) => {
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          data={data}
          scale={{
            year: {
              tickCount: 5,
              range: [0, 1],
            },
          }}
        >
          <Axis field="value" />
          <Axis field="year" />
          <Area x="year" y="value" color="type" />
          <Line x="year" y="value" color="type" />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
