import { jsx } from '@ali/f2-jsx';
import Canvas, { Chart, Axis, Interval, Tooltip } from '../src';
import { createContext } from './util';
const context = createContext();

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: -110 }
];

describe('Interval', () => {
  it('render', () => {
    const ref = {};
    const { type, props } = (
      <Canvas context={ context }>
        <Chart data={ data } >
          <Axis field="genre" />
          <Axis field="sold" min={ 0 } />
          <Interval
            // ref={ ref }
            position="genre*sold"
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

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  })

  it('startOnZero', () => {
    const { type, props } = (
      <Canvas context={ context }>
        <Chart data={ data } >
          <Axis field="genre" />
          <Axis field="sold" min={ 0 } />
          <Interval
            startOnZero={false}
            position="genre*sold"
            color="genre"
          />
        </Chart>
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  })
});
