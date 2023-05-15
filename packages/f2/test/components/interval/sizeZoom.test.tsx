import { jsx } from '../../../src';
import { Canvas, Chart, Interval, Axis } from '../../../src';
import { createContext, delay } from '../../util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: -110 },
];

describe('显示比例', () => {
  it('固定 sizeZoom', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" min={0} />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            // 缩小 0.5 倍
            sizeZoom={0.5}
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
          <Interval
            x="genre"
            y="sold"
            color="genre"
            // 缩小 0.5 倍
            sizeZoom={(record) => {
              // 把 Action 放大 1 倍
              if (record.genre === 'Action') {
                return 2;
              }
              // Other 缩小 0.5 倍
              if (record.genre === 'Other') {
                return 0.5;
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
