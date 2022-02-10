import { jsx, Canvas, createRef, Chart, Line } from '../../../src';
import { createContext, delay } from '../../util';

describe('空数据', () => {
  it('空数组', async () => {
    const context = createContext('空数组');
    const ref = createRef();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={[]}>
          <Line ref={ref} x="x" y="y" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(100);

    expect(
      ref.current.container
        .get('children')[0]
        .get('children')[0]
        .get('children')[0]
        .get('children').length
    ).toBe(0);
  });
});
