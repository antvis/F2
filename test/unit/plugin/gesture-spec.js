import { assert } from 'chai';
import Hammer from 'hammerjs';
import * as F2 from '../../../src/core';
import * as Gesture from '../../../src/plugin/gesture';

const canvas = document.createElement('canvas');
import { gestureSimulator } from '../test-util';
import '../../../src/geom';

canvas.width = 500;
canvas.height = 500;
canvas.id = 'gesture';
document.body.appendChild(canvas);

const data = [
  { name: 'city1', count: 1 },
  { name: 'city2', count: 2 },
  { name: 'city3', count: 3 },
  { name: 'city4', count: 4 },
  { name: 'city5', count: 5 }
];

describe('Gesture Plugin', function() {
  it('chart gestureController', async function() {
    let isPress = false;
    let isDataNull = true;
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
          assert.isNotNull(data[0]);
          if (data[0].x) {
            isDataNull = false;
          }
        },
        press() {
          isPress = true;
        }
      },
      hammerOptions: {
        inputClass: Hammer.TouchInput // 强制开启touch事件模式，单测模式用到。 实际使用可以忽略
      }
    });

    chart.interval().position('name*count').color('#fd503f');
    chart.render();
    const gestureController = chart.get('gestureController');
    assert.isNotEmpty(gestureController);
    gestureSimulator(canvas, 'touchmove', { clientX: 375, clientY: 174 });
    assert(isDataNull === false);
    await gestureSimulator(canvas, 'press', { clientX: 375, clientY: 174 });
    assert(isPress === true);
    chart.clear();
  });

  it('options useCalculate', async function() {
    let isdataNull = 'not null';
    const chart = new F2.Chart({
      id: 'gesture',
      width: 500,
      height: 500,
      plugins: [ Gesture ]
    });
    chart.source(data);
    chart.pluginGesture({
      gesture: {
        tap(data) {
          isdataNull = data;
        }
      },
      options: {
        useCalculate: false
      },
      hammerOptions: {
        inputClass: Hammer.TouchInput // 强制开启touch事件模式，单测模式用到。 实际使用可以忽略
      }
    });
    chart.interval().position('name*count').color('#fd503f');
    chart.render();

    await gestureSimulator(canvas, 'tap', { clientX: 375, clientY: 174 });
    assert.isNull(isdataNull);
    chart.clear();

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

