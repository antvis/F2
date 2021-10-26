import { jsx } from '../../src/jsx';
import { Canvas, Chart, Area, Line, Axis } from '../../src';
import { createContext } from '../util';
import { Rect } from '../../src/coord';
const context = createContext();
const { offsetWidth } = document.body;
const height = offsetWidth * 0.75;

const data = [{
  time: 'Jan.',
  tem: 1000
}, {
  time: 'Feb.',
  tem: 2200
}, {
  time: 'Mar.',
  tem: 2000
}, {
  time: 'Apr.',
  tem: 2600
}, {
  time: 'May.',
  tem: 2000
}, {
  time: 'Jun.',
  tem: 2600
}, {
  time: 'Jul.',
  tem: 2800
}, {
  time: 'Aug.',
  tem: 2000
}];
describe('Area', () => {
  it('render', () => {
    const areaRef = { current: null };
    const { type, props } = (
      <Canvas
        context={context}
        width={offsetWidth}
        height={height}
        coord={{
          type: Rect,
        }}
        pixelRatio={window.devicePixelRatio}
      >
        <Chart data={data} scale={{
          tem: {
            min: 0,
            tickCount: 5,
          },
          time: {
            range: [0, 1]
          }
        }}>
          <Axis field="time" />
          <Axis field="tem" />
          <Area x="time" y="tem" ref={areaRef} />
          <Line x="time" y="tem" />
        </Chart>
      </Canvas>
    );
    // @ts-ignore
    const chart = new type(props);
    chart.render();
    console.log(areaRef.current.getSnapRecords({ x: 100, y: 100 }));
  });
});
