import { jsx, Canvas, Chart, Axis, Interval, Tooltip } from '../../../src';
import { createContext } from '../../util';
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
  it('Tooltip render', () => {
    const onChange = (records) => {
      records.forEach((record) => {
        record.value = null; // 使得tooltip只展示x轴信息
      });
    };
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
            showCrosshairs={true}
            onChange={onChange}
          />
        </Chart>
      </Canvas>
    );

    // @ts-ignored
    const canvas = new Canvas(props);
    canvas.render();
  });
});
