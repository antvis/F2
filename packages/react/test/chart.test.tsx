/** @jsxImportSource react */
// @ts-nocheck

import ReactDOM from 'react-dom';
import Chart from '../src/chart';

import data from './data';

// 引入组件
import Interval from '../../interval/src/index';
import Line from '../../line/src/index';
import Legned from '../../legend/src/index';
import Tooltip from '../../tooltip/src/index';

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


const legendItems = [
  {
    "value": 0.05,
    "name": "本基金",
    "field": "codeType",
    "fieldValue": "PRODUCT_ID"
  },
  {
    "value": 0,
    "name": "同类均值",
    "field": "codeType",
    "fieldValue": "FUND_TYPE"
  },
  {
    "value": -0.0626,
    "name": "沪深300",
    "field": "codeType",
    "fieldValue": "INDEX_CODE"
  }
]

const App = () => {
  return (
    <Chart
      pixelRatio={ window.devicePixelRatio }
      data={ data }
    >
      <Line position="reportDateTimestamp*rate" color={["codeType", ['#108EE8', '#86C5F2', '#E8A010']]} />
      <Legned items={ legendItems } />
      <Tooltip />
    </Chart>
  );
}

ReactDOM.render(<App />, root);

