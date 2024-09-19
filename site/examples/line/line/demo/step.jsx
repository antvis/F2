import { Axis, Canvas, Chart, Line } from '@antv/f2';

const data = [];

[
  {
    time: '2016-08-01',
    tem: 15,
    type: 'start',
  },
  {
    time: '2016-08-02',
    tem: 22,
    type: 'start',
  },
  {
    time: '2016-08-03',
    tem: 15,
    type: 'start',
  },
  {
    time: '2016-08-04',
    tem: 26,
    type: 'start',
  },
  {
    time: '2016-08-05',
    tem: 20,
    type: 'start',
  },
  {
    time: '2016-08-06',
    tem: 26,
    type: 'start',
  },
].map((d) => {
  data.push(d);
  data.push({ ...d, tem: d.tem + 15, type: 'middle' });
  data.push({ ...d, tem: d.tem + 30, type: 'end' });
});

const context = document.getElementById('container').getContext('2d');
const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis
        field="time"
        tickCount={2}
        style={{
          label: {
            align: 'between',
          },
        }}
      />
      <Axis field="tem" tickCount={5} max={60} />
      <Line
        x="time"
        y="tem"
        color="type"
        shape={{
          field: 'type',
          range: ['step-start', 'step-middle', 'step-end'],
        }}
      />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
