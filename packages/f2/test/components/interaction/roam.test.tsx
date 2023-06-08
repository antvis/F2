import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Axis, Point, ScrollBar } from '../../../src/components';
import { createContext, delay, gestureSimulator } from '../../util';

describe('全局漫游模式', () => {
  describe('斜移和缩放-linear 类型', () => {
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
            <Point x="release" y="count" size={20} viewClip />
            <ScrollBar mode="x" range={[0, 0.3]} />
            <ScrollBar mode="y" range={[0, 0.3]} position="left" />
          </Chart>
        </Canvas>
      );

      canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('斜移', async () => {
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', { x: 210, y: 169 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 180, y: 189 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 150, y: 219 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 130, y: 249 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 269 });
      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('多次缩小', async () => {
      // 缩小
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 50, y: 50 },
        { x: 260, y: 260 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 114, y: 114 },
        { x: 186, y: 186 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', [
        { x: 114, y: 114 },
        { x: 114, y: 114 },
      ]);
      await delay(1000);
      expect(context).toMatchImageSnapshot();
      await delay(50);

      // 缩小
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 50, y: 50 },
        { x: 270, y: 270 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 160, y: 160 },
        { x: 160, y: 160 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', [
        { x: 160, y: 160 },
        { x: 160, y: 160 },
      ]);
      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('斜移和缩放-sensitive 灵明度', () => {
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
            <Point x="release" y="count" size={20} viewClip />
            <ScrollBar
              mode={['x', 'y']}
              range={[0, 0.3]}
              position="left"
              panSensitive={0.5}
              pinchSensitive={0.5}
            />
          </Chart>
        </Canvas>
      );

      canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('斜移', async () => {
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', { x: 210, y: 169 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 180, y: 189 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 150, y: 219 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', { x: 130, y: 249 });
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', { x: 100, y: 269 });
      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('多次缩小', async () => {
      // 缩小
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 50, y: 50 },
        { x: 260, y: 260 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 114, y: 114 },
        { x: 186, y: 186 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', [
        { x: 114, y: 114 },
        { x: 114, y: 114 },
      ]);
      await delay(1000);
      expect(context).toMatchImageSnapshot();

      // 缩小
      await delay(20);
      await gestureSimulator(context.canvas, 'touchstart', [
        { x: 50, y: 50 },
        { x: 270, y: 270 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchmove', [
        { x: 160, y: 160 },
        { x: 160, y: 160 },
      ]);
      await delay(20);
      await gestureSimulator(context.canvas, 'touchend', [
        { x: 160, y: 160 },
        { x: 160, y: 160 },
      ]);
      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });

  describe('swip', () => {
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
            <Point x="release" y="count" size={20} viewClip />
            <ScrollBar mode={['x', 'y']} range={[0, 0.3]} position="left" swipe={true} />
          </Chart>
        </Canvas>
      );

      canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });
});
