import { Renderer } from '@antv/g-canvaskit';
// import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { jsx, Canvas, Chart, Timeline, Axis, Interval, TextGuide } from '../../src';
import { createContext, delay } from '../util';

const context = createContext('lottio', { width: '500px', height: '300px' });

const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

describe('Chart', () => {
  it('Chart render', async () => {
    const intervalRef = { current: null };

    const renderer = new Renderer({ wasmDir: '/' });
    const plugin = renderer.getPlugin('canvaskit-renderer');
    const { type, props } = (
      <Canvas context={context} pixelRatio={1} renderer={renderer}>
        {/* <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" />
          <Interval
            x="genre"
            y="sold"
            color="genre"
            style={{
              radius: 5,
              stroke: '#fff',
            }}
          />
        </Chart> */}
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    // await delay(1000);
  });
});
