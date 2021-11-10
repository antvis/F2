import { jsx, Canvas, Chart, Line, Axis, Legend } from '@antv/f2';

fetch('https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json')
  .then(res => res.json())
  .then(data => {
    const context = document.getElementById('container').getContext('2d');
    const { props } = (
      <Canvas context={context} pixelRatio={window.devicePixelRatio}>
        <Chart data={data}>
          <Axis
            field="date"
            tickCount={3}
            style={{
              label: { align: 'between' },
            }}
          />
          <Axis field="value" tickCount={5} />
          <Line
            x="date"
            y="value"
            lineWidth="4px"
            color="type"
          />
          <Legend position="top" />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
