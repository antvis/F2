import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Interval, Axis, Line } from '../../../src/components';
import { createContext, delay } from '../../util';

describe('Axis labelAutoRotate', () => {
  const overlappingData = [
    { category: 'Category1', value: 10 },
    { category: 'Category2', value: 15 },
    { category: 'Category3', value: 20 },
    { category: 'Category4', value: 25 },
    { category: 'Category5', value: 30 },
    { category: 'Category6', value: 35 },
    { category: 'Category7', value: 40 },
    { category: 'Category8', value: 45 },
    { category: 'Category9', value: 50 },
    { category: 'Category10', value: 55 },
    { category: 'Category11', value: 60 },
    { category: 'Category12', value: 65 },
    { category: 'Category13', value: 70 },
    { category: 'Category14', value: 75 },
    { category: 'Category15', value: 80 },
  ];

  it('启用标签自动旋转（labelAutoRotate=true）', async () => {
    const context = createContext('启用标签自动旋转');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart
          data={overlappingData}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis
            field="category"
            labelAutoRotate={true} // 启用标签自动旋转
          />
          <Axis field="value" />
          <Interval x="category" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('启用标签自动旋转不用旋转', async () => {
    const context = createContext('启用标签自动旋转不用旋转');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart
          data={[
            { category: '科创AI指数', value: 10 },
            { category: '科创50指数', value: 15 },
            { category: '沪深300指数', value: 20 },
            { category: '芯片指数', value: 25 },
          ]}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis
            field="category"
            labelAutoRotate={true} // 启用标签自动旋转
          />
          <Axis field="value" />
          <Interval x="category" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('启用标签自动旋转角度小', async () => {
    const context = createContext('启用标签自动旋转角度小');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart
          data={[
            { category: '科创AI指数', value: 10 },
            { category: '科创50指数', value: 15 },
            { category: '沪深300指数', value: 20 },
            { category: '测中华半导体芯片指数', value: 25 },
          ]}
        >
          <Axis field="category" labelAutoRotate={true} />
          <Axis field="value" />
          <Interval x="category" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('启用标签自动隐藏（labelAutoHide=true）', async () => {
    const context = createContext('启用标签自动隐藏');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart
          data={overlappingData}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis
            field="category"
            labelAutoHide={true}
            style={{
              label: {
                align: 'between',
              },
            }}
          />
          <Axis field="value" />
          <Interval x="category" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('启用标签自动隐藏（labelAutoHide=true）：无法获取最佳步长，设置首尾', async () => {
    const context = createContext('启用标签自动隐藏');
    const testChartData = [
      {
        "category": "2023-01",
        "value": 83.22
      },
      {
        "category": "2023-02",
        "value": 78.28
      },
      {
        "category": "2023-03",
        "value": 77.5
      },
      {
        "category": "2023-04",
        "value": 83.38
      },
      {
        "category": "2023-05",
        "value": 87.87
      },
      {
        "category": "2023-06",
        "value": 90.78
      },
            {
        "category": "2023-07",
        "value": 93.05
      },
      {
        "category": "2023-08",
        "value": 93.22
      },
            {
        "category": "2023-09",
        "value": 93.4
      },
      {
        "category": "2023-10",
        "value": 87.94
      },
            {
        "category": "2023-11",
        "value": 82.36
      },
      {
        "category": "2023-12",
        "value": 68.32
      },
    ]
 
    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart
          data={testChartData}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis
            field="category"
            labelAutoHide={true}
            style={{
              label: {
                align: 'center',
              },
            }}
          />
          <Axis field="value" />
          <Interval x="category" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('labelAutoHide测试', async () => {
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      category: `Cat${i + 1}`,
      value: ((i % 10) + 1) * 10,
    }));

    const context = createContext('labelAutoHide测试');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={800} height={400}>
        <Chart
          data={largeData}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis field="category" labelAutoHide={true} />
          <Axis field="value" />
          <Interval x="category" y="value" color="#722ED1" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('labelAutoHide测试2', async () => {
    const largeData = Array.from({ length: 100 }, (_, i) => ({
      category: `Category${i + 1}`,
      value: ((i % 20) + 1) * 5,
    }));

    const context = createContext('labelAutoHide测试2');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={600} height={300}>
        <Chart
          data={largeData}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis field="category" labelAutoHide={true} />
          <Axis field="value" />
          <Interval x="category" y="value" color="#52C41A" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('labelAutoHide奇数 ', async () => {
    const largeData = Array.from({ length: 99 }, (_, i) => ({
      category: `Cat${i + 1}`,
      value: ((i % 10) + 1) * 10,
    }));

    const context = createContext('labelAutoHide奇数');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={800} height={400}>
        <Chart
          data={largeData}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis field="category" labelAutoHide={true} />
          <Axis field="value" />
          <Interval x="category" y="value" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('启用标签自动旋转（labelAutoRotate=true）但label为函数', async () => {
    const context = createContext('启用标签自动旋转但label为函数');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart
          data={overlappingData}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis
            field="category"
            labelAutoRotate={true}
            style={{
              label: (text, index, ticks) => {
                return {
                  textAlign: 'center',
                  fill: index % 2 === 0 ? '#1890FF' : '#333333',
                  fontWeight: 'bold',
                };
              },
            }}
          />
          <Axis field="value" />
          <Interval x="category" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('启用标签自动隐藏aligin=between', async () => {
    const context = createContext('启用标签自动隐藏aligin=between');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart
          data={[
            {
              time: '2025-01-04',
              tem: 1000,
            },
            {
              time: '2025-02-04',
              tem: 2200,
            },
            {
              time: '2025-03-04',
              tem: 2000,
            },
            {
              time: '2025-04-04',
              tem: 2600,
            },
            {
              time: '2025-05-04',
              tem: 2000,
            },
            {
              time: '2025-06-04',
              tem: 2600,
            },
            {
              time: '2025-07-04',
              tem: 2400,
            },
          ]}
          scale={{
            time: {
              range: [0, 1],
            },
          }}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis
            field="time"
            labelAutoHide={true}
            style={{
              label: {
                align: 'between',
              },
            }}
          />
          <Axis field="tem" />
          <Line x="time" y="tem" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('safetyDistance属性', async () => {
    const data = [
      { category: '2025-01-04', value: 10 },
      { category: '2025-02-04', value: 15 },
      { category: '2025-03-04', value: 20 },
      { category: '2025-04-04', value: 25 },
      { category: '2025-05-04', value: 25 },
      { category: '2025-06-04', value: 25 },
    ];
    const context = createContext('safetyDistance属性');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart data={data}>
          <Axis
            field="category"
            style={{
              label: {
                fontSize: '19px',
              },
            }}
            labelAutoRotate={true}
          />
          <Axis field="value" />
          <Interval x="category" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();

    const { props: nextProps } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart data={data}>
          <Axis
            field="category"
            style={{
              label: {
                fontSize: '19px',
              },
            }}
            labelAutoRotate={true}
            safetyDistance={3}
          />
          <Axis field="value" />
          <Interval x="category" y="value" color="#2FC25B" />
        </Chart>
      </Canvas>
    );

    await canvas.update(nextProps);
    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('不均匀隐藏', async () => {
    const context = createContext('不均匀隐藏');

    const { props } = (
      <Canvas context={context} pixelRatio={1} width={350} height={250}>
        <Chart
          data={[
            {
              x: '2023-01',
              y: 83.22,
            },
            {
              x: '2023-02',
              y: 78.28,
            },
            {
              x: '2023-03',
              y: 77.5,
            },
            {
              x: '2023-04',
              y: 83.38,
            },
            {
              x: '2023-05',
              y: 87.87,
            },
            {
              x: '2023-06',
              y: 90.78,
            },
            {
              x: '2023-07',
              y: 93.05,
            },
            {
              x: '2023-08',
              y: 93.22,
            },
            {
              x: '2023-09',
              y: 93.4,
            },
            {
              x: '2023-10',
              y: 87.94,
            },
            {
              x: '2023-11',
              y: 82.36,
            },
            {
              x: '2023-12',
              y: 68.32,
            },
            {
              x: '2024-01',
              y: 39.55,
            },
            {
              x: '2024-02',
              y: 20.78,
            },
            {
              x: '2024-03',
              y: 11.39,
            },
            {
              x: '2024-04',
              y: 4.12,
            },
            {
              x: '2024-05',
              y: -0.97,
            },
            {
              x: '2024-06',
              y: 0.04,
            },
            {
              x: '2024-07',
              y: 4.61,
            },
            {
              x: '2024-08',
              y: 6.04,
            },
            {
              x: '2024-09',
              y: 5.34,
            },
            {
              x: '2024-10',
              y: 10.14,
            },
            {
              x: '2024-11',
              y: 10.38,
            },
            {
              x: '2024-12',
              y: 8.09,
            },
            {
              x: '2025-01',
              y: 1.76,
            },
            {
              x: '2025-02',
              y: -9.14,
            },
            {
              x: '2025-03',
              y: -21.03,
            },
            {
              x: '2025-04',
              y: -37.68,
            },
            {
              x: '2025-05',
              y: -43.5,
            },
            {
              x: '2025-06',
              y: -44.38,
            },
            {
              x: '2025-07',
              y: -42.99,
            },
            {
              x: '2025-08',
              y: -39.59,
            },
          ]}
          scale={{
            time: {
              range: [0, 1],
            },
          }}
          style={{
            padding: [0, 0, 0, 0],
          }}
        >
          <Axis
            field="x"
            labelAutoHide={true}
            style={{
              label: {
                align: 'center',
              },
            }}
          />
          <Axis field="y" />
          <Line x="x" y="y" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
