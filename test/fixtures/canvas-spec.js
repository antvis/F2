import F2 from '../../src/index-simple';

const canvas = document.createElement('canvas');
canvas.style.width = '370px';
canvas.style.height = '300px';
document.body.appendChild(canvas);

describe('默认渲染', () => {
  it('render', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio // 指定分辨率
    });

    chart.source(data);

    chart.interval()
      .position('genre*sold')
      .color('genre');

    chart.render();
  });
});
