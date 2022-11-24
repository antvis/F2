/** @jsx jsx */
import { jsx, Canvas, Chart, Line, Axis, Legend } from '@antv/f2';
import _ from 'lodash';

fetch('https://gw.alipayobjects.com/os/antfincdn/OVMtvjbnut/series-line.json')
  .then((res) => res.json())
  .then((data) => {
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
          <Line x="date" y="value" lineWidth="4px" color="type" />
          <Legend
            position="top"
            style={{
              justifyContent: 'space-around',
            }}
            triggerMap={{
              press: (items, records, legend) => {
                const map = {};
                items.forEach((item) => (map[item.name] = _.clone(item)));
                records.forEach((record) => {
                  map[record.type].value = record.value;
                });
                legend.setItems(_.values(map));
              },
              pressend: (items, records, legend) => {
                legend.setItems(items);
              },
            }}
          />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    chart.render();
  });
