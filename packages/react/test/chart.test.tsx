/** @jsxImportSource react */
// @ts-nocheck

import ReactDOM from 'react-dom';
import Chart from '../src/chart';

// 引入组件
import Interval from '../../interval/src/index';
import Legned from '../../legend/src/index';

const style = document.createElement('style');
style.setAttribute('rel', 'text/css');
style.innerHTML = `
.chart-canvas {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
`;
document.head.appendChild(style);

const root = document.createElement('div');
document.body.appendChild(root);


const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

const App = () => {
  return (
    <Chart
      pixelRatio={ window.devicePixelRatio }
      data={ data }
    >
      <Interval position="genre*sold" />
      <Legned />
    </Chart>
  );
}

ReactDOM.render(<App />, root);

