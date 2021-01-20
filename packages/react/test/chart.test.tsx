
// @ts-nocheck
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

describe('<Chart >', () => {
  it('Chart render', () => {
    const wrapper = mount(
      <ReactChart data={ data } width={ 100 } height={ 100 }>
        <Line position="genre*sold"/>
      </ReactChart>
    );
    expect(wrapper.html()).toBe('<canvas class="f2-chart" width="100" height="100" style="width: 100px; height: 100px;"></canvas>');

    const instance = wrapper.instance();
    expect(instance.chart).toBeInstanceOf(Chart);
    wrapper.update({});
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
