/** @jsx jsx */
import { jsx, Canvas, Timeline, Chart, Line, Axis, Area, Point } from '@antv/f2';

const data = [
  [
    { item: 'Design', score: 0 },
    { item: 'Development', score: 0 },
    { item: 'Marketing', score: 0 },
    { item: 'Users', score: 0 },
    { item: 'Test', score: 0 },
  ],
  [
    { item: 'Design', score: 70 },
    { item: 'Development', score: 0 },
    { item: 'Marketing', score: 0 },
    { item: 'Users', score: 0 },
    { item: 'Test', score: 0 },
  ],
  [
    { item: 'Design', score: 70 },
    { item: 'Development', score: 60 },
    { item: 'Marketing', score: 0 },
    { item: 'Users', score: 0 },
    { item: 'Test', score: 0 },
  ],
  [
    { item: 'Design', score: 70 },
    { item: 'Development', score: 60 },
    { item: 'Marketing', score: 50 },
    { item: 'Users', score: 0 },
    { item: 'Test', score: 0 },
  ],
  [
    { item: 'Design', score: 70 },
    { item: 'Development', score: 60 },
    { item: 'Marketing', score: 50 },
    { item: 'Users', score: 40 },
    { item: 'Test', score: 0 },
  ],
  [
    { item: 'Design', score: 70 },
    { item: 'Development', score: 60 },
    { item: 'Marketing', score: 50 },
    { item: 'Users', score: 40 },
    { item: 'Test', score: 60 },
  ],
];

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Timeline>
      {data.map((item) => {
        return (
          <Chart data={item} coord="polar">
            <Axis field="item" grid="line" />
            <Axis field="score" grid="line" />
            <Line
              x="item"
              y="score"
              animation={{
                update: {
                  easing: 'linear',
                  duration: 300,
                },
              }}
            />
            <Area
              x="item"
              y="score"
              animation={{
                update: {
                  easing: 'linear',
                  duration: 300,
                },
              }}
            />
            <Point
              x="item"
              y="score"
              animation={{
                update: {
                  easing: 'linear',
                  duration: 300,
                },
              }}
            />
          </Chart>
        );
      })}
    </Timeline>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
