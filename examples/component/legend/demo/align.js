import F2 from '@antv/f2';

fetch('../data/center-legend.json')
  .then(res => res.json())
  .then(data => {
    const chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      'School Year': {
        tickCount: 3
      }
    });
    // 设置图例居中显示
    chart.legend({
      align: 'center',
      itemWidth: null // 图例项按照实际宽度渲染
    });
    // tooltip 与图例结合
    chart.tooltip({
      showCrosshairs: true
    });
    chart.line()
      .position('School Year*value')
      .color('type')
      .style('type', {
        lineDash: function lineDash(val) {
          if (val === 'Total') {
            return [ 1, 4 ];
          }
          return null;
        }
      });
    chart.point().position('School Year*value').color('type');
    chart.render();
  });
