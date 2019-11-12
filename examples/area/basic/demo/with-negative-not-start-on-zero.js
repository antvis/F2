import F2 from '@antv/f2';

const data = [{
  month: 'Jan.',
  value: 6.06
}, {
  month: 'Feb.',
  value: 82.2
}, {
  month: 'Mar.',
  value: -22.11
}, {
  month: 'Apr.',
  value: 21.53
}, {
  month: 'May.',
  value: -21.74
}, {
  month: 'Jun.',
  value: 73.61
}, {
  month: 'Jul.',
  value: 53.75
}, {
  month: 'Aug.',
  value: 60.32
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  month: {
    range: [ 0, 1 ]
  },
  value: {
    tickCount: 5
  }
});

chart.axis('month', {
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
chart.axis('value', {
  label: function label(text) {
    const textCfg = {};
    if (text <= 0) {
      textCfg.fill = '#1CAA3D';
      textCfg.fontWeight = 'bold';
    }

    return textCfg;
  }
});

chart.tooltip({
  showCrosshairs: true
});
chart.area({
  startOnZero: false // 配置 x 轴基线不为 0
}).position('month*value');
chart.line().position('month*value');
chart.render();
