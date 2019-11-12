import F2 from '@antv/f2';

const data = [{
  year: '2014 年',
  sales: 145
}, {
  year: '2015 年',
  sales: 121
}, {
  year: '2016 年',
  sales: 100
}, {
  year: '2017 年',
  sales: 97
}, {
  year: '2018 年',
  sales: 85
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
  onShow: function onShow(ev) {
    const items = ev.items;
    items[0].name = null;
    items[0].name = items[0].title;
    items[0].value = '¥ ' + items[0].value;
  }
});

chart.interval()
  .position('year*sales')
  .color('l(90) 0:#1890ff 1:#70cdd0'); // 定义柱状图渐变色
chart.render();
