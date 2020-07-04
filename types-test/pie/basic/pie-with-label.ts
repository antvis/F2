// https://f2.antv.vision/zh/examples/pie/basic#pie-with-label

import F2 from '@antv/f2';

const data = [
  {
    amount: 20,
    ratio: 0.1,
    memo: '学习',
    const: 'const',
  },
  {
    amount: 100,
    ratio: 0.5,
    memo: '睡觉',
    const: 'const',
  },
  {
    amount: 10,
    ratio: 0.05,
    memo: '吃饭',
    const: 'const',
  },
  {
    amount: 30,
    ratio: 0.15,
    memo: '讲礼貌',
    const: 'const',
  },
  {
    amount: 10,
    ratio: 0.05,
    memo: '其他',
    const: 'const',
  },
  {
    amount: 20,
    ratio: 0.1,
    memo: '运动',
    const: 'const',
  },
  {
    amount: 10,
    ratio: 0.05,
    memo: '暂无备注',
    const: 'const',
  },
];

const chart = new F2.Chart<typeof data[0]>({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
});

chart.source(data);
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.4,
  radius: 0.75,
});
chart.axis(false);
chart.legend({
  position: 'bottom',
  align: 'center',
});
chart.tooltip(false);
chart.guide().html({
  position: ['50%', '50%'],
  html:
    '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>',
});
// 配置文本饼图
chart.pieLabel({
  sidePadding: 75,
  label1: function label1(data) {
    return {
      text: data.memo,
      fill: '#808080',
    };
  },
  label2: function label2(data) {
    return {
      fill: '#000000',
      text: '$' + data.amount.toFixed(2),
      fontWeight: 500,
      fontSize: 10,
    };
  },
});
chart
  .interval()
  .position(['const', 'ratio'])
  .color('memo', [
    '#1890FF',
    '#13C2C2',
    '#2FC25B',
    '#FACC14',
    '#F04864',
    '#8543E0',
    '#3436C7',
    '#223273',
  ])
  .adjust('stack');
chart.render();

// 绘制内阴影
const frontPlot = chart.get('frontPlot');
const coord = chart.get('coord'); // 获取坐标系对象
if (coord.isPolar) {
  frontPlot.addShape('sector', {
    attrs: {
      x: coord.center.x,
      y: coord.center.y,
      r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
      r0: coord.circleRadius * coord.innerRadius,
      fill: '#000',
      opacity: 0.15,
    },
  });
}
chart.get('canvas').draw();
