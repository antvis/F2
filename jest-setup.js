// eslint-disable-next-line
const fs = require('fs');
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

    try {
      const result = JSON.parse(fs.readFileSync(__dirname + '/result.json', 'utf-8'));
      // const result = {};
      const commands = received.commands;

      if (commands && commands.length) {
        commands.forEach((item) => {
          result[item[0]] = true;
        });
      }

      fs.writeFileSync(__dirname + '/result.json', JSON.stringify(result));
    } catch (err) {
      console.error(err);
    }

    return result;
  },
});
