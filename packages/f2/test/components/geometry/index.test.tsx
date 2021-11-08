import { jsx } from '../../../src/jsx';
import Geometry from '../../../src/components/geometry';
import { createContext } from '../../util';
import { Canvas, Chart, Interval, Axis } from '../../../src';
const context = createContext();

const data = [{ genre: 'Sports', sold: 275, type: 'a' }];

const data1 = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
];

class GeometryTest extends Geometry {
  render() {
    const records = this.mapping();
    return (
      <group>
        {records.map(record => {
          const { children } = record;
          return children.map(item => {
            const { x, y } = item;
            return (
              <circle
                attrs={{
                  x,
                  y,
                  r: '20px',
                  fill: '#000',
                }}
              />
            );
          });
        })}
      </group>
    );
  }
}

describe('geometry', () => {
  let canvas;
  const chartRef = { current: null };
  const componentRef = { current: null };

  it('geometry render', () => {
    const { type, props } = (
      <Canvas context={context}>
        <Chart ref={chartRef} data={data}>
          <GeometryTest ref={componentRef} x="genre" y="sold" />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    canvas = new type(props);
    canvas.render();

    expect(chartRef.current.scale.scales.genre.values).toEqual(['Sports']);

    const container = componentRef.current.container;
    const group = container.get('children')[0];
    expect(group.get('children').length).toBe(1);
    expect(group.get('children')[0].get('type')).toBe('circle');
  });

  it('geometry update', () => {
    const newChart = (
      <Chart data={data1}>
        <GeometryTest ref={componentRef} x="genre" y="sold" />
      </Chart>
    );

    canvas.update({
      children: newChart,
    });

    expect(chartRef.current.scale.scales.genre.values).toEqual([
      'Sports',
      'Strategy',
    ]);

    const container = componentRef.current.container;
    const group = container.get('children')[0];
    expect(group.get('children').length).toBe(2);
  });
});
