import { jsx, Canvas, Component } from '../../src';
import { createContext, delay } from '../util';
const context = createContext();

const methodCallback = jest.fn((method: string, params?) => method);

function pickMethod(calls) {
  return calls.map(([method]) => [method]);
}

class Test extends Component {
  willMount() {
    methodCallback('componentWillMount', this.props);
  }

  didMount() {
    methodCallback('componentDidMount', this.props);
  }

  shouldUpdate(nextProps) {
    methodCallback('componentShouldUpdate', nextProps);
    return true;
  }

  willReceiveProps(nextProps) {
    methodCallback('componentWillReceiveProps', nextProps);
  }

  willUpdate() {
    methodCallback('componentWillUpdate');
  }

  didUpdate() {
    methodCallback('componentDidUpdate');
  }

  willUnmount() {
    methodCallback('componentWillUnmount');
  }

  didUnmount() {
    methodCallback('componentDidUnmount');
  }

  render() {
    methodCallback('componentRender');
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
            duration: 30,
            property: ['width'],
            start: {
              width: 0,
            },
            end: {},
          },
          update: {
            easing: 'linear',
            duration: 30,
            property: ['width'],
          },
        }}
      />
    );
  }
}

class TestContainer extends Component {
  willMount() {
    methodCallback('containerWillMount');
  }

  didMount() {
    methodCallback('containerDidMount');
  }

  shouldUpdate() {
    methodCallback('containerShouldUpdate');
    return true;
  }

  willReceiveProps(nextProps) {
    methodCallback('containerWillReceiveProps', nextProps);
  }

  willUpdate() {
    methodCallback('containerWillUpdate');
  }

  didUpdate() {
    methodCallback('containerDidUpdate');
  }

  willUnmount() {
    methodCallback('containerWillUnmount');
  }

  didUnmount() {
    methodCallback('containerDidUnmount');
  }

  render() {
    methodCallback('containerRender');
    const { props } = this;

    const { children } = props;
    return children;
  }
}

describe('Canvas', () => {
  it('生命周期', async () => {
    const ref = { current: null };
    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <TestContainer>
          <Test width={10} ref={ref} />
          <Test width={10} />
        </TestContainer>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    expect(pickMethod(methodCallback.mock.calls)).toEqual([
      ['containerWillMount'],
      ['containerRender'],
      ['componentWillMount'],
      ['componentWillMount'],
      ['componentRender'],
      ['componentDidMount'],
      ['componentRender'],
      ['componentDidMount'],
      ['containerDidMount'],
    ]);

    await delay(50);
    canvas.update(
      (
        <Canvas context={context} pixelRatio={1}>
          <TestContainer>
            <Test width={20} ref={ref} />
          </TestContainer>
        </Canvas>
      ).props
    );
    expect(pickMethod(methodCallback.mock.calls)).toEqual([
      ['containerWillMount'],
      ['containerRender'],
      ['componentWillMount'],
      ['componentWillMount'],
      ['componentRender'],
      ['componentDidMount'],
      ['componentRender'],
      ['componentDidMount'],
      ['containerDidMount'],
      ['containerShouldUpdate'],
      ['containerWillReceiveProps'],
      ['containerWillUpdate'],
      ['containerRender'],
      ['componentWillUnmount'],
      ['componentDidUnmount'],
      ['componentShouldUpdate'],
      ['componentWillReceiveProps'],
      ['componentWillUpdate'],
      ['componentRender'],
      ['componentDidUpdate'],
      ['containerDidUpdate'],
    ]);
    expect(methodCallback.mock.calls[15]).toEqual(['componentShouldUpdate', { width: 20 }]);
    expect(methodCallback.mock.calls[16]).toEqual(['componentWillReceiveProps', { width: 20 }]);

    await delay(50);
    ref.current.forceUpdate();
    await delay(10);
    expect(pickMethod(methodCallback.mock.calls)).toEqual([
      ['containerWillMount'],
      ['containerRender'],
      ['componentWillMount'],
      ['componentWillMount'],
      ['componentRender'],
      ['componentDidMount'],
      ['componentRender'],
      ['componentDidMount'],
      ['containerDidMount'],
      ['containerShouldUpdate'],
      ['containerWillReceiveProps'],
      ['containerWillUpdate'],
      ['containerRender'],
      ['componentWillUnmount'],
      ['componentDidUnmount'],
      ['componentShouldUpdate'],
      ['componentWillReceiveProps'],
      ['componentWillUpdate'],
      ['componentRender'],
      ['componentDidUpdate'],
      ['containerDidUpdate'],
      ['componentWillUpdate'],
      ['componentRender'],
      ['componentDidUpdate'],
    ]);

    await delay(50);
    canvas.update(
      (
        <Canvas context={context} pixelRatio={1}>
          <TestContainer animate={false}>
            <Test width={30} ref={ref} />
          </TestContainer>
        </Canvas>
      ).props
    );

    await delay(50);
    expect(ref.current.container.get('children')[0].get('attrs').width).toBe(30);
  });

  it('第1个子组件为空', async () => {
    methodCallback.mockClear();

    const { props } = (
      <Canvas context={context} pixelRatio={1}>
        <TestContainer>
          {null}
          <Test width={10} id="2" />
        </TestContainer>
      </Canvas>
    );

    const canvas = new Canvas(props);
    canvas.render();

    await delay(50);
    canvas.update(
      (
        <Canvas context={context} pixelRatio={1}>
          <TestContainer>
            <Test width={20} id="1" />
            <Test width={10} id="2" />
          </TestContainer>
        </Canvas>
      ).props
    );

    expect(pickMethod(methodCallback.mock.calls)).toEqual([
      ['containerWillMount'],
      ['containerRender'],
      ['componentWillMount'],
      ['componentRender'],
      ['componentDidMount'],
      ['containerDidMount'],
      ['containerShouldUpdate'],
      ['containerWillReceiveProps'],
      ['containerWillUpdate'],
      ['containerRender'],
      ['componentWillMount'],
      ['componentRender'],
      ['componentDidMount'],
      ['containerDidUpdate'],
    ]);

    expect(methodCallback.mock.calls[2]).toEqual(['componentWillMount', { width: 10, id: '2' }]);
    expect(methodCallback.mock.calls[10]).toEqual(['componentWillMount', { width: 20, id: '1' }]);
  });
});
