import F2 from '@antv/f2';

fetch('../data/guide-line.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      month: {
        type: 'timeCat',
        ticks: [ '2016-01', '2017-01', '2018-01' ]
      },
      PM: {
        ticks: [ 10, 15, 20, 25, 30, 35 ]
      }
    });
    chart.axis('month', {
      grid: {
        lineDash: null,
        stroke: '#e8e8e8',
        lineWidth: 1
      }
    }); // 坐标轴配置
    chart.axis('PM', {
      grid: {
        lineDash: null
      }
    }); // 坐标轴配置

    // 绘制 Guide.Line
    chart.guide().line({
      start: [ 'min', 25 ],
      end: [ 'max', 25 ],
      style: {
        stroke: '#d0502d',
        lineWidth: 2,
        lineCap: 'round'
      }
    });

    chart.line().position('month*PM');
    chart.render();
  });
