import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Interval, Axis, ElementLink, Legend } from '../../../src/components';
import { createContext, delay, gestureSimulator } from '../../util';
import data from './data.json';

describe('element-link', () => {
  it('select', async () => {
    const context = createContext('带交互', {
      height: '300px',
      width: '400px',
    });

    const { props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="value" />
          <Interval x="year" y="value" color="type" adjust="stack" />
          <ElementLink field="type" />
          <Legend position="top" clickMode="element-link" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);

    await gestureSimulator(context.canvas, 'click', { x: 150, y: 30 });
    await delay(100);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 150, y: 50 });
    await delay(100);
    expect(context).toMatchImageSnapshot();
  });

  it('toggle highlight', async () => {
    const context = createContext('toggle highlight', {
      height: '300px',
      width: '400px',
    });

    const { props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="year" />
          <Axis field="value" />
          <Interval x="year" y="value" color="type" adjust="stack" />
          <ElementLink field="type" />
          <Legend position="top" clickMode="element-link" />
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);

    await gestureSimulator(context.canvas, 'click', { x: 150, y: 30 });
    await delay(100);
    expect(context).toMatchImageSnapshot();

    await gestureSimulator(context.canvas, 'click', { x: 150, y: 30 });
    await delay(100);

    expect(context).toMatchImageSnapshot();
  });
});
