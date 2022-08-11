import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Axis, Point, ScrollBar } from '../../../src/components';
import { createContext, delay, gestureSimulator } from '../../util';

describe('平移和缩放', () => {
  describe('平移和缩放-linear 类型', () => {
    const context = createContext('折线', {
      width: '350px',
      height: '300px',
    });

    let canvas: Canvas;

    it('初始化', async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/antfincdn/Jpuku6k%24q%24/linear-pan.json'
      );
      const data = await res.json();
      const { props } = (
        <Canvas context={context} animate={false} pixelRatio={1}>
          <Chart data={data}>
            <Axis field="release" tickCount={5} nice={false} />
            <Axis field="count" />
            <Point
              x="release"
              y="count"
              size={20}
              viewPort={{
                type: 'rect',
              }}
            />
            <ScrollBar mode={['x', 'y']} range={[0, 0.3]} position="left" />
          </Chart>
        </Canvas>
      );

      canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('斜移', async () => {
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', { x: 210, y: 169 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 180, y: 169 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 150, y: 209 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 130, y: 249 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 269 });
      await delay(300);
      expect(context).toMatchImageSnapshot();
    });
  });
});
