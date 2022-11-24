/** @jsx jsx */
import { jsx, Canvas, Chart, Point, Axis } from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/6HodecuhvM/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const context = document.getElementById('container').getContext('2d');

    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          data={data}
          coord={{}}
          scale={{
            height: {
              tickCount: 5,
            },
            weight: {
              tickCount: 5,
            },
          }}
        >
          <Axis field="height" />
          <Axis field="weight" />
          <Point x="height" y="weight" color="gender" style={{ fillOpacity: 0.65 }} />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
