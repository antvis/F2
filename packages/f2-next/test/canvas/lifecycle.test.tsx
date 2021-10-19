import { jsx, Canvas, Component } from '../../src';
import { createContext } from '../util';
const context = createContext();

class Test extends Component {
  didMount() {
    console.log('Test didMount');
  }

  shouldUpdate() {
    console.log('Test shouldUpdate');
    return true;
  }

  willReceiveProps(nextProps) {
    console.log('Test willReceiveProps, nextProps:', nextProps);
  }

  willUpdate() {
    console.log('Test willUpdate');
  }

  didUpdate() {
    console.log('Test didUpdate');
  }

  willUnmount() {
    console.log('Test willUnmount');
  }

  didUnmount() {
    console.log('Test didUnmount');
  }

  render() {
    const { props } = this;
    console.log('Test render', props);

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

class TestContainer extends Component {
  didMount() {
    console.log('TestContainer didMount');
  }

  shouldUpdate() {
    console.log('TestContainer shouldUpdate');
    return true;
  }

  willReceiveProps(nextProps) {
    console.log('TestContainer willReceiveProps, nextProps:', nextProps);
  }

  willUpdate() {
    console.log('TestContainer willUpdate');
  }

  didUpdate() {
    console.log('TestContainer didUpdate');
  }

  willUnmount() {
    console.log('TestContainer willUnmount');
  }

  didUnmount() {
    console.log('TestContainer didUnmount');
  }

  render() {
    const { props } = this;
    console.log('TestContainer render', props);

    const { children } = props;
    return children;
  }
}

describe('Canvas', () => {
  it('生命周期', () => {
    const ref = { current: null };
    const { type, props } = (
      <Canvas context={context} pixelRatio={2}>
        <TestContainer>
          <Test width={100} ref={ref} />
          <Test width={100} />
        </TestContainer>
      </Canvas>
    );

    // @ts-ignored
    const canvas = new Canvas(props);
    canvas.render();

    setTimeout(() => {
      console.log('调用update');
      canvas.update(
        (
          <Canvas context={context} pixelRatio={2}>
            <TestContainer>
              <Test width={200} ref={ref} />
            </TestContainer>
          </Canvas>
        ).props
      );
    }, 1000);

    setTimeout(() => {
      console.log('调用forceUpdate');
      ref.current.forceUpdate();
    }, 2000);
    // const testComponent = canvas.component.components;

    // expect(context.canvas.width).toBe(359);
    // expect(context.canvas.height).toBe(400);

    // expect(testComponent).toBeInstanceOf(Test);

    // canvas.render();

    // // @ts-ignore
    // const rect = testComponent.container._attrs.children[0];
    // expect(rect._attrs.type).toBe('rect');
    // expect(rect._attrs.attrs.fill).toBe('red');
  });
});
