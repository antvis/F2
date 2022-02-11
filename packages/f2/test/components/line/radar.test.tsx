import { jsx, Canvas, Chart, Area } from '../../../src';
import { Line, Point, Axis, Legend } from '../../../src/components';
import { createContext, delay } from '../../util';

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

describe('雷达图', () => {
  describe('面积雷达图', () => {
    it('面积雷达图图', async () => {
      const context = createContext();
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data} coord="polar">
            <Axis field="item" />
            <Axis field="score" />
            <Line x="item" y="score" color="user" />
            <Area x="item" y="score" color="user" />
            <Point x="item" y="score" color="user" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });
});
