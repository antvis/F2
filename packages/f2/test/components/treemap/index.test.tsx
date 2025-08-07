import { Polar } from '../../../src/coord';
import { Canvas, Treemap, jsx } from '../../../src';
import { createContext, delay, gestureSimulator } from '../../util';
const context = createContext();

const data = [
  {
    name: '贵州茅台',
    value: 0.16,
    rate: 0.1,
  },
  {
    name: '贵州茅台1',
    value: 0.1,
    rate: -0.1,
  },
  {
    name: '五粮液',
    value: 0.13,
    rate: -0.1,
  },
  {
    name: '五粮液',
    value: 0.12,
    rate: -0.01,
  },
  {
    name: '招商银行',
    value: 0.15,
    rate: 0,
  },
  {
    name: '招商银行',
    value: 0.08,
    rate: 0,
  },
  {
    name: '中国平安',
    value: 0.07,
    rate: 0.1,
  },
  {
    name: '中国平安',
    value: 0.06,
    rate: 0.1,
  },
  {
    name: '同花顺',
    value: 0.1,
    rate: 0,
  },
  {
    name: '同花顺',
    value: 0.03,
    rate: 0,
  },
];
describe('Treemap', () => {
  it('render', async () => {
    const onClick = jest.fn();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          data={data}
          color={{
            field: 'name',
          }}
          value="value"
          onClick={onClick}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 265, y: 170 });

    await delay(100);
    expect(onClick.mock.calls.length).toBe(1);
    expect(onClick.mock.calls[0][0].origin).toEqual({ name: '中国平安', value: 0.06, rate: 0.1 });

    await delay(100);
    canvas.destroy();
  });
  it('space ', async () => {
    const onClick = jest.fn();
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          data={data}
          color={{
            field: 'name',
          }}
          value="value"
          space={2}
          onClick={onClick}
          label={true}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
    await delay(100);
    canvas.destroy();
  });
  it('select ', async () => {
    const treemapRef = { current: null };
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          ref={treemapRef}
          data={data}
          color={{
            field: 'name',
          }}
          value="value"
          space={2}
          label={true}
          selection={{
            triggerOn: 'click',
            defaultSelected: [
              {
                name: '贵州茅台',
                value: 0.16,
                rate: 0.1,
              },
            ],
            selectedStyle: {
              fillOpacity: 1,
            },
            unSelectedStyle: {
              fillOpacity: 0.4,
            },
          }}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
    expect(treemapRef.current?.records[0]?.selected).toBe(true);

    const { props: nextProps } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          ref={treemapRef}
          data={data}
          color={{
            field: 'name',
          }}
          value="value"
          space={2}
          label={true}
          selection={{
            triggerOn: 'click',
            defaultSelected: [
              {
                name: '五粮液',
                value: 0.13,
                rate: -0.1,
              },
            ],
            selectedStyle: {
              fillOpacity: 1,
            },
            unSelectedStyle: {
              fillOpacity: 0.4,
            },
          }}
        />
      </Canvas>
    );

    canvas.update(nextProps);
    await delay(1000);
    expect(context).toMatchImageSnapshot();
    expect(treemapRef.current?.records[2]?.selected).toBe(true);
    await delay(100);
    canvas.destroy();
  });
  it('select triggerOn', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          data={data}
          color={{
            field: 'name',
          }}
          value="value"
          space={20}
          label={true}
          selection={{
            triggerOn: 'click',
            selectedStyle: {
              fillOpacity: 1,
            },
            unSelectedStyle: {
              fillOpacity: 0.4,
            },
          }}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(800);

    gestureSimulator(context.canvas, 'click', { x: 260, y: 170 });
    await delay(800);
    expect(context).toMatchImageSnapshot();

    await delay(800);
    gestureSimulator(context.canvas, 'click', { x: 250, y: 170 });
    await delay(800);
    expect(context).toMatchImageSnapshot();
    await delay(100);
    canvas.destroy();
  });
  it('反选', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          data={data}
          color={{
            field: 'name',
          }}
          value="value"
          space={20}
          label={true}
          selection={{
            triggerOn: 'click',
            selectedStyle: {
              fillOpacity: 1,
            },
            unSelectedStyle: {
              fillOpacity: 0.4,
            },
          }}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(800);

    gestureSimulator(context.canvas, 'click', { x: 260, y: 170 });
    await delay(800);
    expect(context).toMatchImageSnapshot();

    await delay(800);
    gestureSimulator(context.canvas, 'click', { x: 260, y: 170 });
    await delay(800);
    expect(context).toMatchImageSnapshot();
    await delay(100);
    canvas.destroy();
  });
  it('取消反选', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          data={data}
          color={{
            field: 'name',
          }}
          value="value"
          space={20}
          label={true}
          selection={{
            triggerOn: 'click',
            selectedStyle: {
              fillOpacity: 1,
            },
            unSelectedStyle: {
              fillOpacity: 0.4,
            },
            cancelable: false,
          }}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(800);

    gestureSimulator(context.canvas, 'click', { x: 260, y: 170 });
    await delay(800);
    expect(context).toMatchImageSnapshot();

    await delay(800);
    gestureSimulator(context.canvas, 'click', { x: 260, y: 170 });
    await delay(800);
    expect(context).toMatchImageSnapshot();
    await delay(100);
    canvas.destroy();
  });
  it('多选', async () => {
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <Treemap
          data={data}
          color={{
            field: 'name',
          }}
          value="value"
          space={20}
          label={true}
          selection={{
            triggerOn: 'click',
            selectedStyle: {
              fillOpacity: 1,
            },
            unSelectedStyle: {
              fillOpacity: 0.4,
            },
            cancelable: false,
            type: 'multiple',
          }}
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    await delay(800);

    gestureSimulator(context.canvas, 'click', { x: 260, y: 170 });
    await delay(800);
    expect(context).toMatchImageSnapshot();

    await delay(800);
    gestureSimulator(context.canvas, 'click', { x: 230, y: 170 });
    await delay(800);
    expect(context).toMatchImageSnapshot();
    await delay(100);
    canvas.destroy();
  });
});
