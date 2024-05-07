import { jsx, Canvas, Chart } from '../../../src';
import { Line, PolylineGuide } from '../../../src/components';
import { createContext, delay } from '../../util';

const data = [
  { genre: 'Sports', sold: 275, type: 'a' },
  { genre: 'Strategy', sold: 115, type: 'a' },
  { genre: 'Action', sold: 120, type: 'a' },
  { genre: 'Shooter', sold: 350, type: 'a' },
  { genre: 'Other', sold: 150, type: 'a' },
];

describe('PolylineGuide ', () => {
  it('default', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="genre" y="sold" />
          <PolylineGuide
            records={data.slice(1, 4)}
            style={{
              stroke: 'red',
            }}
          />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    await chart.render();

    await delay(300);
    expect(context).toMatchImageSnapshot();
  });

  it('offset', async () => {
    const context = createContext();
    const { props } = (
      <Canvas context={context} pixelRatio={1} animate={false}>
        <Chart data={data}>
          <Line x="genre" y="sold" />
          <PolylineGuide
            records={data.slice(1, 4)}
            offsetX="10px"
            offsetY="10px"
            style={{
              stroke: '#000',
            }}
          />
        </Chart>
      </Canvas>
    );

    const chart = new Canvas(props);
    await chart.render();

    await delay(300);
    expect(context).toMatchImageSnapshot();
  });
});
