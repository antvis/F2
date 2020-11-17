import F2 from '../../src/index';
import * as SVGEngine from 'f2-svg-engine';
F2.G.registerEngine('svg', SVGEngine);

const container = document.createElement('div');
document.body.appendChild(container);

describe('svg 渲染', () => {
  it('render', () => {
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new F2.Chart({
      el: container,
      width: 350,
      height: 300,
      renderer: 'svg',
      animate: false
    });

    chart.source(data);

    chart.coord({
      type: 'polar',
      innerRadius: 0.2
    });
    chart.interval()
      .position('genre*sold')
      .color('genre');

    chart.render();

    expect(container.hasChildNodes()).toBe(true);
  });
});
