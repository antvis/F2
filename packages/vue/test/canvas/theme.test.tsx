// @ts-nocheck
/** @jsxImportSource @antv/f2 */
import Canvas from '../../src';
import { Component } from '@antv/f2';
import { createContext, delay } from '../util';

class Text extends Component {
  width: number;

  constructor(props, context) {
    super(props, context);
    const { width } = this.context.measureText('0.123', {});
    this.width = width;
  }
}

describe('Theme', () => {
  describe('字体主题设置', () => {
    it('默认主题', async () => {
      const textRef = { current: null };
      const App = (
        <Canvas pixelRatio={1}>
          <Text ref={textRef} />
        </Canvas>
      );

      createContext(App);
      await delay(100);
      expect(textRef.current.width).toBeCloseTo(30.029);
    });

    it('自定义设置', async () => {
      const textRef = { current: null };
      const App = (
        <Canvas
          pixelRatio={1}
          theme={{
            fontFamily: '"Heiti SC","STXIHEI"',
          }}
        >
          <Text ref={textRef} />
        </Canvas>
      );

      createContext(App);
      await delay(100);
      expect(textRef.current.width).toBeCloseTo(29.9159);
    });
  });
});
