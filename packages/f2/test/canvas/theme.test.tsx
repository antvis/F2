import { jsx, Canvas, Component } from '../../src';
import { createContext } from '../util';
const context = createContext();

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
    it('默认主题', () => {
      const textRef = { current: null };
      const { props } = (
        <Canvas context={context} pixelRatio={1}>
          <Text ref={textRef} />
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      expect(textRef.current.width).toBeCloseTo(30.02);
    });

    it('自定义设置', () => {
      const textRef = { current: null };
      const { props } = (
        <Canvas
          context={context}
          pixelRatio={1}
          theme={{
            fontFamily: '"Heiti SC"',
          }}
        >
          <Text ref={textRef} />
        </Canvas>
      );

      const canvas = new Canvas(props);
      canvas.render();

      expect(textRef.current.width).toBeCloseTo(29.9159);
    });
  });
});
