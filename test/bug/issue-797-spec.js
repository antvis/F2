const F2 = require('../../src/core');
require('../../src/geom/interval');

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'issue797';
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
document.body.appendChild(canvas);

describe('issue 797', () => {
  it('render 之后再次修改geom的size', () => {
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

    const intervalGeom = chart
      .interval()
      .position('genre*sold')
      .color('genre');

    chart.render();

    intervalGeom.size(10);
    chart.repaint();

    expect(intervalGeom.get('attrs').size).not.toBe(undefined);

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
