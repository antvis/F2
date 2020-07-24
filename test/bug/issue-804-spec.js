import * as F2 from '../../src/core';
import '../../src/geom/interval';

const canvas = document.createElement('canvas');
canvas.style.width = '100%';
canvas.style.height = '300px';
document.body.appendChild(canvas);

describe('issue 804', () => {
  it('空数据render后，changeData', () => {
    const data = [
      { genre: 'Sports', sold: 275, type: 1 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new F2.Chart({
      el: canvas,
      pixelRatio: window.devicePixelRatio // 指定分辨率
    });

    const geom = chart
      .interval()
      .position('genre*sold')
      .color('type', type => {
        return type === 1 ? '#ddd' : '#108EE9';
      });
    chart.render();

    const scales = chart.get('scales');
    expect(scales.genre.type).toBe('identity');
    expect(scales.sold.type).toBe('identity');
    expect(scales.type.type).toBe('identity');

    // 修改数据
    chart.changeData(data);

    expect(scales.genre.type).toBe('cat');
    expect(scales.sold.type).toBe('linear');
    expect(scales.type.type).toBe('linear');

    const geomScales = geom.get('scales');
    expect(geomScales.genre.type).toBe('cat');
    expect(geomScales.sold.type).toBe('linear');
    expect(geomScales.type.type).toBe('linear');

    chart.destroy();
    document.body.removeChild(canvas);
  });
});
