import F2 from '@antv/f2';

const data = [{
  const: 'const',
  type: '交通出行',
  money: 51.39
}, {
  const: 'const',
  type: '饮食',
  money: 356.68
}, {
  const: 'const',
  type: '生活日用',
  money: 20.00
}, {
  const: 'const',
  type: '住房缴费',
  money: 116.53
}];
const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data);
chart.coord('polar', {
  transposed: true,
  radius: 0.9,
  innerRadius: 0.5
});
chart.axis(false);
chart.legend(false);
chart.tooltip(false);
chart.guide()
  .html({
    position: [ '50%', '50%' ],
    html: '<div style="text-align: center;width:150px;height: 50px;">\n      <p style="font-size: 12px;color: #999;margin: 0" id="title"></p>\n      <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>\n      </div>'
  });
chart.interval()
  .position('const*money')
  .adjust('stack')
  .color('type', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14' ]);
chart.pieLabel({
  sidePadding: 30,
  activeShape: true,
  label1: function label1(data) {
    return {
      text: '￥' + data.money,
      fill: '#343434',
      fontWeight: 'bold'
    };
  },
  label2: function label2(data) {
    return {
      text: data.type,
      fill: '#999'
    };
  },
  onClick: function onClick(ev) {
    const data = ev.data;
    if (data) {
      $('#title').text(data.type);
      $('#money').text(data.money);
    }
  }
});
chart.render();
