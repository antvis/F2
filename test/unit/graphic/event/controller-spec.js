import EventEmit from '../../../../src/graphic/event/emit';
import CanvasElement from '../../../../src/graphic/canvas-element';
import Controller from '../../../../src/graphic/event/controller';

const clickCallback = jest.fn();
const panCallback = jest.fn();
const pressCallback = jest.fn();
const pinchCallback = jest.fn();

const canvas = new EventEmit();
canvas.on('click', clickCallback);
canvas.on('pan', panCallback);
canvas.on('press', pressCallback);
canvas.on('pinch', pinchCallback);

const canvasEl = CanvasElement.create({});
new Controller({
  canvas,
  el: canvasEl
});

describe('Event Controller', function() {
  it('delegateEvent', function() {
    expect(canvasEl.__events.click.length).toBe(1);
    expect(canvasEl.__events.touchstart.length).toBe(1);
    expect(canvasEl.__events.touchmove.length).toBe(1);
    expect(canvasEl.__events.touchend.length).toBe(1);
  });

  it('click event', () => {
    canvasEl.dispatchEvent({ type: 'click' });
    expect(clickCallback.mock.calls.length).toBe(1);
    expect(clickCallback.mock.calls[0][0]).toEqual({ type: 'click' });
  });
});

