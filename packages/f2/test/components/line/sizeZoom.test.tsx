import { jsx } from '../../../src';
import { Canvas, Chart, Line, Axis } from '../../../src';
import { createContext, delay } from '../../util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 190, type: 'a' },

  { genre: 'Sports', sold: 75, type: 'b' },
  { genre: 'Strategy', sold: 85, type: 'b' },
  { genre: 'Action', sold: 100, type: 'b' },
  { genre: 'Shooter', sold: 250, type: 'b' },
  { genre: 'Other', sold: 90, type: 'b' },
];

describe('显示比例', () => {
  it('固定 sizeZoom', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" min={0} />
          <Line
            x="genre"
            y="sold"
            color="type"
            // 放大 1 倍
            sizeZoom={2}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('sizeZoom 回调', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" min={0} />
          <Line
            x="genre"
            y="sold"
            color="type"
            // 缩小 0.5 倍
            sizeZoom={(record) => {
              // 把 Action 放大 1 倍
              if (record.type === 'a') {
                return 2;
              }
              return null;
            }}
          />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
