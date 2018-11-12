const expect = require('chai').expect;
const Swipe = require('../../../src/interaction/swipe');
const F2 = require('../../../src/core');
require('../../../src/geom/interval');

const canvas = document.createElement('canvas');
canvas.width = 375;
canvas.height = 200;
canvas.id = 'swipe';
document.body.appendChild(canvas);

const data = [];
const yValues = [ 3, 5.6, 7, 7, 10, 11, 3, 8, 9, 5.6, 12, 14, 10, 8, 9, 5, 17, 3, 8, 9 ];
for (let i = 0; i < 20; i++) {
  const obj = {};
  obj.x = i + 1 + '';
  obj.y = yValues[i];
  data.push(obj);
}

describe('Swipe', function() {
  const chart = new F2.Chart({
    id: 'swipe',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    x: {
      values: [ '5', '6', '7', '8', '9' ]
    }
  });
  chart.interval().position('x*y');
  chart.render();

  it('swipe process, end', function() {
    const swipe = new Swipe({
      speed: 3
    }, chart);
    let eventObj = {
      type: 'swipe',
      deltaTime: 450
    };
    swipe.process(eventObj);
    expect(swipe.currentDeltaX).to.equal(0);

    eventObj = {
      type: 'swipe',
      deltaTime: 250,
      deltaX: 400
    };
    swipe.process(eventObj);
    expect(swipe.currentDeltaX).to.equal(400);

    const xScale = chart.getXScale();
    expect(xScale.values.length).to.equal(5);
    expect(xScale.values).to.eql([ '1', '2', '3', '4', '5' ]);

    swipe.end();
    expect(swipe.currentDeltaX).to.be.null;
  });
});
