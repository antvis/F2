/* @jsx React.createElement */
import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactChart from '../src';
import Chart, { Line } from '@ali/f2-components'

Enzyme.configure({ adapter: new Adapter() });

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

function App(props: any) {
  const { chartRef, lineRef, a } = props;
  return (
    <ReactChart ref={ chartRef } data={ data } width={ 100 } height={ 100 } className="newClass">
      <Line ref={ lineRef } position="genre*sold" a={ a } />
    </ReactChart>
  );
}

describe('<Chart >', () => {
  it('Chart render', () => {
    const chartRef = React.createRef<ReactChart>();
    const lineRef = React.createRef<any>();

    const wrapper = mount(<App chartRef={ chartRef } lineRef={ lineRef } />);
    expect(wrapper.html()).toBe('<canvas class="f2-chart newClass" width="100" height="100" style="width: 100px; height: 100px;"></canvas>');

    const reactChart = chartRef.current;
    const line = lineRef.current;
    // 断言实例生成和ref正确性
    expect(reactChart.chart).toBeInstanceOf(Chart);
    expect(line).toBeInstanceOf(Line);
    expect(line.props.a).toBeUndefined();

    // 触发update
    wrapper.setProps({ a: 2 });
    expect(line.props.a).toBe(2);

    wrapper.unmount();
    // 断言 F2 实例销毁
    expect(reactChart.chart.chart.destroyed).toBe(true);
  });
});

// class A extends React.Component {
//   render() {
//     return <div>A</div>
//   }
// }

// class B extends React.Component {
//   constructor(props) {
//     super(props);
//     this.refA = React.createRef();
//   }

//   componentDidMount() {
//     console.log(this.refA);
//   }

//   render() {
//     return <div>
//       <A ref={ this.refA }></A>
//     </div>
//   }
// }

// const root = document.createElement('div');
// document.body.appendChild(root);
// ReactDOM.render(<B />, root);
