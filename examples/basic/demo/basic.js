import F2 from '@antv/f2';

const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 1150 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 }
];

const chart = new F2.Chart({
  container: document.getElementById('container'),
  width: 500,
  height: 500
});

chart.source(data);
chart
  .interval()
  .position('genre*sold');
chart.render();
