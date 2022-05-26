// @ts-nocheck
/* @jsx React.createElement */
import { Canvas, Chart, Component, Line } from '@antv/f2';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactCanvas from '../src';

// @ts-ignore
Enzyme.configure({ adapter: new Adapter() });

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

function App(props: any) {
  const { chartRef, lineRef, a } = props;
  return (
    <ReactCanvas ref={chartRef} width={100} height={100} className="newClass">
      <Chart data={data}>
        <Line ref={lineRef} x="genre" y="sold" a={a} />
      </Chart>
    </ReactCanvas>
  );
}

describe('<Canvas >', () => {
  it('Chart render', () => {
    const chartRef = React.createRef<any>();
    const lineRef = React.createRef<any>();

    const wrapper = mount(<App chartRef={chartRef} lineRef={lineRef} />);
    expect(wrapper.html()).toBe(
      '<canvas class="f2-chart newClass" width="100" height="100" style="width: 100px; height: 100px; display: block; padding: 0px; margin: 0px;"></canvas>'
    );

    const reactChart = chartRef.current;
    const line = lineRef.current;
    // 断言实例生成和ref正确性
    expect(reactChart.canvas).toBeInstanceOf(Canvas);
    expect(line).toBeInstanceOf(Line);
    expect(line.props.a).toBeUndefined();

    // 触发update
    wrapper.setProps({ a: 2 });
    expect(line.props.a).toBe(2);

    wrapper.unmount();
  });

  it('Chart render with Error', () => {
    const originOnError = window.onError;

    // jest 内部有一些 uncaught error 会导致用例失败，所以这里需要先全局捕获一下
    window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
      return false;
    };

    class Test extends Component {
      render() {
        throw new Error('Render Error');
      }
    }

    const onError = jest.fn(() => {
      // do something
    });

    const wrapper = mount(
      <ReactCanvas fallback={<div>Chart Fallback</div>} onError={onError}>
        <Test />
      </ReactCanvas>
    );

    // 断言 fallback 触发
    expect(wrapper.html()).toBe('<div>Chart Fallback</div>');

    // 断言 onError 触发
    expect(onError.mock.calls.length).toBe(1);

    // reset global onerror callback
    window.onerror = originOnError;
  });
});
