import data from './data.json';
const F2 = require('../../../../src/index');

// 兼容之前的pinch和pan
require('../../../../src/interaction/index');
const Pan = require('../../../../src/interaction/pan');
const Pinch = require('../../../../src/interaction/pinch');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

const chart = new F2.Chart({
  el: canvas,
  pixelRatio: window.devicePixelRatio
});

chart.source(data, {
  reportDate: {
    type: 'timeCat',
    tickCount: 3,
    range: [ 0, 1 ],
    mask: 'YYYY-MM-DD'
  },
  rate: {
    tickCount: 5
  }
});

chart.line()
  .position('reportDate*rate')
  .color('name');

describe('Interaction', () => {
  it('contructor compatible', () => {
    expect(F2.Chart._Interactions.pan).toBe(Pan);
    expect(F2.Chart._Interactions.pinch).toBe(Pinch);
  });

  it('instance compatible', () => {
    chart.interaction('pan');
    chart.interaction('pinch');
    chart.render();

    expect(chart._interactions.pan).toBeInstanceOf(Pan);
    expect(chart._interactions.pinch).toBeInstanceOf(Pinch);
  });
});
