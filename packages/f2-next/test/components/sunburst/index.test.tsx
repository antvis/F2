import { jsx } from '../../../lib/jsx';
import Canvas, { Sunburst } from '../../../lib/components';
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
]

describe('Treemap', () => {
  it('render', () => {
    const { type, props } = (
      <Canvas context={ context }>
        <Sunburst
          data={ data.children }
          color={{
            field: 'name',
            values: [
              '#1890FF',
              '#2FC25B',
              '#FACC14',
              '#223273',
              '#8543E0',
              '#13C2C2',
              '#3436C7',
              '#F04864'
            ],
          }}
          value="value"
        />
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  })
});
