import { jsx, Component, Canvas, Chart, Line, Legend, Tooltip, TextGuide } from '../../../src';
import { Layout } from '../../../src/components';
import { createContext, delay } from '../../util';
const data1 = [
  { x: 0, y: 1, name: 'A' },
  { x: 1, y: 2, name: 'B' },
  { x: 2, y: 3, name: 'C' },
  { x: 3, y: 4, name: 'D' },
];

const data2 = [
  { x: 0, y: 4, name: 'E' },
  { x: 1, y: 3, name: 'F' },
  { x: 2, y: 2, name: 'G' },
  { x: 3, y: 1, name: 'H' },
];

const ChartA = (props) => {
  const { data, color, style } = props;
  return (
    <Chart data={data} color={color} style={style}>
      <Line x="x" y="y" color={color} />
      <Legend />
      <Tooltip />
      <TextGuide content={`textGuide`} records={[data[1]]} />
    </Chart>
  );
};

describe('布局组件', () => {
  describe('布局类型', () => {
    it('横向布局', async () => {
      const context = createContext('横向布局', {
        width: '300px',
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Layout type="horizontal">
            <rect style={{ width: '50px', height: '50px', fill: '#FF5733' }} />
            <rect style={{ width: '50px', height: '50px', fill: '#33FF57' }} />
            <rect style={{ width: '50px', height: '50px', fill: '#3357FF' }} />
          </Layout>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('圆形布局', async () => {
      const context = createContext('圆形布局', {
        width: '300px',
        height: '100px',
      });
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Layout type="circular">
            <circle style={{ r: '10px', fill: '#FF6B6B' }} />
            <circle style={{ r: '10px', fill: '#4ECDC4' }} />
            <circle style={{ r: '10px', fill: '#45B7D1' }} />
            <circle style={{ r: '10px', fill: '#96CEB4' }} />
            <circle style={{ r: '10px', fill: '#FFEEAD' }} />
            <circle style={{ r: '10px', fill: '#D4A5A5' }} />
          </Layout>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('横向布局包含两个图表', async () => {
      const context = createContext('横向布局', {
        width: '300px',
        height: '100px',
      });
      const { props } = (
        <Canvas context={context}>
          <Layout
            type="horizontal"
            itemStyle={{
              stroke: '#333333',
              lineWidth: 1,
            }}
          >
            <ChartA data={data1} color="#4ECDC4" style={{ height: '120px' }} />
            <ChartA data={data2} color="#FF6B6B" style={{ height: '80px' }} />
          </Layout>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('纵向布局包含两个图表', async () => {
      const context = createContext('纵向布局包含两个图表', {
        width: '200px',
        height: '200px',
      });

      const { props } = (
        <Canvas context={context}>
          <Layout
            type="vertical"
            itemStyle={{
              stroke: '#333333',
              lineWidth: 1,
            }}
          >
            <ChartA data={data1} color="#4ECDC4" />
            <ChartA data={data2} color="#FF6B6B" />
          </Layout>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('Grid布局', async () => {
      const context = createContext('Grid布局', {
        width: '300px',
        height: '300px',
      });

      const { props } = (
        <Canvas context={context}>
          <Layout
            type="grid"
            columns={2}
            itemStyle={{
              stroke: '#333333',
              lineWidth: 1,
            }}
          >
            {/* 第一行 */}
            <ChartA data={data1} color="#4ECDC4" style={{ height: '120px' }} />
            <ChartA data={data2} color="#FF6B6B" style={{ height: '120px' }} />
            {/* 第二行 */}
            <ChartA data={data1} color="#96CEB4" style={{ height: '120px' }} />
            <ChartA data={data2} color="#FFEEAD" style={{ height: '120px' }} />
          </Layout>
        </Canvas>
      );
      const canvas = new Canvas(props);
      await canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });
  });
});
