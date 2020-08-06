import F2 from '@antv/f2';

const data = [
  { action: '浏览网站', pv: 50000, percent: 1 },
  { action: '放入购物车', pv: 35000, percent: 0.7 },
  { action: '生成订单', pv: 25000, percent: 0.5 },
  { action: '支付订单', pv: 15000, percent: 0.3 },
  { action: '完成交易', pv: 8000, percent: 0.16 }
];

const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  padding: [ 60, 80, 15, 15 ]
});

chart.source(data);
chart.axis(false);
chart.coord({
  transposed: true
});
chart.legend(true);
chart.intervalLabel({
  offsetX: 10,
  label: (data, color) => {
    return {
      text: data.action,
      fill: color
    };
  },
  guide: data => {
    return {
      text: (data.percent * 100).toFixed(0) + '%',
      fill: '#fff'
    };
  }
});

chart.interval()
  .position('action*percent')
  .color('action', [ '#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF' ])
  .adjust('symmetric')
  .shape('pyramid');
chart.render();
