import { jsx } from '../../../src';
import { Canvas, Chart } from '../../../src';
import { Interval, Axis, ElementLink } from '../../../src/components';
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
        <Chart
          data={data}
          selection={{
            mode: 'element-link',
            triggerOn: 'click',
            selectedStyle: {
              fillOpacity: 1,
            },
            unSelectedStyle: {
              fillOpacity: 0.4,
            },
          }}
        >
          <Axis field="year" />
          <Axis field="value" />
          <Interval x="year" y="value" color="type" adjust="stack">
            <ElementLink field="type" />
          </Interval>
        </Chart>
      </Canvas>
    );
    const canvas = new Canvas(props);
    await canvas.render();

    await delay(500);

    await gestureSimulator(context.canvas, 'click', { x: 100, y: 150 });
    await delay(100);
    // expect(context).toMatchImageSnapshot();

    // await gestureSimulator(context.canvas, 'click', { x: 200, y: 150 });
    // await delay(100);
    // expect(context).toMatchImageSnapshot();
  });
});
