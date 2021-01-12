// @ts-nocheck
import data from '../../react/test/data';

const canvasEl = document.createElement('canvas');
canvasEl.style.width = '100%';
// canvasEl.style.height = '400px';
document.body.appendChild(canvasEl);
const context = canvasEl.getContext('2d');


const App = () => {
  return null;
}

const chart = App({ data, context });
chart.render();
