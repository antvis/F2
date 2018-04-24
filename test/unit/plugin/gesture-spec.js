const assert = require('chai').assert;
const F2 = require('../../../src/core');
const Gesture = require('../../../src/plugin/gesture');
const canvas = document.createElement('canvas');
const EventSimulate = require('event-simulate');

canvas.width = 500;
canvas.height = 500;
canvas.id = 'gesture';
document.body.appendChild(canvas);

const data = [
  {
    name: 'city1',
    count: 1
  },
  {
    name: 'city2',
    count: 2
  },
  {
    name: 'city3',
    count: 3
  },
  {
    name: 'city4',
    count: 4
  },
  {
    name: 'city5',
    count: 5
  }
];

describe('Gesture Plugin', function() {
  it('chart gestureController', function() {
    const chart = new F2.Chart({
      id: 'gesture',
      width: 500,
      height: 500,
      plugins: [ Gesture ]
    });
    chart.source(data);
    chart.pluginGesture({
      gesture: {
        touchmove(data) {
          assert.isNotNull(data);
          chart.clear();
        }
      }
    });
    chart.interval().position('name*count').color('#fd503f');
    chart.render();
    EventSimulate.simulate(canvas, 'mousemove', {
      clientX: 375,
      clientY: 174
    });
    const gestureController = chart.get('gestureController');
    assert.isNotEmpty(gestureController);

  });

  it('options useCalculate', function() {
    const chart = new F2.Chart({
      id: 'gesture',
      width: 500,
      height: 500,
      plugins: [ Gesture ]
    });
    chart.source(data);
    chart.pluginGesture({
      gesture: {
        touchmove(data) {
          assert.isNull(data);
          chart.clear();
        }
      },
      options: {
        useCalculate: false
      }
    });
    chart.interval().position('name*count').color('#fd503f');
    chart.render();
    EventSimulate.simulate(canvas, 'mousemove', {
      clientX: 375,
      clientY: 174
    });
  });

  it('hammerOptions', function() {
    const chart = new F2.Chart({
      id: 'gesture',
      width: 500,
      height: 500,
      plugins: [ Gesture ]
    });
    chart.source(data);
    chart.pluginGesture({
      gesture: {
        touchmove() { }
      },
      hammerOptions: {
        enable: false
      }
    });
    chart.interval().position('name*count').color('#fd503f');
    chart.render();
    const gestureController = chart.get('gestureController');
    assert.isFalse(gestureController.hammer.options.enable);
    chart.clear();
  });

  it('clear', function() {
    const chart = new F2.Chart({
      id: 'gesture',
      width: 500,
      height: 500,
      plugins: [ Gesture ]
    });
    chart.source(data);
    chart.pluginGesture({
      gesture: {
        touchmove() { }
      }
    });
    chart.interval().position('name*count').color('#fd503f');
    chart.render();
    const gestureController = chart.get('gestureController');
    assert.isNotNull(gestureController.hammer.element);
    chart.clear();
    assert.isNull(gestureController.hammer.element);
    document.body.removeChild(canvas);
  });

});
