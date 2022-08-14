import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Axis, Line, ScrollBar } from '../../../src/components';
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
            <Line x="release" y="count" />
            <ScrollBar mode="x" range={[0.1, 0.3]} />
          </Chart>
        </Canvas>
      );

      canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('pan 事件', async () => {
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', { x: 210, y: 169 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 100, y: 169 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 169 });
      await delay(300);
      expect(context).toMatchImageSnapshot();
    });

    it('多次缩小', async () => {
      // 缩小
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 10, y: 10 },
        { x: 300, y: 300 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 100 });
      await delay(300);
      expect(context).toMatchImageSnapshot();

      // 缩小
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 10, y: 10 },
        { x: 310, y: 310 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 160, y: 160 },
        { x: 160, y: 160 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 160, y: 160 });
      await delay(300);
      expect(context).toMatchImageSnapshot();
    });

    it('放大', async () => {
      // 放大
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 130, y: 130 },
        { x: 180, y: 180 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 110, y: 110 },
        { x: 200, y: 200 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 110, y: 110 });
      await delay(300);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('平移和缩放-cate类型', () => {
    const context = createContext('对比折线', {
      width: '350px',
      height: '300px',
    });
    let canvas: Canvas;

    it('初始状态', async () => {
      const data = (await import('./data/pan')).default;
      const { props } = (
        <Canvas context={context} animate={false} pixelRatio={1}>
          <Chart
            data={data}
            coord={
              {
                // transposed: true,
              }
            }
          >
            <Axis field="reportDate" type="timeCat" mask="MM-DD" />
            <Axis
              field="rate"
              formatter={(v) => {
                return v.toFixed(2);
              }}
            />
            <Line x="reportDate" y="rate" color="codeType" />
            <ScrollBar mode="x" range={[0.1, 0.5]} autoFit={true} />
          </Chart>
        </Canvas>
      );

      canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('pan 事件', async () => {
      // 模拟 pan 事件
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', { x: 210, y: 169 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 100, y: 169 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 169 });
      await delay(300);
      expect(context).toMatchImageSnapshot();
    });

    it('多次缩小', async () => {
      // 缩小
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 10, y: 10 },
        { x: 300, y: 300 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 100, y: 100 },
        { x: 200, y: 200 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 100 });
      await delay(300);
      expect(context).toMatchImageSnapshot();

      // 缩小
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 10, y: 10 },
        { x: 310, y: 310 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 160, y: 160 },
        { x: 160, y: 160 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 160, y: 160 });
      await delay(300);
      expect(context).toMatchImageSnapshot();
    });

    it('放大', async () => {
      // 放大
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 130, y: 130 },
        { x: 180, y: 180 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 110, y: 110 },
        { x: 200, y: 200 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 110, y: 110 });
      await delay(300);
      expect(context).toMatchImageSnapshot();
    });
  });
});
