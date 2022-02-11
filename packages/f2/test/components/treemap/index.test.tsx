import { jsx } from '../../../src/jsx';
import { Polar } from '../../../src/coord';
import { Canvas, Treemap } from '../../../src';
import { createContext, delay } from '../../util';
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
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          data={data}
          coord={
            {
              // type: Polar
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
          space={4}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();

    // const treemapContainer = canvas.container.get('children')[0];
    // const view = treemapContainer.get('children')[0];
    // expect(view.get('children').length).toBe(10);
    // expect(view.get('children')[1].get('attrs').x).toBe(132);
    // expect(view.get('children')[1].get('attrs').y).toBe(0);
  });
});
