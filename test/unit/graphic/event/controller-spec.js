import Canvas from '../../../../src/graphic/canvas';
import CanvasElement from '../../../../src/graphic/canvas-element';

const clickCallback = jest.fn();
const touchstartCallback = jest.fn();
const touchmoveCallback = jest.fn();
const touchendCallback = jest.fn();
const panCallback = jest.fn();
const pressCallback = jest.fn();
const pinchCallback = jest.fn();

const canvasEl = CanvasElement.create({});
const canvas = new Canvas({
  el: canvasEl,
  pixelRatio: 1
});
canvas.on('click', clickCallback);
canvas.on('touchstart', touchstartCallback);
canvas.on('touchmove', touchmoveCallback);
canvas.on('touchend', touchendCallback);
canvas.on('pan', panCallback);
canvas.on('press', pressCallback);
canvas.on('pinch', pinchCallback);

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
    expect(clickCallback.mock.calls[0][0].type).toBe('click');
  });

  it('touch event', () => {
    canvasEl.dispatchEvent({ type: 'touchstart', touches: [{ x: 10, y: 10 }] });
    canvasEl.dispatchEvent({ type: 'touchmove', touches: [{ x: 11, y: 10 }] });
    canvasEl.dispatchEvent({ type: 'touchend' });
    expect(touchstartCallback.mock.calls.length).toBe(1);
    expect(touchstartCallback.mock.calls[0][0].points).toEqual([{ x: 10, y: 10 }]);

    expect(touchmoveCallback.mock.calls.length).toBe(1);
    expect(touchmoveCallback.mock.calls[0][0].points).toEqual([{ x: 11, y: 10 }]);

    expect(touchendCallback.mock.calls.length).toBe(1);
  });

  describe('pan event', () => {
    it('normal pan', () => {
      const startcallback = jest.fn();
      const callback = jest.fn();
      const endcallback = jest.fn();

      canvas.on('panstart', startcallback);
      canvas.on('pan', callback);
      canvas.on('panend', endcallback);

      canvasEl.dispatchEvent({ type: 'touchstart', touches: [{ x: 20, y: 10 }] });
      canvasEl.dispatchEvent({ type: 'touchmove', touches: [{ x: 21, y: 10 }] });
      canvasEl.dispatchEvent({ type: 'touchmove', touches: [{ x: 22, y: 10 }] });
      canvasEl.dispatchEvent({ type: 'touchmove', touches: [{ x: 10, y: 11 }] });
      canvasEl.dispatchEvent({ type: 'touchend', touches: [] });

      expect(startcallback.mock.calls.length).toBe(1);
      expect(startcallback.mock.calls[0][0].direction).toBe('right');
      expect(startcallback.mock.calls[0][0].deltaX).toBe(1);
      expect(startcallback.mock.calls[0][0].deltaY).toBe(0);

      expect(callback.mock.calls.length).toBe(3);
      expect(callback.mock.calls[0][0].direction).toBe('right');
      expect(callback.mock.calls[0][0].deltaX).toBe(1);
      expect(callback.mock.calls[0][0].deltaY).toBe(0);

      expect(callback.mock.calls[2][0].direction).toBe('right');
      expect(callback.mock.calls[2][0].deltaX).toBe(-10);
      expect(callback.mock.calls[2][0].deltaY).toBe(1);

      expect(endcallback.mock.calls.length).toBe(1);
    });
  });


  describe('pinch event', () => {
    it('normal pinch', () => {
      const startcallback = jest.fn();
      const callback = jest.fn();
      const endcallback = jest.fn();

      canvas.on('pinchstart', startcallback);
      canvas.on('pinch', callback);
      canvas.on('pinchend', endcallback);

      canvasEl.dispatchEvent({ type: 'touchstart', touches: [{ x: 10, y: 10 }, { x: 20, y: 20 }] });
      canvasEl.dispatchEvent({ type: 'touchmove', touches: [{ x: 11, y: 11 }, { x: 20, y: 20 }] });
      canvasEl.dispatchEvent({ type: 'touchmove', touches: [{ x: 12, y: 10 }, { x: 20, y: 20 }] });
      canvasEl.dispatchEvent({ type: 'touchmove', touches: [{ x: 9, y: 9 }, { x: 20, y: 20 }] });
      canvasEl.dispatchEvent({ type: 'touchend', touches: [] });

      expect(startcallback.mock.calls.length).toBe(1);
      expect(startcallback.mock.calls[0][0].center).toEqual({ x: 15, y: 15 });
      expect(startcallback.mock.calls[0][0].zoom).toBeCloseTo(0.89, 1);

      expect(callback.mock.calls.length).toBe(3);
      expect(callback.mock.calls[0][0].center).toEqual({ x: 15, y: 15 });
      expect(callback.mock.calls[0][0].zoom).toBeCloseTo(0.90, 1);

      expect(callback.mock.calls[2][0].center).toEqual({ x: 15, y: 15 });
      expect(callback.mock.calls[2][0].zoom).toBeCloseTo(1.09, 1);

      expect(endcallback.mock.calls.length).toBe(1);
    });
  });

  describe('press event', () => {
    it('normal press', async () => {
      const callback = jest.fn();
      canvas.on('press', callback);
      canvasEl.dispatchEvent({ type: 'touchstart', touches: [{ x: 20, y: 10 }] });
      // await wait(251);
      canvasEl.dispatchEvent({ type: 'touchmove', touches: [{ x: 21, y: 10 }] });
      // console.log(callback.mock.calls);
    });
  });
});

