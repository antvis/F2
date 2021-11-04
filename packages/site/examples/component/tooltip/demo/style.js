import F2 from '@antv/f2';

const data = [{
  year: '2010',
  sales: 38
}, {
  year: '2011',
  sales: 52
}, {
  year: '2012',
  sales: 61
}, {
  year: '2013',
  sales: 145
}, {
  year: '2014',
  sales: 48
}, {
  year: '2015',
  sales: 38
}, {
  year: '2016',
  sales: 38
}, {
  year: '2017',
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
chart.tooltip({
  showItemMarker: false,
  background: {
    radius: 2,
    fill: '#1890FF',
    padding: [ 3, 5 ]
  },
  tooltipMarkerStyle: {
    fill: '#1890FF',
    fillOpacity: 0.1
  },
  onShow: function onShow(ev) {
    const items = ev.items;

    items[0].name = null;
    items[0].value = '$' + items[0].value + 'M';
  }
});
chart.interval().position('year*sales');
chart.render();
