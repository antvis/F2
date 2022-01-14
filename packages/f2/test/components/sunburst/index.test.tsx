import { jsx } from '../../../src/jsx';
import { Polar } from '../../../src/coord';
import { Canvas, Sunburst } from '../../../src';
import { createContext, delay } from '../../util';
import data from './data';
const context = createContext();

const colors = [
  'rgb(110, 64, 170)',
  'rgb(191, 60, 175)',
  'rgb(254, 75, 131)',
  'rgb(255, 120, 71)',
  'rgb(226, 183, 47)',
  'rgb(175, 240, 91)',
  'rgb(82, 246, 103)',
  'rgb(29, 223, 163)',
  'rgb(35, 171, 216)',
  'rgb(76, 110, 219)',
];

describe('Sunburst', () => {
  it('render', async () => {
    const { type, props } = (
      <Canvas context={context} pixelRatio={1}>
        <Sunburst
          data={data.children}
          coord={{
            type: Polar,
            // transposed: true,
            // left: 10,
            // top: 10,
            // width: 100,
            // height: 100
          }}
          color={{
            field: 'name',
            // range: colors
          }}
          value="value"
        />
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(1000);
    expect(context).toMatchImageSnapshot();
  });
});
