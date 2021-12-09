import { jsx } from '../../../src/jsx';
import { createContext } from '../../util';
import { Canvas, Chart, Interval, Axis } from '../../../src';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: -110 },
];

describe('Interval', () => {
  it('render', () => {
    const ref = {};
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" min={0} />
          <Interval
            // ref={ ref }
            x="genre"
            y="sold"
            color="genre"
            // onPress={ (ev) => {
            //   const { points, geometry } = ev || {};
            //   const point = points[0];
            //   const records = geometry.getSnapRecords(point);
            //   console.log(records);
            // } }
          />
          {/* <Tooltip geometryRef={ ref } records={ [{ x: 179.5, y: 280 }] } /> */}
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });

  it('startOnZero', () => {
    const { type, props } = (
      <Canvas context={context}>
        <Chart data={data}>
          <Axis field="genre" />
          <Axis field="sold" min={0} />
          <Interval startOnZero={false} x="genre" y="sold" color="genre" />
        </Chart>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();
  });
});
