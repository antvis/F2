// eslint-disable-next-line
const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
// eslint-disable-next-line
const CanvasConverter = require('canvas-to-buffer');
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.001,
  failureThresholdType: 'percent',
});

expect.extend({
  toMatchImageSnapshot(received) {
    const converter = new CanvasConverter(received.canvas, {
      image: { types: ['png'] },
    });

    const execPath = process.execPath;
    // toMatchImageSnapshot 需要使用 node 环境
    process.execPath = 'node';
    const result = toMatchImageSnapshot.call(this, converter.toBuffer());
    process.execPath = execPath;

    return result;
  },
});
