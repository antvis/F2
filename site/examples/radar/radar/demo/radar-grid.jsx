/** @jsx jsx */
import { jsx, Canvas, Chart, Point, Line, Axis, Legend } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const data = [
  {
    item: 'Design',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Design',
    user: '用户 B',
    score: 30,
  },
  {
    item: 'Development',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Development',
    user: '用户 B',
    score: 70,
  },
  {
    item: 'Marketing',
    user: '用户 A',
    score: 50,
  },
  {
    item: 'Marketing',
    user: '用户 B',
    score: 60,
  },
  {
    item: 'Users',
    user: '用户 A',
    score: 40,
  },
  {
    item: 'Users',
    user: '用户 B',
    score: 50,
  },
  {
    item: 'Test',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Test',
    user: '用户 B',
    score: 70,
  },
  {
    item: 'Language',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Language',
    user: '用户 B',
    score: 50,
  },
  {
    item: 'Technology',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Technology',
    user: '用户 B',
    score: 40,
  },
  {
    item: 'Support',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Support',
    user: '用户 B',
    score: 40,
  },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      coord="polar"
      scale={{
        score: {
          min: 0,
          max: 120,
          nice: false,
          tickCount: 4,
        },
      }}
    >
      <Axis field="item" grid="line" />
      <Axis field="score" grid="line" />
      <Line x="item" y="score" color="user" />
      <Point x="item" y="score" color="user" />
      <Legend />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
