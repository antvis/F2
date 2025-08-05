import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Interval, Axis } from '../../../src/components';
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

    await delay(500);
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

    await delay(500);
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

    await delay(500);
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

    await delay(300);
    expect(context).toMatchImageSnapshot();
  });
});
