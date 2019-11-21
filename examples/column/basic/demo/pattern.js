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
// 创建纹理对象
// 获取 canvas 上下文对像
const ctx = chart.get('canvas').get('context');
const img = new Image();
img.src = 'https://gw.alipayobjects.com/zos/rmsportal/cNOctfQVgZmwaXeBITuD.jpg';
img.onload = function() {
  const pattern = ctx.createPattern(img, 'repeat');
  chart.interval().position('year*sales').color(pattern);
  chart.render();
};
