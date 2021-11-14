import { jsx, Canvas, Component } from '../../src';
import { createContext } from '../util';
const context = createContext();

class Test extends Component {
  render() {
    const { props } = this;
    const { width = 0 } = props;
    return (
      <rect
        attrs={{
          x: 0,
          y: 0,
          fill: 'red',
          width,
          height: 10,
        }}
        animation={{
          appear: {
            easing: 'linear',
            duration: 300,
            property: ['width'],
            start: {
              width: 0,
            },
            end: {},
          },
          update: {
            easing: 'linear',
            duration: 300,
            property: ['width'],
          },
        }}
      />
    );
  }
}

describe.skip('Canvas', () => {
  it('3.0 api', () => {
    // const canvas = new Canvas({
    //   context,
    //   pixelRatio: window.devicePixelRatio
    // });
    // // const test = canvas.createComponent(Test, {});
    // canvas.render();
  });
});
