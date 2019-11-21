import F2 from '@antv/f2';

const data = [{
  time: 'Jan.',
  tem: 1000
}, {
  time: 'Feb.',
  tem: 2200
}, {
  time: 'Mar.',
  tem: 2000
}, {
  time: 'Apr.',
  tem: 2600
}, {
  time: 'May.',
  tem: 2000
}, {
  time: 'Jun.',
  tem: 2600
}, {
  time: 'Jul.',
  tem: 2800
}, {
  time: 'Aug.',
  tem: 2000
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});

chart.source(data);
chart.scale({
  time: {
    range: [ 0, 1 ]
  },
  tem: {
    tickCount: 5,
    min: 0
  }
});
chart.axis('time', {
  label: function label(text, index, total) {
    const textCfg = {};
    if (index === 0) {
      textCfg.textAlign = 'left';
    }
    if (index === total - 1) {
      textCfg.textAlign = 'right';
    }
    return textCfg;
  }
});
chart.tooltip({
  showCrosshairs: true,
  onShow: function onShow(ev) {
    const items = ev.items;

    items[0].name = items[0].title;
  }
});
chart.guide().tag({
  position: [ 6, 2800 ],
  content: '最高点',
  offsetY: -5,
  direct: 'tl'
});
chart.area().position('time*tem');
chart.line().position('time*tem');
chart.render();
