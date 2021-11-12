import F2 from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio,
  aria: true, // 开启无障碍描述生成
  title: '销量' // 图表标题，可被无障碍识别
});

chart.source(data);

chart.interval()
  .position('genre*sold')
  .color('genre');

chart.render();
