import { jsx } from '../../../src';
import { createContext } from '../../util';
import { Canvas, Component } from '../../../src';
const context = createContext('', {
  width: '300px',
  height: '300px',
});

class Test extends Component {
  render() {
    return (
      <rect
        attrs={{
          x: '20px',
          y: '20px',
          width: '20px',
          height: '20px',
          fill: 'red',
        }}
      />
    );
  }
}

describe('Canvas', () => {
  it('自定义 px2hd', async () => {
    const { props } = (
      <Canvas
        context={context}
        pixelRatio={1}
        px2hd={(v) => {
          return parseFloat(v);
        }}
      >
        <Test />
      </Canvas>
    );

    const canvas = new Canvas(props);
    await canvas.render();
    const testComponent = canvas.props.children.type;

    expect(context.canvas.width).toBe(300);
    expect(context.canvas.height).toBe(300);

    expect(testComponent).toBe(Test);

    // @ts-ignore
    const rect = canvas.children.component.container.children[0];
    expect(rect.config.type).toBe('rect');
    expect(rect.getAttribute('fill')).toBe('red');
  });
});
