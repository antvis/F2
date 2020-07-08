// https://f2.antv.vision/zh/examples/line/basic#pan-smooth

import F2 from '@antv/f2';

const data: Array<Record<'x' | 'y', number>> = [];
const step = Math.PI / 4;
for (let x = -25; x < 25; x += step) {
  data.push({
    x,
    y: Math.sin(x),
  });
}

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

chart.source(data);
chart.axis('x', {
  grid: function grid(text) {
    if (text === 0) {
      return {
        lineDash: null,
      };
    }
  },
});
chart.axis('y', {
  grid: function grid(text) {
    if (text === 0) {
      return {
        lineDash: null,
      };
    }
  },
});
chart.tooltip(false);
chart.interaction('pan', {
  limitRange: {
    x: {
      min: -100,
      max: 100,
    },
  },
});
chart.interaction('pinch', {
  maxScale: 5,
  minScale: 1,
});
chart.line().position(['x', 'y']).shape('smooth');
chart.render();
