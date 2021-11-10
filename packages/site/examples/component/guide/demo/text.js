import F2 from '@antv/f2';

const data = [{
  year: '1951 年',
  sales: 38
}, {
  year: '1952 年',
  sales: 52
}, {
  year: '1956 年',
  sales: 61
}, {
  year: '1957 年',
  sales: 145
}, {
  year: '1958 年',
  sales: 48
}, {
  year: '1959 年',
  sales: 38
}, {
  year: '1960 年',
  sales: 38
}, {
  year: '1962 年',
  sales: 38
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});

chart.source(data, {
  sales: {
    tickCount: 5
  }
});
chart.axis('sales', false);
chart.tooltip({
  showItemMarker: false,
  onShow: function onShow(ev) {
    const items = ev.items;
    items[0].name = null;
    items[0].name = items[0].title;
    items[0].value = '¥ ' + items[0].value;
  }
});
// draw the Guide.Text
data.forEach(function(obj) {
  chart.guide().text({
    position: [ obj.year, obj.sales ],
    content: obj.sales,
    style: {
      textBaseline: 'bottom',
      textAlign: 'center'
    },
    offsetY: -2
  });
});

chart.interval().position('year*sales');
chart.render();
