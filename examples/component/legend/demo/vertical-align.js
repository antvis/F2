import F2 from '@antv/f2';

const data = [{
  city: 'Tulsa, OK',
  rate: -1.6,
  trend: 'reduce'
}, {
  city: 'San Francisco, CA',
  rate: -0.9,
  trend: 'reduce'
}, {
  city: 'Corpus Christi, TX',
  rate: -0.7,
  trend: 'reduce'
}, {
  city: 'San Jose, CA',
  rate: 0.0,
  trend: 'rise'
}, {
  city: 'Boston, MA',
  rate: 0.3,
  trend: 'rise'
}, {
  city: 'Manhattan, NY',
  rate: 0.4,
  trend: 'rise'
}, {
  city: 'El Paso, TX',
  rate: 0.4,
  trend: 'rise'
}, {
  city: 'Houston, TX',
  rate: 0.8,
  trend: 'rise'
}, {
  city: 'Lexington, KY',
  rate: 1.0,
  trend: 'rise'
}, {
  city: 'Oklahoma City, OK',
  rate: 1.1,
  trend: 'rise'
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  rate: {
    tickInterval: 1,
    formatter: function formatter(val) {
      return val + '%';
    }
  }
});
chart.coord({
  transposed: true
});
// 设置图例位置
chart.legend({
  position: 'right',
  verticalAlign: 'top',
  marker: 'square',
  offsetY: 10,
  itemMarginBottom: 5, // 调整图例项之间的间距
  clickable: false // 关闭点击操作
});
chart.tooltip(false); // 关闭 tooltip
// 调整 Y 轴坐标轴文本的间距
chart.axis('city', {
  labelOffset: 16
});
// 添加文本标注
data.forEach(function(obj) {
  let textAlign;
  let offsetX;
  if (obj.rate >= 0) {
    textAlign = 'start';
    offsetX = 2;
  } else {
    textAlign = 'end';
    offsetX = -2;
  }
  chart.guide().text({
    position: [ obj.city, obj.rate ],
    content: obj.rate.toFixed(1) + '%',
    style: {
      textAlign,
      fill: '#333',
      fontWeight: 'bold',
      fontSize: 10
    },
    offsetX
  });
});
chart.interval().position('city*rate').color('trend', function(val) {
  return val === 'rise' ? '#1890FF' : '#2FC25B';
});
chart.render();
