import { jsx, Canvas, Chart, Area } from '../../../src';
import { Line, Point, Tooltip, Axis } from '../../../src/components';
import { createContext, delay } from '../../util';

const data = [
  {
    item: 'Design',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Design',
    user: '用户 B',
    score: 30,
  },
  {
    item: 'Development',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Development',
    user: '用户 B',
    score: 70,
  },
  {
    item: 'Marketing',
    user: '用户 A',
    score: 50,
  },
  {
    item: 'Marketing',
    user: '用户 B',
    score: 60,
  },
  {
    item: 'Users',
    user: '用户 A',
    score: 40,
  },
  {
    item: 'Users',
    user: '用户 B',
    score: 50,
  },
  {
    item: 'Test',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Test',
    user: '用户 B',
    score: 70,
  },
  {
    item: 'Language',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Language',
    user: '用户 B',
    score: 50,
  },
  {
    item: 'Technology',
    user: '用户 A',
    score: 70,
  },
  {
    item: 'Technology',
    user: '用户 B',
    score: 40,
  },
  {
    item: 'Support',
    user: '用户 A',
    score: 60,
  },
  {
    item: 'Support',
    user: '用户 B',
    score: 40,
  },
];

const data1 = [
  {
    time: '10-01',
    value: 14380,
    name: '同行同层平均',
  },
  {
    time: '12-02',
    value: 15661,
    name: '同行同层平均',
  },
  {
    time: '12-03',
    value: 13054,
    name: '同行同层平均',
  },
  {
    time: '12-04',
    value: 15345,
    name: '同行同层平均',
  },
  {
    time: '12-05',
    value: 13345,
    name: '同行同层平均',
  },
];

const data2 = [
  ...data1,
  {
    time: '10-01',
    value: 15380,
    name: '本店',
  },
  {
    time: '12-02',
    value: 13661,
    name: '本店',
  },
  {
    time: '12-03',
    value: 16054,
    name: '本店',
  },
  {
    time: '12-04',
    value: 12345,
    name: '本店',
  },
  {
    time: '12-05',
    value: 11345,
    name: '本店',
  },  
];
describe('雷达图', () => {
  describe('面积雷达图', () => {
    it('面积雷达图图', async () => {
      const context = createContext();
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data} coord="polar">
            <Axis field="item" />
            <Axis field="score" />
            <Line x="item" y="score" color="user" />
            <Area x="item" y="score" color="user" />
            <Point x="item" y="score" color="user" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('雷达图 grid 为 line', async () => {
      const context = createContext();
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data} coord="polar">
            <Axis field="item" grid="line" />
            <Axis field="score" grid="line" />
            <Line x="item" y="score" color="user" />
            <Area x="item" y="score" color="user" />
            <Point x="item" y="score" color="user" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('雷达图展示 Tooltip', async () => {
      const context = createContext('Tooltip 默认展示');
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data1} coord="polar">
            <Axis field="time" grid="line" />
            <Axis field="value" grid="line" style={{ label: null }} />
            <Line x="time" y="value" color="name" />
            <Tooltip alwaysShow={true} defaultItem={data1[0]} snap />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('雷达图展示辅助线', async () => {
      const context = createContext();
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data1} coord="polar">
            <Axis field="time" grid="line" />
            <Axis field="value" grid="line" style={{ label: null }} />
            <Line x="time" y="value" color="name" />
            <Point x="time" y="value" color="name" />
            <Tooltip custom={true} alwaysShow defaultItem={data1[0]} snap showCrosshairs />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('雷达图-label 为 null', async () => {
      const context = createContext();
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data} coord="polar">
            <Axis
              field="item"
              style={{
                label: null,
              }}
            />
            <Axis field="score" />
            <Line x="item" y="score" color="user" />
          </Chart>
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      await delay(1000);
      expect(context).toMatchImageSnapshot();
    });

    it('雷达图交互：选中维度的 snap 点设置不同色', async () => {
      const context = createContext('雷达图交互：选中维度的 snap 点设置不同色');
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Chart data={data2} coord="polar">
            <Axis field="time" grid="line" />
            <Axis field="value" grid="line" style={{ label: null }} />
            <Line x="time" y="value" color="name" />
            <Point x="time" y="value" color="name" />
            <Tooltip custom={true} alwaysShow defaultItem={data2[0]} snap showCrosshairs 
                // tooltipMarkerStyle中不设置fill时，默认使用record 记录中color自动填充                
                tooltipMarkerStyle = {{
                  r: 5,
                  stroke: '#fff',
                  lineWidth: '4px',      
                }}
            />
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
