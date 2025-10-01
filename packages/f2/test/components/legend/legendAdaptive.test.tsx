import { jsx, Component, Canvas, Chart, Tooltip, Geometry, Interval } from '../../../src';
import { Line, Axis, Legend } from '../../../src/components';
import { createContext, delay, gestureSimulator } from '../../util';

describe('adaptive', () => {
  const data = [
    { genre: '债券基金', sold: 275, a: '1' },
    { genre: '申万宏源固守+基金指数', sold: 115, a: '1' },
    { genre: '基金指数', sold: 120, a: '1' },
  ];
  it('居左', async () => {
    const context = createContext('居左', {
      height: '70px',
      width: '500px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Legend
            layoutMode="adaptive"
            style={{
              justifyContent: 'flex-start',
            }}
            itemStyle={{
              stroke: 'red',
            }}
          />
          <Geometry x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('居中', async () => {
    const context = createContext('居中', {
      height: '70px',
      width: '500px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Legend
            layoutMode="adaptive"
            style={{
              justifyContent: 'center',
            }}
            itemStyle={{
              stroke: 'red',
            }}
          />
          <Geometry x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('居右', async () => {
    const context = createContext('居右', {
      height: '70px',
      width: '500px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Legend
            layoutMode="adaptive"
            style={{
              justifyContent: 'flex-end',
            }}
            itemStyle={{
              stroke: 'red',
            }}
          />
          <Geometry x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('左右顶', async () => {
    const context = createContext('左右顶', {
      height: '70px',
      width: '500px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Legend
            layoutMode="adaptive"
            itemStyle={{
              stroke: 'red',
            }}
          />
          <Geometry x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('item间空隙', async () => {
    const context = createContext('item间空隙', {
      height: '70px',
      width: '500px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart data={data}>
          <Legend
            layoutMode="adaptive"
            style={{
              justifyContent: 'center',
            }}
            itemStyle={{
              padding: ['6px', '30px', '6px', '30px'],
              stroke: 'red',
            }}
          />
          <Geometry x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('position = top', async () => {
    const context = createContext('position = top', {
      height: '200px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval x="a" y="sold" adjust="stack" color="genre" />
          <Legend
            position="top"
            layoutMode="adaptive"
            itemStyle={{
              stroke: 'red',
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
  it('position = bottom', async () => {
    const context = createContext('position = bottom', {
      height: '200px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval x="a" y="sold" adjust="stack" color="genre" />
          <Legend
            position="bottom"
            layoutMode="adaptive"
            itemStyle={{
              stroke: 'red',
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('position = left', async () => {
    const context = createContext('position = left', {
      height: '100px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Interval x="a" y="sold" adjust="stack" color="genre" />
          <Legend
            position="left"
            layoutMode="adaptive"
            itemStyle={{
              stroke: 'red',
            }}
          />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });

  it('position = right', async () => {
    const context = createContext('position = right', {
      height: '100px',
    });
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Chart
          data={data}
          coord={{
            type: 'polar',
            transposed: true,
          }}
        >
          <Legend
            position="right"
            layoutMode="adaptive"
            itemStyle={{
              stroke: 'red',
            }}
          />
          <Interval x="a" y="sold" adjust="stack" color="genre" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
