import data from './data.json';
import * as F2 from '../../../../src/index';

const onStartCallback = jest.fn();

const canvas = document.createElement('canvas');
canvas.style.width = '100%';
canvas.style.height = '300px';
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

// chart.area()
//   .position('reportDate*rate')
//   .color('name')
//   .animate(false);
chart.line()
  .position('reportDate*rate')
  .color('name')
  .animate(false);

chart.interaction('pinch', {
  onStart: onStartCallback
});
chart.interaction('pan');
chart.render();

describe('Interaction', () => {
  it('pinch', () => {
    const interactionContext = chart.get('interactionContext');
    interactionContext.start();
    interactionContext.doZoom(0.5, 0.5, 1.5);
    interactionContext.updateTicks();

    chart.get('canvas').emit('pinchstart', {});
    expect(onStartCallback.mock.calls.length).toEqual(1);
  });

  it('pan', () => {
    const lineShape = chart.get('middlePlot').get('children')[0].get('children')[0];
    const beforePoints = lineShape.get('attrs').points;
    const firstPoint = beforePoints.find(p => !isNaN(p.x));
    expect(firstPoint.reportDate).toEqual('2017-03-15');
    expect(firstPoint.rate).toEqual(-1.3);

    const interactionContext = chart.get('interactionContext');
    interactionContext.start();
    interactionContext.doMove(0.1);

    const afterPoints = chart.get('middlePlot').get('children')[0].get('children')[0].get('attrs').points;
    const afterPoint = afterPoints.find(p => !isNaN(p.x));
    expect(afterPoint.reportDate).toEqual('2017-02-15');
    expect(afterPoint.rate).toEqual(-6.9);

  });
});
