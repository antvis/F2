// @ts-nocheck
import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Axis, Line, ScrollBar, Interval } from '../../../src';
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
      await canvas.render();

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
      await delay(300);
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
      await gestureSimulator(context.canvas, 'touchend', [{ x: 110, y: 110 }]);
      await delay(500);
      expect(context).toMatchImageSnapshot();
    });

    it('destroy', () => {
      canvas.destroy();
      context.canvas.remove();
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
          <Chart data={data}>
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
      await canvas.render();

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
      await delay(300);
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
      await delay(500);
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
      await delay(200);
      await delay(200);
      await delay(200);
      await delay(200);
      await delay(200);
      // ci 经常失败，多加几次 delay。。。
      expect(context).toMatchImageSnapshot();
    });

    it('destroy', () => {
      canvas.destroy();
      context.canvas.remove();
    });
  });

  describe('平移和缩放-dodge 类型', () => {
    const context = createContext('dodge', {
      width: '350px',
      height: '300px',
    });

    let canvas: Canvas;

    const data = [
      {
        name: 'London',
        月份: 'Jan.',
        月均降雨量: 18.9,
      },
      {
        name: 'London',
        月份: 'Feb.',
        月均降雨量: 28.8,
      },
      {
        name: 'London',
        月份: 'Mar.',
        月均降雨量: 39.3,
      },
      {
        name: 'London',
        月份: 'Apr.',
        月均降雨量: 81.4,
      },
      {
        name: 'London',
        月份: 'May.',
        月均降雨量: 47,
      },
      {
        name: 'London',
        月份: 'Jun.',
        月均降雨量: 20.3,
      },
      {
        name: 'London',
        月份: 'Jul.',
        月均降雨量: 24,
      },
      {
        name: 'London',
        月份: 'Aug.',
        月均降雨量: 35.6,
      },
      {
        name: 'Berlin',
        月份: 'Jan.',
        月均降雨量: 12.4,
      },
      {
        name: 'Berlin',
        月份: 'Feb.',
        月均降雨量: 23.2,
      },
      {
        name: 'Berlin',
        月份: 'Mar.',
        月均降雨量: 34.5,
      },
      {
        name: 'Berlin',
        月份: 'Apr.',
        月均降雨量: 99.7,
      },
      {
        name: 'Berlin',
        月份: 'May.',
        月均降雨量: 52.6,
      },
      {
        name: 'Berlin',
        月份: 'Jun.',
        月均降雨量: 35.5,
      },
      {
        name: 'Berlin',
        月份: 'Jul.',
        月均降雨量: 37.4,
      },
      {
        name: 'Berlin',
        月份: 'Aug.',
        月均降雨量: 42.4,
      },
    ];

    it('初始化', async () => {
      const { props } = (
        <Canvas context={context} animate={false} pixelRatio={1}>
          <Chart data={data}>
            <Axis field="月份" />
            <Axis field="月均降雨量" />
            <Interval
              x="月份"
              y="月均降雨量"
              color="name"
              adjust={{
                type: 'dodge',
                // marginRatio: 0.05, // 设置分组间柱子的间距
              }}
              viewClip
            />
            <ScrollBar mode="x" range={[0, 0.7]} />
          </Chart>
        </Canvas>
      );

      canvas = new Canvas(props);
      await canvas.render();

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
  });
});
