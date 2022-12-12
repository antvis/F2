/* @jsx React.createElement */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCanvas from '../src';
import { Chart, Line } from '@antv/f2';

const container = document.createElement('div');
document.body.appendChild(container);

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const App = () => {
  return (
    <ReactCanvas width={100} height={100} className="newClass">
      <Chart data={data}>
        <Line x="genre" y="sold" />
      </Chart>
    </ReactCanvas>
  );
};

ReactDOM.render(<App />, container);

describe('<Canvas >', () => {
  it('Canvas', () => {
    expect(true).toBe(true);
  });
});
