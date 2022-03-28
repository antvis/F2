/** @jsx jsx */
import { jsx, Canvas, Chart, Line, Point, Axis, Tooltip, ScrollBar, Interval } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

function formatNumber(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

fetch('https://gw.alipayobjects.com/os/antfincdn/ZpWsTPpY6%26/steps.json')
  .then((res) => res.json())
  .then((data) => {
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart data={data}>
          <Axis field="date" type="timeCat" tickCount={5} />
          <Axis field="steps" formatter={formatNumber} />
          <Interval x="date" y="steps" />
          <ScrollBar mode="x" range={[0.1, 0.3]} />
          <Tooltip />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
