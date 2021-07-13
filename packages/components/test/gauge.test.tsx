import { jsx } from '@ali/f2-jsx';
import Canvas, { Gauge } from '../src';
import { createContext } from './util';
const context = createContext();


describe('Gauge', () => {
  it('render', () => {
    const { type, props } = (
      <Canvas context={ context }>
        <Gauge
          center={{ x: 200, y: 150 }}
          startAngle={ Math.PI }
          endAngle={ Math.PI * 2 }
          percent={ 0.5 }
          r="200px"
          tickCount={ 6 }
        />
      </Canvas>
    );

    // @ts-ignore
    const canvas = new type(props);
    canvas.render();
  })
});
