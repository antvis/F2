import * as F2 from '../../../../src/index-all';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.id = 'ctx';
document.body.appendChild(canvas);

describe('刻度轴算法', function() {

  it('刻度轴', function() {

    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 }
    ];

    const chart = new F2.Chart({
      id: 'ctx',
      pixelRatio: window.devicePixelRatio // 指定分辨率
    });

    chart.source(data);

    chart.scale('date', {
      type: 'timeCat',
      range: [ 0, 1 ],
      tickCount: 3,
      mask: 'MM-DD'
      // formatter: value => value.substr(5) // 去掉 yyyy-mm-dd 的年份
    });


    // chart.scale('sold', {
    //   tickCount: 5,
    // });

    chart.interval()
      .position('genre*sold')
      .color('genre');

    chart.render();

  });

});
