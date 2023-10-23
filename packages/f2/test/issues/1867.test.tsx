import { jsx, Canvas, Chart, Axis, Area } from '../../src';
import { createContext, delay } from '../util';

const data = [
  {
    dt: '20231008',
    date: '10-08',
    value: 1.31,
  },
  {
    dt: '20231009',
    date: '10-09',
    value: 57.5,
  },
  {
    dt: '20231010',
    // date: '10-10',
    value: 151.83,
  },
  {
    dt: '20231011',
    date: '10-11',
    value: 291.6,
  },
  {
    dt: '20231012',
    date: '10-12',
    value: 45.62,
  },
  {
    dt: '20231013',
    date: '10-13',
    value: 7.4,
  },
  {
    dt: '20231007',
    // data: '10-07',
    value: 9,
  },
];

describe('x 轴字段不存在', () => {
  it('x 轴字段不存在', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Axis
            field="date"
            style={{
              label: { align: 'between' },
            }}
          />
          <Area x="date" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);

    expect(context).toMatchImageSnapshot();
  });
});
