import { jsx } from '@ali/f2-jsx';
import Canvas, { Chart, Interval, Axis } from '../../src';
import Geometry from '../../src/geometry';
import { createContext } from '../util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 190, type: 'a' },

  { genre: 'Sports', sold: 275, type: 'b' },
  { genre: 'Strategy', sold: 105, type: 'b' },
  { genre: 'Action', sold: 120, type: 'b' },
  { genre: 'Shooter', sold: 350, type: 'b' },
  { genre: 'Other', sold: -190, type: 'b' },
];

class GeometryTest extends Geometry {
  render() {
    const mappedArray = this._mapping();
    return (
      <group>
        {
          mappedArray.map(dataArray => {
            return dataArray.map(item => {
              const { x, y } = item;
              return (
                <circle
                  attrs={{
                    x,
                    y,
                    r: '20px',
                    fill: '#000'
                  }}
                />
              );
            })
          })
        }
      </group>
    );
  }
}

describe('geometry', () => {
  let canvas;
  const chartRef = { current: null };
  const componentRef = { current: null };

  it('geometry render', (done) => {
    const { type, props } = (
      <Canvas context={ context } height={197}>
        <Chart
          ref={ chartRef }
          data={ data }
        >
          {/* <Axis field="genre"/>
          <Axis field="sold"/> */}
          <Interval
            ref={ componentRef }
            position="genre*sold"
            color="type"
            // adjust="dodge"
          />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    canvas = new type(props);
    canvas.render();

    setTimeout(() => {
      const container = componentRef.current.container;
      const group = container.get('children')[0];
      expect(group.get('children').length).toBe(10);

      expect(group.get('children')[0].get('type')).toBe('rect');
      expect(group.get('children')[0].get('attrs').x).toBeCloseTo(52.01);
      expect(group.get('children')[0].get('attrs').y).toBeCloseTo(140.25);
      expect(group.get('children')[0].get('attrs').width).toBeCloseTo(16.45);
      expect(group.get('children')[0].get('attrs').height).toBeCloseTo(-57.40625);

      expect(group.get('children')[5].get('attrs').x).toBeCloseTo(27.34);
      expect(group.get('children')[5].get('attrs').y).toBeCloseTo(140.25);
      expect(group.get('children')[5].get('attrs').width).toBeCloseTo(16.45);
      expect(group.get('children')[5].get('attrs').height).toBeCloseTo(-57.40625);
      done();
    }, 600);
  });
});
