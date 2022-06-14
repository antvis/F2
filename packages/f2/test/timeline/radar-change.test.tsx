import { jsx, Canvas, Timeline, Chart, Line, Axis, Area, Point } from '../../src';
import { createContext, delay } from '../util';

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

const data1 = [
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
    { item: 'Test', score: 60 },
  ],
  [
    { item: 'Design', score: 70 },
    { item: 'Development', score: 60 },
    { item: 'Marketing', score: 50 },
    { item: 'Users', score: 40 },
    { item: 'Test', score: 60 },
  ],
];

describe('雷达图', () => {
  it('面积雷达图图', async () => {
    const context = createContext('排名折线图', {
      width: '350px',
      height: '400px',
    });
    const values = data[0].map((item) => {
      return item.item;
    });
    const count = data[0].length;
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Timeline>
          {data1.map((item) => {
            return (
              <Chart
                data={item}
                coord="polar"
                scale={{
                  item: {
                    values,
                    range: [0, 1 - 1 / count],
                  },
                }}
              >
                <Axis field="item" />
                <Axis field="score" />
                <Line
                  x="item"
                  y="score"
                  animation={{
                    update: {
                      easing: 'linear',
                      duration: 30,
                    },
                  }}
                />
                <Area
                  x="item"
                  y="score"
                  animation={{
                    update: {
                      easing: 'linear',
                      duration: 30,
                    },
                  }}
                />
                <Point
                  x="item"
                  y="score"
                  animation={{
                    update: {
                      easing: 'linear',
                      duration: 30,
                    },
                  }}
                />
              </Chart>
            );
          })}
        </Timeline>
      </Canvas>
    );
    const canvas = new Canvas(props);
    canvas.render();

    await delay(2000);
    expect(context).toMatchImageSnapshot();
  });
});
