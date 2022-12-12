/** @jsx jsx */
import { jsx, Canvas, Chart, Point, Axis, ScrollBar } from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/6HodecuhvM/scatter.json')
  .then((res) => res.json())
  .then((data) => {
    const context = document.getElementById('container').getContext('2d');

    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart
          data={data}
        >
          <Axis field="height" />
          <Axis field="weight" />
          <Point x="height" y="weight" color="gender" style={{ fillOpacity: 0.65 }} />
          <ScrollBar mode={['x', 'y']} range={[0.3, 0.6]} position="left" visible={false}/>
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
});