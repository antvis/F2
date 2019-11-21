import F2 from '@antv/f2';

const data = [{
  date: '2018-05-14',
  pv: 709
}, {
  date: '2018-05-15',
  pv: 936
}, {
  date: '2018-05-16',
  pv: 627
}, {
  date: '2018-05-17',
  pv: 872
}, {
  date: '2018-05-18',
  pv: 824
}, {
  date: '2018-05-19',
  pv: 258
}, {
  date: '2018-05-20',
  pv: 59
}, {
  date: '2018-05-21',
  pv: 880
}, {
  date: '2018-05-22',
  pv: 995
}, {
  date: '2018-05-23',
  pv: 842
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  date: {
    tickCount: 3,
    range: [ 0, 1 ]
  }
});
chart.axis('date', {
  label: function label(text, index, total) {
    const textCfg = {};
    if (index === 0) {
      textCfg.textAlign = 'left';
    } else if (index === total - 1) {
      textCfg.textAlign = 'right';
    }
    return textCfg;
  },
  tickLine: {
    length: 5,
    stroke: '#e8e8e8'
  }
}); // set the axis
chart.tooltip({
  showCrosshairs: true
});
// set Guide.rect
chart.guide().rect({
  start: [ '2018-05-19', 'max' ],
  end: [ '2018-05-20', 'min' ],
  style: {
    fillOpacity: 0.1,
    fill: '#fa541c'
  }
});
// set Guide.text
chart.guide().text({
  position: [ '2018-05-19', 'max' ],
  content: 'weekend',
  style: {
    textAlign: 'start',
    textBaseline: 'top',
    fill: '#fa541c'
  },
  offsetX: -8
});
chart.line().position('date*pv');
chart.point().position('date*pv');
chart.render();
