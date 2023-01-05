import { Polar } from '../../../src/coord';
import { Canvas, Treemap, jsx } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';
const context = createContext();
const data = [
  {
    name: '贵州茅台',
    value: 0.16,
    rate: 0.1,
  },
  {
    name: '贵州茅台1',
    value: 0.1,
    rate: -0.1,
  },
  {
    name: '五粮液',
    value: 0.13,
    rate: -0.1,
  },
  {
    name: '五粮液',
    value: 0.12,
    rate: -0.01,
  },
  {
    name: '招商银行',
    value: 0.15,
    rate: 0,
  },
  {
    name: '招商银行',
    value: 0.08,
    rate: 0,
  },
  {
    name: '中国平安',
    value: 0.07,
    rate: 0.1,
  },
  {
    name: '中国平安',
    value: 0.06,
    rate: 0.1,
  },
  {
    name: '同花顺',
    value: 0.1,
    rate: 0,
  },
  {
    name: '同花顺',
    value: 0.03,
    rate: 0,
  },
];

describe('Treemap', () => {
  it('render', async () => {
    const onClick = jest.fn();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          data={data}
          coord={
            {
              // type: 'polar'
              // transposed: true,
              // left: 100,
              // top: 100,
              // right: 100,
              // bottom: 100,
            }
          }
          color={{
            field: 'name',
          }}
          value="value"
          onClick={onClick}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 265, y: 170 });

    await delay(100);
    expect(onClick.mock.calls.length).toBe(1);
    expect(onClick.mock.calls[0][0].origin).toEqual({ name: '五粮液', value: 0.13, rate: -0.1 });
  });
});
