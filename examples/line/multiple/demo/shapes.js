import F2 from '@antv/f2';

const data = [{
  time: '2016-08-08 00:00:00',
  value: 10,
  type: '预期收益率'
}, {
  time: '2016-08-08 00:10:00',
  value: 22,
  type: '预期收益率'
}, {
  time: '2016-08-08 00:30:00',
  value: 16,
  type: '预期收益率'
}, {
  time: '2016-08-09 00:35:00',
  value: 26,
  type: '预期收益率'
}, {
  time: '2016-08-09 01:00:00',
  value: 12,
  type: '预期收益率'
}, {
  time: '2016-08-09 01:20:00',
  value: 26,
  type: '预期收益率'
}, {
  time: '2016-08-10 01:40:00',
  value: 18,
  type: '预期收益率'
}, {
  time: '2016-08-10 02:00:00',
  value: 26,
  type: '预期收益率'
}, {
  time: '2016-08-10 02:20:00',
  value: 12,
  type: '预期收益率'
}, {
  time: '2016-08-08 00:00:00',
  value: 4,
  type: '实际收益率'
}, {
  time: '2016-08-08 00:10:00',
  value: 3,
  type: '实际收益率'
}, {
  time: '2016-08-08 00:30:00',
  value: 6,
  type: '实际收益率'
}, {
  time: '2016-08-09 00:35:00',
  value: -12,
  type: '实际收益率'
}, {
  time: '2016-08-09 01:00:00',
  value: 1,
  type: '实际收益率'
}, {
  time: '2016-08-09 01:20:00',
  value: 9,
  type: '实际收益率'
}, {
  time: '2016-08-10 01:40:00',
  value: 13,
  type: '实际收益率'
}, {
  time: '2016-08-10 02:00:00',
  value: -3,
  type: '实际收益率'
}, {
  time: '2016-08-10 02:20:00',
  value: 11,
  type: '实际收益率'
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  time: {
    type: 'timeCat',
    tickCount: 3,
    mask: 'hh:mm',
    range: [ 0, 1 ]
  },
  value: {
    tickCount: 3,
    formatter: function formatter(ivalue) {
      return ivalue + '%';
    }
  }
});
chart.axis('time', {
  line: null,
  label: function label(text, index, total) {
    const textCfg = {};
    if (index === 0) {
      textCfg.textAlign = 'left';
    } else if (index === total - 1) {
      textCfg.textAlign = 'right';
    }
    return textCfg;
  }
});
chart.axis('tem', {
  grid: function grid(text) {
    if (text === '0%') {
      return {
        lineDash: null,
        lineWidth: 1
      };
    }
  }
});
chart.legend({
  position: 'bottom',
  offsetY: -5
});
chart.line()
  .position('time*value')
  .color('type')
  .shape('type', function(type) {
    if (type === '预期收益率') {
      return 'line';
    }
    if (type === '实际收益率') {
      return 'dash';
    }
  });

chart.render();
