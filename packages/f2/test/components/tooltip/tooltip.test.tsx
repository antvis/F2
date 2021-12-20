import { jsx, Canvas, Chart, Axis, Interval, Tooltip } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';
const context = createContext();

const data = [
  { type: 'a', genre: 'Sports', sold: 5 },
  { type: 'a', genre: 'Strategy', sold: 10 },
  { type: 'a', genre: 'Action', sold: 20 },
  { type: 'a', genre: 'Shooter', sold: 20 },
  { type: 'a', genre: 'Other', sold: 40 },
  // { type: 'a', genre: 'Sports', sold: 5 },
  // { type: 'a', genre: 'Strategy', sold: 10 },
  // { type: 'a', genre: 'Action', sold: 20 },
  // { type: 'a', genre: 'Shooter', sold: 20 },
  // { type: 'a', genre: 'Other', sold: 40 },
  // { type: 'a', genre: 'Shooter', sold: 20 },
  // { type: 'a', genre: 'Other', sold: 40 },
];

describe('tooltip', () => {
  it('Tooltip render', async () => {
    const onChangeMockCallback = jest.fn();
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <Chart
          data={data}
          style={
            {
              // left: 50,
            }
          }
        >
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval x="genre" y="sold" color="genre" />
          <Tooltip
            alwaysShow={true}
            // showTitle={true}
            // showItemMarker={true}
            showCrosshairs
            onChange={onChangeMockCallback}
            crosshairsType="xy"
            snap
            custom
            showXTip
            showYTip
          />
        </Chart>
      </Canvas>
    );

    // @ts-ignored
    const canvas = new Canvas(props);
    canvas.render();
    await delay(100);
    await gestureSimulator(context.canvas, 'press', { clientX: 170, clientY: 21 });
    expect(onChangeMockCallback.mock.calls.length).toBe(1); // 验证 onChange 有被调用
    expect(onChangeMockCallback.mock.calls[0][0].length).toBe(1); // 验证 onChange 参数有效
  });
});
