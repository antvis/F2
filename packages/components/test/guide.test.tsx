// @ts-nocheck
import { jsx } from '@ali/f2-jsx';
import Canvas, { Chart, Axis, Line, Guide } from '../src';
import { createContext } from './util';
const context = createContext();
import data from '../../fund-charts/test/data/managerData'

// const data = [
//   { genre: 'Sports', sold: 275, type: 'a' },
//   { genre: 'Strategy', sold: 115, type: 'a' },
//   { genre: 'Action', sold: 120, type: 'a' },
//   { genre: 'Shooter', sold: 350, type: 'a' },
//   { genre: 'Other', sold: 150, type: 'a' }
// ];

describe('Guide test', () => {
  it('render', () => {
    const { type, props } = (
      <Canvas context={ context } pixelRatio={ window.devicePixelRatio } animate={ false }>
        <Chart data={ data.data } >
          <Line
            position="reportDateTimestamp*rate"
            color={'codeType'}
          />
          {/* <Guide
            records={ [{ genre: 'Sports', sold: 275 }] }
          /> */}
        </Chart>
      </Canvas>
    );

    const chart = new type(props);
    chart.render();

    // const container = chart.container;
    // console.log(container);

    // expect(container.get('children').length).toBe(2);



    
  })
});
