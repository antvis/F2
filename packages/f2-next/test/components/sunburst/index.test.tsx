import { jsx } from '../../../src/jsx';
import { Polar } from '../../../src/coord';
import Canvas, { Sunburst } from '../../../src/components';
import { createContext } from '../util';
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
  it('render', () => {
    const { type, props } = (
      <Canvas context={context}>
        <Sunburst
          data={data.children}
          coord={
            {
              // type: Polar,
              // transposed: true,
              // left: 100,
              // top: 100,
              // right: 100,
              // bottom: 100,
            }
          }
          color={{
            field: 'name',
            range: colors,
          }}
          value="value"
        />
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  });
});
