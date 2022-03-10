import { clone, values } from '@antv/util';
import { jsx, Component, Canvas, Chart, Tooltip, Geometry, Interval } from '../../../src';
import { Line, Axis, Legend } from '../../../src/components';
import { createContext, delay } from '../../util';

const { offsetWidth } = document.body;
const height = offsetWidth * 0.75;

describe('图例', () => {
  describe('图例样式', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
    ];
    it('默认', async () => {
      const context = createContext('默认', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('自定义样式', async () => {
      const context = createContext('自定义样式', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend
              style={{
                justifyContent: 'flex-start',
              }}
            />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('多行', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: -110 },
        { genre: 'Other1', sold: -110 },
      ];
      const context = createContext('多行', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('position = bottom', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('position = bottom', {
        height: '70px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend position="bottom" />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('position = left', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('position = left', {
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend position="left" />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('position = right', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('position = right', {
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend position="right" />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('设置 nameStyle', async () => {
      const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
      ];
      const context = createContext('设置 nameStyle', {
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data}>
            <Legend
              position="left"
              nameStyle={{
                fontSize: '40px',
                fill: 'red',
              }}
            />
            <Geometry x="genre" y="sold" color="genre" />
          </Chart>
        </Canvas>
      );
      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });
});
