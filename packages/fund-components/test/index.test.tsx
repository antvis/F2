// @ts-nocheck
import data from '../../react/test/data';
import Chart from '@ali/f2-components';
import { WeaverLine } from '../src/index'

const canvasEl = document.createElement('canvas');
canvasEl.style.width = '100%';
// canvasEl.style.height = '400px';
document.body.appendChild(canvasEl);
const context = canvasEl.getContext('2d');


const App = () => {
  return (
    <Chart data={ data } context={ context }>
      <WeaverLine position="reportDateTimestamp*rate"/>
    </Chart>
  );
}

const chart = App({ data, context });
chart.render();
